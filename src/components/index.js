import '../pages/index.css'; // импорт главного файла стилей 

import {createCard, cardDelete, likeCard} from './card.js';
import {openModal, closeModal} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {getProfileInfo, getInitialCards, updateProfileInfo, addCard, getAvatar, newAvatar} from './api.js'
const placesList = document.querySelector('.places__list'); // контейнер для карточек

const modalProfile = document.querySelector('.popup_type_edit'); // считывание модального окна Профиль
const modalNewCard = document.querySelector('.popup_type_new-card'); // считывание модального окна Новая карточка
const modalNewAvatar = document.querySelector('.popup_type_avatar'); // считывание модального окна Новый аватар

const buttonOpenModalProfile = document.querySelector('.profile__edit-button'); // кнопка открытия модального окна Профиль
const buttonOpenModalNewCard = document.querySelector('.profile__add-button'); //кнопка открытия модального окна Новая карточка
const buttonOpenModalNewAvatar = document.querySelector('.profile__image'); //кнопка открытия модального окна Новый аватар

const popupCloseButtons = document.querySelectorAll('.popup__close'); // кнопка закрытия модальных окон

const formElementProfile = modalProfile.querySelector('.popup__form'); // Находим форму ПРОФИЛЬ в DOM
const nameInput  = formElementProfile.querySelector('.popup__input_type_name'); // Находим поля формы в DOM => Имя
const jobInput  = formElementProfile.querySelector('.popup__input_type_description'); // // Находим поля формы в DOM => Занятие 

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const formElementCard = modalNewCard.querySelector('.popup__form');
const imageName = formElementCard.querySelector('.popup__input_type_card-name'); // Находим поля формы в DOM => Имя карточки
const urlImage = formElementCard.querySelector('.popup__input_type_url'); // Находим поля формы в DOM => Ссылка на изображение

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

const formElementAvatar = modalNewAvatar.querySelector('.popup__form'); // Находим форму аватара в DOM
const urlAvatar = formElementAvatar.querySelector('.popup__input_type_url_img'); // Находим поле формы аватара  в DOM => Ссылка на изображение
const avatarImg = document.querySelector('.profile__image');

let userId = null;

// включение валидации вызовом enableValidation
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

//обработчики события открытия попапов
buttonOpenModalProfile.addEventListener('click', () => {
    openModal(modalProfile);
    clearValidation(formElementProfile, validationConfig);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
});
buttonOpenModalNewCard.addEventListener('click', () => {
    openModal(modalNewCard);
    clearValidation(formElementCard, validationConfig);
});
buttonOpenModalNewAvatar.addEventListener('click', () => {
    openModal(modalNewAvatar);
    clearValidation(formElementAvatar, validationConfig);
});

// обработчик события закрытия попапов
popupCloseButtons.forEach((item) => {
    item.addEventListener("click", () => {
      const modalElement = item.closest('.popup');
      closeModal(modalElement);
    });
});

//функция обработчик отправки формы изменения аватарки
function handleFormSubmitAvatar(evt) {
    evt.preventDefault();
    evt.submitter.textContent = "Сохранение...";
    const newLinkAvatar = urlAvatar.value;
    newAvatar(newLinkAvatar)
        .then((newLink) => {
            avatarImg.style.backgroundImage = `url(${newLink.avatar})`;
            closeModal(modalNewAvatar);
            formElementAvatar.reset();
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            evt.submitter.textContent = "Сохранить";
        })
}

// Изменить аватарку при нажатии на кнопку "Сохранить"
formElementAvatar.addEventListener('submit', handleFormSubmitAvatar);

//функция обработчик отправки формы редактирования профиля
function handleFormSubmitProfile(evt) {
    evt.preventDefault(); 
    evt.submitter.textContent = 'Сохранение...';
    const userData = {
        name: nameInput.value,
        about: jobInput.value};
    updateProfileInfo(userData)
        .then(() => {
            profileTitle.textContent = nameInput.value;
            profileDescription.textContent = jobInput.value;
            closeModal(modalProfile);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            evt.submitter.textContent = 'Сохранить';
        })
}

// Изменить данные при нажатии на кнопку "Сохранить"
formElementProfile.addEventListener('submit', handleFormSubmitProfile);

//функция обработчик отправки формы добавление карточки
function handleFormSubmitCard(evt) {
    evt.preventDefault();
    evt.submitter.textContent = 'Создать';
    const newCard = {
        name: imageName.value,
        link: urlImage.value,
    }
    addCard(newCard)
        .then((newCardData) => {
            placesList.prepend(createCard(newCardData, newCardData.owner._id, cardDelete, likeCard, showImage));
            closeModal(modalNewCard);
            formElementCard.reset();
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            evt.submitter.textContent = 'Сохранить';
        })
}

// Добавить карточку при нажатии на кнопку "Сохранить"
formElementCard.addEventListener('submit', handleFormSubmitCard);

// Функция просмотра картинок
function showImage(link, name) {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(popupTypeImage);
}

// вызов валидации
enableValidation(validationConfig);

// Загрузка данных пользователя и карточек
Promise.all([getProfileInfo(), getInitialCards()])
    .then(([userData, initialCards]) => {
        userId = userData._id;
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        avatarImg.style.backgroundImage = `url(${userData.avatar})`;
        initialCards.forEach((card) => {
            const cardAdd = createCard(card, userId, cardDelete, likeCard, showImage);
            placesList.append(cardAdd);
        });
    })
    .catch(error => {
        console.error('Ошибка: ', error);
    })
  