import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { getObjData } from './functions/getObjData';
import { createListImages } from './functions/createListImages';
import { addMarkUp } from './functions/addMarkUp';

const formEl = document.getElementById('search-form');
const btnShowMore = document.querySelector('.load-more');
let pageNumber = 0;

formEl.addEventListener('submit', onSubmitGetValue);

function onSubmitGetValue(e) {
  e.preventDefault();
  const valueInput = e.currentTarget.firstElementChild.value.trim();
  formEl.reset();
  pageNumber = 2;
  getObjData(valueInput, pageNumber)
    .then(Obj => {
      if (Obj.data.hits.length === 0) {
        throw new Error('error');
      } else {
        Notify.info(`Hooray! We found ${Obj.data.totalHits} images.`);
        return createListImages(Obj.data.hits);
      }
    })
    .then(markup => {
      addMarkUp(markup);
      btnShowMore.classList.toggle('load-more');
      // продумать появление кнопки при сабмите
    })
    .catch(() =>
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      )
    );
}

// Создание слайдера

// const gallery = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionPosition: 'bottom',
//   captionDelay: 250,
// });
