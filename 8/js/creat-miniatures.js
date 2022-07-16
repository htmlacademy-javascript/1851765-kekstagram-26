const miniatureTemplate = document.querySelector('#picture').content;
const miniaturesList = document.querySelector('.pictures');

const miniatureListFragment = document.createDocumentFragment();
//перебираем массив, поочереди беря из каждого обьекта - значения ключей (свойства)
const createMiniImageList = (miniatures) => {
  miniatures.forEach(({id, url, likes, comments}) =>{
    const miniatureItem = miniatureTemplate.cloneNode(true);
    miniatureItem.querySelector('.picture__img').src = url;
    miniatureItem.querySelector('.picture__likes').textContent = likes;
    miniatureItem.querySelector('.picture__comments').textContent = comments.length;
    miniatureItem.querySelector('.picture__img').dataset.id = id;
    miniaturesList.appendChild(miniatureItem);
  });
};
miniaturesList.appendChild(miniatureListFragment);
export {createMiniImageList};

