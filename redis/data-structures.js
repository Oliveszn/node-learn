const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

client.on("error", (error) => console.log("redis client error occured", error));

async function redisdatastructire() {
  try {
    await client.connect();
    ///data structures to know
    //1 strings get, set, mget and mset(multiple setting and getting)

    await client.set("user:name", "Olive ");
    const name = await client.get("user:name");
    // console.log(name);

    await client.mSet(["user:email", "olive@mail.com", "user:age", "25"]);
    const [email, age] = await client.mGet(["user:email", "user:age"]);
    // console.log(email, age);

    ///2 lists LPUSH adds to the begin of the list, RPUSH add to end of list
    ////LRANGE retreive elements, LPOP remove fromleft, RPOP remove from right
    await client.lPush("user:todos", ["Buy milk", "Call mom"]);
    const todos = await client.lRange("user:todos", 0, -1); //get all notes
    // console.log(todos);

    ///3 sets SADD to add to set, SMEMBERS return all elemnts, SISMEMBER check if a memberexists SREM removes any member
    await client.sAdd("user:nickname", ["jjj", "hope", "emesk"]);
    const nickname = await client.sMembers("user:nickname");
    // console.log(nickname);

    const isPresent = await client.sIsMember("user:nickname", "hope");
    // console.log(isPresent);

    ////4 sortedsets  zADD add elements, zRAnge retriev elements, zRANK gives you the position, zrem removes an element
    ///0 -1 returns all the items
    await client.zAdd("cart", [
      {
        score: 100,
        value: "Cart 1",
      },
      {
        score: 150,
        value: "Cart 2",
      },
      {
        score: 200,
        value: "Cart 3",
      },
      {
        score: 10,
        value: "Cart 4",
      },
    ]);

    const getCartItem = await client.zRange("cart", 0, -1);
    console.log(getCartItem);

    const getCartItemsWithScore = await client.zRangeWithScores("cart", 0, -1);
    console.log(getCartItemsWithScore);

    ////5 hash hSet sets the vale, hget gets the value, hgetall, hdel
    await client.hSet("user:profile", {
      name: "Olive",
      email: "olive@mail.com",
      age: "25",
    });
    const profile = await client.hGetAll("user:profile");
    console.log("Profile:", profile);
  } catch (error) {
    console.log(error);
  } finally {
    await client.quit();
  }
}
redisdatastructire();
