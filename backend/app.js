const express = require('express')

const app = express()
const port = process.env.PORT || 4000

// Log request path and method
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})
