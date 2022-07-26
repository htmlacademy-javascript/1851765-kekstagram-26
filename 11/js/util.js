//время на показ сообщения об ошибке
const ALERT_SHOW_TIME = 8000;
//сообщение об ошибке
const showAlertErr = (text) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.fontSize = '18px';
  alertContainer.style.backgroundColor = '#ffdab9';
  alertContainer.style.color = '#800000';
  alertContainer.textContent = text;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

//находим целое положительное случайное число из промежутка чисел a и b.
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//проверка строки на кол-во символов, для переменной string использовать ''.
const checkLengthString = (string, maxString) => {
  if ((typeof string === 'string') && ( maxString - string.length >= 0))  {
    return true;
  }
  return false;
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)]; // ищем случайный элемент массива
const getRandomNumber = (numbers) => getRandomPositiveInteger(numbers[0], numbers[1]); //ищем случайное число из интервала
//проверяем нажата ли клавиша esc
const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomPositiveInteger, checkLengthString, isEscapeKey, getRandomArrayElement, getRandomNumber, showAlertErr};
