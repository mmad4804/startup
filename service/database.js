const { MongoClient } = require("mongodb");
const config = require(".dbconfig.json");

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db("tuneshare-startup");
const userCollection = db.collection("users");
const songCollection = db.collection("songs");

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log("Connect to database");
  } catch (ex) {
    console.log(
      `Unable to connect to database with ${url} because ${ex.message}`
    );
    process.exit(1);
  }
})();

function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ username: user.username }, { $set: user });
}

async function addSong(song) {
  await songCollection.insertOne(song);
}

async function getSongs() {
  return await songCollection.find().toArray();
}

async function resetSongList(songs) {
  try {
    await songCollection.deleteMany({});
    await songCollection.insertMany(songs);
    return await getSongs();
  } catch (error) {
    console.error("Error resetting song list:", error);
    throw error;
  }
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  addSong,
  getSongs,
};
