const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const DATA_FILE = path.join(__dirname, 'locations.json');

app.use(express.json());
app.use(express.static(__dirname)); // serve HTML files directly

// Save location data
app.post('/api/save-location', (req, res) => {
  const { latitude, longitude, timestamp } = req.body;

  let existing = [];
  if (fs.existsSync(DATA_FILE)) {
    existing = JSON.parse(fs.readFileSync(DATA_FILE));
  }

  existing.push({ latitude, longitude, timestamp });

  fs.writeFileSync(DATA_FILE, JSON.stringify(existing, null, 2));
  res.json({ success: true });
});

// Get all saved locations
app.get('/api/get-locations', (req, res) => {
  if (fs.existsSync(DATA_FILE)) {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(data);
  } else {
    res.json([]);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
