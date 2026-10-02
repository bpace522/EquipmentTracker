const express = require('express');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', require('./routes/writeOperations'));

// Return JSON errors when request parsing or middleware fails.
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  if (error.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Request body is too large' });
  }

  console.error('Request failed:', error.message);
  return res.status(500).json({ error: 'Internal server error' });
});

mongodb.initDb((err, db) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  }
});