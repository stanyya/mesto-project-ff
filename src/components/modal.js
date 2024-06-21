// открытие попапа
export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalEsc);
  document.addEventListener('mousedown', closeModalOverlay);
}
// закрытие попапа
export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalEsc);
  document.removeEventListener('mousedown', closeModalOverlay);
}

// закрытие попапа Esc
export function closeModalEsc(evt) {
if (evt.key === 'Escape') {
  closeModal(document.querySelector('.popup_is-opened'));
}
}

// закрытие попапа нажатием на Overlay
export function closeModalOverlay(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");

  if (evt.target.matches(".popup_is-opened, .popup__close"))
    closeModal(openedPopup);

}
