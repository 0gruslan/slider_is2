<?php
require_once 'password_utils.php';

header('Content-Type: application/json');

// Проверяем пароль
$inputPassword = $_POST['password'] ?? '';
if (!verifyPassword($inputPassword)) {
    die(json_encode(['status' => 'error', 'message' => 'Неверный пароль']));
}

$imageName = $_POST['imageName'] ?? '';
$imagePath = "images/" . $imageName;

if (file_exists($imagePath)) {
    if (unlink($imagePath)) {
        // Обновляем файл last_change.txt
        file_put_contents('last_change.txt', time());
        echo json_encode(['status' => 'success', 'message' => 'Изображение удалено']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Ошибка при удалении изображения']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Изображение не найдено']);
}
?>
