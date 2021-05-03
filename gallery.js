import gallery from './gallery-items.js'

const galleryList = document.querySelector('.js-gallery');
const modalWindow = document.querySelector('.js-lightbox');
const closeButton = document.querySelector('[data-action="close-lightbox"]')
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

  if (modalWindow.getAttribute("class").includes("is-open")) {
    imgInModalWindow.setAttribute("src", target.dataset.source);
    imgInModalWindow.setAttribute("alt", target.alt);
    
    modalWindow.addEventListener('click', closeModalWindowOnBackdropClick);
    
    window.addEventListener('keydown', closeModalWindowPressEsc);
    
    window.addEventListener('keydown', flippingPhoto);

    function flippingPhoto(KeyboardEvent) {
  // console.log(target.dataset.source)
      
      
  for (let i = 0; i < gallery.length; i += 1) {
    if (KeyboardEvent.code === "ArrowLeft" && gallery[i].original === target.dataset.source) {
      imgInModalWindow.setAttribute("src", gallery[i - 1].original);
      imgInModalWindow.setAttribute("alt", gallery[i - 1].description);
    } else if (KeyboardEvent.code === "ArrowRight" && gallery[i].original === target.dataset.source) {
      imgInModalWindow.setAttribute("src", gallery[i + 1].original);
      imgInModalWindow.setAttribute("alt", gallery[i + 1].description);
}

  }
  console.log(KeyboardEvent.code)
  // ArrowLeft
  // ArrowRight
}
}
}
  
function closeModalWindowOnBackdropClick(event) {
  if (event.target.className === "lightbox__overlay") {
    toggleBackdrop();
    imgInModalWindow.setAttribute("src", "");
    imgInModalWindow.setAttribute("alt", "");
  }
}

function closeModalWindowPressEsc(KeyboardEvent) {
  if (KeyboardEvent.code === "Escape") {
    toggleBackdrop();
    imgInModalWindow.setAttribute("src", "");
    imgInModalWindow.setAttribute("alt", "");
  }
}

closeButton.addEventListener('click', closeModalWindow);

function closeModalWindow() {
  toggleBackdrop();
  imgInModalWindow.setAttribute("src", "");
  imgInModalWindow.setAttribute("alt", "");
}


  







