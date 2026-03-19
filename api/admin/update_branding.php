<?php
require_once '../cors.php';
session_start();
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

$input = json_decode(file_get_contents('php://input'), true);
$brand_name = $input['brand_name'] ?? null;
$brand_color = $input['brand_color'] ?? null;

try {
    $pdo = getDbConnection();

    // Helper to upsert a setting
    $upsert = function($key, $value) use ($pdo) {
        if ($value === null) return;
        $stmt = $pdo->prepare("UPDATE app_settings SET setting_value = ? WHERE setting_key = ?");
        $stmt->execute([$value, $key]);
        if ($stmt->rowCount() === 0) {
            $pdo->prepare("INSERT IGNORE INTO app_settings (setting_key, setting_value) VALUES (?, ?)")->execute([$key, $value]);
        }
    };

    $upsert('brand_name', $brand_name);
    $upsert('brand_color', $brand_color);

    echo json_encode([
        'success' => true,
        'message' => 'Branding settings updated successfully'
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
