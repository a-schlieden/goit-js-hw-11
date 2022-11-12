export default class ImgApi {
  constructor() {
    this.searchData = '';
    this.page = 1;
  }

  async fetchImages() {
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

  incrementPage() {
    this.page += 1;
  }

  resPage() {
    this.page = 1;
  }
}
