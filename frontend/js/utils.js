// Utility functions
class Utils {
    // Format date to readable format
    static formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU');
    }
    
    // Get category class for styling
    static getCategoryClass(category) {
        switch (category) {
            case 'Личное':
                return 'tag-personal';
            case 'Идеи':
                return 'tag-ideas';
            case 'Важное':
                return 'tag-important';
            default:
                return 'tag-work';
        }
    }
    
    // Show error message
    static showError(message, containerId = 'errorMessage') {
        const container = document.getElementById(containerId);
        if (container) {
            container.querySelector('span').textContent = message;
            container.classList.remove('hidden');
            setTimeout(() => {
                container.classList.add('hidden');
            }, 5000);
        }
    }
    
    // Show success message
    static showSuccess(message, containerId = 'successMessage') {
        const container = document.getElementById(containerId);
        if (container) {
            container.querySelector('span').textContent = message;
            container.classList.remove('hidden');
            setTimeout(() => {
                container.classList.add('hidden');
            }, 5000);
        }
    }
    
    // Toggle loading state
    static toggleLoading(show, containerId = 'loadingIndicator') {
        const container = document.getElementById(containerId);
        if (container) {
            if (show) {
                container.classList.remove('hidden');
            } else {
                container.classList.add('hidden');
            }
        }
    }
}

// Export the class
export default Utils;