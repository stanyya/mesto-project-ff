import './index.css';
import { createCard as DOMCreateCard } from '../scripts/card.js';


const popupImage = document.querySelector('.popup_type_image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupImageImage = popupImage.querySelector('.popup__image');

const cardsContainer = document.querySelector('.places__list');

const cardTemplate = document.querySelector('#card-template').content;
const cardForm = document.forms['new-place'];
const cardFormSubmitButton = cardForm.querySelector('.popup__button');
const cardNameInput = cardForm.elements['place-name'];
const cardLinkInput = cardForm.elements.link;

const popupCard = document.querySelector('.popup_type_new-card');
const popupCardButtonOpen = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_type_edit');

const popupConfirm = document.querySelector('.popup_type_confirm');
const popupConfirmButton = popupConfirm.querySelector('.popup__button_confirm');


const handleCardLike = ({ cardId, buttonElement, counterElement }) => {
  buttonElement.disabled = true;

  if (buttonElement.classList.contains('card__like-button_is-active')) {
    APIUnLikeCard(cardId)
      .then(({ likes }) => {
        buttonElement.classList.remove('card__like-button_is-active');

        if (likes.length) {
          counterElement.classList.add('card__like-counter_is-active');
          counterElement.textContent = likes.length;
        } else {
          counterElement.classList.remove('card__like-counter_is-active');
          counterElement.textContent = '';
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        buttonElement.disabled = false;
      });
  } else {
    APILikeCard(cardId)
      .then(({ likes }) => {
        buttonElement.classList.add('card__like-button_is-active');

        counterElement.classList.add('card__like-counter_is-active');
        counterElement.textContent = likes.length;
      })
      .catch((error) => console.error(error))
      .finally(() => {
        buttonElement.disabled = false;
      });
  }
};

const handleCardDelete = ({ cardId, buttonElement }) => {
  openModal(popupConfirm);
  popupConfirmButton.onclick = () => {
    buttonElement.disabled = true;

    APIDeleteCard(cardId)
      .then(() => {
        buttonElement.closest('.card').remove();

        closeModal(popupConfirm);
      })
      .catch((error) => {
        buttonElement.disabled = false;
        console.error(error);
      });
  };
};

const handleCardFormSubmit = (event) => {
  event.preventDefault();

  renderLoading({
    buttonElement: cardFormSubmitButton,
    isLoading: true,
  });

  APICreateCard({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  })
    .then((cardData) => {
      cardsContainer.prepend(
        DOMCreateCard({
          currentUserId: cardData.owner['_id'],
          template: cardTemplate,
          data: cardData,
          onDelete: handleCardDelete,
          onLike: handleCardLike,
          onImageClick: handleCardImageClick,
        })
      );

      cardForm.reset();

      closeModal(popupCard);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading({
        buttonElement: cardFormSubmitButton,
        isLoading: false,
      });
    });
};

const handlePopupProfileButtonOpenClick = () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  clearValidation(profileForm, validationConfig);

  openModal(popupProfile);
};

const handlePopupCardButtonOpenClick = () => {
  cardForm.reset();

  clearValidation(cardForm, validationConfig);

  openModal(popupCard);
};

const handleCardImageClick = ({ cardName, cardLink }) => {
  popupImageImage.src = cardLink;
  popupImageImage.alt = cardName;
  popupImageCaption.textContent = cardName;

  openModal(popupImage);
};

cardForm.addEventListener('submit', handleCardFormSubmit);

popupImage.addEventListener('click', handleModalClick);

popupCard.addEventListener('click', handleModalClick);
popupCardButtonOpen.addEventListener('click', handlePopupCardButtonOpenClick);

popupConfirm.addEventListener('click', handleModalClick);

enableValidation(validationConfig);

Promise.all([APIGetUserInfo(), APIGetInitialCards()])
  .then(([{ name, about, avatar, ['_id']: currentUserId }, cardsData]) => {
    setProfile({
      name,
      description: about,
      avatar,
    });

    cardsData.forEach((cardData) => {
      cardsContainer.append(
        DOMCreateCard({
          currentUserId,
          template: cardTemplate,
          data: cardData,
          onDelete: handleCardDelete,
          onLike: handleCardLike,
          onImageClick: handleCardImageClick,
        })
      );
    });
  })
  .catch((error) => {
    console.error(error);
  });