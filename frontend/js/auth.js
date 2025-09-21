// Authentication API functions
const API_BASE_URL = '/api';

class AuthAPI {
    // User registration
    static async register(userData) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
            
            if (response.ok) {
                return { success: true, data: await response.json() };
            } else {
                const errorData = await response.json();
                return { success: false, errors: errorData };
            }
        } catch (error) {
            return { success: false, errors: { detail: 'Ошибка сети' } };
        }
    }
    
    // User login
    static async login(credentials) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/token/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });
            
            if (response.ok) {
                return { success: true, data: await response.json() };
            } else {
                return { success: false, errors: { detail: 'Неверный логин или пароль' } };
            }
        } catch (error) {
            return { success: false, errors: { detail: 'Ошибка сети' } };
        }
    }

    
    // Refresh access token
    static async refreshToken(refreshToken) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: refreshToken })
            });
            
            if (response.ok) {
                return { success: true, data: await response.json() };
            } else {
                return { success: false, errors: { detail: 'Не удалось обновить токен' } };
            }
        } catch (error) {
            return { success: false, errors: { detail: 'Ошибка сети' } };
        }
    }
    
    // Save tokens to localStorage
    static saveTokens(accessToken, refreshToken) {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
    }
    
    // Get tokens from localStorage
    static getTokens() {
        return {
            access: localStorage.getItem('access_token'),
            refresh: localStorage.getItem('refresh_token')
        };
    }
    
    // Clear tokens from localStorage
    static clearTokens() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }
    
    // Check if user is authenticated
    static isAuthenticated() {
        const tokens = this.getTokens();
        return !!tokens.access;
    }
}

// Export the class
export default AuthAPI;