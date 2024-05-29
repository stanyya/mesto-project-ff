

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;


// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard ({name, link}, deleteCard) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__title").textContent = name;

  return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard (event) {
    const cardDelete = event.target.closest('.card');
    cardDelete.remove();
}

// @todo: Вывести карточки на страницу
  initialCards.forEach(cardElement => {
    placesList.append(
     createCard(cardElement, deleteCard)
    );
  });