import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { getObjData } from './functions/getObjData';
import { createListImages } from './functions/createListImages';
import { addMarkUp } from './functions/addMarkUp';

const formEl = document.getElementById('search-form');
const btnShowMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
let valueInput = '';
let pageNumber = 0;
let counter = 0;
let total = 0;

formEl.addEventListener('submit', onSubmitGetValue);

function onSubmitGetValue(e) {
  e.preventDefault();
  if (!btnShowMore.classList.contains('load-more')) {
    btnShowMore.classList.add('load-more');
  }
  valueInput = e.currentTarget.firstElementChild.value.trim();
  formEl.reset();
  pageNumber = 1;
  getObjData(valueInput, pageNumber)
    .then(Obj => {
      if (Obj.data.hits.length === 0) {
        addMarkUp('');
        throw new Error('error');
      } else {
        counter = Obj.data.hits.length;
        total = Obj.data.totalHits;
        Notify.info(`Hooray! We found ${Obj.data.totalHits} images.`);
        return createListImages(Obj.data.hits);
      }
    })
    .then(markup => {
      addMarkUp(markup);
      if (counter < total) {
        btnShowMore.classList.remove('load-more');
      }
    })
    .catch(error => {
      console.log(error.message);
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
}

btnShowMore.addEventListener('click', onClickShowMore);

async function onClickShowMore() {
  pageNumber += 1;
  const objData = await getObjData(valueInput, pageNumber);
  const newMarkup = await createListImages(objData.data.hits);
  gallery.insertAdjacentHTML('beforeend', newMarkup);
  counter += objData.data.hits.length;
  if (counter >= total) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    btnShowMore.classList.add('load-more');
  }
}

// Создание слайдера

// const mygallery = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionPosition: 'bottom',
//   captionDelay: 250,
// });
