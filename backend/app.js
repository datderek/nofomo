const express = require('express');
const cors = require('cors');
const webhooksRouter = require('./routes/webhooks');
const postRouter = require('./routes/posts');
const userRouter = require('./routes/users');
const { errorHandler } = require('./middlewares/errors');

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
app.use('/api/webhooks', webhooksRouter);
app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
