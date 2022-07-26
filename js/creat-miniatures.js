const miniatureTemplate = document.querySelector('#picture').content;
const picturesList = document.querySelector('.pictures');

const miniatureListFragment = document.createDocumentFragment();
//перебираем массив, поочереди беря из каждого обьекта - значения ключей (свойства)
const createMiniImageList = (miniatures) => {
  miniatures.forEach(({id, url, likes, comments}) => {
    const miniatureItem = miniatureTemplate.cloneNode(true);
    miniatureItem.querySelector('.picture__img').src = url;
    miniatureItem.querySelector('.picture__img').alt = 'случайное изображение';
    miniatureItem.querySelector('.picture__likes').textContent = likes;
    miniatureItem.querySelector('.picture__comments').textContent = comments.length;
    miniatureItem.querySelector('.picture__img').dataset.id = id;
    picturesList.appendChild(miniatureItem);
  });
};
picturesList.appendChild(miniatureListFragment);
export {createMiniImageList};

