const imageUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
const effectsList = document.querySelector('.effects__list');
const effectLevelSliderElement = document.querySelector('.img-upload__effect-level');
const effectImageToggles = effectsList.querySelectorAll('input[type="radio"]');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelElement = document.querySelector('.effect-level__value');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});
//получаем название выбранного эффекта
const nameEffect = () => {
  for (let i = 0; i < effectImageToggles.length; i++) {
    if (effectImageToggles[i].checked) {
      return effectImageToggles[i].value;
    }
  }
};

function sliderEffectOption () {
  effectsList.addEventListener('click', () => {
    nameEffect();
    if (nameEffect() ===  'none') {
      effectLevelSliderElement.classList.add('hidden');
      imageUploadPreview.style.filter = '';
    } else {
      effectLevelSliderElement.classList.remove('hidden');
    }
    imageUploadPreview.className = '';
    imageUploadPreview.classList.add(`effects__preview--${nameEffect()}`);
    if (nameEffect() === 'chrome' || nameEffect() === 'sepia') {
      sliderElement.noUiSlider.updateOptions ({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1
      });
      sliderElement.noUiSlider.set(1);
    } else if (nameEffect() === 'marvin') {
      sliderElement.noUiSlider.updateOptions ({
        range: {
          min: 0,
          max: 100
        },
        step: 1
      });
      sliderElement.noUiSlider.set(100);
    } else if (nameEffect() === 'heat') {
      sliderElement.noUiSlider.updateOptions ({
        range: {
          min: 1,
          max: 3
        },
        step: 0.1
      });
      sliderElement.noUiSlider.set(3);
    } else if (nameEffect() === 'phobos') {
      sliderElement.noUiSlider.updateOptions ({
        range: {
          min: 0,
          max: 3
        },
        step: 0.1
      });
      sliderElement.noUiSlider.set(3);
    }
  });
}

const addEffectForImage = () => {
  sliderEffectOption();
  sliderElement.noUiSlider.on('update', () => {
    effectLevelElement.value = sliderElement.noUiSlider.get();
    const sliderValue = sliderElement.noUiSlider.get();
    const nameEffectForImage = nameEffect();
    switch (nameEffectForImage) {
      case 'chrome':
        imageUploadPreview.style.filter = `grayscale(${sliderValue})`;
        break;
      case 'sepia':
        imageUploadPreview.style.filter = `sepia(${sliderValue})`;
        break;
      case 'marvin':
        imageUploadPreview.style.filter = `invert(${sliderValue}%)`;
        break;
      case 'phobos':
        imageUploadPreview.style.filter = `blur(${sliderValue}px)`;
        break;
      case 'heat':
        imageUploadPreview.style.filter = `brightness(${sliderValue})`;
        break;
      default:
        imageUploadPreview.style.filter = '';
    }
  });
};
export { addEffectForImage };
