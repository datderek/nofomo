const express = require('express');
const postRouter = require('./routes/posts');

const app = express();
const port = process.env.PORT || 4000;

// Middleware - Log request path and method
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(express.json());

app.use('/api/posts', postRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
