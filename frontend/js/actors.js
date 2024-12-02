import { addItemDOM, fetchData, createItem, editItem, deleteItem, toggleVisibility, createAssociation, fetchItem, editItemDOM } from './utils.js'

const baseURL = 'http://localhost:3000/api/actors'
let currentId = -1
let editAction = -1
let associationAction = -1

function addActorDOM(actor) {
    addItemDOM(document.getElementById('actors-list'), {
        id: actor.id, 
        title: actor.name, 
        date: actor.birthDate,
        associations: actor.Movies
    }, {
        onEditForm: editFormDOM,
        onDelete: deleteActor,
        onAssociation: onMovieAdded,
        onAssociationForm: movieFormDOM,
    })
}

function onMovieAdded(parent, movie) {
    const movieItem = document.createElement('li')
    movieItem.innerHTML = `${movie.title} (${movie.ActorMovies.role})`
    parent.appendChild(movieItem)
}

async function loadData() {
    await fetchData(baseURL, (actor) => addActorDOM(actor))
    await fetchData('http://localhost:3000/api/movies', (movie) => {
        const container = document.getElementById('association-id')
        const movieOption = document.createElement('option')
        movieOption.value = movie.id
        movieOption.innerHTML = movie.title

        container.appendChild(movieOption)
    })
}

async function createActor(name, birthDate) {
    await createItem(baseURL, {
        name, birthDate
    }, (id, actor) => {
        addActorDOM({
            id, name: actor.name, birthDate: actor.birthDate
        })
    })
}

function editFormDOM(id) {
    const item = document.getElementById(`item-${id}`)
    const editForm = document.getElementById('edit-form')

    if (editAction === id) {
        toggleVisibility(editForm)
    } else {
        currentId = id
        editAction = id
        editForm.classList.remove('hidden')

        editForm.parentElement.removeChild(editForm)
        item.appendChild(editForm)

        if (editAction === associationAction) {
            toggleVisibility(document.getElementById('association-form'))
            associationAction = -1
        }
    }
}

function movieFormDOM(id) {
    const item = document.getElementById(`item-${id}`)
    const movieForm = document.getElementById('association-form')

    movieForm.parentElement.removeChild(movieForm)
    item.appendChild(movieForm)

    if (currentId === id) {
        toggleVisibility(movieForm)
    } else {
        currentId = id
        associationAction = id
        movieForm.classList.remove('hidden')

        movieForm.parentElement.removeChild(movieForm)
        item.appendChild(movieForm)

        if (editAction === associationAction) {
            toggleVisibility(document.getElementById('edit-form'))
            editAction = -1
        }
    }
}

async function editActor(id, name, birthDate) {
    await editItem(`${baseURL}/${id}`, {
        name, birthDate
    }, (actor) => editActorDOM(actor.id, actor.name, actor.birthDate))
}

async function deleteActor(id) {
    await deleteItem(`${baseURL}/${id}`, () => {
        const container = document.getElementById('actors-list')
        const actor = document.getElementById(`item-${id}`)
        container.removeChild(actor)
    })
}

function editActorDOM(id, name, birthDate) {
    const actorName = document.getElementById(`item-title-${id}`)
    actorName.innerHTML = name

    const actorBirthDate = document.getElementById(`item-date-${id}`)
    actorBirthDate.innerHTML = `${new Date(birthDate).toDateString()}`

    toggleVisibility(document.getElementById('edit-form'))
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('dom content')
    await loadData()

    const submitForm = document.getElementById('actor-submit-form')
    const actorName = document.getElementById('actor-name')
    const actorBirthDate = document.getElementById('actor-birth-date')

    submitForm.addEventListener('submit', async (ev) => {
        ev.preventDefault()
        await createActor(actorName.value, new Date(actorBirthDate.value).getTime())
    })

    const editForm = document.getElementById('edit-form')
    const editActorName = document.getElementById('edit-actor-name')
    const editActorBirthDate = document.getElementById('edit-actor-birth-date')

    editForm.addEventListener('submit', async (ev) => {
        ev.preventDefault()
        await editActor(currentId, editActorName.value, new Date(editActorBirthDate.value).getTime())
    })

    const associationForm = document.getElementById('association-form')
    const associationId = document.getElementById('association-id')
    const associationRole = document.getElementById('association-role')

    associationForm.addEventListener('submit', async (ev) => {
        ev.preventDefault()
        console.log(associationAction)
        await createAssociation({
            actorId: associationAction, 
            movieId: associationId.value,
            role: associationRole.value 
        }, async (actorMovie) => {
            toggleVisibility(document.getElementById('association-form'))
            const actor = await fetchItem(`${baseURL}/${associationAction}`)
            editItemDOM(associationAction, {
                title: actor.name,
                date: actor.birthDate,
                associations: actor.Movies
            }, onMovieAdded)
        })
    })
})