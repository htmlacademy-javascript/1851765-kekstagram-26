import { debounce } from './util.js';
import { createMiniImageList } from './creat-miniatures.js';
import { viewBigPicture } from './big-picture.js';
const NUMBER_OF_RANDOM_PHOTOS = 10;
const RENDER_DELAY = 500;
const imgFiltersContainer = document.querySelector('.img-filters');
const miniaturesImageList = document.querySelectorAll('.picture');
const filterButtons = imgFiltersContainer.querySelectorAll('.img-filters__button');

const clearMiniaturesList = () => {
  miniaturesImageList.forEach((image) => {
    image.remove();
  });
};

const filterPicturesRandom = (data) => {
  const filteredPhotos = data.slice().sort(() => Math.random() - 0.5).slice(0, NUMBER_OF_RANDOM_PHOTOS);
  createMiniImageList(filteredPhotos);
};

const filterPicturesByDiscussed = (data) => {
  const filteredPhotos = data.slice().sort((a, b) => b.comments.length - a.comments.length);
  createMiniImageList(filteredPhotos);
};

const debounceCallback = (button, data) => {
  filterButtons.forEach((filterButton) => {
    filterButton.classList.remove('img-filters__button--active');
  });
  button.classList.add('img-filters__button--active');

  switch (button.id) {
    case 'filter-random':
      clearMiniaturesList();
      filterPicturesRandom(data);
      break;
    case 'filter-discussed':
      clearMiniaturesList();
      filterPicturesByDiscussed(data);
      break;
    default:
      clearMiniaturesList();
      createMiniImageList(data);
      viewBigPicture(data);
      break;
  }
};

const filterUserPictures = (data) => {
  createMiniImageList(data);
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
