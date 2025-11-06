/**
 * API Client for Admin Panel
 * Connects to PHP backend API for remote server operations
 */

// API Configuration
const API_BASE = '../api';
const API_ENDPOINTS = {
    blogs: `${API_BASE}/blogs.php`,
    gallery: `${API_BASE}/gallery.php`
};

// Authentication
const AUTH_KEY = 'adminAuth';

// API Helper Functions
async function apiCall(endpoint, method = 'GET', data = null) {
    try {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (data && method !== 'GET') {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(endpoint, options);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || `HTTP error! status: ${response.status}`);
        }

        return result;
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

// Authentication Functions (updated for server-side)
function login(username, password) {
    // For now, use enhanced hardcoded credentials
    // In production, this should call a PHP authentication endpoint
    if (username === 'ehome' && password === 'ehome@123') {
        sessionStorage.setItem(AUTH_KEY, 'true');
        sessionStorage.setItem('adminUser', username);
        return true;
    }
    return false;
}

function requireAuth() {
    if (sessionStorage.getItem(AUTH_KEY) !== 'true') {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function logout() {
    sessionStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem('adminUser');
    window.location.href = 'login.html';
}

// Blog API Functions
async function getBlogPosts() {
    try {
        const posts = await apiCall(API_ENDPOINTS.blogs, 'GET');
        return Array.isArray(posts) ? posts : [];
    } catch (error) {
        console.error('Failed to fetch blog posts:', error);
        return [];
    }
}

async function getBlogPost(id) {
    try {
        const posts = await getBlogPosts();
        return posts.find(post => post.id === parseInt(id));
    } catch (error) {
        console.error('Failed to fetch blog post:', error);
        return null;
    }
}

async function saveBlogPost(title, content, imageData = '', author = 'Admin', description = '', date = null, id = null) {
    try {
        const postData = {
            title,
            content,
            imageData,
            author: author || 'Admin',
            description,
            date: date || new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })
        };

        if (id) {
            // Update existing post
            postData.id = id;
            const response = await apiCall(API_ENDPOINTS.blogs, 'PUT', postData);
            return response;
        } else {
            // Create new post
            const response = await apiCall(API_ENDPOINTS.blogs, 'POST', postData);
            return response;
        }
    } catch (error) {
        console.error('Failed to save blog post:', error);
        throw error;
    }
}

async function deleteBlogPost(id) {
    try {
        const response = await apiCall(`${API_ENDPOINTS.blogs}?id=${id}`, 'DELETE');
        return response;
    } catch (error) {
        console.error('Failed to delete blog post:', error);
        throw error;
    }
}

// Gallery API Functions
async function getGalleryItems() {
    try {
        const items = await apiCall(API_ENDPOINTS.gallery, 'GET');
        return Array.isArray(items) ? items : [];
    } catch (error) {
        console.error('Failed to fetch gallery items:', error);
        return [];
    }
}

async function saveGalleryItem(caption, imageData, id = null) {
    try {
        const itemData = {
            caption,
            imageData,
            category: 'Professional Cleaning'
        };

        if (id) {
            // Update existing item
            itemData.id = id;
            const response = await apiCall(API_ENDPOINTS.gallery, 'PUT', itemData);
            return response;
        } else {
            // Create new item
            const response = await apiCall(API_ENDPOINTS.gallery, 'POST', itemData);
            return response;
        }
    } catch (error) {
        console.error('Failed to save gallery item:', error);
        throw error;
    }
}

async function deleteGalleryItem(id) {
    try {
        const response = await apiCall(`${API_ENDPOINTS.gallery}?id=${id}`, 'DELETE');
        return response;
    } catch (error) {
        console.error('Failed to delete gallery item:', error);
        throw error;
    }
}

// Utility Functions
function handleImageUpload(file, callback) {
    if (!file) return callback(null);
    
    const reader = new FileReader();
    reader.onload = function(e) {
        callback(e.target.result);
    };
    reader.onerror = function() {
        callback(null);
    };
    reader.readAsDataURL(file);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function generateSlug(title) {
    return title.toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
        color: white;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Export functions for use in admin pages
window.AdminAPI = {
    // Auth functions
    login,
    requireAuth,
    logout,
    
    // Blog functions
    getBlogPosts,
    getBlogPost,
    saveBlogPost,
    deleteBlogPost,
    
    // Gallery functions
    getGalleryItems,
    saveGalleryItem,
    deleteGalleryItem,
    
    // Utility functions
    handleImageUpload,
    formatDate,
    generateSlug,
    showNotification
};