// Находим все элементы с классом grid-item
const gridItems = document.querySelectorAll('.grid-item');

// Для каждого элемента добавляем обработчики событий
gridItems.forEach((item) => {
  const img = item.querySelector('img');
  const playButton = item.querySelector('.play-button');

  // Обработчик события при наведении на элемент
  item.addEventListener('mouseover', () => {
    img.style.filter = 'brightness(0.6)';
    playButton.style.opacity = '1';
  });

  // Обработчик события при уходе курсора с элемента
  item.addEventListener('mouseout', () => {
    img.style.filter = '';
    playButton.style.opacity = '0';
  });
});