// Create web server
// Load modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const commentsPath = path.join(__dirname, 'data', 'comments.json');

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());

// GET /comments
app.get('/comments', (req, res) => {
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Could not read comments file.');
      return;
    }
    const comments = JSON.parse(data);
    res.json(comments);
  });
});

// POST /comments
app.post('/comments', (req, res) => {
  const newComment = req.body;
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Could not read comments file.');
      return;
    }
    const comments = JSON.parse(data);
    comments.push(newComment);
    fs.writeFile(commentsPath, JSON.stringify(comments), err => {
      if (err) {
        res.status(500).send('Could not write comments file.');
        return;
      }
      res.json(newComment);
    });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});