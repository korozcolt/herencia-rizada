import credentials from '../config/credentials.js';

const WPApi = {
    config: {
        baseURL: credentials.wpApi.baseURL,
        // Estas credenciales deberían venir de variables de entorno o un sistema de gestión segura
        auth: {
            key: credentials.wpApi.authKey // Esto NO debe estar aquí en producción
        }
    },

    // Headers comunes para todas las peticiones
    getHeaders() {
        return {
            'Authorization': `Basic ${this.config.auth.key}`,
            'Content-Type': 'application/json'
        }
    },

    // Métodos de autenticación
    // Dentro del objeto auth en WPApi
    auth: {
        async checkAuth() {
            try {
                const response = await fetch(`${WPApi.config.baseURL}/users/me`, {
                    headers: WPApi.getHeaders()
                });
                
                if (!response.ok) {
                    return {
                        isAuthenticated: false,
                        error: 'No autenticado'
                    };
                }

                const userData = await response.json();
                return {
                    isAuthenticated: true,
                    user: userData
                };
            } catch (error) {
                console.error('Auth check failed:', error);
                return {
                    isAuthenticated: false,
                    error: error.message
                };
            }
        }
    },

    // Métodos para posts
    posts: {
        async getAll() {
            try {
                const response = await fetch(`${WPApi.config.baseURL}/posts`, {
                    headers: WPApi.getHeaders()
                });
                return await response.json();
            } catch (error) {
                console.error('Get posts failed:', error);
                throw error;
            }
        },

        async getById(id) {
            try {
                const response = await fetch(`${WPApi.config.baseURL}/posts/${id}`, {
                    headers: WPApi.getHeaders()
                });
                return await response.json();
            } catch (error) {
                console.error('Get post failed:', error);
                throw error;
            }
        }
    },

    // Métodos para usuarios
    users: {
        async getCurrent() {
            try {
                const response = await fetch(`${WPApi.config.baseURL}/users/me`, {
                    headers: WPApi.getHeaders()
                });
                return await response.json();
            } catch (error) {
                console.error('Get current user failed:', error);
                throw error;
            }
        }
    }
};

export default WPApi;