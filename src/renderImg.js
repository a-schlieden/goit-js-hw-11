import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let getElem = selector => document.querySelector(selector);

export function renderGallerieItem(images) {
  const markup = images.hits
    .map(imageItem => {
      return `
            <div class="photo-card">
            <a class="gallery__item"  href="${imageItem.largeImageURL}">
              <img src="${imageItem.webformatURL}" alt="${imageItem.tags}" loading="lazy" />
            </a>
            <div class="info">
              <p class="info-item">
                <b>Likes: </b><br>${imageItem.likes}
              </p>
              <p class="info-item">
                <b>Views: </b><br>${imageItem.views}
              </p>
              <p class="info-item">
                <b>Comments: </b><br>${imageItem.comments}
              </p>
              <p class="info-item">
                <b>Downloads: </b><br>${imageItem.downloads}
              </p>
            </div>
          </div>
            `;
    })
    .join('');

  getElem('.gallery').insertAdjacentHTML('beforeend', markup);
  let lightbox = new SimpleLightbox('.gallery__item');
  console.log(lightbox);
}
