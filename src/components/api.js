const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-25',
    headers: {
        authorization: '6c7b9efb-beaf-45fa-a496-7e6a2a181f22',
        'Content-Type': 'application/json'
    }
}

// Запрос проверки результата ответа
function handleResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

// Универсальная функция запроса с проверкой ответа
function request(url, options) {
    return fetch(url, options)
        .then(handleResponse);
}

// Запрос загрузки информации о пользователе с сервера
export function getProfileInfo() {
    return request(`${config.baseUrl}/users/me`, {
        headers: config.headers})
} 

// Запрос карточек с сервера
export function getInitialCards() {
    return request(`${config.baseUrl}/cards`, {
        headers: config.headers})
} 

// Запрос обновления информации о пользователе
export function updateProfileInfo(profile) {
    return request(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: profile.name,
            about: profile.about
        }),
    })
}

// Запрос добавления новой карточки
export function addCard(card) {
    return request(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: card.name,
            link: card.link
        }),
    })
}

// Запрос удаления карточки, добавленной владельцем сайта
export function deleteMyCard(cardId) {
    return request(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers})
}

// Запрос добавления лайка
export function addLike(cardId) {
    return request(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers})
}

// Запрос снятия лайка
export function deleteLike(cardId) {
    return request(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers})
}

// Запрос на изменение аватарки
export function newAvatar(link) {
    return request(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link,
        })
    })
}