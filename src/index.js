import axios from 'axios';
import Notiflix from 'notiflix';
//import './css/styles.css';
// import lightbox from 'simplelightbox';
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

async function onformSubmit(event) {
  event.preventDefault();
  clearImages();
  FetchImages.searchData =
    event.currentTarget.elements.searchQuery.value.trim();
  FetchImages.resPage();

  try {
    const item = await FetchImages.fetchImages();
    if (item.hits.length === 0) {
      Notiflix.Notify.failure(
        'Too many matches found. Please enter a more specific name.'
      );
      return;
    }
    Notiflix.Notify.info(`Hooray! We found ${item.total} images.`);
    renderGallerieItem(item);
    getElem('.more-btn').style.display = 'inline-block';
  } catch (error) {
    console.log(error);
  }
}

async function onMoreLoad() {
  try {
    FetchImages.incrementPage();
    const item = await FetchImages.fetchImages();
    renderGallerieItem(item);
    //lightbox.refresh();
  } catch (error) {
    console.log(error);
  }
}

function clearImages() {
  getElem('.gallery').innerHTML = '';
}
