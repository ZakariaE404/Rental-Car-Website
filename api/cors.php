<?php
/**
 * Professional CORS Header configuration for InfinityFree -> Vercel connection
 */

$allowed_origin = getenv('FRONTEND_URL') ?: 'https://your-car-rental.vercel.app';

header("Access-Control-Allow-Origin: $allowed_origin");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// Set session cookie parameters for cross-origin compatibility (Vercel -> InfinityFree)
// Required for browser to send cookies over HTTPS for different domains
$is_https = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') || 
            (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https');

if ($is_https) {
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'domain' => '', // Default to current domain
        'secure' => true,
        'httponly' => true,
        'samesite' => 'None',
    ]);
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

header("Content-Type: application/json");
?>
