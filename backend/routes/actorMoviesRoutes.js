const { createAssociation, getAssociation, deleteAssociation, getActorsFromMovie, getMoviesFromActor } = require('../controllers/actorMoviesController')
const express = require('express')
const router = express.Router({ mergeParams: true })

router.post('/', async (req, res) => {
    const actorMovie = await createAssociation(req.body.actorId, req.body.movieId, req.body.role)
    res.json(actorMovie)
})

router.get('/actors/:movieId', async (req, res) => {
    const actors = await getActorsFromMovie(req.params.movieId)
    if (actors === null) {
        res.status(404).send()
    } else {
        res.status(200).json(actors)
    }
})

router.get('/movies/:actorId', async (req, res) => {
    const movies = await getMoviesFromActor(req.params.actorId)
    if (movies === null) {
        res.status(404).send()
    } else {
        res.status(200).json(movies)
    }
})

module.exports = router