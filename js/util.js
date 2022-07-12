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

export {getRandomPositiveInteger, checkLengthString, isEscapeKey, getRandomArrayElement, getRandomNumber};
