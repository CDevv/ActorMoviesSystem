const { sequelize, testConnection } = require('./config/sequelize.js')
const { defaultTables } = require('./config/sqlite.js')

const { Actor } = require('./models/actor.js')
const { Movie } = require('./models/movie.js')
const { ActorMovie } = require('./models/actorMovies.js')

await testConnection()
defaultTables()