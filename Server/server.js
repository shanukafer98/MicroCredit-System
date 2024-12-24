import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Predefined number plates
const predefinedNumberPlates = ["AA-5565", "EF456GH", "IJ789KL", "MN012OP","WP-5365","WI-2325"];

// API endpoint to send a random predefined number plate
app.get('/random-numberplate', (req, res) => {
  const randomTimeInterval = Math.floor(Math.random() * 3) + 1; // Random time between 1s, 2s, and 3s
  const randomIndex = Math.floor(Math.random() * predefinedNumberPlates.length); // Random index to select a number plate
  const randomNumberPlate = predefinedNumberPlates[randomIndex]; // Select a random number plate

  setTimeout(() => {
    res.json({ numberPlate: randomNumberPlate });
  }, randomTimeInterval * 1000); // Set timeout based on the random interval
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});