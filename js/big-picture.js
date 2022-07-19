import {isEscapeKey} from './util.js';
import {miniaturesArray} from './data.js';
const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img').querySelector('img');
const commentCount = document.querySelector('.comments-count');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoaderBtn = document.querySelector('.comments-loader');
const likesCount = document.querySelector('.likes-count');
const picturesList = document.querySelector('.pictures');
const bigPictureCloseBtn = bigPicture.querySelector('.big-picture__cancel');
const socialCaption = document.querySelector('.social__caption');
const socialCommentList = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const COMMENT_WIDTH = 35;
const COMMENT_HEIGHT = 35;


const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture () {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onBigPictureEscKeydown);
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onBigPictureEscKeydown);
}

bigPictureCloseBtn.addEventListener('click', () =>{
  closeBigPicture();
});

const getComment = (item) => {
  const socialCommentElement = socialComment.cloneNode(true);
  const picture = socialCommentElement.querySelector('.social__picture');
  picture.src = item.avatar;
  picture.alt = item.name;
  picture.width = COMMENT_WIDTH;
  picture.height = COMMENT_HEIGHT;
  socialCommentElement.querySelector('.social__text').textContent = item.message;
  return socialCommentElement;
};

const commentFragment = document.createDocumentFragment();

const addComments = (arr) => {
  arr.forEach((item) => {
    commentFragment.append(getComment(item));
  });
  socialCommentList.append(commentFragment);
};

const addNewComments = (arr) => {
  arr.splice(0, 5).forEach((item) => {
    commentFragment.append(getComment(item));
  });
  socialCommentList.append(commentFragment);
};

const viewBigPicture = () => {
  picturesList.addEventListener('click', getBigPictureData);
};

function getBigPictureData (evt){
  if (evt.target.tagName === 'IMG') {
    const photo = miniaturesArray.find(({id}) => Number(id) === Number(evt.target.dataset.id));
    if (photo) {
      bigPictureImg.src = photo.url;
      socialCaption.textContent = photo.description;
      commentCount.textContent = photo.comments.length;
      likesCount.textContent = photo.likes;
      commentCount.textContent = photo.comments.length;
      socialCommentList.innerHTML = '';
      if ((photo.comments.length - 1) <= 5 ) {
        socialCommentCount.textContent = ` ${photo.comments.length} из ${photo.comments.length} комментариев`;
        addComments(photo.comments);
      } else {
        socialCommentCount.textContent = ` 5 из ${photo.comments.length} комментариев`;
        commentsLoaderBtn.addEventListener('click', (event) => {
          event.preventDefault();
          addNewComments(photo.comments);
        });
      }
    }
    openBigPicture();
  }
}

export {viewBigPicture};

