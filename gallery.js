import gallery from './gallery-items.js'

const galleryList = document.querySelector('.js-gallery');
const modalWindow = document.querySelector('.js-lightbox');
const imgInModalWindow = document.querySelector('.lightbox__image')

const renderList = (galleryList) => {
    const html = gallery.reduce((html, item) => {
        return html + `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${item.original}"
  >
    <img
      class="gallery__image lazyload"
      data-src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
      loading="lazy"
    />
  </a>
</li>`;
    }, '');
    galleryList.innerHTML = html;
};

renderList(galleryList)

const toggleBackdrop = () => modalWindow.classList.toggle("is-open");

galleryList.addEventListener('click', clickOnPhoto);

function clickOnPhoto(event) {
  event.preventDefault();
  
  const target = event.target;
  if (target.nodeName !== "IMG") return;

  toggleBackdrop();

    imgInModalWindow.setAttribute("src", target.dataset.source);
    imgInModalWindow.setAttribute("alt", target.alt);
    
    modalWindow.addEventListener('click', closeModalWindow);
    
    window.addEventListener('keydown', closeModalWindow);
    window.addEventListener('keydown', flippingPhoto);
}

function closeModalWindow(event) {
  if (event.target.className === "lightbox__overlay" || event.code === "Escape" || event.target.className === "lightbox__button") {
    toggleBackdrop();
    
    imgInModalWindow.setAttribute("src", "");
    imgInModalWindow.setAttribute("alt", "");
    
    window.removeEventListener('keydown', closeModalWindow);
    window.removeEventListener('keydown', flippingPhoto);
  }
}

function flippingPhoto(event) {
  const arrayOfOriginalUrl = getArrayOfImageURL(gallery);
  const arrayOfImgDescription = getArrayOfImgDescription(gallery);
  let indexOfUrlInArray = arrayOfOriginalUrl.indexOf(imgInModalWindow.src);
  let indexOfDescriptionInArray = arrayOfImgDescription.indexOf(imgInModalWindow.alt);
  
  if (event.code === "ArrowLeft") {
    if (indexOfUrlInArray === 0) {
      return;
    }
    imgInModalWindow.src = arrayOfOriginalUrl[indexOfUrlInArray - 1];
    imgInModalWindow.alt = arrayOfImgDescription[indexOfDescriptionInArray - 1];
  } else if (event.code === "ArrowRight") {
    if (indexOfUrlInArray === arrayOfOriginalUrl.length - 1) {
      return;
    }
    imgInModalWindow.src = arrayOfOriginalUrl[indexOfUrlInArray + 1];
    imgInModalWindow.alt = arrayOfImgDescription[indexOfDescriptionInArray + 1];
  }
}
    
function getArrayOfImageURL(gallery) {
  return gallery.map(a => a.original)
}

function getArrayOfImgDescription(gallery) {
  return gallery.map(a => a.description)
}

// Add Lazyload for pictures
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    const script = document.createElement('script');
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.1.2/lazysizes.min.js';
    document.body.appendChild(script);
  }
