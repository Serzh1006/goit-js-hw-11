import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getObjData } from './getObjData';
import { createListImages } from './createListImages';
import { addMarkUp } from './addMarkUp';
import { refs } from './refs';
import { gallery } from './initializationSlider';

let valueInput = '';
let pageNumber = 0;
let counter = 0;
let total = 0;
let Obj = '';
let markup = '';

refs.formEl.addEventListener('submit', onSubmitGetValue);

async function onSubmitGetValue(e) {
  e.preventDefault();
  if (!refs.btnShowMore.classList.contains('is-headen')) {
    refs.btnShowMore.classList.add('is-headen');
  }

  valueInput = e.currentTarget.firstElementChild.value.trim();
  if (valueInput === '') {
    Notify.warning('Введите данные в поле поиска');
    refs.formEl.reset();
    return;
  }
  refs.formEl.reset();
  pageNumber = 1;
  Obj = await getObjData(valueInput, pageNumber);
  if (Obj.data.hits.length === 0) {
    addMarkUp('');
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  } else {
    counter = Obj.data.hits.length;
    total = Obj.data.totalHits;
    Notify.success(`Hooray! We found ${Obj.data.totalHits} images.`);
    markup = await createListImages(Obj.data.hits);
  }
  addMarkUp(markup);
  gallery.refresh();
  if (counter < total) {
    refs.btnShowMore.classList.remove('is-headen');
  }
}

refs.btnShowMore.addEventListener('click', onClickShowMore);

async function onClickShowMore() {
  pageNumber += 1;
  const objData = await getObjData(valueInput, pageNumber);
  const newMarkup = await createListImages(objData.data.hits);
  refs.gallery.insertAdjacentHTML('beforeend', newMarkup);
  gallery.refresh();
  counter += objData.data.hits.length;
  if (counter >= total) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    refs.btnShowMore.classList.add('is-headen');
  }
}
