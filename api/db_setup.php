<?php
header("Content-Type: text/plain");
require_once 'db_config.php';

try {
    $pdo = getDbConnection();
    echo "Starting Database Setup...\n\n";

    // 1. Add 'status' column to reservations if it doesn't exist
    echo "Checking 'reservations' table for 'status' column...\n";
    $stmt = $pdo->query("SHOW COLUMNS FROM reservations LIKE 'status'");
    if (!$stmt->fetch()) {
        $pdo->exec("ALTER TABLE reservations ADD COLUMN status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending' AFTER whatsapp");
        echo "Successfully added 'status' column to 'reservations'.\n";
    } else {
        echo "'status' column already exists in 'reservations'.\n";
    }

    // 2. Create 'admins' table
    echo "Checking for 'admins' table...\n";
    $pdo->exec("CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
    echo "Table 'admins' is ready.\n";

    // 3. Create 'newsletter_subscribers' table if missing (just in case)
    echo "Checking for 'newsletter_subscribers' table...\n";
    $pdo->exec("CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
    echo "Table 'newsletter_subscribers' is ready.\n";

    // 4. Create 'contact_messages' table if missing (just in case)
    echo "Checking for 'contact_messages' table...\n";
    $pdo->exec("CREATE TABLE IF NOT EXISTS contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        subject VARCHAR(255),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
    echo "Table 'contact_messages' is ready.\n";

    // 5. Insert default admin if not exists
    $username = 'admin';
    $password = 'admin123'; // Default password
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("SELECT id FROM admins WHERE username = ?");
    $stmt->execute([$username]);
    if (!$stmt->fetch()) {
        $stmt = $pdo->prepare("INSERT INTO admins (username, password_hash) VALUES (?, ?)");
        $stmt->execute([$username, $password_hash]);
        echo "Default admin user created:\n";
        echo "Username: $username\n";
        echo "Password: $password\n";
        echo "IMPORTANT: Please delete this file or change the password after first login!\n";
    } else {
        echo "Admin user 'admin' already exists.\n";
    }

    // 6. Create 'app_settings' table
    echo "Checking for 'app_settings' table...\n";
    $pdo->exec("CREATE TABLE IF NOT EXISTS app_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(100) NOT NULL UNIQUE,
        setting_value TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )");
    echo "Table 'app_settings' is ready.\n";

    // Insert default settings if missing
    $defaultSettings = [
        'contact_phone' => '212600000000',
        'contact_email' => 'contact@prestigeauto.ma'
    ];

    foreach ($defaultSettings as $key => $value) {
        $stmt = $pdo->prepare("INSERT IGNORE INTO app_settings (setting_key, setting_value) VALUES (?, ?)");
        $stmt->execute([$key, $value]);
    }
    echo "Default app settings configured.\n";

    echo "\nDatabase setup complete!";

} catch (PDOException $e) {
    echo "ERROR: " . $e->getMessage();
}
?>