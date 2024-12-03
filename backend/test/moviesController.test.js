const { sequelize, testConnection } = require('../config/sequelize.js')
const { defaultTables } = require('../config/sqlite.js')
const { createMovie, getMovie, getMovies, updateMovie, deleteMovie } = require('../controllers/moviesController.js')

const { Movie } = require('../models/movie.js')

async function createExampleTables() {
    await Movie.create({title: 'CoolMovie1', releaseDate: Date.now() / 1000})
    await Movie.create({title: 'CoolMovie2', releaseDate: Date.now() / 1000})
}

beforeAll(async () => {
    await sequelize.sync({ force: true });
    await testConnection()
    defaultTables()
    await createExampleTables()
});

test('createMovie', () => {
    return createMovie('ExampleMovie', Date.now() / 1000).then((data) => {
        expect(data).toBeDefined()
        expect(data.id).toBe(3)
    })
})

test('getMovie', () => {
    return getMovie(1).then((data) => {
        expect(data).toBeDefined()
        expect(data.title).toBe('CoolMovie1')
    })
})

test('getMovies', () => {
    return getMovies().then((data) => {
        expect(data).toBeDefined()
        expect(data.length).toBe(2)
    })
})

test('updateMovie', () => {
    return updateMovie(2, 'UpdatedMovie', Date.now() / 1000).then((data) => {
        expect(data).toBeDefined()
        expect(data.title).toBe('UpdatedMovie')
    })
})
/*
test('deleteMovie', () => {
    return deleteMovie(2).then((data) => {
        expect(data).toBeUndefined()
    })
})
*/

afterEach(async () => {
    await Movie.destroy({where: {id: 3}})
})