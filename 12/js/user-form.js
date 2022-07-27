import { pristine } from './pristine-validator.js';
import { openFormLoad } from './form-load.js';
import { isEscapeKey } from './util.js';
import { sendData } from './api.js';
import { onFormLoadEscKeydown } from './form-load.js';
const formElement = document.querySelector('#upload-select-image');
const imageInput = document.querySelector('#upload-file');
const imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
const uploadSubmitBtn = document.querySelector('#upload-submit');
const successMessageTemplate = document.querySelector('#success').content;
const errorMessageTemplate = document.querySelector('#error').content;
const body = document.body;

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

const loadYourPicture = () => {
  imageInput.addEventListener('change', loadPicture);
};

const blockSubmitBtn = () => {
  uploadSubmitBtn.disabled = true;
};

const unblockSubmitBtn = () => {
  uploadSubmitBtn.disabled = false;
};

const showErrorMessage = () => {
  document.removeEventListener('keydown', onFormLoadEscKeydown);
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const closeErrMessageBtn = errorMessage.querySelector('.error__button');
  body.append(errorMessage);
  const messageField = document.querySelector('.error');
  messageField.style.zIndex = '100';
  const onErrMessageEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeErrorMessage();
    }
  };

  function closeErrorMessage () {
    document.addEventListener('keydown', onFormLoadEscKeydown);
    document.removeEventListener('keydown', onErrMessageEscKeydown);
    closeErrMessageBtn.removeEventListener('click', closeErrorMessage);
    messageField.remove();
  }

  document.addEventListener('keydown', onErrMessageEscKeydown);
  closeErrMessageBtn.addEventListener('click', closeErrorMessage);
  messageField.addEventListener('click', (evt) => {
    if (evt.target !== messageField) {
      return evt;
    }
    closeErrorMessage();
  });
};


const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  const closeSuccessMessageBtn = successMessage.querySelector('.success__button');
  body.append(successMessage);
  const messageField = document.querySelector('.success');

  const onSuccessMessageEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeSuccessMessage();
    }
  };

  function closeSuccessMessage() {
    document.removeEventListener('keydown', onSuccessMessageEscKeydown);
    closeSuccessMessageBtn.removeEventListener('click', closeSuccessMessage);
    messageField.remove();
  }
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  closeSuccessMessageBtn.addEventListener('click', closeSuccessMessage);
  messageField.addEventListener('click', (evt) => {
    if (evt.target !== messageField) {
      return evt;
    }
    closeSuccessMessage();
  });
};

const setUserFormSubmit = (onSuccess) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitBtn();
      sendData(
        () => {
          onSuccess();
          unblockSubmitBtn();
          showSuccessMessage();
        },
        () => {
          unblockSubmitBtn();
          showErrorMessage();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setUserFormSubmit, loadYourPicture, showErrorMessage};
