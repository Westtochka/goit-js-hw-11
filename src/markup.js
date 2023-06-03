export const createCards = (data = []) => {
    return data
      .map(
        ({
          webformatURL = '',
          largeImageURL = '',
          tags = '',
          likes = '',
          views = '',
          comments = '',
          downloads = '',
        } = {}) => {
          return `<li class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <ul class="info">
        <li class="info-item">
          <b>Likes</b>
          <p>${likes}</p>
        </li>
        <li class="info-item">
          <b>Views</b>
          <p>${views}</p>
        </li>
        <li class="info-item">
          <b>Comments</b>
          <p>${comments}</p>
        </li>
        <li class="info-item">
          <b>Downloads</b>
          <p>${downloads}</p>
        </li>
      </ul>
    </li>`;
        }
      )
      .join('');
  };
  

  