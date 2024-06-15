// @todo: Функция создания карточки
export function createCard({name, link}, cardDelete, likeCard, showImage) {
  const cardTemplate = document.querySelector('#card-template').content;
  const itemCard = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = itemCard.querySelector('.card__image');
  const cardTitle = itemCard.querySelector('.card__title');
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  itemCard.querySelector('.card__delete-button').addEventListener('click', cardDelete);
  itemCard.querySelector('.card__like-button').addEventListener('click', likeCard);
  cardImage.addEventListener('click', () => {showImage(link, name);});
  return itemCard;
}

// @todo: Функция удаления карточки
export function cardDelete(evt) {
  const cardDel = evt.target.closest('.card');
  cardDel.remove();
}
//функция лайка карточки
export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}
