var loginLink = document.querySelector(".login-link");
var loginModal = document.querySelector(".login-modal");
var modalClose = loginModal.querySelector(".modal__close");
var loginInput = loginModal.querySelector("[name=login]");
var passwordInput = loginModal.querySelector("[name=password]");
var form = loginModal.querySelector(".form");
var overlay = document.querySelector(".modal-overlay");

var isStorageSupported = true;
var storage = "";

/* Проверяем, не возникает ли ошибок при работе с localSorage (часто браузеры запрещают обращаться к localStorage при работе с локальным сайтом, с лежащим в файловой системе, а не на удаленном сервере) */
try {
	storage = localStorage.getItem("login");
} catch(err) {
	/* Если localStorage выдаст ошибку, браузер ругнется на попытку обращения к localStorage, код продолжит выполняться (а не вылетит с ошибкой, как обвычно бывает) */
	isStorageSupported = false;
}


loginLink.addEventListener("click", function(evt) {
	evt.preventDefault();
	/* Показываем модалку */
	loginModal.classList.add("modal_shown");
	overlay.classList.add("modal-overlay_shown");
	
	/* Проверяем, не сохранен ли у нас логин в localStorage */
	if(storage) {
		loginInput.value = storage;
		/* Ставим фокус в поле ввода (для удобства) */
		passwordInput.focus();
	} else {
		loginInput.focus();
	}
});

modalClose.addEventListener("click", function(evt) {
	evt.preventDefault();
	/* Скрываем модалку */
	loginModal.classList.remove("modal_shown");
	overlay.classList.remove("modal-overlay_shown");
	/* Не забываем удалить наш класс с анимацией ошибки */
	loginModal.classList.remove("modal_error");
});

window.addEventListener("keydown", function(evt) {
	/* Скрываем модалку по нажатию клавиши ESC */
	if(evt.keyCode === 27) {
		evt.preventDefault();

		if(loginModal.classList.contains("modal_shown")) {
			loginModal.classList.remove("modal_shown");
			overlay.classList.remove("modal-overlay_shown");
			loginModal.classList.remove("modal_error");
		} 
	}
});

form.addEventListener("submit", function(evt) {
	/* Проверяем, заполнил ли пользователь логин и пароль */
	if(!loginInput.value || !passwordInput.value) {
		evt.preventDefault();
		loginModal.classList.remove("modal_error");
		/* Настоящая магия, но без этой строки css анимация не будет воспроизводиться при попытке отправить пустую форму несколько раз подряд (если только не добавить небольшую задержку между удалением и добавлением класса, напр., setTimeout())
		Эта строка может не работать в strict mode, тогда лучше писать: 
		void element.offsetWidth; */
		loginModal.offsetWidth = loginModal.offsetWidth;
		/* Применяем анимацию, чтоб показать пользователю, что форма не заполнена */
		loginModal.classList.add("modal_error");
	} else {
		if(isStorageSupported) {
			/* Сохраняем логин пользователя в localStorage */
			localStorage.setItem("login", loginInput.value);
		}
	}
});