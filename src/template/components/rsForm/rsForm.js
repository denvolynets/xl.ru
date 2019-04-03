export default function formValidate() {
	var btnValidate = document.querySelector('.btn-validate');

	btnValidate.addEventListener('click', (e) => {
		var fieldArray = [];
		var errors = 0;
		var formParent = document.querySelector('.rs-form');
		// eslint-disable-next-line no-useless-escape
		var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

		function findAllInput(parent) {
			for (var i = 0; i < parent.childNodes.length; i += 1) {
				if (parent.childNodes[i].nodeType != 3) {
					if (parent.childNodes[i].classList.contains('rs-form__input') && parent.childNodes[i].dataset.validate != 'false') {
						let fieldParams = JSON.parse(parent.childNodes[i].dataset.validate);

						fieldArray.push({
							field: parent.childNodes[i],
							type: fieldParams.type,
							message: fieldParams.message,
							minLength: fieldParams.minL ? fieldParams.minL : ''
						});
					}

					findAllInput(parent.childNodes[i]);
				}
			}
		}

		findAllInput(formParent);

		console.log(fieldArray);

		for (let i = 0; i < fieldArray.length; i++) {
			let field = fieldArray[i].field;
			let fieldParent = field.parentElement;
			let message = fieldArray[i].message;
			let type = fieldArray[i].type;
			let errorMessage = fieldParent.querySelector('.error-label');
			errorMessage.textContent = '';

			if (fieldParent.classList.contains('error')) {
				fieldParent.classList.remove('error');
			}

			if (type == 'default') {
				if (field.value === '') {
					errorMessage.textContent = message;

					fieldParent.classList.add('error');
					errors++;
				}
			} else if (type == 'numbersCount') {
				if (+field.value.replace(/\D+/g, '').length < fieldArray[i].minLength) {
					errorMessage.textContent = message;

					fieldParent.classList.add('error');
					errors++;
				}
			} else if (type == 'email') {
				if (regEmail.test(field.value) == false) {
					errorMessage.textContent = message;

					fieldParent.classList.add('error');
					errors++;
				}
			}
		}

		if (errors != 0) {
			return false;
		}
	});
}