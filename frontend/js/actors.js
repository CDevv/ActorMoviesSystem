function addActorDOM(name, birthdate)
{
    const actorsList = document.getElementById('actors-list')

    const actor = document.createElement('div')
    actor.className = 'bg-gray-900 p-4 rounded-lg'

    const actorName = document.createElement('h1')
    actorName.className = 'text-xl'
    actorName.innerHTML = name
    actor.appendChild(actorName)

    const actorBirthDate = document.createElement('p')
    actorBirthDate.innerHTML = `Born on: ${new Date(birthdate).toDateString()}`
    actor.appendChild(actorBirthDate)

    actorsList.appendChild(actor)
}

async function fetchData() {
    const res = await fetch('http://localhost:3000/api/actors')
    const actors = await res.json()

    for (const actor of actors) {
        addActorDOM(actor.name, actor.birthDate)
    }
}

async function createActor(name, birthDate) {
    const res = await fetch('http://localhost:3000/api/actors', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, birthDate
        })
    })
    const actor = await res.json()

    if (actor !== null) {
        addActorDOM(name, birthDate)
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('dom content')
    await fetchData()

    const submitForm = document.getElementById('actor-submit-form')
    const actorName = document.getElementById('actor-name')
    const actorBirthDate = document.getElementById('actor-birth-date')

    submitForm.addEventListener('submit', async (ev) => {
        ev.preventDefault()
        console.log(new Date(actorBirthDate.value).getTime())
        await createActor(actorName.value, new Date(actorBirthDate.value).getTime())
    })
})