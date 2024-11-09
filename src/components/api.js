
export {
  getResponseData,
  logError,
  getCardsApi,
  getUserInfoApi,
  patchProfileInfoApi,
  postNewCardApi,
  putLikeOnCardApi,
  deleteLikeFromCardApi,
  deleteCardFromServerApi,
  patchAvatarApi
};

const COHORT = "wff-cohort-25";
const TOKEN = "6c7b9efb-beaf-45fa-a496-7e6a2a181f22";
const BASE_URL = "https://mesto.nomoreparties.co/v1";

function getResponseData(res) {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

function logError(error) {
  return console.log(`Ошибка.....: ${error}`);
}

const getCardsApi = () => {
  return fetch(BASE_URL + '/' + COHORT + '/cards', {
      method: 'GET',
      headers: {
          authorization: TOKEN
      }
  })
      .then(res => getResponseData(res))
}

const getUserInfoApi = () => {
  return fetch(BASE_URL + '/' + COHORT + '/users/me', {
      method: 'GET',
      headers: {
          authorization: TOKEN
      }
  })
      .then(res => getResponseData(res))
}

const patchProfileInfoApi = (userName, userDescription) => {
  return fetch(BASE_URL + '/' + COHORT + '/users/me', {
      method: 'PATCH',
      headers: {
          authorization: TOKEN,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          name: userName.value,
          about: userDescription.value
      })
  })
      .then(res => getResponseData(res))
}

const postNewCardApi = (cardName, cardLink) => {
  return fetch(BASE_URL + '/' + COHORT + '/cards', {
      method: 'POST',
      headers: {
          authorization: TOKEN,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          name: cardName.value,
          link: cardLink.value
      })
  })
      .then(res => getResponseData(res))
}

const putLikeOnCardApi = (cardId) => {
  return fetch(BASE_URL + '/' + COHORT + '/cards/likes/' + cardId, {
      method: 'PUT',
      headers: {
          authorization: TOKEN
      }
  })
      .then(res => getResponseData(res))
}

const deleteLikeFromCardApi = (cardId) => {
  return fetch(BASE_URL + '/' + COHORT + '/cards/likes/' + cardId, {
      method: 'DELETE',
      headers: {
          authorization: TOKEN
      }
  })
      .then(res => getResponseData(res))
}

const deleteCardFromServerApi = (cardId) => {
  return fetch(BASE_URL + '/' + COHORT + '/cards/' + cardId, {
      method: 'DELETE',
      headers: {
          authorization: TOKEN
      }
  })
      .then(res => getResponseData(res))
}

const patchAvatarApi = (avatarLink) => {
  return fetch(BASE_URL + '/' + COHORT + '/users/me/avatar', {
      method: 'PATCH',
      headers: {
          authorization: TOKEN,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          avatar: avatarLink.value,
      })
  })
      .then(res => getResponseData(res))
}