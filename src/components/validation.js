const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
  };
  
  // Функция, которая добавляет класс с ошибкой
  const showError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
  };
  
  // Функция, которая удаляет класс с ошибкой
  const hideError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = "";
  };
  
  // Добавление обработчиков всем формам
  const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, validationConfig);
    });
  };
  
// Добавление обработчиков всем полям формы
  const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(
      formElement.querySelectorAll(validationConfig.inputSelector)
    );
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationConfig);
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, validationConfig);
        toggleButtonState(inputList, buttonElement, validationConfig);
      });
    });
  };
  
  // проверяет каждое поле на валидность
  const checkInputValidity = (formElement, inputElement, validationConfig) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
      inputElement.setCustomValidity("");
  }
    if (!inputElement.validity.valid) {
      showError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } 
    else {
      hideError(formElement, inputElement, validationConfig);
    }
  };
  
  // Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
  const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.setAttribute("disabled",true);
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute("disabled", false);
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  // Функция чистит ошибки валидации формы и делает кнопку неактивной
  const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(
      formElement.querySelectorAll(validationConfig.inputSelector),
    );
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    buttonElement.setAttribute("disabled",true);
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  
    inputList.forEach((inputElement) => {
      hideError(formElement, inputElement, validationConfig);
      inputElement.setCustomValidity("");
    });
  };
  
  export { validationConfig, enableValidation, clearValidation }