// Проверка пароля
function checkPassword() {
    const password = document.getElementById('password').value;
    if (password === "irinadimaruslandanyastusovet2025") {
        document.querySelector('.login-container').style.display = 'none';
        document.querySelector('.admin-panel').style.display = 'block';
        loadCurrentImages();
    } else {
        alert('Неверный пароль');
    }
}

// Загрузка текущих изображений
function loadCurrentImages() {
    fetch('get_images.php')
        .then(response => response.json())
        .then(images => {
            const container = document.getElementById('currentImages');
            container.innerHTML = '';
            images.forEach(image => {
                const imageItem = document.createElement('div');
                imageItem.className = 'image-item';
                imageItem.innerHTML = `
                    <img src="images/${image}" alt="${image}">
                    <button onclick="deleteImage('${image}')">×</button>
                `;
                container.appendChild(imageItem);
            });
        })
        .catch(error => console.error('Ошибка загрузки изображений:', error));
}

// Удаление изображения
function deleteImage(imageName) {
    if (confirm('Вы уверены, что хотите удалить это изображение?')) {
        const formData = new FormData();
        formData.append('password', 'irinadimaruslandanyastusovet2025');
        formData.append('imageName', imageName);

        fetch('delete.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Изображение удалено');
                loadCurrentImages();
            } else {
                alert('Ошибка при удалении изображения: ' + data.message);
            }
        })
        .catch(error => console.error('Ошибка:', error));
    }
}

// Загрузка новых изображений
function uploadImages() {
    const files = document.getElementById('imageUpload').files;
    if (files.length === 0) {
        alert('Выберите изображения для загрузки');
        return;
    }

    const formData = new FormData();
    formData.append('password', 'irinadimaruslandanyastusovet2025');

    for (let i = 0; i < files.length; i++) {
        formData.append('images[]', files[i]);
    }

    fetch('upload.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        let successCount = 0;
        let errorCount = 0;

        data.forEach(item => {
            if (item.status === 'success') {
                successCount++;
            } else {
                errorCount++;
                console.error(`Ошибка при загрузке ${item.file}: ${item.message}`);
            }
        });

        alert(`Загружено изображений: ${successCount}\nОшибок: ${errorCount}`);
        loadCurrentImages();
    })
    .catch(error => console.error('Ошибка:', error));
}
