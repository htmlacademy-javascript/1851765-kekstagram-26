// Поиск случайного числа в заданном диапазоне
function getRandomInRange(min, max) {
  if (min>=0 && max>min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  else {
    throw new Error('Введите правильные значения по условию, оба числа не должны быть отрицательными, второе должно быть больше первого');
  }
}

getRandomInRange();

//проверка строки на кол-во символов, для переменной string использовать ''.
function checkLengthString (string, maxString) {
  if ((typeof string === 'string') && ( maxString - string.length >= 0))  {
    return true;
  }
  return false;
}

checkLengthString();
