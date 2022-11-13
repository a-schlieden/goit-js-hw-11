import Notiflix from 'notiflix';

import lightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let getElem = selector => document.querySelector(selector);

getElem('#search-form').addEventListener('submit', onformSubmit);
getElem('.more-btn').addEventListener('click', onMoreLoad);

Notiflix.Notify.init({
  position: 'center-top',
  clickToClose: true,
});

import { renderGallerieItem } from './renderImg';

import ImgApi from './fetch';
const FetchImages = new ImgApi();

function onformSubmit(event) {
  event.preventDefault();
  clearImages();
  FetchImages.searchData =
    event.currentTarget.elements.searchQuery.value.trim();
  FetchImages.resPage();
  FetchImages.fetchImages().then(item => {
    if (item.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Too many matches found. Please enter a more specific name.'
      );
      return;
    }
    Notiflix.Notify.info(`Hooray! We found ${item.data.total} images.`);
    renderGallerieItem(item.data);
    getElem('.more-btn').style.display = 'inline-block';
  });
}

function onMoreLoad() {
  FetchImages.incrementPage();
  FetchImages.fetchImages().then(item => {
    renderGallerieItem(item.data);
  });
}

function clearImages() {
  getElem('.gallery').innerHTML = '';
}
