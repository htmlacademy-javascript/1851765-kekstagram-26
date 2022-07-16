const image = document.querySelector('.img-upload__preview').querySelector('img');
const effectList = document.querySelector('.effects__list');
//находим нажатую радио-кнопку
const checkedRadio = () => {
  const checkedEffect = effectList.querySelectorAll('input[type="radio"]');
  for (let i = 0; i < checkedEffect.length; i++) {
    if (checkedEffect[i].checked) {
      return checkedEffect[i].value;
    }
  }
};
const addEffectsImage = () => {
  checkedRadio();
  effectList.addEventListener('click', () => {
    image.className = '';
    image.classList.add(`effects__preview--${checkedRadio()}`);
  });
};
export { addEffectsImage};
