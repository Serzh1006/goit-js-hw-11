// ф-ция для создания коллекции фоток

export function createListImages(arrayImages) {
  const list = arrayImages
    .map(obj => {
      return `<li class="gallery__item">
			<a class="gallery__link" href="${obj.largeImageURL}">
			<div class="photo-card">
	<img src="${obj.webformatURL}" alt="${obj.tags}" width="320" loading="lazy" />
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
</div></a></li>`;
    })
    .join('');
  return `<ul>${list}</ul>`;
}
