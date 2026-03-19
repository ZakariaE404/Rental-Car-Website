<?php
require_once 'cors.php';
require_once 'db_config.php';

// PHPMailer (only load if installed via Composer)
$phpmailerAvailable = false;
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require __DIR__ . '/vendor/autoload.php';
    $phpmailerAvailable = true;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input) {
        echo json_encode(['success' => false, 'message' => 'Invalid input']);
        exit;
    }

    // Required fields
    $car_id = $input['car_id'] ?? null;
    $car_name = $input['car_name'] ?? '';
    $start_date = $input['start_date'] ?? null;
    $end_date = $input['end_date'] ?? null;
    $payment_method = $input['payment_method'] ?? null;
    $user_name = $input['user_name'] ?? '';
    $phone = $input['phone'] ?? '';
    $email = $input['email'] ?? null;
    $whatsapp = $input['whatsapp'] ?? null;
    $days = $input['days'] ?? null;
    $total_price = $input['total_price'] ?? null;

    if (!$car_id || !$start_date || !$end_date || !$days || !$total_price || !$payment_method || !$user_name || !$phone) {
        echo json_encode(['success' => false, 'message' => 'Missing required fields']);
        exit;
    }

    try {
        $pdo = getDbConnection();
        $sql = "INSERT INTO reservations (car_id, car_name, start_date, end_date, days, total_price, payment_method, user_name, phone, email, whatsapp) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = $pdo->prepare($sql);
        $result = $stmt->execute([$car_id, $car_name, $start_date, $end_date, $days, $total_price, $payment_method, $user_name, $phone, $email, $whatsapp]);

        if ($result) {

            $mailSent = false;
            if ($phpmailerAvailable) {
                try {
                    // Fetch dynamic email from settings
                    $stmtEmail = $pdo->query("SELECT setting_value FROM app_settings WHERE setting_key = 'contact_email'");
                    $emailSetting = $stmtEmail->fetch(PDO::FETCH_ASSOC);
                    $agency_email = $emailSetting ? $emailSetting['setting_value'] : 'contact@prestigeauto.ma';

                    $mail = new \PHPMailer\PHPMailer\PHPMailer(true);

                    $mail->SMTPOptions = array(
                        'ssl' => array(
                            'verify_peer' => false,
                            'verify_peer_name' => false,
                            'allow_self_signed' => true
                        )
                    );
                    $mail->isSMTP();
                    $mail->Host = getenv('SMTP_HOST') ?: 'smtp-relay.brevo.com';
                    $mail->SMTPAuth = true;
                    $mail->Username = getenv('SMTP_USER') ?: 'a2ed7c001@smtp-brevo.com';
                    $mail->Password = getenv('SMTP_PASS') ?: '';
                    $mail->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
                    $mail->Port = getenv('SMTP_PORT') ?: 587;

                    $mail->setFrom(getenv('SMTP_FROM_EMAIL') ?: 'a2ed7c001@smtp-brevo.com', getenv('SMTP_FROM_NAME') ?: 'Car Rental');
                    $mail->addAddress($agency_email);

                    $mail->isHTML(true);
                    $mail->CharSet = 'UTF-8';
                    $mail->Subject = "Reservation: $car_name";
                    $mail->Body = "<h3>حجز جديد</h3>
                                      <b>الزبون:</b> $user_name <br>
                                      <b>السيارة:</b> $car_name <br>
                                      <b>الهاتف:</b> $phone <br>
                                      <b>المدة:</b> $days أيام <br>
                                      <b>المبلغ الإجمالي:</b> $total_price درهم";

                    $mail->send();
                    $mailSent = true;
                } catch (\Exception $e) {
                    error_log("Mail Error: " . $e->getMessage());
                    $mailError = $e->getMessage();
                }
            }

            // --- 3. إنشاء رابط الواتساب ---
            $stmtPhone = $pdo->query("SELECT setting_value FROM app_settings WHERE setting_key = 'contact_phone'");
            $phoneSetting = $stmtPhone->fetch(PDO::FETCH_ASSOC);
            $agency_phone = $phoneSetting ? $phoneSetting['setting_value'] : '2126000000';

            $wa_text = "سلام عليكم، بغيت نأكد حجز سيارة:\n"
                . "🚗 السيارة: $car_name\n"
                . "📅 التاريخ: من $start_date إلى $end_date\n"
                . "⏳ المدة: $days أيام\n"
                . "💰 المبلغ الإجمالي: $total_price درهم\n"
                . "💳 طريقة الدفع: $payment_method\n"
                . "👤 الاسم: $user_name\n"
                . "📱 الهاتف: $phone";

            $whatsapp_url = "https://wa.me/$agency_phone?text=" . urlencode($wa_text);

            // --- 4. الرد النهائي ---
            echo json_encode([
                'success' => true,
                'message' => 'Reservation saved successfully',
                'whatsapp_url' => $whatsapp_url,
                'email_status' => $mailSent ? 'Sent' : 'Error',
                'email_error' => $mailError ?? null
            ]);

        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to save reservation']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database Error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>