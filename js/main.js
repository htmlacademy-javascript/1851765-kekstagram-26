//находим целое положительное случайное число из промежутка чисел a и b.
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}
getRandomPositiveInteger();

//проверка строки на кол-во символов, для переменной string использовать ''.
const checkLengthString = function (string, maxString) {
  if ((typeof string === 'string') && ( maxString - string.length >= 0))  {
    return true;
  }
  return false;
};
checkLengthString();

let commentId = 1;
const commentAvatar = [1,6]; //количество аватарок
const maxCommentsQuantity = [1,4]; //случайное число из промежутка для количества комментариев под постом
const quantityPosts = 25; // количество постов с комментариями
const likesForPost = [15, 200]; // случайное количество лайков под постом из интервала
const commentMessages = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
]; // комментарии
const commentAuthors = ['Джонни Депп',
  'Леонардо ди Каприо',
  'Брэд Питт',
  'Том Круз',
  'Николас Кейдж',
  'Роберт де Ниро',
  'Джек Николсон',
  'Мэтт Дэймон',
  'Мэтью МакКонахи',
  'Джулия Робертс',
  'Анджелина Джоли',
  'Скарлетт Йоханссон',
  'Меган Фокс',
  'Дженнифер Энистон',
  'Джессика Альба',
  'Деми Мур']; // имена комментаторов
const postDescriptions = ['Кто богаты, тем и рады',
  'Главное, чтобы тебя дома ждали, а не поджидали',
  'Всем желаю передохнуть! Ударение по вкусу.',
  'Я человек мирный. Мне нужен мир! Желательно весь…',
  'Хватит париться, живи как нравится!',
  'Можно не бояться быть дураком. Кругом все свои.',
  'Меня деньги не волнуют! Они меня успокаивают.']; // описания постов
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)]; // ищем случайный элемент массива
const getRandomNumber = (numbers) => getRandomPositiveInteger(numbers[0], numbers[1]); //ищем случайное число из интервала
// создаем массив из случайного количества комментариев
const createArrayComments = function() {
  const commentsForPost =[];
  for (let i=1; i <= getRandomNumber(maxCommentsQuantity);  i++) {
    commentsForPost.push({
      id: commentId,
      avatar: `img/avatar-${  getRandomNumber(commentAvatar)  }.svg`,
      message: getRandomArrayElement(commentMessages),
      name: getRandomArrayElement(commentAuthors)
    });
    commentId += 1;
  }
  return commentsForPost;
};
//создаем массив из случайного поста-фото + массив комментарий
const createNewPost = function(postId){
  return {
    id: postId,
    url: `photos/${  postId  }.jpg`,
    likes: getRandomNumber(likesForPost),
    description: getRandomArrayElement(postDescriptions),
    comment: createArrayComments()
  };
};

//создание нужного количества постов
const createPosts = function(quantity) {
  const fullPost = [];
  for(let j = 1; j <= quantity; j++){
    createArrayComments();
    fullPost.push(createNewPost(j));
  }
  return fullPost;
};
createPosts(quantityPosts);

