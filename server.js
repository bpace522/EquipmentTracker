const express = require('express');
const mongodb = require('./db/connect');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

mongodb.initDb((err, db) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  }
});