// ф-ция для создания коллекции фоток

export function createListImages(arrayImages) {
  const list = arrayImages
    .map(obj => {
      return `<li class="gallery__item">
			<div class="photo-card">
  <a class="gallery__link" href="${obj.largeImageURL}">
	<img src="${obj.webformatURL}" alt="${obj.tags}" width="320" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      Likes:<b>${obj.likes}</b>
    </p>
    <p class="info-item">
      Views:<b>${obj.views}</b>
    </p>
    <p class="info-item">
      Comments:<b>${obj.comments}</b>
    </p>
    <p class="info-item">
      Downloads:<b>${obj.downloads}</b>
    </p>
  </div>
</div></li>`;
    })
    .join('');
  return `<ul>${list}</ul>`;
}
