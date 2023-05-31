// Функция для обработки загрузки XML-файла
function loadXML(url, callback, callbackDefault) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callback(xhr.responseXML);
      } else {
        if (typeof callbackDefault === 'function') {
          callbackDefault();
        }
      }
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
}

// Функция для обновления информации о серии
function updateEpisodeInfo(episodeNumber, videoSrc, videoDscr) {
  const episodeTitleElement = document.querySelector('.description h1');
  const videoElement = document.querySelector('.player-container video');
  const descriptionElement = document.querySelector('.description p');

  // Обновление заголовка и ссылки на видео
  episodeTitleElement.textContent = `Серия ${episodeNumber}`;
  videoElement.src = videoSrc;
  descriptionElement.textContent=videoDscr;

}

// Обработка клика на картинку
function handleImageClick(event) {
  const episodeId = event.target.id;

  // Загрузка XML-файла
  loadXML('/xml/series.xml', function(xml) {
    const episodeElements = xml.querySelectorAll('episode');
    let episodeNumber = -1;
    let videoSrc = '';
    let videoDscr='';

    // Поиск соответствующей серии в XML по номеру эпизода
    episodeElements.forEach((episodeElement) => {
      const numberElement = episodeElement.querySelector('number');
      const videoElement = episodeElement.querySelector('video');
      const descriptionElement=episodeElement.querySelector('description');
      if (numberElement && videoElement && numberElement.textContent === episodeId) {
        episodeNumber = parseInt(numberElement.textContent);
        videoSrc = videoElement.textContent;
        videoDscr=descriptionElement.textContent;
      }
    });

    // Обновление информации о серии
    if (episodeNumber !== -1) {
      updateEpisodeInfo(episodeNumber, videoSrc, videoDscr);
    }
  }, loadDefaultEpisode); // Добавление обработчика по умолчанию
}

// Функция загрузки первой серии по умолчанию
function loadDefaultEpisode() {
  // Получение текущего URL
  const url = new URL(window.location.href);

  // Получение объекта URLSearchParams с параметрами запроса
  const searchParams = new URLSearchParams(url.search);

  // Получение значения параметра "episode"
  const episodeNum = searchParams.get('episode');

  // Проверка наличия параметра "episode" и выполнение соответствующих действий
  if (episodeNum) {
    // Здесь вы можете выполнить код, который обрабатывает значение параметра "episode"
    console.log('Episode number:', episodeNum);
  } else {
    // Если параметр "episode" отсутствует
    console.log('No episode number specified.');
  }
  // Загрузка XML-файла
  loadXML('/xml/series.xml', function(xml) {
    const episodeElements = xml.querySelectorAll('episode');
    const episodeNumber = episodeNum != undefined ? episodeNum : parseInt(episodeElements[0].querySelector("number").textContent);
    const videoSrc = episodeNum != undefined ? episodeElements[episodeNum-1].querySelector('video').textContent : episodeElements[0].querySelector('video').textContent;
    const videoDscr = episodeNum != undefined ? episodeElements[episodeNum-1].querySelector('description').textContent : episodeElements[0].querySelector('description').textContent;
      // Обновление информации о серииs
      updateEpisodeInfo(episodeNumber, videoSrc, videoDscr);
    // }
  });
}

// Добавление обработчика клика для каждой картинки
const imageElements = document.querySelectorAll('.pbimg');
imageElements.forEach((imageElement) => {
  imageElement.addEventListener('click', handleImageClick);
});

// Загрузка первой серии по умолчанию при загрузке страницы
window.addEventListener('load', loadDefaultEpisode);
