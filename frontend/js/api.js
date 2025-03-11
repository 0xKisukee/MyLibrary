// Configuration de l'API
const API_BASE_URL = 'http://localhost:3000/api'; // À ajuster selon votre configuration

/**
 * Fonction utilitaire pour effectuer des requêtes API
 * @param {string} endpoint - Le chemin de l'API
 * @param {string} method - La méthode HTTP (GET, POST, etc.)
 * @param {object} data - Les données à envoyer (optionnel)
 * @param {boolean} requiresAuth - Si la requête nécessite une authentification
 * @returns {Promise} - La promesse avec les données de réponse
 */
async function apiRequest(endpoint, method = 'GET', data = null, requiresAuth = false) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers = {
        'Content-Type': 'application/json'
    };
    
    // Ajouter le token d'authentification si nécessaire
    if (requiresAuth) {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authentification requise');
        }
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    const options = {
        method,
        headers,
        credentials: 'include' // Pour supporter les cookies de session si nécessaire
    };
    
    // Ajouter le corps de la requête si des données sont fournies
    if (data) {
        options.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(url, options);
        
        // Vérifier si la réponse est OK
        if (!response.ok) {
            // Si le statut est 401, c'est un problème d'authentification
            if (response.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                throw new Error('Session expirée, veuillez vous reconnecter');
            }
            
            // Sinon, on traite l'erreur générique
            const errorData = await response.json();
            throw new Error(errorData.message || 'Une erreur est survenue');
        }
        
        // Vérifier si la réponse est vide
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        } else {
            return {};
        }
    } catch (error) {
        console.error('Erreur API:', error);
        throw error;
    }
}