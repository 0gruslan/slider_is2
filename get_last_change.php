<?php
header('Content-Type: text/plain');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

// Получаем время последнего изменения в папке images
$imagesDir = 'images/';
$lastChange = 0;

if (file_exists($imagesDir) && is_dir($imagesDir)) {
    $files = scandir($imagesDir);
    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..') {
            $filePath = $imagesDir . $file;
            if (is_file($filePath)) {
                $fileTime = filemtime($filePath);
                if ($fileTime > $lastChange) {
                    $lastChange = $fileTime;
                }
            }
        }
    }
}

// Возвращаем время в миллисекундах (как в JavaScript)
echo $lastChange * 1000;
?>
