import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getObjData } from './functions/getObjData';
import { createListImages } from './functions/createListImages';
import { addMarkUp } from './functions/addMarkUp';
const formEl = document.getElementById('search-form');

formEl.addEventListener('submit', onSubmitGetValue);

export function onSubmitGetValue(e) {
  e.preventDefault();
  const valueInput = e.currentTarget.firstElementChild.value.trim();
  formEl.reset();
  getObjData(valueInput)
    .then(Obj => {
      return createListImages(Obj.data.hits);
    })
    .then(markup => {
      addMarkUp(markup);
    });
}
// Создание слайдера

// const gallery = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionPosition: 'bottom',
//   captionDelay: 250,
// });
