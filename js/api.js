const urlGetData = 'https://26.javascript.pages.academy/kekstagram/data';
const urlSendData = 'https://26.javascript.pages.academy/kekstagram';
const getData = async (successForMiniImage, succesForBigPicture, onFail) => {
  try {
    const response = await fetch(
      urlGetData
    );

    if (!response.ok) {
      throw new Error('Извините. Сервер временно недоступен. Попробуйте перезагрузить страницу или зайти позже.');
    }
    const images = await response.json();
    successForMiniImage(images);
    succesForBigPicture(images);
  } catch(error) {
    onFail(error.message);
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch (
      urlSendData,
      {
        method: 'POST',
        body,
      }
    );

    if (!response.ok) {
      throw new Error;
    }
    onSuccess();
  } catch(err) {
    onFail();
  }
};

export {getData, sendData};
