//находим целое положительное случайное число из промежутка чисел a и b.
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
getRandomPositiveInteger();
//проверка строки на кол-во символов, для переменной string использовать ''.
const checkLengthString = (string, maxString) => {
  if ((typeof string === 'string') && ( maxString - string.length >= 0))  {
    return true;
  }
  return false;
};
checkLengthString();

export {getRandomPositiveInteger, checkLengthString};
