document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    let currentSlide = 0;
    let slides = [];

    // Функция для загрузки изображений из папки
    function loadImagesFromFolder() {
        // Используем fetch для получения списка файлов в папке images
        fetch('get_images.php')
            .then(response => response.json())
            .then(images => {
                // Создаем слайды для каждого изображения
                images.forEach((image, index) => {
                    const slide = document.createElement('div');
                    slide.className = 'slide' + (index === 0 ? ' active' : '');
                    slide.style.backgroundImage = `url('images/${image}')`;
                    slider.appendChild(slide);
                });

                slides = document.querySelectorAll('.slide');
                startSlider();
            })
            .catch(error => console.error('Ошибка загрузки изображений:', error));
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

    // Загружаем изображения при старте
    loadImagesFromFolder();
});
