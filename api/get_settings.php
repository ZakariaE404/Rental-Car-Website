<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }
header("Content-Type: application/json");
require_once 'db_config.php';

try {
    $pdo = getDbConnection();
    
    $stmt = $pdo->query("SELECT setting_key, setting_value FROM app_settings");
    $settingsRaw = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $settings = [
        'phone' => '212600000000',
        'email' => 'contact@prestigeauto.ma',
        'brand_name' => 'prestigeAuto',
        'brand_color' => '#f59e0b', // amber-500 default
        'logo_url' => ''
    ];
    
    $keyMap = [
        'contact_phone' => 'phone',
        'contact_email' => 'email',
        'brand_name' => 'brand_name',
        'brand_color' => 'brand_color',
        'logo_url' => 'logo_url'
    ];
    
    foreach ($settingsRaw as $row) {
        $key = $row['setting_key'];
        if (isset($keyMap[$key])) {
            $settings[$keyMap[$key]] = $row['setting_value'];
        }
    }
    
    echo json_encode([
        'success' => true,
        'data' => $settings
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database error'
    ]);
}
?>
