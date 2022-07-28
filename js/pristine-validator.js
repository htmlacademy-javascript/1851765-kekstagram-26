const HASHTAGS_MAX_QUANTITY = 5;
const DESCRIPTION_MAX_LENGTH = 140;
const hashtagsField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');
const formElement = document.querySelector('#upload-select-image');
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
};

const pristine = new Pristine(formElement,pristineConfig);

//проверка на количество хешт-егов
const checkQuantityHashtags = (str) => {
  const hashtags = str.trim().split(' ');
  return hashtags.length <= HASHTAGS_MAX_QUANTITY;
};

//проверка уникальность хешт-егов
const checkUniqueHashtags = (str) => {
  const hashtags = str.trim().toLowerCase().split(' ');
  return hashtags.length === new Set(hashtags).size;
};

//проверка на спецсимволы и # вначале хеш-тегов
const checkValidStr = (str) => {
  const hashtags = str.trim().split(' ');
  if(hashtagsField.value === '') {
    return true;
  } else {
    return hashtags.every((item) => re.test(item));
  }
};

//проверка кол-во символов в описании изображения
const checkDescriptionLength = (str) => str.length <= DESCRIPTION_MAX_LENGTH;

// валидация хеш-тегов
pristine.addValidator(
  hashtagsField,
  checkQuantityHashtags,
  `ERROR: Максимальное количество допустимых хешт-егов - ${HASHTAGS_MAX_QUANTITY}`
);
pristine.addValidator(
  hashtagsField,
  checkUniqueHashtags,
  'ERROR: Хеш-теги не должны повторяться, #smile и #sMIle - это одинаковые'
);

pristine.addValidator(
  hashtagsField,
  checkValidStr,
  `ERROR: Хеш-тег должен начинаться с # и состоять из букв и цифр,
  не может содержать пробелы и спецсимволы. Не больше 20 символов`
);
// валидация описания к изображению
pristine.addValidator(
  descriptionField,
  checkDescriptionLength,
  `ERROR: Максимальное количество символов - не больше ${DESCRIPTION_MAX_LENGTH}.`
);

export {pristine};
