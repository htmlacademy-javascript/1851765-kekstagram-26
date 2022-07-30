import { isEscapeKey } from './util.js';

const textDescriptionField = document.querySelector('.text__description');
const effectLevelElement = document.querySelector('.img-upload__effect-level'); // слайдер эффектов
const formCloseBtn = document.querySelector('#upload-cancel');
const textHashtagsField = document.querySelector('.text__hashtags');
const body = document.querySelector('body');
const overlayElement = document.querySelector('.img-upload__overlay');
const formElement = document.querySelector('#upload-select-image');


const closeFormLoadForEscKeydown = (evt) => {
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
  body.classList.add('modal-open');
  effectLevelElement.classList.add('hidden');
  formCloseBtn.addEventListener('click', closeFormLoad);
  document.addEventListener('keydown', closeFormLoadForEscKeydown);
}
//закрывем окно редактирования и удаляет слушатель на esc
function closeFormLoad () {
  body.classList.remove('modal-open');
  overlayElement.classList.add('hidden');
  const imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
  imagePreview.style.transform = 'scale(1)'; //обнуляем масштаб изображения
  imagePreview.className = ''; //обнуляем классы на изображении
  imagePreview.style.filter = ''; //удаляем эффект фильтра на изображении
  formElement.reset(); // обнуляем формы
  document.removeEventListener('keydown', closeFormLoadForEscKeydown);
}

export {openFormLoad, closeFormLoad, closeFormLoadForEscKeydown};

