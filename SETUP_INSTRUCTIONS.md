# E-Home Cleaning Services - Setup Instructions

## Requirements
- Web server with PHP 7.4+ support
- Write permissions for the `api/data/` directory

## Installation Steps

### 1. Upload Files
Upload all files to your web server's public directory (usually `public_html` or `www`).

### 2. Set Permissions
Make sure the `api/data/` directory has write permissions:
```bash
chmod 755 api/data/
chmod 666 api/data/*.json
```

### 3. Test the API
Visit your website and check if the API is working:
- `yourwebsite.com/api/blogs.php` - Should return `[]` (empty array)
- `yourwebsite.com/api/gallery.php` - Should return `[]` (empty array)

### 4. Admin Access
- Visit `yourwebsite.com/admin/login.html`
- Login with: **Username:** `admin` **Password:** `admin123`
- Create your first blog post and gallery items

## Features
- ✅ **Persistent Storage** - Content saved on server, accessible from any device
- ✅ **Cross-Device Sync** - Same content visible to all visitors
- ✅ **Admin Panel** - Easy content management
- ✅ **Automatic Backup** - Content stored in JSON files on server
- ✅ **Fallback Support** - Works with localStorage if API fails

## File Structure
```
/
├── index.html              # Home page
├── blog.html              # Blog listing page
├── recent-project.html    # Gallery page
├── admin/                 # Admin panel
│   ├── login.html
│   ├── dashboard.html
│   ├── blogadmin.html
│   └── gallery.html
├── api/                   # Backend API
│   ├── config.php
│   ├── blogs.php
│   ├── gallery.php
│   └── data/              # Data storage (auto-created)
│       ├── blogs.json
│       └── gallery.json
└── assets/               # CSS, JS, Images
```

## Troubleshooting

### API Not Working
1. Check if PHP is enabled on your server
2. Verify file permissions on `api/data/` directory
3. Check server error logs
4. Ensure `.htaccess` files are supported

### Content Not Saving
1. Check browser console for errors
2. Verify API endpoints are accessible
3. Check server write permissions
4. Test with localStorage fallback

### Cross-Device Issues
- Content should now work across all devices
- If issues persist, check server configuration
- Verify API responses in browser developer tools

## Security Notes
- Change admin credentials in `admin/admin.js`
- Consider adding server-side authentication for production
- Regularly backup the `api/data/` directory
- Monitor server logs for suspicious activity

## Support
For technical support, check:
1. Browser developer console for JavaScript errors
2. Server error logs for PHP errors
3. Network tab for API request/response issues