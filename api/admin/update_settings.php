<?php
require_once '../cors.php';
session_start();
require_once '../db_config.php';

// Set Content-Type header for JSON response
header("Content-Type: application/json");

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

$input = json_decode(file_get_contents('php://input'), true);
$phone = $input['phone'] ?? null;
$email = $input['email'] ?? null;

if (!$phone || !$email) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Phone and email are required']);
    exit;
}

try {
    $pdo = getDbConnection();
    
    // Update phone
    $stmtPhone = $pdo->prepare("UPDATE app_settings SET setting_value = ? WHERE setting_key = 'contact_phone'");
    $stmtPhone->execute([$phone]);
    
    // Update email
    $stmtEmail = $pdo->prepare("UPDATE app_settings SET setting_value = ? WHERE setting_key = 'contact_email'");
    $stmtEmail->execute([$email]);
    
    // If they didn't exist for some reason, insert them
    if ($stmtPhone->rowCount() === 0) {
        $pdo->prepare("INSERT IGNORE INTO app_settings (setting_key, setting_value) VALUES ('contact_phone', ?)")->execute([$phone]);
    }
    if ($stmtEmail->rowCount() === 0) {
        $pdo->prepare("INSERT IGNORE INTO app_settings (setting_key, setting_value) VALUES ('contact_email', ?)")->execute([$email]);
    }

    echo json_encode([
        'success' => true,
        'message' => 'Settings updated successfully'
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
