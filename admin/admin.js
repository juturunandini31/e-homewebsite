// Shared admin JS: authentication and simple localStorage-based blog/gallery management

function login(user, pass){
  // hard-coded credentials (for demo only)
  if(user === 'admin' && pass === 'admin123'){
    sessionStorage.setItem('adminLoggedIn','true');
    return true;
  }
  return false;
}

function requireAuth(){
  if(sessionStorage.getItem('adminLoggedIn') !== 'true'){
    location.href = 'login.html';
  }
}

function logout(){
  sessionStorage.removeItem('adminLoggedIn');
  location.href = 'login.html';
}

// Enhanced Blog helpers
function saveBlogPost(title, content, image, author, description, date, id = null){
  const key = 'admin_blog_posts';
  const arr = JSON.parse(localStorage.getItem(key) || '[]');
  
  if (id) {
    // Update existing post
    const index = arr.findIndex(p => p.id === id);
    if (index !== -1) {
      arr[index] = {
        ...arr[index],
        title, 
        content, 
        image: image || arr[index].image, 
        author, 
        description, 
        date, 
        updatedAt: new Date().toISOString()
      };
    }
  } else {
    // Create new post
    const newPost = {
      id: Date.now(),
      title,
      content,
      image: image || 'assets/imgs/default-blog.jpg',
      author: author || 'Admin',
      description,
      date,
      createdAt: new Date().toISOString()
    };
    arr.unshift(newPost); // Add to beginning for newest first
  }
  
  localStorage.setItem(key, JSON.stringify(arr));
}

function getBlogPosts(){
  const posts = JSON.parse(localStorage.getItem('admin_blog_posts') || '[]');
  // Sort by creation date, newest first
  return posts.sort((a, b) => {
    const dateA = new Date(a.createdAt || a.date);
    const dateB = new Date(b.createdAt || b.date);
    return dateB - dateA;
  });
}

function getBlogPost(id){
  const posts = getBlogPosts();
  return posts.find(p => p.id === parseInt(id));
}

function deleteBlogPost(id){
  const key = 'admin_blog_posts';
  let arr = getBlogPosts();
  arr = arr.filter(p => p.id !== parseInt(id));
  localStorage.setItem(key, JSON.stringify(arr));
}

// Image upload helper
function handleImageUpload(file, callback) {
  if (!file) return callback(null);
  
  const reader = new FileReader();
  reader.onload = function(e) {
    callback(e.target.result);
  };
  reader.readAsDataURL(file);
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

// Generate blog slug from title
function generateSlug(title) {
  return title.toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Gallery helpers (store image URLs + caption)
function saveGalleryItem(url, caption){
  const key = 'admin_gallery_items';
  const arr = JSON.parse(localStorage.getItem(key) || '[]');
  arr.unshift({id:Date.now(),url,caption});
  localStorage.setItem(key,JSON.stringify(arr));
}

function getGalleryItems(){
  return JSON.parse(localStorage.getItem('admin_gallery_items') || '[]');
}

function deleteGalleryItem(id){
  let arr = getGalleryItems();
  arr = arr.filter(i => i.id !== id);
  localStorage.setItem('admin_gallery_items',JSON.stringify(arr));
}

// Small util: create element from HTML
function el(html){
  const div = document.createElement('div');
  div.innerHTML = html.trim();
  return div.firstChild;
}
