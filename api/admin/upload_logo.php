<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }
header("Content-Type: application/json");
require_once '../db_config.php';

if (!isset($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Check if a file was uploaded
if (!isset($_FILES['logo']) || $_FILES['logo']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'No valid file uploaded']);
    exit;
}

$file = $_FILES['logo'];
$allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp'];
$maxSize = 5 * 1024 * 1024; // 5MB

// Validate file type
if (!in_array($file['type'], $allowedTypes)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid file type. Allowed: PNG, JPG, SVG, WebP']);
    exit;
}

// Validate file size
if ($file['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'File too large. Maximum size: 5MB']);
    exit;
}

// Create uploads directory in public/ (for Vite dev server) and root (for production)
$projectRoot = realpath(__DIR__ . '/../../');
$publicUploadDir = $projectRoot . '/public/assets/uploads/';
$rootUploadDir = $projectRoot . '/assets/uploads/';

if (!is_dir($publicUploadDir)) {
    mkdir($publicUploadDir, 0755, true);
}
if (!is_dir($rootUploadDir)) {
    mkdir($rootUploadDir, 0755, true);
}

// Generate unique filename
$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = 'brand_logo_' . time() . '.' . $ext;

// Save to both locations (public for dev, root for production build)
$publicDest = $publicUploadDir . $filename;
$rootDest = $rootUploadDir . $filename;

if (move_uploaded_file($file['tmp_name'], $publicDest)) {
    // Copy to root assets too for production
    copy($publicDest, $rootDest);
    
    $logoUrl = '/assets/uploads/' . $filename;

    try {
        $pdo = getDbConnection();
        // Update logo_url in settings
        $stmt = $pdo->prepare("UPDATE app_settings SET setting_value = ? WHERE setting_key = 'logo_url'");
        $stmt->execute([$logoUrl]);
        if ($stmt->rowCount() === 0) {
            $pdo->prepare("INSERT IGNORE INTO app_settings (setting_key, setting_value) VALUES ('logo_url', ?)")->execute([$logoUrl]);
        }

        echo json_encode([
            'success' => true,
            'message' => 'Logo uploaded successfully',
            'logo_url' => $logoUrl
        ]);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Database error: ' . $e->getMessage()
        ]);
    }
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to move uploaded file']);
}
?>
