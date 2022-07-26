const controlScaleImage = () => {
  const controlSmallerScale = document.querySelector('.scale__control--smaller');
  const controlBiggerScale = document.querySelector('.scale__control--bigger');
  const controlValueScale = document.querySelector('.scale__control--value');
  const controlElements = document.querySelector('.scale');
  const image = document.querySelector('.img-upload__preview').querySelector('img');
  controlElements.addEventListener('click', (evt) => {
    if (evt.target === controlBiggerScale && (parseFloat(controlValueScale.value) <=75 )) {
      controlValueScale.value = `${parseFloat(controlValueScale.value) + 25}%`;
    } else if ((evt.target === controlSmallerScale && (parseFloat(controlValueScale.value) >=26 ))) {
      controlValueScale.value = `${parseFloat(controlValueScale.value) - 25}%`;
    }
    image.style.transform = `scale(${parseFloat(controlValueScale.value)/100})`;
  });
};
export { controlScaleImage };
