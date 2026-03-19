<?php
require_once '../cors.php';
session_start();

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