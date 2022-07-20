import {isEscapeKey} from './util.js';
import {miniaturesArray} from './data.js';
const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img').querySelector('img');
const commentCount = document.querySelector('.comments-count');
const commentCountPage = document.querySelector('.comments-count--page');
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

const addComments = (commentsList) => {
  commentsList.forEach((comment) => {
    commentFragment.append(getComment(comment));
  });
  socialCommentList.append(commentFragment);
};

const addNewComments = (commentsList) => {
  const copyCommentsList = commentsList.slice();//копируем массив коментов
  socialCommentList.innerHTML = ''; //обнуляем комментарии

  if (copyCommentsList.length <= 5) { //проверяем на кол-вл комментов, если меньше 6 убираем кнопку "еще" и отрисовываем комменты
    commentsLoaderBtn.classList.add('hidden');
    commentCountPage.textContent = copyCommentsList.length;
    addComments(copyCommentsList);

  } else { //показыввем кнопку,вешаем слушатель на нее и забираем первые 5 коментов
    commentCountPage.textContent = 5;
    commentsLoaderBtn.classList.remove('hidden');
    addComments(copyCommentsList.splice(0, 5));

    commentsLoaderBtn.addEventListener ('click', () => onClickAddComments(copyCommentsList));
  }
};

function onClickAddComments (copyCommentsList) {
  if( copyCommentsList.length <= 5) {
    commentsLoaderBtn.classList.add('hidden');
    commentCountPage.textContent = Number(commentCountPage.textContent) + copyCommentsList.length;
  } else {
    commentCountPage.textContent = Number(commentCountPage.textContent) + 5;
  }
  addComments(copyCommentsList.splice(0, 5));
}

function getBigPictureData (evt){
  if (evt.target.tagName === 'IMG') {
    const photo = miniaturesArray.find(({id}) => Number(id) === Number(evt.target.dataset.id));
    if (photo) {
      bigPictureImg.src = photo.url;
      socialCaption.textContent = photo.description;
      commentCount.textContent = photo.comments.length;
      likesCount.textContent = photo.likes;
      socialCommentList.innerHTML = '';
      addNewComments(photo.comments);
    }
  }
  openBigPicture();
}

const viewBigPicture = () => {
  picturesList.addEventListener('click', getBigPictureData);
};


export {viewBigPicture};
