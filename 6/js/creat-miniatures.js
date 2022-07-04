import{createPosts} from './data.js';
const miniatureTemplate = document.querySelector('#picture').content;
const miniaturesList = document.querySelector('.pictures');

const createMiniatures = createPosts(25);

const miniatureListFragment = document.createDocumentFragment();

createMiniatures.forEach(({url, likes, comment}) =>{
  const picture = document.createElement('div');
  const miniatureItem = miniatureTemplate.cloneNode(true);
  miniatureItem.querySelector('.picture__img').src = url;
  miniatureItem.querySelector('.picture__likes').textContent = likes;
  miniatureItem.querySelector('.picture__comments').textContent = comment.length;
  picture.appendChild(miniatureItem);
  miniaturesList.appendChild(picture);
});

miniaturesList.appendChild(miniatureListFragment);

