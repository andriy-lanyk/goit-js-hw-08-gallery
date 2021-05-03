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
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
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
    console.log(event.target.className)
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
    
  if (indexOfUrlInArray >= 1 && indexOfUrlInArray <= 7) {
    console.log(indexOfUrlInArray)
  if (event.code === "ArrowLeft") {
    imgInModalWindow.src = arrayOfOriginalUrl[indexOfUrlInArray - 1];
    imgInModalWindow.alt = arrayOfImgDescription[indexOfDescriptionInArray - 1];
  } else if (event.code === "ArrowRight") {
    imgInModalWindow.src = arrayOfOriginalUrl[indexOfUrlInArray + 1];
    imgInModalWindow.alt = arrayOfImgDescription[indexOfDescriptionInArray + 1];
  }
  }

  if (indexOfUrlInArray === 0) {
    if (event.code === "ArrowRight") {
    imgInModalWindow.src = arrayOfOriginalUrl[indexOfUrlInArray + 1];
    imgInModalWindow.alt = arrayOfImgDescription[indexOfDescriptionInArray + 1];
  }
  }

    if (indexOfUrlInArray === 8) {
  if (event.code === "ArrowLeft") {
    imgInModalWindow.src = arrayOfOriginalUrl[indexOfUrlInArray - 1];
    imgInModalWindow.alt = arrayOfImgDescription[indexOfDescriptionInArray - 1];
  }
  }

  console.log(imgInModalWindow)
}
    
function getArrayOfImageURL(gallery) {
  return gallery.map(a => a.original)
}

function getArrayOfImgDescription(gallery) {
  return gallery.map(a => a.description)
}



  







