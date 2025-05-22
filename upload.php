<?php
// Проверка пароля
if ($_POST['password'] !== 'irinadimaruslandanyastusovet2025') {
    die('Неверный пароль');
}

// Папка для загрузки изображений
$targetDir = "images/";

// Проверяем, существует ли папка, если нет - создаем
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);
}

$response = array();

foreach ($_FILES['images']['tmp_name'] as $key => $tmpName) {
    $fileName = basename($_FILES['images']['name'][$key]);
    $targetFile = $targetDir . $fileName;

    // Проверяем, является ли файл изображением
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
    $allowedTypes = array('jpg', 'jpeg', 'png', 'gif');

    if (in_array($imageFileType, $allowedTypes)) {
        if (move_uploaded_file($tmpName, $targetFile)) {
            $response[] = array(
                'status' => 'success',
                'file' => $fileName
            );
        } else {
            $response[] = array(
                'status' => 'error',
                'file' => $fileName,
                'message' => 'Ошибка при загрузке файла'
            );
        }
    } else {
        $response[] = array(
            'status' => 'error',
            'file' => $fileName,
            'message' => 'Неверный тип файла'
        );
    }
}

header('Content-Type: application/json');
echo json_encode($response);
?>
