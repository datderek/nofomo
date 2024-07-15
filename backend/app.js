const express = require('express');
const cors = require('cors');
const postRouter = require('./routes/posts');

const app = express();
const port = process.env.PORT || 4000;

// --- Middleware --- //
// Allow CORS
app.use(cors({ origin: `${process.env.CORS_ORIGIN}` }));

// Log request path and method
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Parse request body to JSON
app.use(express.json());

// --- Routes --- //
app.use('/api/posts', postRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
