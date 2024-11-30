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
    actorBirthDate.innerHTML = `Born on: ${new Date(birthdate * 1000).toDateString()}`
    actor.appendChild(actorBirthDate)

    actorsList.appendChild(actor)
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('dom content')
    addActorDOM('John', 1732980003)
})