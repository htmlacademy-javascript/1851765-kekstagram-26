const CONTROL_SCALE_STEP = 25;
const SCALE_VALUE_MIN = 25;
const SCALE_VALUE_MAX = 100;

const controlScaleImage = () => {
  const controlSmallerScale = document.querySelector('.scale__control--smaller');
  const controlBiggerScale = document.querySelector('.scale__control--bigger');
  const controlValueScale = document.querySelector('.scale__control--value');
  const controlElements = document.querySelector('.scale');
  const imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
  controlElements.addEventListener('click', (evt) => {
    if (evt.target === controlBiggerScale && (parseFloat(controlValueScale.value) <= (SCALE_VALUE_MAX - CONTROL_SCALE_STEP) )) {
      controlValueScale.value = `${parseFloat(controlValueScale.value) + CONTROL_SCALE_STEP}%`;
    } else if ((evt.target === controlSmallerScale && (parseFloat(controlValueScale.value) > SCALE_VALUE_MIN ))) {
      controlValueScale.value = `${parseFloat(controlValueScale.value) - CONTROL_SCALE_STEP}%`;
    }
    imagePreview.style.transform = `scale(${parseFloat(controlValueScale.value)/100})`;
  });
};
export { controlScaleImage };
