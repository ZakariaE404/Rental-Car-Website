<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }
header("Content-Type: application/json");

if (isset($_SESSION['admin_auth']) && $_SESSION['admin_auth'] === true) {
    echo json_encode([
        'authenticated' => true,
        'user' => [
            'username' => $_SESSION['admin_username']
        ]
    ]);
} else {
    echo json_encode(['authenticated' => false]);
}
?>