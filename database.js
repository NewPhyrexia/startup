const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('tapbattle');
const userCollection = db.collection('user');
const playerCollection = db.collection('players');

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

// Function to get player information by username from the database
async function getPlayerInfo(username) {
    try {
      
      // Find the player by username
      const player = await playerCollection.findOne({ userName: username });
      return player;
    } catch (error) {
      console.error('Error in getting player info:', error);
    } 
}
  
// Function to add a player to the database if not found
async function addPlayer(playerObject) {
    try {
      
      // Insert the player if not found
      await playerCollection.updateOne(
        { userName: playerObject.userName },
        { $setOnInsert: playerObject },
        { upsert: true }
      );
    } catch (error) {
      console.error('Error in adding player:', error);
    }
}

async function updatePlayer(playerObject) {
    try {
  
      delete playerObject._id; // Exclude _id from update data if present
  
      await playerCollection.updateOne(
        { userName: playerObject.userName },
        { $set: playerObject }
      );
    } catch (error) {
      console.error('Error in updating player:', error);
    }
  }

  function getUser(email) {
    return userCollection.findOne({ email: email });
  }
  
  function getUserByToken(token) {
    return userCollection.findOne({ token: token });
  }
  
  async function createUser(email, password) {
    // Hash the password before we insert it into the database
    const passwordHash = await bcrypt.hash(password, 10);
  
    const user = {
      email: email,
      password: passwordHash,
      token: uuid.v4(),
    };
    await userCollection.insertOne(user);
  
    return user;
  }
  
  module.exports = {
    getUser,
    getUserByToken,
    createUser,
    getPlayerInfo,
    addPlayer,
    updatePlayer,
  };