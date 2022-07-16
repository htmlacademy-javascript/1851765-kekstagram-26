import { pristine } from './pristine-validator.js';
import { isEscapeKey } from './util.js';
const imageInput = document.querySelector('#upload-file');
const overlayElement = document.querySelector('.img-upload__overlay');
const imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
const body = document.querySelector('body');
const formCloseBtn = document.querySelector('#upload-cancel');
const textHashtagsField = document.querySelector('.text__hashtags');
const formElement = document.querySelector('#upload-select-image');
// const uploadSubmitBtn = document.querySelector('#upload-submit');

const textDescriptionField = document.querySelector('.text__description');


const onPictureFormEscKeydown = (evt) => {
  if((textHashtagsField === document.activeElement) || (textDescriptionField === document.activeElement)){
    return evt;
  } else {
    if (isEscapeKey(evt)) {
      closeFormLoad();
    }
  }
};

function openFormLoad() {
  overlayElement.classList.remove('hidden');
  body.classList.remove('modal-open');

  document.addEventListener('keydown', onPictureFormEscKeydown);
}
//закрывем окно редактирования и удаляее слушатель но esc
function closeFormLoad () {
  body.classList.add('modal-open');
  overlayElement.classList.add('hidden');

  document.removeEventListener('keydown', onPictureFormEscKeydown);
}

function loadPicture (event) {
  //проверяем что пользователь выбрал файл
  if(!event.target.files.length) {
    return;
  }
  const image = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (ev) => {
    imagePreview.src = ev.target.result;
  };
  reader.readAsDataURL(image);
  openFormLoad();
}
formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    evt.target.submit();
    closeFormLoad ();
  }
});

formCloseBtn.addEventListener('click', () => closeFormLoad());
imageInput.addEventListener('change', loadPicture);

export {loadPicture};
