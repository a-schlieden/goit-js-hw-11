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
const fetchImages = new ImgApi();

function onformSubmit(event) {
  event.preventDefault();
  clearImages();
  fetchImages.searchData =
    event.currentTarget.elements.searchQuery.value.trim();
  fetchImages.resPage();
  fetchImages.fetchImages().then(item => {
    if (item.data.hits.length === 0) {
      getElem('.more-btn').style.display = 'none';
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
  fetchImages.incrementPage();
  fetchImages.fetchImages().then(item => {
    if (item.data.hits.length === 0) {
      getElem('.more-btn').style.display = 'none';
      Notiflix.Notify.failure(
        `We're sorry, but you've reached the end of search results.`
      );
      return;
    }
    renderGallerieItem(item.data);
  });
}

function clearImages() {
  getElem('.gallery').innerHTML = '';
}
