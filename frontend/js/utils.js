function addItemDOM(parent, itemBody, options) {
    const item = document.createElement('div')
    item.id = `item-${itemBody.id}`
    item.className = 'bg-gray-900 p-4 rounded-lg'

    const itemTitle = document.createElement('h1')
    itemTitle.id = `item-title-${itemBody.id}`
    itemTitle.className = 'text-xl'
    itemTitle.innerHTML = itemBody.title
    item.appendChild(itemTitle)

    const itemDate = document.createElement('p')
    itemDate.id = `item-date-${itemBody.id}`
    itemDate.innerHTML = `${new Date(itemBody.date).toDateString()}`
    item.appendChild(itemDate)

    const associationContainer = document.createElement('ol')
    associationContainer.id = `association-${itemBody.id}`

    if (itemBody.associations) {
        for (const element of itemBody.associations) {
            options.onAssociation(associationContainer, element)
        }
    }
    
    item.appendChild(associationContainer)

    const actionsContainer = document.createElement('div')
    actionsContainer.className = 'flex flex-row gap-4'
    item.appendChild(actionsContainer)

    const addAssociation = document.createElement('button')
    addAssociation.innerHTML = 'Add Movie'
    addAssociation.className = 'bg-gray-800 p-2 rounded-lg'
    addAssociation.addEventListener('click', () => options.onAssociationForm(itemBody.id))
    actionsContainer.appendChild(addAssociation)

    const editAction = document.createElement('button')
    editAction.innerHTML = 'Edit'
    editAction.className = 'bg-gray-800 p-2 rounded-lg'
    editAction.addEventListener('click', () => options.onEditForm(itemBody.id))
    actionsContainer.appendChild(editAction)

    const deleteAction = document.createElement('button')
    deleteAction.innerHTML = 'Delete'
    deleteAction.className = 'bg-gray-800 p-2 rounded-lg'
    deleteAction.addEventListener('click', () => options.onDelete(itemBody.id))
    actionsContainer.appendChild(deleteAction)

    parent.appendChild(item)
}

function editItemDOM(id, itemBody, addAssociationFunc) {
    const itemTitle = document.getElementById(`item-title-${id}`)
    itemTitle.innerHTML = itemBody.title

    const itemDate = document.getElementById(`item-date-${id}`)
    itemDate.innerHTML = `${new Date(itemBody.date).toDateString()}`

    const associationContainer = document.getElementById(`association-${id}`)
    associationContainer.innerHTML = ' '

    for (const element of itemBody.associations) {
        addAssociationFunc(associationContainer, element)
    }
}

async function fetchItem(url) {
    const res = await fetch(url)
    const item = await res.json()
    return item
}

async function fetchData(url, onEachFunc) {
    const res = await fetch(url)
    const actors = await res.json()

    for (const actor of actors) {
        onEachFunc(actor)
    }
}

async function createItem(url, body, onSuccess) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    const item = await res.json()

    if (item !== null) {
        onSuccess(item, body)
    }
}

async function editItem(url, body, onSuccess) {
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    const item = await res.json()

    if (item !== null) {
        onSuccess(item)
    }
}

async function deleteItem(url, onSuccess) {
    await fetch(url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    onSuccess()
}

const associationsURL = 'http://localhost:3000/api/actorMovies'
async function createAssociation(body, onSuccess) {
    const res = await fetch(associationsURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    const actorMovie = await res.json()

    if (actorMovie !== null) {
        onSuccess(actorMovie)
    }
}

function toggleVisibility(element) {
    if (element.classList.contains('hidden')) {
        element.classList.remove('hidden')
    }
    else {
        element.classList.add('hidden')
    }
}

export { createItem, fetchData, fetchItem, addItemDOM, editItemDOM, editItem, deleteItem, createAssociation, toggleVisibility }