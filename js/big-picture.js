import {isEscapeKey} from './util.js';
import {miniaturesArray} from './creat-miniatures.js';
const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img').querySelector('img');
const commentCount = document.querySelector('.comments-count');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
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
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onBigPictureEscKeydown);
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onBigPictureEscKeydown);
}

bigPictureCloseBtn.addEventListener('click', () =>{
  closeBigPicture();
});
picturesList.addEventListener('click', getBigPictureData);

const commentList = [];
miniaturesArray.forEach((item) => {
  commentList.push(item.comments);
});

const getComment = (item) => {
  const socialCommentElement = socialComment.cloneNode(true);
  socialCommentElement.querySelector('.social__picture').src = item.avatar;
  socialCommentElement.querySelector('.social__picture').alt = item.name;
  socialCommentElement.querySelector('.social__text').textContent = item.message;
  socialCommentElement.querySelector('.social__picture').width = COMMENT_WIDTH;
  socialCommentElement.querySelector('.social__picture').height = COMMENT_HEIGHT;
  return socialCommentElement;
};

const commentFragment = document.createDocumentFragment();
const addComments = (arr) => {
  arr.forEach((item) => {
    item.forEach(({avatar, message, name}) => {
      commentFragment.append(getComment({avatar, message, name}));
    });
  });
};

function getBigPictureData (evt){
  if (evt.target.tagName === 'IMG') {
    miniaturesArray.find(({description, comments, likes,url, id}) => {
      if (Number(id) === Number(evt.target.dataset.id)) {
        bigPictureImg.src = url;
        socialCaption.textContent = description;
        commentCount.textContent = comments.length;
        likesCount.textContent = likes;
        for (let i =0; i <=commentList[i].length; i++) {
          addComments(commentList);
          socialCommentList.append(commentFragment);
        }
      }
    });
    openBigPicture();
  }
}

