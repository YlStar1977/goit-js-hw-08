import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from './gallery-items.js';

const galleryList = document.querySelector('.gallery');

function createGalleryItemsMarkup(items) {
    return items.map(({ preview, original, description }) => {
        return `
            <li class="gallery__item">
                <a class="gallery__link" href="${original}">
                    <img
                        class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                    />
                </a>
            </li>
        `;
    }).join('');
}


galleryList.insertAdjacentHTML('beforeend', createGalleryItemsMarkup(galleryItems));

galleryList.addEventListener('click', onGalleryItemClick);


function onGalleryItemClick(event) {
    event.preventDefault();
    

    if (event.target.nodeName !== 'IMG') {
        return;
    }

 
    const largeImageUrl = event.target.dataset.source;

  
    openModal(largeImageUrl);
}

function openModal(url) {
    const instance =  new SimpleLightbox(`
        <img src="${url}" alt="Image description" />
    `);

    instance.show();

    document.addEventListener('keydown', onModalKeyPress);

  
    function onModalKeyPress(event) {
        if (event.key === 'Escape') {
            instance.close();
            document.removeEventListener('keydown', onModalKeyPress);
        }
    }
}

console.log(galleryItems);
