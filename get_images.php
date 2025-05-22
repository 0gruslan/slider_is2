<?php
$imagesDir = 'images/';
$images = array();

// Проверяем, существует ли папка
if (file_exists($imagesDir) && is_dir($imagesDir)) {
    $files = scandir($imagesDir);

    // Фильтруем только файлы изображений
    $allowedExtensions = array('jpg', 'jpeg', 'png', 'gif');

    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..') {
            $filePath = $imagesDir . $file;
            if (is_file($filePath)) {
                $extension = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
                if (in_array($extension, $allowedExtensions)) {
                    $images[] = $file;
                }
            }
        }
    }
}

// Сортируем изображения по имени
sort($images);

header('Content-Type: application/json');
echo json_encode($images);
?>
