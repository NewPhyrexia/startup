const express = require('express');
const app = express();
const DB = require('./database.js');


// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

//ENDPOINTS begin here


apiRouter.get('/player/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const player = await DB.getPlayerInfo(username);

    if (player) {
      res.json(player);
    } else {
      res.status(404).json({ message: 'Player not found' });
    }
  } catch (error) {
    console.error('Error in handling request:', error);
    res.status(500).send('Server Error');
  }
});

apiRouter.post('/createPlayer', async (req, res) => {
  try {
    const playerObject = req.body;

    await DB.addPlayer(playerObject);

    const retrievedPlayer = await DB.getPlayerInfo(playerObject.userName);

    if (retrievedPlayer) {
      res.status(200).json(retrievedPlayer);
    } else {
      res.status(404).json({ message: 'Player not found' });
    }
  } catch (error) {
    console.error('Error creating player:', error);
    res.status(500).send('Server Error');
  }
});

// let lifetimeHighScore = 13; // grab user's highscore from the database once implimented
// let canReset = true;

// function pauseCode(minutes) {
//   canReset = false;
//   const milliseconds = minutes * 60 * 1000; // Convert minutes to milliseconds
//   setTimeout(function() {
//     lifetimeHighScore = 13;
//     canReset = true;
//   }, milliseconds);
// }

// // check lifetime score
// apiRouter.get('/lifetimeHighScore', (_req, res) => {
//   console.log(lifetimeHighScore);
//     res.send({"highScore": lifetimeHighScore});
//   });

// update lifetime score
apiRouter.post('/updateHighScore', (req, res) => {
  try {
    const playerObject = req.body;

    await DB.updatePlayer(playerObject);

    const retrievedPlayer = await DB.getPlayerInfo(playerObject.userName);

    if (retrievedPlayer) {
      res.status(200).json(retrievedPlayer);
    } else {
      res.status(404).json({ message: 'Player not found' });
    }
  } catch (error) {
    console.error('Error updating player:', error);
    res.status(500).send('Server Error');
  }
}
//ENDPOINTS end here


// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
