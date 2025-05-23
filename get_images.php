<?php
header('Content-Type: application/json');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

$imagesDir = 'images/';
$images = array();

if (file_exists($imagesDir) && is_dir($imagesDir)) {
    $files = scandir($imagesDir);
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

sort($images);
echo json_encode($images);
?>
