// Notes API functions
const API_BASE_URL = '/api';

class NotesAPI {
    // Get authentication headers
    static getAuthHeaders() {
        const accessToken = localStorage.getItem('access_token');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        };
    }
    
    // Load all notes
    static async loadNotes() {
        try {
            const response = await fetch(`${API_BASE_URL}/notes/`, {
                headers: this.getAuthHeaders()
            });
            
            if (response.ok) {
                return { success: true, data: await response.json() };
            } else if (response.status === 401) {
                return { success: false, error: 'unauthorized' };
            } else {
                return { success: false, error: 'failed_to_load' };
            }
        } catch (error) {
            return { success: false, error: 'network_error' };
        }
    }
    
    // Create a new note
    static async createNote(noteData) {
        try {
            const response = await fetch(`${API_BASE_URL}/notes/`, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: JSON.stringify(noteData)
            });
            
            if (response.ok) {
                return { success: true, data: await response.json() };
            } else if (response.status === 401) {
                return { success: false, error: 'unauthorized' };
            } else {
                return { success: false, error: 'failed_to_create' };
            }
        } catch (error) {
            return { success: false, error: 'network_error' };
        }
    }
    
    // Update a note
    static async updateNote(noteId, noteData) {
        try {
            const response = await fetch(`${API_BASE_URL}/notes/${noteId}/`, {
                method: 'PUT',
                headers: this.getAuthHeaders(),
                body: JSON.stringify(noteData)
            });
            
            if (response.ok) {
                return { success: true, data: await response.json() };
            } else if (response.status === 401) {
                return { success: false, error: 'unauthorized' };
            } else {
                return { success: false, error: 'failed_to_update' };
            }
        } catch (error) {
            return { success: false, error: 'network_error' };
        }
    }
    
    // Delete a note
    static async deleteNote(noteId) {
        try {
            const response = await fetch(`${API_BASE_URL}/notes/${noteId}/`, {
                method: 'DELETE',
                headers: this.getAuthHeaders()
            });
            
            if (response.ok) {
                return { success: true };
            } else if (response.status === 401) {
                return { success: false, error: 'unauthorized' };
            } else {
                return { success: false, error: 'failed_to_delete' };
            }
        } catch (error) {
            return { success: false, error: 'network_error' };
        }
    }
}

// Export the class
export default NotesAPI;