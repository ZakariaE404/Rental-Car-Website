<?php
require_once 'cors.php';
require_once 'db_config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input) {
        echo json_encode(['success' => false, 'message' => 'Invalid input']);
        exit;
    }

    $name = htmlspecialchars(strip_tags($input['name'] ?? ''));
    $email = filter_var($input['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(strip_tags($input['phone'] ?? ''));
    $subject = htmlspecialchars(strip_tags($input['subject'] ?? ''));
    $message = htmlspecialchars(strip_tags($input['message'] ?? ''));

    if (!$name || !$email || !$message) {
        echo json_encode(['success' => false, 'message' => 'Missing required fields']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email address']);
        exit;
    }

    try {
        $pdo = getDbConnection();
        $sql = "INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)";

        $stmt = $pdo->prepare($sql);
        $result = $stmt->execute([$name, $email, $phone, $subject, $message]);

        if ($result) {
            echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to send message']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>