# Troubleshooting Guide - E-Home Cleaning Services

## Issue: Blog/Gallery not showing on Home Page

### Quick Fix Steps:

1. **Test LocalStorage First**
   - Open `test-simple.html` in your browser
   - Click "Add Test Blog" and "Add Test Gallery"
   - Verify data is being saved

2. **Check Browser Console**
   - Press F12 to open Developer Tools
   - Go to Console tab
   - Look for any red error messages
   - Refresh the page and check again

3. **Verify Data in Browser**
   - Press F12 → Application tab → Local Storage
   - Look for your domain
   - Check if `blogPosts` and `galleryItems` exist

4. **Test Admin Panel**
   - Go to `admin/login.html`
   - Login with: admin / admin123
   - Create a blog post in Blog Admin
   - Create a gallery item in Gallery Admin
   - Check if they appear in the admin panels

5. **Test Home Page**
   - Go to `index.html`
   - Scroll to "Our Blog" section
   - Scroll to "Our Recent Works" section
   - Data should appear if localStorage is working

## Common Issues:

### 1. **Incognito/Private Mode**
- LocalStorage doesn't persist in private browsing
- Use normal browser mode

### 2. **Different Browsers**
- Each browser has separate localStorage
- Chrome data won't show in Firefox
- Use same browser on all devices

### 3. **Browser Cache Issues**
- Clear browser cache and reload
- Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

### 4. **JavaScript Disabled**
- Enable JavaScript in browser settings
- Check if ad blockers are interfering

### 5. **File Protocol Issues**
- If opening files directly (file://), some features may not work
- Use a local web server or upload to hosting

## Cross-Device Solution:

Since localStorage is browser-specific, here are options for cross-device access:

### Option 1: Manual Export/Import
1. In admin panel, export data to file
2. Import file on other device
3. (Feature needs to be implemented)

### Option 2: Use Same Browser Account
1. Enable browser sync (Chrome Sync, Firefox Sync)
2. Login to same account on all devices
3. Some browsers sync localStorage

### Option 3: Upload to Web Hosting
1. Upload files to web hosting with PHP support
2. Use the API system (files already created)
3. Data will be truly persistent across all devices

## Testing Checklist:

- [ ] `test-simple.html` works
- [ ] Admin login works (admin/admin123)
- [ ] Can create blog posts in admin
- [ ] Can create gallery items in admin
- [ ] Blog posts show in `blog.html`
- [ ] Gallery items show in `recent-project.html`
- [ ] Blog posts show on home page
- [ ] Gallery items show on home page
- [ ] No console errors

## If Still Not Working:

1. **Check File Structure**
   ```
   /
   ├── index.html
   ├── blog.html
   ├── recent-project.html
   ├── admin/
   │   ├── login.html
   │   ├── blogadmin.html
   │   └── gallery.html
   └── assets/
   ```

2. **Verify JavaScript Loading**
   - Check if all JS files load without errors
   - Ensure no missing dependencies

3. **Browser Compatibility**
   - Use modern browsers (Chrome, Firefox, Safari, Edge)
   - Avoid Internet Explorer

4. **Network Issues**
   - Ensure all CSS/JS files load properly
   - Check for 404 errors in Network tab

## Contact Support:
If issues persist, provide:
- Browser name and version
- Operating system
- Console error messages
- Steps you followed
- Screenshots of the issue