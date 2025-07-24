// publisher send channel, subsriber consume
const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

client.on("error", (error) => console.log("redis client error occured", error));

async function testAddFeatures() {
  try {
    await client.connect();
    const subscriber = await client.duplicate(); //cretaes new client
    subscriber.connect(); //connect to redis server for subscriber

    await subscriber.subscribe("dummy-channel", (message, channel) => {
      console.log(`received message from ${channel}: ${message}`);
    });

    ///publich message to dummy chanel
    await client.publish("dummy-channel", "some dummy channel from publisher");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await subscriber.unsubscribe("dummy-channel");
    await subscriber.quit();

    ///pipelining & transactions
    const multi = client.multi();

    multi.set("key-transaction1", "value1");
    multi.set("key-transaction2", "value2");
    multi.get("key-transaction1");
    multi.get("key-transaction2");

    const results = await multi.exec();
    console.log(results);

    const pipeline = client.multi();
    multi.set("key-pipelin1", "value1");
    multi.set("key-pipeline2", "value2");
    multi.get("key-pipelin1");
    multi.get("key-pipeline2");

    const pipelinresults = await multi.exec();
    console.log(pipelinresults);
  } catch (error) {
    console.log(error);
  } finally {
    await client.quit();
  }
}
testAddFeatures();
