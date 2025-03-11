/**
 * Charge tous les livres disponibles
 */
async function loadAllBooks() {
    const booksContainer = document.getElementById('books-container');
    
    if (!booksContainer) return;
    
    try {        
        // Récupérer tous les livres
        const books = await apiRequest('/book/all', 'GET', null, true);
        
        // Vérifier si des livres ont été trouvés
        if (!books || books.length === 0) {
            booksContainer.innerHTML = '<p>Aucun livre disponible pour le moment.</p>';
            return;
        }
        
        // Vider le conteneur
        booksContainer.innerHTML = '';
        
        // Récupérer l'utilisateur connecté
        const userString = localStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : null;
        
        // Afficher chaque livre
        books.forEach(book => {
            const bookCard = createBookCard(book, user);
            booksContainer.appendChild(bookCard);
        });
        
    } catch (error) {
        booksContainer.innerHTML = `<p class="error-message">Erreur lors du chargement des livres: ${error.message}</p>`;
    }
}

/**
 * Crée un élément HTML pour un livre
 * @param {object} book - Les informations du livre
 * @param {object} user - Les informations de l'utilisateur (optionnel)
 * @returns {HTMLElement} - L'élément créé
 */
function createBookCard(book, user = null) {
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
    
    // Ajouter un bouton pour ajouter à l'étagère si l'utilisateur est connecté
    if (user) {
        const addButton = document.createElement('button');
        addButton.className = 'add-to-shelf-btn';
        addButton.textContent = 'Ajouter à mon étagère';
        addButton.addEventListener('click', () => addBookToShelf(book._id || book.id, user.userId));
        
        bookCard.appendChild(addButton);
    }
    
    return bookCard;
}

/**
 * Ajoute un livre à l'étagère de l'utilisateur
 * @param {string} bookId - L'ID du livre
 * @param {string} userId - L'ID de l'utilisateur
 */
async function addBookToShelf(bookId, userId) {
    try {
        await apiRequest(`/user/${userId}/addBookToShelf/${bookId}`, 'POST', null, true);
        
        alert('Livre ajouté à votre étagère avec succès !');
        
        // Recharger l'étagère si on est sur la page dashboard
        if (window.location.pathname.includes('dashboard')) {
            loadUserShelf(userId);
        }
    } catch (error) {
        alert(`Erreur lors de l'ajout du livre: ${error.message}`);
    }
}

/**
 * Initialise le formulaire d'ajout de livre (pour les admins)
 */
function initAddBookForm() {
    const addBookForm = document.getElementById('add-book-form');
    const messageDiv = document.getElementById('add-book-message');
    
    if (!addBookForm) return;
    
    addBookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const genre = document.getElementById('genre').value;
        const publicationYear = document.getElementById('publication-year').value;
        const description = document.getElementById('description').value;
        
        // Réinitialiser le message
        messageDiv.className = '';
        messageDiv.textContent = '';
        
        try {
            await apiRequest('/book/create', 'POST', {
                title,
                author,
                year: parseInt(publicationYear),
            }, true);
            
            // Afficher le message de succès
            messageDiv.textContent = 'Livre ajouté avec succès !';
            messageDiv.className = 'success-message';
            
            // Réinitialiser le formulaire
            addBookForm.reset();
            
        } catch (error) {
            // Afficher le message d'erreur
            messageDiv.textContent = error.message || 'Erreur lors de l\'ajout du livre';
            messageDiv.className = 'error-message';
        }
    });
}