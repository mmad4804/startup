const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const express = require("express");
const uuid = require("uuid");
const app = express();
const DB = require("./database.js");
const { peerProxy } = require("./peerProxy.js");

const authCookieName = "token";

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

var apiRouter = express.Router();
app.use("/api", apiRouter);

//CreateAuth a new user
apiRouter.post("/auth/register", async (req, res) => {
  if (await findUser("username", req.body.username)) {
    res.status(409).send({ msg: "Username already exists" });
  } else {
    const user = await createUser(req.body.username, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ username: user.username });
  }
});

//GetAuth login an existing user
apiRouter.post("/auth/login", async (req, res) => {
  const user = await findUser("username", req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ username: user.username });
      return;
    }
  }
  res.status(401).send({ msg: "Unauthorized" });
});

//DeleteAuth to logout a user
apiRouter.delete("/auth/logout", async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    delete user.token;
    DB.updateUser(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

//Middleware to verify if a user is authenticated
const verifyAuth = async (req, res, next) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
};

apiRouter.get("/retrieveSongs", verifyAuth, async (req, res) => {
  const feedSongs = await DB.getSongs();
  res.send(feedSongs);
});

apiRouter.post("/addSong", verifyAuth, (req, res) => {
  const feedSongs = updateSongs(req.body);
  //feedSongs.push(req.body); // Add the new song to the feedSongs array
  res.send(feedSongs);
});

apiRouter.post("/saveSong", verifyAuth, async (req, res) => {
  const savedSongs = updateSavedSongs(req.body); // Save the song to the database
  res.send(savedSongs); // Return the updated saved songs for the user
});

apiRouter.get("/getSavedSongs", verifyAuth, async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    const savedSongs = await DB.getSavedSongs(user.username);
    res.send(savedSongs);
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

//****************Will probably want to change this! */
apiRouter.post("/updateList", verifyAuth, async (req, res) => {
  await DB.resetSongList(req.body);
  const feedSongs = await DB.getSongs();
  //feedSongs = req.body;
  res.send(feedSongs);
});

//Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

//Helper function to create a new user
async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };
  await DB.addUser(user);
  return user;
}

//************Need to make sure new song is at list beginning */
async function updateSongs(newSong) {
  await DB.addSong(newSong);
  //let newSongs = [newSong, ...feedSongs];
  //feedSongs = newSongs;
  //return feedSongs;
  return DB.getSongs();
}

async function updateSavedSongs(newSong) {
  await DB.saveSong(newSong);
  const savedSongs = await DB.getSavedSongs(newSong.username);
  return savedSongs;
}

//Helper function to find a user by a property
async function findUser(field, value) {
  if (!value) return null;

  if (field === "token") {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
}

function setAuthCookie(res, token) {
  res.cookie(authCookieName, token, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
    maxAge: 11111111111111,
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService); // Initialize the WebSocket server
