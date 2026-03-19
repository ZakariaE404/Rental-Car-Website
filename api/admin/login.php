<?php
require_once '../cors.php';
session_start();

require_once '../db_config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $username = $input['username'] ?? '';
    $password = $input['password'] ?? '';

    if (empty($username) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Username and password are required']);
        exit;
    }

    try {
        $pdo = getDbConnection();
        $stmt = $pdo->prepare("SELECT * FROM admins WHERE username = ?");
        $stmt->execute([$username]);
        $admin = $stmt->fetch();

        if ($admin && password_verify($password, $admin['password_hash'])) {
            $_SESSION['admin_auth'] = true;
            $_SESSION['admin_id'] = $admin['id'];
            $_SESSION['admin_username'] = $admin['username'];

            echo json_encode([
                'success' => true,
                'message' => 'Login successful',
                'user' => [
                    'username' => $admin['username']
                ]
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error']);
    }
}
?>