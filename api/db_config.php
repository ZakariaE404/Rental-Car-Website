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

// InfinityFree typically provides these via their dashboard
// On InfinityFree, environment variables might be restricted, so we use define()
define('DB_HOST', getenv('DB_HOST') ?: 'sqlXXX.epizy.com'); // Placeholder for InfinityFree hostname
define('DB_USER', getenv('DB_USER') ?: 'epiz_34567890');    // Placeholder for InfinityFree username
define('DB_PASS', getenv('DB_PASS') ?: '');                // Placeholder for InfinityFree password
define('DB_NAME', getenv('DB_NAME') ?: 'epiz_34567890_db'); // Placeholder for InfinityFree database name

/**
 * Get a connection to the database
 * @return PDO|null
 */
function getDbConnection()
{
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
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