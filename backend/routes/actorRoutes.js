const { createActor, getActors, getActor, updateActor, deleteActor } = require('../controllers/actorsController')
const express = require('express')
const router = express.Router({ mergeParams: true })

router.post('/', async (req, res) => {
    const actor = await createActor(req.body.name, req.body.birthDate)
    res.json(actor)
})

router.get('/', async (req, res) => {
    const actors = await getActors()
    res.json(actors)
})

router.get('/:id', async (req, res) => {
    const actor = await getActor(req.params.id)

    if (actor === null) {
        res.status(404).send()
    }
    else {
        res.status(200).json(actor)
    }   
})

router.put('/:id', async (req, res) => {
    const actor = await updateActor(req.params.id, req.body.name, req.body.birthDate)
    if (actor === null) {
        res.status(404).send()
    } else {
        res.status(200).json(actor)
    }
})

router.delete('/:id', async (req, res) => {
    await deleteActor(req.params.id)
    res.status(200).send()
})

module.exports = router