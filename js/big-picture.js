import {isEscapeKey} from './util.js';
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img').querySelector('img');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const bigPictureCloseBtn = document.querySelector('.big-picture__cancel');
const picturesList = document.querySelector('.pictures');
const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture () {
  bigPicture.classList.remove('hidden');
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onBigPictureEscKeydown);
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  commentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscKeydown);
}

bigPictureCloseBtn.addEventListener('click', () =>{
  closeBigPicture();
});

picturesList.addEventListener('click', addDataPicture);
function addDataPicture (evt){
  if (evt.target.tagName === 'IMG') {
    bigPictureImg.src = evt.target.src;
    bigPictureImg.alt = evt.target.alt;
    openBigPicture();
  }
}
