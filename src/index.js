//import axios from 'axios';
//import Notiflix from 'notiflix';
////import SimpleLightbox from 'simplelightbox';
//import 'simplelightbox/dist/simple-lightbox.min.css';

// import './css/styles.css';
// import { fetchCountries } from './fetchCountries';
// import { renderCountryList, renderCountryInfo } from './rendercountries';
//import fetchImages from './fetch';

let getElem = selector => document.querySelector(selector);

getElem('#search-form').addEventListener('submit', onformSubmit);
getElem('.more-btn').addEventListener('click', onMoreLoad);

class ImgApi {
  constructor() {
    this.searchData = '';
    this.page = 1;
  }

  async fetchImageges() {
    const URL = 'https://pixabay.com/api/';

    const searchParams = new URLSearchParams({
      key: '31200881-a0442d807a70df79b0436fdb6',
      q: this.searchData,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: this.page,
    });

    const responce = await fetch(`${URL}?${searchParams}`);
    const img = await responce.json();
    return img;
  }

  // get searchQuery() {
  //   return this.searchData;
  //}

  // set searchQuery(newData) {
  // this.searchData = newData;
  //}

  incrementPage() {
    this.page += 1;
  }

  resPage() {
    this.page = 1;
  }
}

const FetchImages = new ImgApi();

async function onformSubmit(event) {
  event.preventDefault();
  clearImages();
  FetchImages.searchData =
    event.currentTarget.elements.searchQuery.value.trim();
  FetchImages.resPage();

  try {
    const item = await FetchImages.fetchImageges();
    if (item.hits.length === 0) {
      console.log(
        'Sorry, there are no images matching your search query. Please try again.'
      ); // NOTIFIX
      return;
    }
    console.log(`Hooray! We found ${item.total} images.`); // NOTIFIX
    renderGallerieItem(item);
    getElem('.more-btn').style.display = 'inline-block';
  } catch (error) {
    console.log(error);
  }
}

async function onMoreLoad() {
  try {
    FetchImages.incrementPage();
    const item = await FetchImages.fetchImageges();
    renderGallerieItem(item);
    lightbox.refresh();
  } catch (error) {
    console.log(error);
  }
}

function clearImages() {
  getElem('.gallery').innerHTML = '';
}

function renderGallerieItem(images) {
  const markup = images.hits
    .map(imageItem => {
      // Modul 7 task 2 SimpleLightBox
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

/////// Alt Skripts Ohne Async

//1   // image_type=photo&orientation=horizontal&safesearch=true

//2     //return
//fetch(`${URL}?${searchParams}`);

//    .then((response) => {
//       if (!response.ok) {
//           throw new Error(response.status);
//      }
//      return response.json();
// });
