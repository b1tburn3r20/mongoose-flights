const express = require('express');
const router = express.Router();

// Define your routes for the index router
router.get('/', (req, res) => {
  // Handle the index route logic
  res.send('Welcome to the index page');
});

module.exports = router;
