const { Movie } = require('../models/movie')

async function createMovie(title, releaseDate) {
    const movie = await Movie.create({
        title, releaseDate
    })
    return movie.id
}

async function getMovies() {
    const movies = await Movie.findAll()
    return movies
}

async function getMovie(id) {
    const movie = await Movie.findOne({
        where: {id}
    })
    return movie
}

async function updateMovie(id, title, releaseDate) {
    await Movie.update(
        { title, releaseDate },
        {
            where: {id}
        }
    )
}

async function deleteMovie(id) {
    await Movie.destroy({
        where: {id}
    })
}

module.exports = {createMovie, getMovies, getMovie, updateMovie, deleteMovie}