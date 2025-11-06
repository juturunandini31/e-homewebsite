<?php
// API Configuration
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Data directories
define('DATA_DIR', __DIR__ . '/data/');
define('BLOG_FILE', DATA_DIR . 'blogs.json');
define('GALLERY_FILE', DATA_DIR . 'gallery.json');
define('UPLOADS_DIR', DATA_DIR . 'uploads/');

// Create directories if they don't exist
if (!file_exists(DATA_DIR)) {
    mkdir(DATA_DIR, 0755, true);
}
if (!file_exists(UPLOADS_DIR)) {
    mkdir(UPLOADS_DIR, 0755, true);
}

// Initialize files if they don't exist
if (!file_exists(BLOG_FILE)) {
    file_put_contents(BLOG_FILE, json_encode([]));
}
if (!file_exists(GALLERY_FILE)) {
    file_put_contents(GALLERY_FILE, json_encode([]));
}

// Helper functions
function readJsonFile($file) {
    if (!file_exists($file)) {
        return [];
    }
    $content = file_get_contents($file);
    return json_decode($content, true) ?: [];
}

function writeJsonFile($file, $data) {
    return file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
}

function sendResponse($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit();
}

function sendError($message, $status = 400) {
    http_response_code($status);
    echo json_encode(['error' => $message]);
    exit();
}
?>