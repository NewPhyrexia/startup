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





//ENDPOINT begin here

let lifetimeHighScore = 13; // grab user's highscore from the database once implimented
let canReset = true;

function pauseCode(minutes) {
  canReset = false;
  const milliseconds = minutes * 60 * 1000; // Convert minutes to milliseconds
  setTimeout(function() {
    lifetimeHighScore = 13;
    canReset = true;
  }, milliseconds);
}

// check lifetime score
apiRouter.get('/lifetimeHighScore', (_req, res) => {
  console.log(lifetimeHighScore);
    res.send({"highScore": lifetimeHighScore});
  });

// update lifetime score
apiRouter.post('/updateHighScore', (req, res) => {
  lifetimeHighScore = req.body.highScore;
  console.log(lifetimeHighScore);
  if (canReset) {
    pauseCode(1); // reset highscore on the server while DB is not implimented
  }
  res.send({message: "High score recieved"});
});

//ENDPOINT end here




// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
