const { Actor } = require('../models/actor')
const { Movie } = require('../models/movie')
const { ActorMovie } = require('../models/actorMovies')
const { Op, where } = require("sequelize");

async function createAssociation(actorId, movieId, role) {
    const actorMovie = await ActorMovie.create({
        actorId, movieId, role
    })
    return actorMovie
}

async function getAssociation(actorId, movieId, role) {
    const actorMovie = await ActorMovie.findOne({
        where: {actorId, movieId, role}
    })
    return actorMovie
}

async function deleteAssociation(actorId, movieId, role) {
    await ActorMovie.destroy({
        where: {actorId, movieId, role}
    })
}

async function getActorsFromMovie(movieId) {
    const actorMovies = await ActorMovie.findAll({where: {movieId}})
    let ids = []
    for (const element of actorMovies) {
        ids.push(element.actorId)
    }
    const actors = await Actor.findAll({
        where: {
            id: {
                [Op.in]: ids
            }
        }
    })
    return actors
}

async function getMoviesFromActor(actorId) {
    const actorMovies = await ActorMovie.findAll({where: {actorId}})
    let ids = []
    for (const element of actorMovies) {
        ids.push(element.movieId)
    }
    const movies = await Movie.findAll({
        where: {
            id: {
                [Op.in]: ids
            }
        }
    })
    return movies
}

module.exports = {createAssociation, getAssociation, deleteAssociation, getActorsFromMovie, getMoviesFromActor}