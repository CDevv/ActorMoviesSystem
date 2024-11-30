const { sequelize, testConnection } = require('./config/sequelize.js')
const { defaultTables } = require('./config/sqlite.js')

const { Actor } = require('./models/actor.js')
const { Movie } = require('./models/movie.js')
const { ActorMovie } = require('./models/actorMovies.js')

defaultTables()
testConnection()

/*
async function test() {
    const john = await Actor.create({ name: 'John', birthDate: 1732980003 })
    const coolMovie = await Movie.create({ title: 'ExampleMovie', releaseDate: 1732980003 })

    console.log(john.id)

    await ActorMovie.create({
        actorId: john.id,
        movieId: coolMovie.id,
        role: 'MainRole'
    })
}

test()
*/
