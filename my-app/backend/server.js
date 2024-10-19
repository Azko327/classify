const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');  // Import CORS

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Handle POST requests to save user data
app.post('/saveUserData', (req, res) => {
  const userData = req.body;

  // Define the path to save the file inside the 'data' folder
  const filePath = path.join(__dirname, 'data', 'userData.json');

  // Write the user data to userData.json
  fs.writeFile(filePath, JSON.stringify(userData, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return res.status(500).json({ message: 'Failed to save data' });
    }

    console.log('Data successfully saved to userData.json');
    res.status(200).json({ message: 'Data successfully saved' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
