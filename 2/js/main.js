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

//проверка строки на кол-во символов
function checkLengthString (string, maxString) {
  if( maxString - string.length >= 0) {
    throw new Error(`Осталось ввести: ${ maxString - string.length} символов.`);
  } else {
    throw new Error(`Допустимое количество символов: ${ maxString} . У Вас перебор =)`);
  }
}

checkLengthString();
