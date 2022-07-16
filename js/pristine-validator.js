const hashtagsField = document.querySelector('.text__hashtags');
const formElement = document.querySelector('#upload-select-image');
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
};

const pristine = new Pristine(formElement,pristineConfig);

//проверка на количество хештегов
const checkQuantityHashtags = (str) => {
  const hashtags = str.split(' ');
  return hashtags.length <= 5;
};
//проверка уникальность хештегов
const checkUniqueHashtags = (str) => {
  const hashtags = str.toLowerCase().split(' ');
  return hashtags.length === new Set(hashtags).size;
};
//проверка на спецсимволы и # вначале
const checkValidStr = (str) => {
  const hashtags = str.toLowerCase().split(' ');
  return hashtags.every((item) =>  re.test(item));
};

// валидация хештегов
pristine.addValidator(
  hashtagsField,
  checkQuantityHashtags,
  'ERROR: Максимальное количество допустимых хешт-егов - 5'
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

export {pristine};
