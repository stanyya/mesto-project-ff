import '../pages/index.css';
import { handleLikeCard, createCard, deleteCard } from './card.js'
import { openModal, closeModal, handleCloseModal } from './modal.js'
import { validationConfig, enableValidation, clearValidation } from './validation.js';
import { getProfileAPI, getCardsAPI, sendProfileAPI, sendNewCardAPI, sendAvatarAPI } from './api.js';

// @todo: DOM узлы
const container = document.querySelector('.places__list');
const editProfile = document.querySelector('.profile__edit-button');
const addPlace = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector(".profile__image");
const modalImageText = document.querySelector('.popup__caption');
const modalImageSrc = document.querySelector('.popup__image');
const closeButtons = document.querySelectorAll('.popup__close');
const modalNewCard = document.querySelector('.popup_type_new-card');
const modalEditProfile = document.querySelector('.popup_type_edit');
const modalImage = document.querySelector('.popup_type_image');
const modalAvatar = document.querySelector('.popup_type_avatar');
const formEdit = document.forms.edit_profile;
const formEditName = formEdit.elements.name;
const formEditDescription = formEdit.elements.description;
const formAdd = document.forms.new_place;
const formAvatar = document.forms.avatar;
const formAvatarImg = formAvatar.elements.avatar;
const placeName = formAdd.elements.place_name;
const placeLink = formAdd.elements.link;

  // обработчики события 
  function handleOpenModalAvatar() {
    clearValidation(modalAvatar, validationConfig);
    openModal(modalAvatar);
};
  function handleOpenModalEdit() {
    clearValidation(modalEditProfile, validationConfig);
    openModal(modalEditProfile);
    formEditName.value = profileTitle.textContent;
    formEditDescription.value = profileDescription.textContent;
};
  function handleOpenModalAddPlace () {
    clearValidation(modalNewCard,validationConfig);
    openModal(modalNewCard);
};

  //Функция обработчик отправки формы изменения аватара
  function handleFormSubmitAvatar(evt) {
    evt.preventDefault();
  
    const newText = "Сохранение...";
    const submitButtonLoading = evt.submitter;
    const baseText = submitButtonLoading.textContent;
    renderLoading (true, submitButtonLoading, newText, baseText);
  
    const avatar = formAvatarImg.value;
  
    return sendAvatarAPI(avatar)
    .then((dataAvatar) => {
      console.log(dataAvatar)
      profileImage.setAttribute(
        "style",
        `background-image: url('${dataAvatar.avatar}')`)
      handleOpenModalAvatar();
      formAvatar.reset();
      closeModal(modalAvatar);
  })
  .catch((err) => {
      console.error(`Ошибка ${err}`);
  })
  .finally(() => {
      renderLoading (false, submitButtonLoading, newText, baseText);
  });
  };
  
  formAvatar.addEventListener('submit', handleFormSubmitAvatar);

  //Функция обработчик отправки формы редактирования профиля
  function handleFormSubmitProfile(evt) {
      evt.preventDefault();
  
      const newText = "Сохранение...";
      const submitButtonLoading = evt.submitter;
      const baseText = submitButtonLoading.textContent;
      renderLoading (true, submitButtonLoading, newText, baseText);
    
      const name = formEditName.value;
      const about = formEditDescription.value;
  
      return sendProfileAPI(name, about)
      .then((dataProfile) => {
          profileTitle.textContent = dataProfile.name;
          profileDescription.textContent = dataProfile.about;
          handleOpenModalEdit();
          formEdit.reset();
          closeModal(modalEditProfile);
      })
      .catch((err) => {
          console.error(`Ошибка ${err}`);
     })
     .finally(() => {
          renderLoading (false, submitButtonLoading, newText, baseText);
     });
  };
  
  formEdit.addEventListener('submit', handleFormSubmitProfile); 
  
  //Функция обработчик отправки формы добавление карточки
  function handleFormSubmitNewplace(evt) {
      evt.preventDefault();
  
      const newText = "Сохранение...";
      const submitButtonLoading = evt.submitter;
      const baseText = submitButtonLoading.textContent;
      renderLoading (true, submitButtonLoading, newText, baseText);
  
      const name = placeName.value;
      const link = placeLink.value;
  
      return sendNewCardAPI(name, link)
      .then((card) => {
          const newCard = createCard(card, deleteCard, handleOpenModalImage, handleLikeCard, userId);
          container.prepend(newCard);
          formAdd.reset();
          closeModal(modalNewCard);
      })
      .catch((err) => {
          console.error(`Ошибка ${err}`);
      })
      .finally(() => {
          renderLoading (false, submitButtonLoading, newText, baseText);
      });
  };
  
  formAdd.addEventListener('submit', handleFormSubmitNewplace);

  // слушатели для открытия попапов
  editProfile.addEventListener('click', handleOpenModalEdit);
  addPlace.addEventListener('click', handleOpenModalAddPlace);
  profileImage.addEventListener('click', handleOpenModalAvatar);
  
  // Кнопка
  closeButtons.forEach((item) => {
    item.addEventListener('click', handleCloseModal);
  });
  
// Функция просмотра картинок
  function handleOpenModalImage (card) {
      modalImageText.textContent = card.name;
      modalImageSrc.src = card.link;
      modalImageSrc.alt = card.name;
      openModal(modalImage);
  };
  
 // Вызов валидации
  enableValidation(validationConfig);
  
  // Информация о пользователе на странице
  let userId = "";
  function showUserProfile(user) {
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;
      profileImage.setAttribute(
      "style",
      `background-image: url('${user.avatar}')`
    );
    userId = user._id;
  };
  
// Загрузка данных пользователя и карточек
  Promise.all([getProfileAPI(), getCardsAPI()])
    .then(([user, cards]) => {
      showUserProfile(user);
      showCards(cards, deleteCard, handleOpenModalImage, handleLikeCard, userId);
    })
    .catch((err) => {
      console.error(`Ошибка ${err}`);
    });
  
  // Функция вывода карточек
  function showCards(cards, deleteCard, handleOpenModalImage, handleLikeCard, userId) {
      cards.forEach(card => {
          const displayCard = createCard(card, deleteCard, handleOpenModalImage, handleLikeCard, userId);
          container.append(displayCard);
      });
  };

  function renderLoading (isLoading, button, newText = "Сохранение...", baseText = "Сохранить") {
    if (isLoading) {
        button.textContent = newText;
      }
      else {
        button.textContent = baseText;
      }
  }
  