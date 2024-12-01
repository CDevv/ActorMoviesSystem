const { createMovie, getMovies, getMovie, updateMovie, deleteMovie } = require('../controllers/moviesController')
const express = require('express')
const router = express.Router({ mergeParams: true })

router.post('/', async (req, res) => {
    const movie = await createMovie(req.body.title, req.body.releaseDate)
    res.json(movie)
})

router.get('/', async (req, res) => {
    const movies = await getMovies()
    res.json(movies)
})

router.get('/:id', async (req, res) => {
    const movie = await getMovie(req.params.id)
    if (movie === null) {
        res.status(404).send()
    } else {
        res.status(200).json(movie)
    }
})

router.put('/:id', async (req, res) => {
    const movie = await updateMovie(req.params.id, req.body.title, req.body.releaseDate)
    if (movie === null) {
        res.status(404).send()
    } else {
        res.status(200).json(movie)
    }
})

router.delete('/:id', async(req, res) => {
    await deleteMovie(req.params.id)
    res.status(200).send()
})

module.exports = router