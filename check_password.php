<?php
require_once 'password_utils.php';

header('Content-Type: application/json');

$inputPassword = $_POST['password'] ?? '';

if (verifyPassword($inputPassword)) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Неверный пароль']);
}
?>
