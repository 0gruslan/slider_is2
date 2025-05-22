<?php
// Проверка пароля
if ($_POST['password'] !== 'irinadimaruslandanyastusovet2025') {
    die('Неверный пароль');
}

$imageName = $_POST['imageName'];
$imagePath = "images/" . $imageName;

if (file_exists($imagePath)) {
    if (unlink($imagePath)) {
        echo json_encode(array('status' => 'success', 'message' => 'Изображение удалено'));
    } else {
        echo json_encode(array('status' => 'error', 'message' => 'Ошибка при удалении изображения'));
    }
} else {
    echo json_encode(array('status' => 'error', 'message' => 'Изображение не найдено'));
}
?>
