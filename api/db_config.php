<?php
/**
 * Simple .env loader
 */
function loadEnv($path)
{
    if (!file_exists($path)) {
        return;
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if (strpos($line, '#') === 0 || empty($line)) continue;

        if (strpos($line, '=') !== false) {
            list($name, $value) = explode('=', $line, 2);
            $name = trim($name);
            $value = trim($value);

            if (!empty($name)) {
                putenv(sprintf('%s=%s', $name, $value));
                $_ENV[$name] = $value;
                $_SERVER[$name] = $value;
            }
        }
    }
}

// Try to load .env from root directory (if local)
loadEnv(__DIR__ . '/../.env');

// InfinityFree live credentials
define('DB_HOST', getenv('DB_HOST') ?: 'sql302.infinityfree.com');
define('DB_USER', getenv('DB_USER') ?: 'if0_41269050');
define('DB_PASS', getenv('DB_PASS') ?: 'zakariabn123');
define('DB_NAME', getenv('DB_NAME') ?: 'if0_41269050_XXX');
define('DB_CHARSET', 'utf8mb4');

function getDbConnection()
{
    try {
        // charset=utf8mb4 is the PDO equivalent of mysqli_set_charset($conn, "utf8mb4")
        // It ensures all Arabic text and special characters are preserved
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];
        return new PDO($dsn, DB_USER, DB_PASS, $options);
    } catch (PDOException $e) {
        header('HTTP/1.1 500 Internal Server Error');
        echo json_encode(['error' => 'Database connection failed']);
        exit;
    }
}
?>