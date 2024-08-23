
const BASE_URL = "https://mesto.nomoreparties.co/v1/wff-cohort-20/";

// Запрос проверки результата ответа
const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  else {
    throw new Error('Ошибка!');
  }
};

const apiURLpart = {
  user: "users/me",
  cards: "cards",
  likes: "cards/likes"
};

const headers = {
  Authorization: '095639e2-4f40-4dda-8dd3-5fd55d22a0d0',
  "Content-Type": "application/json"
};

// Запрос загрузки информации о пользователе с сервера
const getProfileAPI = () => {
  const userURL = BASE_URL + `${apiURLpart.user}`;
  return fetch(userURL, {
    method: "GET",
    headers
  })
  .then(handleResponse)
};

// Запрос обновления информации о пользователе
const sendProfileAPI = (name, about) => {
  const userURL = BASE_URL + `${apiURLpart.user}`;
  return fetch(userURL, {
    method: "PATCH",
    body: JSON.stringify({
      name,
      about
    }),
    headers
  })
  .then(handleResponse)
};

// Запрос на изменение аватара
const sendAvatarAPI = (avatar) => {
  const userAvatarURL = BASE_URL + `${apiURLpart.user}/avatar`;
  return fetch(userAvatarURL, {
    method: "PATCH",
    body: JSON.stringify({
      avatar 
    }),
    headers
  })
  .then(handleResponse)
};

// Запрос карточек с сервера
const getCardsAPI = () => {
  const cardsURL = BASE_URL + `${apiURLpart.cards}`;
  return fetch(cardsURL, {
    method: "GET",
    headers
  })
  .then(handleResponse)
};

// Запрос добавления новой карточки
const sendNewCardAPI = (name, link) => {
  const cardsURL = BASE_URL + `${apiURLpart.cards}`;
  return fetch(cardsURL, {
    method: "POST",
    body: JSON.stringify({
      name,
      link
    }),
    headers
  })
  .then(handleResponse)
};

// Запрос добавления лайка
const likeCardAPI = (id) => {
  const likesURL = BASE_URL + `${apiURLpart.likes}/${id}`; 
  return fetch(likesURL, {
    method: "PUT",
    headers
  })
  .then(handleResponse)
}

// Запрос снятия лайка
const delLikeCardAPI = (id) => {
  const likesURL = BASE_URL + `${apiURLpart.likes}/${id}`; 
  return fetch(likesURL, {
    method: "DELETE",
    headers
  })
  .then(handleResponse)
};

const deleteCard = (cardId) => {
  const delCard = BASE_URL + `/cards/${cardId}`;
  return fetch(delCard, {
    method: "DELETE",
    headers
  })
  .then(handleResponse);
};


export { getProfileAPI, getCardsAPI, sendProfileAPI, sendNewCardAPI, likeCardAPI, delLikeCardAPI, sendAvatarAPI, deleteCard }