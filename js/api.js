const urlGetData = 'https://26.javascript.pages.academy/kekstagram/data';
const urlSendData = 'https://26.javascript.pages.academy/kekstagram';
const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(
      urlGetData
    );
    const images = await response.json();
    onSuccess(images);
  } catch(error) {
    onFail('Что-то пошло не так. Попробуйте перезагрузить страницу или зайти позже.');
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
