const { defaultTables } = require('./config/sqlite.js')
const actors = require('./routes/actorRoutes.js')
const movies = require('./routes/movieRoutes.js')
const actorMovies = require('./routes/actorMoviesRoutes.js')

defaultTables()

const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use('/api/actors', actors)
app.use('/api/movies', movies)
app.use('/api/actorMovies', actorMovies)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})