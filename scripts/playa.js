// Загрузка XML-файла
const xhr = new XMLHttpRequest();
xhr.open('GET', 'series.xml', true);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const xmlDoc = xhr.responseXML;

    // Получение списка серий
    const episodes = xmlDoc.getElementsByTagName('episode');

    // Обработка клика по картинке-ссылке
    const seriesLinks = document.querySelectorAll('.series-link');
    seriesLinks.forEach((link, index) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();

        // Получение информации о серии
        const episode = episodes[index];
        const seriesNumber = episode.getElementsByTagName('number')[0].textContent;
        const videoSrc = episode.getElementsByTagName('video')[0].textContent;

        // Обновление номера серии и ссылки на видео
        document.querySelector('.description h1').textContent = `Серия ${seriesNumber}`;
        document.getElementById('videoPlayer').src = videoSrc;
      });
    });
  }
};

xhr.send();
