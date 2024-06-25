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
	if (evt.target.classList.contains('popup')) {
		return closeModal(evt.target);
	}
}