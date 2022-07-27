import { debounce } from './util.js';
import { createMiniImageList } from './creat-miniatures.js';
import { viewBigPicture } from './big-picture.js';
const NUMBER_OF_RANDOM_PHOTOS = 10;
const RENDER_DELAY = 500;
const imgFiltersContainer = document.querySelector('.img-filters');
const filterButtons = imgFiltersContainer.querySelectorAll('.img-filters__button');

const clearMiniaturesList = () => {
  const miniaturesImageList = document.querySelectorAll('.picture');
  miniaturesImageList.forEach((image) => {
    image.remove();
  });
};

const filterPicturesRandom = (data) => {
  const filteredPhotos = data.slice().sort(() => Math.random() - 0.5).slice(0, NUMBER_OF_RANDOM_PHOTOS);
  createMiniImageList(filteredPhotos, clearMiniaturesList);
};

const filterPicturesByDiscussed = (data) => {
  const filteredPhotos = data.slice().sort((a, b) => b.comments.length - a.comments.length);
  createMiniImageList(filteredPhotos, clearMiniaturesList);
};

const debounceCallback = (button, data) => {
  filterButtons.forEach((filterButton) => {
    filterButton.classList.remove('img-filters__button--active');
  });
  button.classList.add('img-filters__button--active');

  switch (button.id) {
    case 'filter-random':
      filterPicturesRandom(data);
      break;
    case 'filter-discussed':
      filterPicturesByDiscussed(data);
      break;
    default:
      createMiniImageList(data, clearMiniaturesList);
      break;
  }
};

const filterUserPictures = (data) => {
  createMiniImageList(data, clearMiniaturesList);
  viewBigPicture(data);
  imgFiltersContainer.classList.remove('img-filters--inactive');
  filterButtons.forEach((filterButton) => {
    const debouncedCallback = debounce(
      () => debounceCallback(filterButton, data),
      RENDER_DELAY,
    );
    filterButton.addEventListener('click', debouncedCallback);
  });
};

export {filterUserPictures};
