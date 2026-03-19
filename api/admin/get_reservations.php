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
    $stmt = $pdo->query("SELECT * FROM reservations ORDER BY created_at DESC");
    $reservations = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'data' => $reservations]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>