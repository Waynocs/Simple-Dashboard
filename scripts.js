document.addEventListener('DOMContentLoaded', () => {

            // HORLOGE EN TEMPS RÉEL
            const clockElement = document.getElementById('clock');

            function updateClock() {
                const now = new Date();
                // padStart(2, '0') assure que nous avons toujours deux chiffres (ex: 09 au lieu de 9)
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');
                clockElement.textContent = `${hours}:${minutes}:${seconds}`;
            }

            // Met à jour l'horloge toutes les secondes (1000 millisecondes)
            setInterval(updateClock, 1000);
            // Appelle la fonction une première fois pour ne pas avoir à attendre 1 seconde pour l'affichage initial
            updateClock();


            // TO-DO LIST INTERACTIVE
            const todoForm = document.getElementById('todo-form');
            const todoInput = document.getElementById('todo-input');
            const todoList = document.getElementById('todo-list');

            todoForm.addEventListener('submit', (event) => {
                event.preventDefault(); // Empêche le rechargement de la page
                const taskText = todoInput.value.trim();

                if (taskText !== '') {
                    addTask(taskText);
                    todoInput.value = ''; 
                    todoInput.focus();
                }
            });
            
            todoList.addEventListener('click', (event) => {
                const target = event.target; // L'élément qui a été cliqué TARGET
                
                if (target.classList.contains('delete-btn')) {
                    const listItem = target.parentElement;
                    listItem.style.opacity = '0';
                    setTimeout(() => {
                        listItem.remove();
                    }, 300);
                } 
                else if (target.tagName === 'LI' || target.tagName === 'SPAN') {
                    const listItem = target.closest('li');
                    listItem.classList.toggle('completed');
                }
            });

            // Créer et ajouter une nouvelle tâche au DOM
            function addTask(text) {
                const li = document.createElement('li');
                const span = document.createElement('span');
                span.textContent = text;
                const deleteButton = document.createElement('button');
                deleteButton.textContent = '×';
                deleteButton.className = 'delete-btn';
                deleteButton.title = 'Supprimer la tâche';
                li.appendChild(span);
                li.appendChild(deleteButton);
                todoList.appendChild(li);
            }


            // WIDGET "INSPIRATION"
            const quoteContainer = document.getElementById('quote-container');
            const quoteApiUrl = 'https://dummyjson.com/quotes/random';

            // Fonct. asynchrone pour récupérer et afficher une citation
            async function fetchQuote() {
                try {
                    const response = await fetch(quoteApiUrl);
                    if (!response.ok) {
                        throw new Error(`Erreur HTTP: ${response.status}`);
                    }
                    const data = await response.json();
                                        
                    const author = data.author || 'Auteur inconnu';

                    // Remplace le message de chargement par la citation
                    quoteContainer.innerHTML = `
                        <blockquote>${data.quote}</blockquote>
                        <figcaption>— ${author}</figcaption>
                    `;
                } catch (error) {
                    console.error("Impossible de récupérer la citation:", error);
                    // Affiche un message d'erreur à l'utilisateur
                    quoteContainer.innerHTML = `<p class="quote-loading">Impossible de charger une citation pour le moment.</p>`;
                }
            }

            // Appelle la fonction pour charger la citation au démarrage
            fetchQuote();
        });