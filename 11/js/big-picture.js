import {isEscapeKey} from './util.js';
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
const COMMENT_INCREMENT = 5;
let addCommentsHandler = null;

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
  bigPictureCloseBtn.addEventListener('click', closeBigPicture);
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsLoaderBtn.removeEventListener ('click', addCommentsHandler);
  document.removeEventListener('keydown', onBigPictureEscKeydown);
  bigPictureCloseBtn.removeEventListener('click',closeBigPicture);
}

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

  const addMoreComents = () => {
    onClickAddComments(copyCommentsList);
  };

  addCommentsHandler = addMoreComents;

  if (copyCommentsList.length <= COMMENT_INCREMENT) { //проверяем на кол-вл комментов, если меньше 6 убираем кнопку "еще" и отрисовываем комменты
    commentsLoaderBtn.classList.add('hidden');
    commentCountPage.textContent = copyCommentsList.length;
    addComments(copyCommentsList);

  } else { //показыввем кнопку,вешаем слушатель на нее и забираем первые 5 коментов
    commentCountPage.textContent = COMMENT_INCREMENT;
    commentsLoaderBtn.classList.remove('hidden');
    addComments(copyCommentsList.splice(0, COMMENT_INCREMENT));

    commentsLoaderBtn.addEventListener ('click', addCommentsHandler);
  }
};

function onClickAddComments (copyCommentsList) {
  if( copyCommentsList.length <= COMMENT_INCREMENT) {
    commentsLoaderBtn.classList.add('hidden');
    commentCountPage.textContent = Number(commentCountPage.textContent) + copyCommentsList.length;
    commentsLoaderBtn.removeEventListener ('click', addCommentsHandler);
  } else {
    commentCountPage.textContent = Number(commentCountPage.textContent) + COMMENT_INCREMENT;
  }
  addComments(copyCommentsList.splice(0, COMMENT_INCREMENT));
}
const viewBigPicture = (dataImages) => {
  picturesList.addEventListener('click', getBigPictureData);
  function getBigPictureData (evt){
    if (evt.target.className === 'picture__img') {
      const photo = dataImages.find(({id}) => Number(id) === Number(evt.target.dataset.id));
      if (photo) {
        bigPictureImg.src = photo.url;
        bigPictureImg.alt = '';
        socialCaption.textContent = photo.description;
        commentCount.textContent = photo.comments.length;
        likesCount.textContent = photo.likes;
        socialCommentList.innerHTML = '';
        addNewComments(photo.comments);
      }
      openBigPicture();
    }
  }
};


export {viewBigPicture};
