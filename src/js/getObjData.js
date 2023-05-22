const axios = require('axios').default;

const URL = 'https://pixabay.com/api/';
const KEY = '36524518-a58dcdc8b7630db8edc13e4de';

export function getObjData(valueInput, pageNumber) {
  return axios.get(
    `${URL}?key=${KEY}&q="${valueInput}"
		&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageNumber}`
  );
}
