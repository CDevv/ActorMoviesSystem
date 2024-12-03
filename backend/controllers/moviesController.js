const { Movie } = require('../models/movie')
const { Actor } = require('../models/actor')
const { ActorMovie } = require('../models/actorMovies')

async function createMovie(title, releaseDate) {
    const movie = await Movie.create({
        title, releaseDate
    })
    return movie
}

async function getMovies() {
    const movies = await Movie.findAll({ include: [
        {
            model: Actor,
            through: {
                attributes: ['role']
            }
        }
    ]})
    return movies
}

async function getMovie(id) {
    const movie = await Movie.findOne({
        where: {id},
        include: [{
            model: Actor,
            through: {
                attributes: ['role']
            }
        }]
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
    const updatedMovie = await getMovie(id)
    return updatedMovie
}

async function deleteMovie(id) {
    await ActorMovie.destroy({
        where: {movieId: id}
    })
    await Movie.destroy({
        where: {id}
    })
}

module.exports = {createMovie, getMovies, getMovie, updateMovie, deleteMovie}