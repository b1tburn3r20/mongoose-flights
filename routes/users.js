const express = require('express');
const router = express.Router();

// Define your routes for the users router
router.get('/', (req, res) => {
  // Handle the users route logic
  res.send('Welcome to the users page');
});

module.exports = router;
