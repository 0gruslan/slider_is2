document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    let currentSlide = 0;
    let slides = [];
    let lastChangeTime = 0;
    let lastCheckTime = 0;

    // Функция для загрузки изображений из папки
    function loadImagesFromFolder() {
        fetch('get_images.php?nocache=' + Date.now())
            .then(response => response.json())
            .then(images => {
                // Сохраняем текущее время как время последней загрузки
                lastChangeTime = Date.now();
                localStorage.setItem('lastLoaded', lastChangeTime);

                // Очищаем слайдер
                slider.innerHTML = '';

                // Создаем слайды для каждого изображения
                images.forEach((image, index) => {
                    const slide = document.createElement('div');
                    slide.className = 'slide' + (index === 0 ? ' active' : '');
                    slide.style.backgroundImage = `url('images/${image}?nocache=${Date.now()}')`;
                    slider.appendChild(slide);
                });

                slides = document.querySelectorAll('.slide');
                startSlider();
            })
            .catch(error => {
                console.error('Ошибка загрузки изображений:', error);
                // Если ошибка, пробуем снова через 5 секунд
                setTimeout(loadImagesFromFolder, 5000);
            });
    }

    // Запускаем слайдер
    function startSlider() {
        if (slides.length === 0) return;

        // Функция для показа слайда
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }

        // Функция для переключения на следующий слайд
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        // Меняем слайд каждую минуту
        setInterval(nextSlide, 60000);
    }

    // Переключение полноэкранного режима
    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error('Ошибка при переходе в полноэкранный режим:', err);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    // Функция для проверки изменений
    function checkForChanges() {
        const now = Date.now();
        // Проверяем не чаще чем раз в 10 секунд
        if (now - lastCheckTime < 10000) return;

        lastCheckTime = now;

        fetch('get_last_change.php?nocache=' + now)
            .then(response => response.text())
            .then(lastChange => {
                const lastLoaded = localStorage.getItem('lastLoaded') || '0';

                if (parseInt(lastChange) > parseInt(lastLoaded)) {
                    console.log('Обнаружены изменения, перезагружаем слайдер');
                    loadImagesFromFolder();
                }
            })
            .catch(error => console.error('Ошибка проверки изменений:', error));
    }

    // Загружаем изображения при старте
    loadImagesFromFolder();

    // Запускаем проверку изменений
    setInterval(checkForChanges, 5000);

    // Обработчик тройного клика для полноэкранного режима
    let clickCount = 0;
    let clickTimer;

    slider.addEventListener('click', function() {
        clickCount++;
        if (clickCount === 3) {
            toggleFullScreen();
            clickCount = 0;
            clearTimeout(clickTimer);
        } else {
            clickTimer = setTimeout(function() {
                clickCount = 0;
            }, 500);
        }
    });
});
