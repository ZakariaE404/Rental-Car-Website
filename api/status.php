<?php
// 1. Enable CORS so your Vercel app can see this
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// 2. Include your existing config
require_once 'db_config.php'; 

try {
    $conn = getDbConnection();
    if ($conn) {
        echo json_encode([
            "status" => "success",
            "message" => "Database is linked correctly!",
            "server_time" => date('Y-m-d H:i:s')
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Connection returned null"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}