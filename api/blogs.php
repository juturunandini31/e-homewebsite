<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        // Get all blog posts
        $blogs = readJsonFile(BLOG_FILE);
        // Sort by creation date, newest first
        usort($blogs, function($a, $b) {
            return strtotime($b['createdAt'] ?? $b['date']) - strtotime($a['createdAt'] ?? $a['date']);
        });
        sendResponse($blogs);
        break;
        
    case 'POST':
        // Create new blog post
        if (!isset($input['title']) || !isset($input['content'])) {
            sendError('Title and content are required');
        }
        
        $blogs = readJsonFile(BLOG_FILE);
        
        $newBlog = [
            'id' => time() . rand(1000, 9999),
            'title' => $input['title'],
            'content' => $input['content'],
            'imageData' => $input['imageData'] ?? '',
            'author' => $input['author'] ?? 'Admin',
            'date' => date('j M Y'),
            'createdAt' => date('Y-m-d H:i:s')
        ];
        
        array_unshift($blogs, $newBlog);
        
        if (writeJsonFile(BLOG_FILE, $blogs)) {
            sendResponse($newBlog, 201);
        } else {
            sendError('Failed to save blog post', 500);
        }
        break;
        
    case 'PUT':
        // Update blog post
        if (!isset($input['id'])) {
            sendError('Blog ID is required');
        }
        
        $blogs = readJsonFile(BLOG_FILE);
        $updated = false;
        
        foreach ($blogs as &$blog) {
            if ($blog['id'] == $input['id']) {
                $blog['title'] = $input['title'] ?? $blog['title'];
                $blog['content'] = $input['content'] ?? $blog['content'];
                $blog['imageData'] = $input['imageData'] ?? $blog['imageData'];
                $blog['author'] = $input['author'] ?? $blog['author'];
                $blog['updatedAt'] = date('Y-m-d H:i:s');
                $updated = true;
                break;
            }
        }
        
        if ($updated && writeJsonFile(BLOG_FILE, $blogs)) {
            sendResponse(['message' => 'Blog updated successfully']);
        } else {
            sendError('Blog not found or update failed', 404);
        }
        break;
        
    case 'DELETE':
        // Delete blog post
        $id = $_GET['id'] ?? null;
        if (!$id) {
            sendError('Blog ID is required');
        }
        
        $blogs = readJsonFile(BLOG_FILE);
        $originalCount = count($blogs);
        
        $blogs = array_filter($blogs, function($blog) use ($id) {
            return $blog['id'] != $id;
        });
        
        if (count($blogs) < $originalCount && writeJsonFile(BLOG_FILE, array_values($blogs))) {
            sendResponse(['message' => 'Blog deleted successfully']);
        } else {
            sendError('Blog not found or delete failed', 404);
        }
        break;
        
    default:
        sendError('Method not allowed', 405);
}
?>