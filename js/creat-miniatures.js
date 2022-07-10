import{createPosts} from './data.js';
const miniatureTemplate = document.querySelector('#picture').content;
const miniaturesList = document.querySelector('.pictures');
//создаем массив с заданным количеством обьектов
const miniaturesArray = createPosts(25);

const miniatureListFragment = document.createDocumentFragment();
//перебираем массив, поочереди беря из каждого обьекта - значения ключей (свойства)
const createMiniImages = (miniatures) => {
  let counter = 1;
  miniatures.forEach(({url, likes, comment}) =>{
    const miniatureItem = miniatureTemplate.cloneNode(true);
    miniatureItem.querySelector('.picture__img').src = url;
    miniatureItem.querySelector('.picture__likes').textContent = likes;
    miniatureItem.querySelector('.picture__comments').textContent = comment.length;
    miniatureItem.querySelector('.picture__img').setAttribute('data-id',counter);
    miniaturesList.appendChild(miniatureItem);
    counter++;
  });
};
miniaturesList.appendChild(miniatureListFragment);

export {createMiniImages, miniaturesArray};

