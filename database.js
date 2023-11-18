const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('tapbattle');
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
      await client.connect();
      
      // Find the player by username
      const player = await playerCollection.findOne({ userName: username });
      return player;
    } catch (error) {
      console.error('Error in getting player info:', error);
    } finally {
      await client.close();
    }
}
  
// Function to add a player to the database if not found
async function addPlayer(playerObject) {
    try {
      await client.connect();
      
      // Insert the player if not found
      await playerCollection.updateOne(
        { userName: playerObject.userName },
        { $setOnInsert: playerObject },
        { upsert: true }
      );
    } catch (error) {
      console.error('Error in adding player:', error);
    } finally {
      await client.close();
    }
}

async function updatePlayer(playerObject) {
    try {
      await client.connect();
  
      delete playerObject._id; // Exclude _id from update data if present
  
      await playerCollection.updateOne(
        { userName: playerObject.userName },
        { $set: playerObject }
      );
    } catch (error) {
      console.error('Error in updating player:', error);
    } finally {
      await client.close();
    }
  }
  
  module.exports = {
    getPlayerInfo,
    addPlayer,
    updatePlayer,
  };