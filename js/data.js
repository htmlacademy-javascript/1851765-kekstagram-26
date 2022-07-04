import {getRandomPositiveInteger} from './util.js';
//создание постов
let commentId = 1; //начальное число id
const commentAvatar = [1,6]; //количество аватарок
const maxCommentsQuantity = [1,4]; //случайное число из промежутка для количества комментариев под постом
const likesForPost = [15, 200]; // случайное количество лайков под постом из интервала
// комментарии
const commentMessages = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
// имена комментаторов
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
  'Деми Мур'];
  // описания постов
const postDescriptions = ['Кто богаты, тем и рады',
  'Главное, чтобы тебя дома ждали, а не поджидали',
  'Всем желаю передохнуть! Ударение по вкусу.',
  'Я человек мирный. Мне нужен мир! Желательно весь…',
  'Хватит париться, живи как нравится!',
  'Можно не бояться быть дураком. Кругом все свои.',
  'Меня деньги не волнуют! Они меня успокаивают.'];
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)]; // ищем случайный элемент массива
const getRandomNumber = (numbers) => getRandomPositiveInteger(numbers[0], numbers[1]); //ищем случайное число из интервала
// создаем массив из случайного количества комментариев
const createArrayComments = () => {
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
//создаем объект из случайного поста-фото + массив комментарий
const createNewPost = (postId) => ({
  id: postId,
  url: `photos/${  postId  }.jpg`,
  likes: getRandomNumber(likesForPost),
  description: getRandomArrayElement(postDescriptions),
  comment: createArrayComments()
});

//создание нужного количества постов в массиве
const createPosts = (count) => {
  const arrayPosts = [];
  for(let j = 1; j <= count; j++){
    createArrayComments();
    arrayPosts.push(createNewPost(j));
  }
  return arrayPosts;
};
createPosts(25);
export {createPosts};
