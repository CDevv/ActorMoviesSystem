const { sequelize, testConnection } = require('../config/sequelize.js')
const { defaultTables } = require('../config/sqlite.js')

const { Actor } = require('../models/actor.js')
const { Movie } = require('../models/movie.js')
const { ActorMovie } = require('../models/actorMovies.js')
const { getAssociation, createAssociation, deleteAssociation, getActorsFromMovie, getMoviesFromActor } = require('../controllers/actorMoviesController.js')
const { Op } = require('sequelize')

async function createExampleTables() {
    await Actor.create({name: 'John', birthDate: Date.now() / 1000})
    await Actor.create({name: 'Alex', birthDate: Date.now() / 1000})

    await Movie.create({title: 'CoolMovie1', releaseDate: Date.now() / 1000})
    await Movie.create({title: 'CoolMovie2', releaseDate: Date.now() / 1000})

    await ActorMovie.create({actorId: 1, movieId: 1, role: 'Main'})
    await ActorMovie.create({actorId: 2, movieId: 2, role: 'Main'})
}

beforeAll(async () => {
    await sequelize.sync({ force: true })
    await testConnection()
    defaultTables()
    await createExampleTables()
});

test('createAssociation', () => {
    return createAssociation(1, 2, 'Secondary').then((data) => {
        expect(data).toBeDefined()
        expect(data.role).toBe('Secondary')
    })
})

test('getAssociation', () => {
    return getAssociation(1, 1, 'Main').then((data) => {
        expect(data).toBeDefined()
        expect(data.role).toBe('Main')
    })
})

test('deleteAssociation', () => {
    return deleteAssociation(1, 1, 'Main').then((data) => {
        expect(data).toBeUndefined()
    })
})

test('getActorsFromMovie', () => {
    return getActorsFromMovie(2).then((data) => {
        expect(data).toBeDefined()
        expect(data.length).toBe(1)
        expect(data[0].name).toBe('Alex')
    })
})

test('getMoviesFromActor', () => {
    return getMoviesFromActor(2).then((data) => {
        expect(data).toBeDefined()
        expect(data.length).toBe(1)
        expect(data[0].title).toBe('CoolMovie2')
    })
})

afterEach(async () => {
    await ActorMovie.destroy({where: {
        [Op.and]: [{ActorId: 1, MovieId: 2}]
    }})
})