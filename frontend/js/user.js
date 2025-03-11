/**
 * Charge l'étagère de l'utilisateur
 * @param {string} userId - L'ID de l'utilisateur
 */
async function loadUserShelf(userId) {
    const shelfContainer = document.getElementById('shelf-container');
    
    if (!shelfContainer) return;
    
    try {
        // Récupérer l'étagère de l'utilisateur
        const response = await apiRequest(`/user/${userId}/shelf`, 'GET', null, true);
        
        // Vérifier si des livres ont été trouvés
        if (!response || response.length === 0) {
            shelfContainer.innerHTML = '<p>Votre étagère est vide. Ajoutez des livres depuis la liste des livres disponibles.</p>';
            return;
        }
        
        // Vider le conteneur
        shelfContainer.innerHTML = '';
        
        // Afficher chaque livre
        response.forEach(book => {
            const bookCard = createShelfBookCard(book, userId);
            shelfContainer.appendChild(bookCard);
        });
        
    } catch (error) {
        shelfContainer.innerHTML = `<p class="error-message">Erreur lors du chargement de votre étagère: ${error.message}</p>`;
    }
}

/**
 * Crée un élément HTML pour un livre dans l'étagère
 * @param {object} book - Les informations du livre
 * @param {string} userId - L'ID de l'utilisateur
 * @returns {HTMLElement} - L'élément créé
 */
function createShelfBookCard(book, userId) {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.dataset.bookId = book._id || book.id;
    
    const title = document.createElement('h3');
    title.className = 'book-title';
    title.textContent = book.title;
    
    const author = document.createElement('p');
    author.className = 'book-author';
    author.textContent = `Par ${book.author}`;
    
    const description = document.createElement('p');
    description.className = 'book-description';
    description.textContent = book.description || 'Aucune description disponible.';
    
    const meta = document.createElement('div');
    meta.className = 'book-meta';
    meta.innerHTML = `
        <span>Genre: ${book.genre || 'Non spécifié'}</span>
        <span>Année: ${book.publicationYear || 'Non spécifiée'}</span>
    `;
    
    // Ajouter les éléments au card
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(description);
    bookCard.appendChild(meta);
    
    // Ajouter un bouton pour retirer de l'étagère
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-from-shelf-btn';
    removeButton.textContent = 'Retirer de mon étagère';
    removeButton.addEventListener('click', () => removeBookFromShelf(book._id || book.id, userId));
    
    bookCard.appendChild(removeButton);
    
    return bookCard;
}

/**
 * Retire un livre de l'étagère de l'utilisateur
 * @param {string} bookId - L'ID du livre
 * @param {string} userId - L'ID de l'utilisateur
 */
async function removeBookFromShelf(bookId, userId) {
    // Note: Cette fonctionnalité n'existe pas encore dans votre API
    // Vous devrez l'ajouter côté serveur
    
    try {
        // Exemple d'implémentation (à adapter selon votre API)
        // await apiRequest(`/user/${userId}/removeBookFromShelf/${bookId}`, 'DELETE', null, true);
        
        alert('Cette fonctionnalité n\'est pas encore implémentée dans votre API.');
        
        // Si la fonctionnalité est implémentée, vous pourriez recharger l'étagère
        // loadUserShelf(userId);
    } catch (error) {
        alert(`Erreur lors du retrait du livre: ${error.message}`);
    }
}

/**
 * Charge la liste des utilisateurs (pour les admins)
 * Cette fonctionnalité n'est pas encore implémentée dans votre API
 */
async function loadUsers() {
    const usersContainer = document.getElementById('users-container');
    
    if (!usersContainer) return;
    
    // Afficher un message indiquant que cette fonctionnalité n'est pas encore disponible
    usersContainer.innerHTML = '<p>La gestion des utilisateurs n\'est pas encore implémentée.</p>';
    
    // Exemple d'implémentation future
    /*
    try {
        // Récupérer tous les utilisateurs
        const users = await apiRequest('/admin/users', 'GET', null, true);
        
        // Vérifier si des utilisateurs ont été trouvés
        if (!users || users.length === 0) {
            usersContainer.innerHTML = '<p>Aucun utilisateur trouvé.</p>';
            return;
        }
        
        // Vider le conteneur
        usersContainer.innerHTML = '';
        
        // Créer un tableau pour afficher les utilisateurs
        const table = document.createElement('table');
        table.className = 'users-table';
        
        // Créer l'en-tête du tableau
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Nom d'utilisateur</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Actions</th>
            </tr>
        `;
        
        // Créer le corps du tableau
        const tbody = document.createElement('tbody');
        
        // Ajouter chaque utilisateur
        users.forEach(user => {
            const tr = document.createElement('tr');
            
            // Créer les cellules
            tr.innerHTML = `
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <button class="promote-btn" data-user-id="${user._id}">
                        ${user.role === 'admin' ? 'Rétrograder' : 'Promouvoir'}
                    </button>
                </td>
            `;
            
            tbody.appendChild(tr);
        });
        
        // Assembler le tableau
        table.appendChild(thead);
        table.appendChild(tbody);
        usersContainer.appendChild(table);
        
        // Ajouter les écouteurs d'événements pour les boutons
        const promoteButtons = document.querySelectorAll('.promote-btn');
        promoteButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const userId = button.dataset.userId;
                const newRole = button.textContent.trim() === 'Promouvoir' ? 'admin' : 'user';
                
                try {
                    await apiRequest(`/user/${userId}/role`, 'PATCH', { role: newRole }, true);
                    loadUsers(); // Recharger la liste
                } catch (error) {
                    alert(`Erreur: ${error.message}`);
                }
            });
        });
        
    } catch (error) {
        usersContainer.innerHTML = `<p class="error-message">Erreur lors du chargement des utilisateurs: ${error.message}</p>`;
    }
    */
}