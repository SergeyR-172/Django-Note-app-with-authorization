// Main application file
import AuthAPI from './auth.js';
import NotesAPI from './notes.js';
import Utils from './utils.js';

document.addEventListener('DOMContentLoaded', function() {
    console.log('Application loaded');
    
    // Check if we're on the auth page
    if (document.getElementById('loginForm')) {
        initAuthPage();
    }
    
    // Check if we're on the notes page
    if (document.getElementById('notesGrid')) {
        initNotesPage();
    }
});

// Initialize authentication page
function initAuthPage() {
    console.log('Initializing auth page');
}

// Initialize notes page
function initNotesPage() {
    console.log('Initializing notes page');
}

// Export the imported classes for global access
window.AuthAPI = AuthAPI;
window.NotesAPI = NotesAPI;
window.Utils = Utils;