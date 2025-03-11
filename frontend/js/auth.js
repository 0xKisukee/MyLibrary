/**
 * Initialise le formulaire de connexion
 */
function initLoginForm() {
    const loginForm = document.getElementById('login-form');
    const messageDiv = document.getElementById('login-message');
    
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Réinitialiser le message
        messageDiv.className = '';
        messageDiv.textContent = '';
        
        try {
            const response = await apiRequest('/user/login', 'POST', { email, password });
            
            // Stocker le token et les infos utilisateur
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            
            // Afficher le message de succès
            messageDiv.textContent = 'Connexion réussie ! Redirection...';
            messageDiv.className = 'success-message';
            
            // Rediriger vers le tableau de bord
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
            
        } catch (error) {
            // Afficher le message d'erreur
            messageDiv.textContent = error.message || 'Erreur de connexion';
            messageDiv.className = 'error-message';
        }
    });
}

/**
 * Initialise le formulaire d'inscription
 */
function initRegisterForm() {
    const registerForm = document.getElementById('register-form');
    const messageDiv = document.getElementById('register-message');
    
    if (!registerForm) return;
    
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        // Réinitialiser le message
        messageDiv.className = '';
        messageDiv.textContent = '';
        
        // Vérifier que les mots de passe correspondent
        if (password !== confirmPassword) {
            messageDiv.textContent = 'Les mots de passe ne correspondent pas';
            messageDiv.className = 'error-message';
            return;
        }
        
        try {
            await apiRequest('/user/create', 'POST', { username, email, password });
            
            // Afficher le message de succès
            messageDiv.textContent = 'Inscription réussie ! Redirection vers la page de connexion...';
            messageDiv.className = 'success-message';
            
            // Rediriger vers la page de connexion
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
            
        } catch (error) {
            // Afficher le message d'erreur
            messageDiv.textContent = error.message || 'Erreur lors de l\'inscription';
            messageDiv.className = 'error-message';
        }
    });
}

/**
 * Vérifie le statut d'authentification de l'utilisateur
 * @param {boolean} requireAuth - Si l'authentification est requise
 * @returns {object|null} - Les informations de l'utilisateur ou null
 */
function checkAuthStatus(requireAuth = false) {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    
    // Vérifier si l'utilisateur est connecté
    if (token && userString) {
        try {
            const user = JSON.parse(userString);
            
            // Mettre à jour le menu de navigation
            updateNavigation(user);
            
            // Initialiser le lien de déconnexion
            initLogoutLink();
            
            return user;
        } catch (e) {
            console.error('Erreur lors du parsing des données utilisateur:', e);
        }
    }
    
    // Si l'authentification est requise mais l'utilisateur n'est pas connecté
    if (requireAuth) {
        window.location.href = 'login.html';
        return null;
    }
    
    return null;
}

/**
 * Met à jour la navigation en fonction du statut d'authentification
 * @param {object} user - Les informations de l'utilisateur
 */
function updateNavigation(user) {
    // Masquer les liens de connexion/inscription
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    
    if (loginLink) loginLink.style.display = 'none';
    if (registerLink) registerLink.style.display = 'none';
    
    // Afficher le lien du tableau de bord
    const dashboardLink = document.getElementById('dashboard-link');
    if (dashboardLink) dashboardLink.style.display = 'inline';
    
    // Afficher le lien d'administration si l'utilisateur est admin
    const adminLink = document.getElementById('admin-link');
    if (adminLink && user.role === 'admin') {
        adminLink.style.display = 'inline';
    }
}

/**
 * Initialise le lien de déconnexion
 */
function initLogoutLink() {
    const logoutLink = document.getElementById('logout-link');
    
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Supprimer les données d'authentification
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            // Rediriger vers la page d'accueil
            window.location.href = 'index.html';
        });
    }
}