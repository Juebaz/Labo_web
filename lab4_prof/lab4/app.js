// On importe les méthodes CRUD de l'API qu'on a exposé dans api.js
import * as api from './api.js'

// On stock les éléments de base dans des variable pour ajouter des évènements
const tasksWrapper = document.getElementById('tasks')
const textarea = document.getElementById('name')
const saveButton = document.getElementById('save')

// On va conserver les tâche dans la variable `tasks`
let tasks = []

// La première opération est de "fetcher" les tasks et de les afficher
api.getTasks().then((response) => {
    // On sauvegarde la reponse dans notre objet tasks
    tasks = response
    // On fait le rendu de c'est tâches (c'est le coeur de notre app)
    renderTasks(tasks)
})

// Le click sur le bouton `Save` lancera la création d'une tâche
saveButton.addEventListener('click', () => {
    // Le nom de la tâche se trouve dans la valeur du textarea
    const name = textarea.value
    api.createTask(name).then((newTask) => {
        // Une fois la tache crée, on vide le textarea
        textarea.value = ''
        // On ajoute la nouvelle tache à notre liste de tâche
        tasks.push(newTask)
        // On fait le rendu de notre liste de tâche maintenant à jour
        renderTasks(tasks)
    })
})

// Rendu des tâches
const renderTasks = (tasks) => {
    // On crée un fragment https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment
    // Ceci nous permettera d'insérer les tâches une seule fois dans le DOM
    const tasksFragment = document.createDocumentFragment()
    
    // On itère sur toutes les tâches pour créer les éléments HTML qui afficheront celles-ci
    tasks.forEach((task, index) => {
        // On crée un `div` pour englobber chaque tâche
        const taskEl = document.createElement('div')
        taskEl.className = 'task'

        // On crée un textarea pour y mettre le nom de la tâche
        const textAreaEl = document.createElement('textarea')
        textAreaEl.value = task.name
        // On insère le textarea dans notre div qui englobe la tâche `taskEl`
        taskEl.appendChild(textAreaEl)

        // On crée un bouton save
        const saveButton = document.createElement('button')
        saveButton.type = 'button'
        saveButton.textContent = 'Save'
        // Lorsque cliqué, on va faire la mise à jour de la tâche
        saveButton.onclick = () => {
            // Le nouveau nom de la tâche est la valeur du textarea courant
            const name = textAreaEl.value
            api.updateTask(task.id, name).then(() => {
                // On met à jour notre liste de tâche avec le nouveau nom
                tasks[index].name = name
                // On fait le rendu de la liste de tâche mise à jour
                renderTasks(tasks)
            })
        }
        // On insère le bouton save dans notre div qui englobe la tâche `taskEl`
        taskEl.appendChild(saveButton)

        // On crée un bouton delete
        const deleteButton = document.createElement('button')
        deleteButton.type = 'button'
        deleteButton.textContent = 'Delete'
        // Lorsque cliqué, on va faire la suppression de la tâche
        deleteButton.onclick = () => {
            // On supprime la tâche
            api.deleteTask(task.id).then(() => {
                // On retire la tâche de notre liste de tâche
                tasks.splice(index, 1)
                // On fait le rendu de la liste de tâche mise à jour
                renderTasks(tasks)
            })
        }
        // On insère le bouton delete dans notre div qui englobe la tâche `taskEl`
        taskEl.appendChild(deleteButton)

        // On insère l'élément `taskEl` qui contient le textarea et les 2 boutons dans le fragment
        tasksFragment.appendChild(taskEl)
    })

    // On vide le conteneur des tâches
    tasksWrapper.innerHTML = ''
    // On lui insère le fragment qui contient les tâche mises à jour dans le DOM
    tasksWrapper.appendChild(tasksFragment);
}