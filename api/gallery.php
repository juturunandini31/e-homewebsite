<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        // Get all gallery items
        $gallery = readJsonFile(GALLERY_FILE);
        // Sort by creation date, newest first
        usort($gallery, function($a, $b) {
            return strtotime($b['createdAt'] ?? $b['date']) - strtotime($a['createdAt'] ?? $a['date']);
        });
        sendResponse($gallery);
        break;
        
    case 'POST':
        // Create new gallery item
        if (!isset($input['caption']) || !isset($input['imageData'])) {
            sendError('Caption and image are required');
        }
        
        $gallery = readJsonFile(GALLERY_FILE);
        
        $newItem = [
            'id' => time() . rand(1000, 9999),
            'caption' => $input['caption'],
            'imageData' => $input['imageData'],
            'category' => $input['category'] ?? 'Professional Cleaning',
            'date' => date('j M Y'),
            'createdAt' => date('Y-m-d H:i:s')
        ];
        
        array_unshift($gallery, $newItem);
        
        if (writeJsonFile(GALLERY_FILE, $gallery)) {
            sendResponse($newItem, 201);
        } else {
            sendError('Failed to save gallery item', 500);
        }
        break;
        
    case 'PUT':
        // Update gallery item
        if (!isset($input['id'])) {
            sendError('Gallery item ID is required');
        }
        
        $gallery = readJsonFile(GALLERY_FILE);
        $updated = false;
        
        foreach ($gallery as &$item) {
            if ($item['id'] == $input['id']) {
                $item['caption'] = $input['caption'] ?? $item['caption'];
                $item['imageData'] = $input['imageData'] ?? $item['imageData'];
                $item['category'] = $input['category'] ?? $item['category'];
                $item['updatedAt'] = date('Y-m-d H:i:s');
                $updated = true;
                break;
            }
        }
        
        if ($updated && writeJsonFile(GALLERY_FILE, $gallery)) {
            sendResponse(['message' => 'Gallery item updated successfully']);
        } else {
            sendError('Gallery item not found or update failed', 404);
        }
        break;
        
    case 'DELETE':
        // Delete gallery item
        $id = $_GET['id'] ?? null;
        if (!$id) {
            sendError('Gallery item ID is required');
        }
        
        $gallery = readJsonFile(GALLERY_FILE);
        $originalCount = count($gallery);
        
        $gallery = array_filter($gallery, function($item) use ($id) {
            return $item['id'] != $id;
        });
        
        if (count($gallery) < $originalCount && writeJsonFile(GALLERY_FILE, array_values($gallery))) {
            sendResponse(['message' => 'Gallery item deleted successfully']);
        } else {
            sendError('Gallery item not found or delete failed', 404);
        }
        break;
        
    default:
        sendError('Method not allowed', 405);
}
?>