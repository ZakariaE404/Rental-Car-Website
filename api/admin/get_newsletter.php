<?php
require_once '../cors.php';
session_start();

require_once '../db_config.php';

// Auth Check
if (!isset($_SESSION['admin_auth']) || $_SESSION['admin_auth'] !== true) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

try {
    $pdo = getDbConnection();
    $stmt = $pdo->query("SELECT * FROM newsletter_subscribers ORDER BY created_at DESC");
    $subscribers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'data' => $subscribers]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error']);
}
?>