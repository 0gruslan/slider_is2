<?php
// password_utils.php
function getPasswordHash() {
    return require 'password_hash.php';
}

function verifyPassword($inputPassword) {
    $hash = getPasswordHash();
    return password_verify($inputPassword, $hash);
}
?>
