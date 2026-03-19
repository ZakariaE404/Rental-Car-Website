<?php
require_once 'cors.php';
require_once 'db_config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input || !isset($input['email'])) {
        echo json_encode(['success' => false, 'message' => 'Invalid input']);
        exit;
    }

    $email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email address']);
        exit;
    }

    try {
        $pdo = getDbConnection();
        $sql = "INSERT INTO newsletter_subscribers (email) VALUES (?)";

        $stmt = $pdo->prepare($sql);
        $result = $stmt->execute([$email]);

        if ($result) {
            echo json_encode(['success' => true, 'message' => 'Subscribed successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to subscribe']);
        }
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) { // Integrity constraint violation (email already exists)
            echo json_encode(['success' => true, 'message' => 'You are already subscribed!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
        }
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>