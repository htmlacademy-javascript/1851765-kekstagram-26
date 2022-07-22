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
//находим нажатую радио-кнопку
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
        start: 100,
        step: 1
      });
      sliderElement.noUiSlider.set(100);
    } else if (nameEffect() === 'heat') {
      sliderElement.noUiSlider.updateOptions ({
        range: {
          min: 1,
          max: 3
        },
        start: 3,
        step: 0.1
      });
      sliderElement.noUiSlider.set(3);
    } else if (nameEffect() === 'phobos') {
      sliderElement.noUiSlider.updateOptions ({
        range: {
          min: 0,
          max: 3
        },
        start: 3,
        step: 0.1
      });
    }
  });
}

const effectForImageChange = () => {
  sliderEffectOption();
  sliderElement.noUiSlider.on('update', () => {
    effectLevelElement.value = sliderElement.noUiSlider.get();
    const sliderValue = sliderElement.noUiSlider.get();
    if (nameEffect() === 'chrome') {
      imageUploadPreview.style.filter = `grayscale(${sliderValue})`;
    } else if (nameEffect() === 'sepia') {
      imageUploadPreview.style.filter = `sepia(${sliderValue})`;
    } else if (nameEffect() === 'marvin') {
      imageUploadPreview.style.filter = `invert(${sliderValue}%)`;
    } else if (nameEffect() === 'phobos') {
      imageUploadPreview.style.filter = `blur(${sliderValue}px)`;
    } else if (nameEffect() === 'heat') {
      imageUploadPreview.style.filter = `brightness(${sliderValue})`;
    }
  });
};
export { effectForImageChange };
