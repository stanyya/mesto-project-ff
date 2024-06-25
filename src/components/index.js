import '../pages/index.css';
import {initialCards} from './cards.js' 
import {createCard, cardDelete, likeCard} from './card.js'
import {openModal, closeModal} from './modal.js'

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
const modalProfile = document.querySelector('.popup_type_edit');
const modalNewCard = document.querySelector('.popup_type_new-card');
const buttonOpenModalProfile = document.querySelector('.profile__edit-button');
const buttonOpenModalNewCard = document.querySelector('.profile__add-button');

const buttonClosePopups = document.querySelectorAll('.popup__close');

const formElementProfile = modalProfile.querySelector('.popup__form');
const nameInput  = formElementProfile.querySelector('.popup__input_type_name');
const jobInput  = formElementProfile.querySelector('.popup__input_type_description');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

// @todo: Вывести карточки на страницу
initialCards.forEach((cardElement) => {
  const cardAdd = createCard(cardElement, cardDelete, likeCard, showImage);
  placesList.append(cardAdd);
});

/* @todo: Открыть изображение */
function showImage(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(popupTypeImage);
}

/* Обработчик событий */
buttonOpenModalProfile.addEventListener('click', () => {
  openModal(modalProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});
buttonOpenModalNewCard.addEventListener('click', () => {
  openModal(modalNewCard);
});

buttonClosePopups.forEach((item) => {
  item.addEventListener("click", () => {
    const modalElement = item.closest(".popup");
    closeModal(modalElement);
  });
});


//функция обработчик отправки формы редактирования профиля
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  profileTitle.textContent = name;
  profileDescription.textContent = job;
  closeModal(modalProfile);
}

formElementProfile.addEventListener('submit', handleFormSubmitProfile);

formElementCard.addEventListener('submit', handleFormSubmitCard);