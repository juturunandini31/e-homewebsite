# Remote Server Setup Guide for eHome Admin Panel

## Overview
This guide explains how to set up the admin panel on your remote server, switching from localStorage to the PHP API backend for persistent storage across devices.

## ✅ What's Already Done
- ✅ Created API client (`admin/api-client.js`) for server communication
- ✅ Updated login system with secure credentials
- ✅ Created new API-based admin pages:
  - `admin/blogadmin-api.html` - Blog management with server storage
  - `admin/gallery-api.html` - Gallery management with server storage
- ✅ Updated dashboard to use new API-based pages

## 🔧 Server Requirements
- PHP 7.4 or higher
- Web server (Apache/Nginx)
- Write permissions for `api/data/` directory

## 📋 Setup Steps

### 1. Upload Files to Server
Upload all files to your remote server maintaining the same directory structure:
```
/public_html/
├── index.html
├── admin/
│   ├── login.html
│   ├── dashboard.html
│   ├── api-client.js (NEW)
│   ├── blogadmin-api.html (NEW)
│   └── gallery-api.html (NEW)
├── api/
│   ├── config.php
│   ├── blogs.php
│   └── gallery.php
└── assets/
    ├── css/
    ├── js/
    └── img/
```

### 2. Set Permissions
Make sure the API data directory is writable:
```bash
chmod 755 api/data/
# or
chmod 777 api/data/  # if 755 doesn't work
```

### 3. Update Credentials (IMPORTANT!)
**Change the default admin credentials immediately!**

In `admin/api-client.js`, update the login function:
```javascript
function login(username, password) {
    // CHANGE THESE TO SECURE CREDENTIALS
    if (username === 'admin' && password === 'secure_admin_2024') {
        sessionStorage.setItem(AUTH_KEY, 'true');
        sessionStorage.setItem('adminUser', username);
        return true;
    }
    return false;
}
```

**Recommended**: Change to something like:
```javascript
if (username === 'your_custom_username' && password === 'your_strong_password_here') {
```

### 4. Test the Setup
1. Navigate to `yourdomain.com/admin/login.html`
2. Login with your new credentials
3. Test adding a blog post
4. Test adding a gallery image
5. Check that data persists across browser sessions

## 🔐 Security Recommendations

### Immediate Actions:
1. **Change default credentials** (see step 3 above)
2. **Use HTTPS** - Get SSL certificate for your domain
3. **Restrict admin access** by IP if possible
4. **Regular backups** of `api/data/` directory

### Production Enhancements:
1. **Server-side authentication** - Replace hardcoded credentials with PHP session-based auth
2. **Input validation** - Add server-side validation for all inputs
3. **Rate limiting** - Prevent brute force attacks on login
4. **File upload security** - Validate and sanitize uploaded images

## 🚀 API Endpoints Available

### Blog Management
- `GET /api/blogs.php` - Get all blog posts
- `POST /api/blogs.php` - Create new blog post
- `PUT /api/blogs.php` - Update existing blog post
- `DELETE /api/blogs.php?id={id}` - Delete blog post

### Gallery Management
- `GET /api/gallery.php` - Get all gallery items
- `POST /api/gallery.php` - Create new gallery item
- `PUT /api/gallery.php` - Update existing gallery item
- `DELETE /api/gallery.php?id={id}` - Delete gallery item

## 📝 Data Storage
- Blog posts: `api/data/blogs.json`
- Gallery items: `api/data/gallery.json`
- Images: Stored as base64 data in JSON files

## 🔍 Troubleshooting

### Common Issues:

**1. "Failed to save" errors**
- Check `api/data/` directory permissions
- Ensure PHP has write access
- Check server error logs

**2. Images not displaying**
- Verify image upload completed successfully
- Check browser console for JavaScript errors
- Test with smaller image files first

**3. Login not working**
- Verify you're using the updated credentials
- Clear browser sessionStorage
- Check JavaScript console for errors

**4. Data not persisting**
- Confirm API calls are successful (check Network tab)
- Verify JSON files are being created in `api/data/`
- Test API endpoints directly with browser

### Debug Steps:
1. **Check API directly**: Visit `yourdomain.com/api/blogs.php` in browser
2. **Test with curl**: 
   ```bash
   curl -X GET https://yourdomain.com/api/blogs.php
   ```
3. **Check server logs**: Look for PHP errors
4. **Browser dev tools**: Check Network tab for failed requests

## 📊 Migration from localStorage
If you have existing data in localStorage that you want to migrate:

1. Keep the old admin pages as backup:
   - `admin/blogadmin.html` (old localStorage version)
   - `admin/gallery.html` (old localStorage version)

2. Export data from localStorage using the old admin pages
3. Import manually using the new API-based admin pages

## 🎯 Next Steps
1. Complete the setup above
2. Test all functionality thoroughly
3. Consider implementing server-side authentication
4. Set up regular backups
5. Monitor for security updates

## 📞 Support
If you encounter issues:
1. Check this guide first
2. Review the troubleshooting section
3. Check browser console and server logs
4. Test API endpoints directly
5. Verify file permissions and PHP configuration

---
**Remember**: The current authentication is still client-side for simplicity. For production use, implement proper server-side authentication and session management.