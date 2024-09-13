import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let serach = '';
let pageInt = 1;
let img = '';
let page = 1;

let gallerysl = new SimpleLightbox('.gallery a');

const inputSerach = document.querySelector('[name=searchQuery]');
const btnSerach = document.querySelector('[type=submit]');
const btnload = document.querySelector('.load-more');

const imgTyp = 'image_type=photo';
const key = 'key=45960838-6aa652e2d176ee6c6d86f24d6&q';
const orientation = 'orientation=horizontal';
const safesearch = 'safesearch = true';

const per_page = 'per_page=40';

btnload.setAttribute('disabled', '');

const func = async () => {
  try {
    const get = await axios.get(
      `https://pixabay.com/api/?${key}=${serach}&${imgTyp}&${orientation}&${safesearch}&${per_page}&${page}`
    );

    if (get.data.hits.length == 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      btnload.setAttribute('disabled', '');
      return;
    }
    if (get.data.totalHits <= 40 * pageInt) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      btnload.setAttribute('disabled', '');
      return;
    }
    console.log(get.data.totalHits);
    for (let i = 0; i < get.data.hits.length; i++) {
      img += `<div class="photo-card">
  <a href="${get.data.hits[i].largeImageURL}"><img src="${get.data.hits[i].webformatURL}" alt="${get.data.hits[i].tags}" width="150" height="100" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${get.data.hits[i].likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${get.data.hits[i].views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${get.data.hits[i].comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${get.data.hits[i].downloads}</b>
    </p>
  </div>
</div>`;
    }
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = img;

    gallerysl.destroy();
    gallerysl = new SimpleLightbox('.gallery a');
  } catch (error) {
    console.log(error);
  }
};

btnSerach.addEventListener('click', e => {
  e.preventDefault();
  pageInt = 1;
  img = '';
  serach = encodeURIComponent(inputSerach.value);
  btnload.removeAttribute('disabled');
  func();
});

btnload.addEventListener('click', e => {
  e.preventDefault();
  pageInt = pageInt + 1;
  page = `page=${pageInt}`;

  func();
});

inputSerach.addEventListener('input', () => {
  img = '';
  serach = encodeURIComponent(inputSerach.value);
  btnload.setAttribute('disabled', '');
});
