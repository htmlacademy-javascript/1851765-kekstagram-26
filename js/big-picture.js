import {isEscapeKey} from './util.js';
const COMMENT_WIDTH = 35;
const COMMENT_HEIGHT = 35;
const COMMENT_INCREMENT = 5;
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
const classNameMiniImage = 'picture__img';
let addCommentsHandler = null;

const closeBigPictureForEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture () {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', closeBigPictureForEscKeydown);
  bigPictureCloseBtn.addEventListener('click', closeBigPicture);
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsLoaderBtn.removeEventListener ('click', addCommentsHandler);
  document.removeEventListener('keydown', closeBigPictureForEscKeydown);
  bigPictureCloseBtn.removeEventListener('click',closeBigPicture);
}

const getComment = (item) => {
  const socialCommentElement = socialComment.cloneNode(true);
  const avatarImage = socialCommentElement.querySelector('.social__picture');
  avatarImage.src = item.avatar;
  avatarImage.alt = item.name;
  avatarImage.width = COMMENT_WIDTH;
  avatarImage.height = COMMENT_HEIGHT;
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

const addDefiniteComments = (commentsList) => {
  const copyCommentsList = commentsList.slice();//копируем массив коментов
  socialCommentList.innerHTML = ''; //обнуляем комментарии

  const addMoreComents = () => {
    onClickAddComments(copyCommentsList);
  };

  addCommentsHandler = addMoreComents;

  if (copyCommentsList.length <= COMMENT_INCREMENT) { //проверяем на кол-вл комментов, если меньше 6 убираем кнопку "еще" и отрисовываем комменты
    commentsLoaderBtn.classList.add('hidden');
    commentCountPage.textContent = String(copyCommentsList.length);
    addComments(copyCommentsList);

  } else { //показываем кнопку,вешаем слушатель на нее и забираем первые 5 комментов
    commentCountPage.textContent = String(COMMENT_INCREMENT);
    commentsLoaderBtn.classList.remove('hidden');
    addComments(copyCommentsList.splice(0, COMMENT_INCREMENT));

    commentsLoaderBtn.addEventListener ('click', addCommentsHandler);
  }
};

function onClickAddComments (copyCommentsList) {
  if( copyCommentsList.length <= COMMENT_INCREMENT) {
    commentsLoaderBtn.classList.add('hidden');
    commentCountPage.textContent = String(Number(commentCountPage.textContent) + copyCommentsList.length);
    commentsLoaderBtn.removeEventListener ('click', addCommentsHandler);
  } else {
    commentCountPage.textContent = String(Number(commentCountPage.textContent) + COMMENT_INCREMENT);
  }
  addComments(copyCommentsList.splice(0, COMMENT_INCREMENT));
}
const viewBigPicture = (dataImages) => {
  picturesList.addEventListener('click', getBigPictureData);
  function getBigPictureData (evt){
    if (evt.target.className === classNameMiniImage) {
      const photo = dataImages.find(({id}) => Number(id) === Number(evt.target.dataset.id));
      if (photo) {
        bigPictureImg.src = photo.url;
        bigPictureImg.alt = '';
        socialCaption.textContent = photo.description;
        commentCount.textContent = String(photo.comments.length);
        likesCount.textContent = String(photo.likes);
        socialCommentList.innerHTML = '';
        addDefiniteComments(photo.comments);
      }
      openBigPicture();
    }
  }
};


export {viewBigPicture};
