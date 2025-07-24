const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

client.on("error", (error) => console.log("redis client error occured", error));

//testing connection
async function restredisconnect() {
  try {
    await client.connect();
    console.log("connect to redis");

    await client.set("key", "olive");
    const extractValue = await client.get("key");
    console.log(extractValue);

    const deleteCount = await client.del("key");
    console.log(deleteCount);

    await client.set("count", "100");
    const incrementCount = await client.incr("count");
    console.log(incrementCount);
  } catch (error) {
    console.log(error);
  } finally {
    await client.quit();
  }
}
restredisconnect();
