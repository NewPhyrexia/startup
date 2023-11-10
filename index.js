const express = require('express');
const app = express();

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


// check lifetime score
apiRouter.get('/lifetimeHighScore', (_req, res) => {
  console.log(lifetimeHighScore);
    res.send({"highScore": lifetimeHighScore});
  });

// update lifetime score
apiRouter.post('/updateHighScore', (req, res) => {
  lifetimeHighScore = req.body.highScore;
  console.log(lifetimeHighScore);
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
