import { C_CSS_CLASSES, C_DOM_CLASSES, C_RESET, C_REVERSE } from '@Scripts/constants';
import vData from '@Scripts/form/formValidateMethods';
const { checkFormOnInit } = vData;
export function formSubmit(pageAnimate) {
	$(`.${C_DOM_CLASSES.form}`).each(function() {
		const $this = $(this);
		$this.submit(function() {
			const checkValid = $(this).valid();
			const formData = $(this).serialize();
			if (!checkValid || $this.find('button').hasClass(C_CSS_CLASSES.spinnerClass)) return;
			$this.find('button').addClass(C_CSS_CLASSES.spinnerClass);
			
			// TODO - интегрировать с back-end`ом;
			$.get(`./assets/images/svg-icons/logo.svg?${formData}`, function(data) {
				// TODO - колбек в случае успеха;
				setTimeout(() => {
					$this.trigger(C_RESET);
					$this.find('button').removeClass(C_CSS_CLASSES.spinnerClass);
					checkFormOnInit.apply(vData);
					window.location.href = 'success.html';
					// pageAnimate.setScrollEnable = false;
					// pageAnimate.step7();
				}, 1000);
			});
		});
	});
	
	$(`.${C_DOM_CLASSES.repeatPayBtn}`).click(async function() {
		window.location.href = 'index.html';
		// await pageAnimate.step7(C_REVERSE);
		// pageAnimate.setScrollEnable = true;
	});
	
	$(`.${C_DOM_CLASSES.form} .form__field-radio input`).change(function() {
		$(`.${C_DOM_CLASSES.inputNumber}`).removeClass(C_CSS_CLASSES.inputHasValue);
		$(`.${C_DOM_CLASSES.form} .${C_DOM_CLASSES.inputNumber}`).val('');
	});
	
	$(`.${C_DOM_CLASSES.form} .${C_DOM_CLASSES.inputNumber}`).on('input', function(event) {
		$(`.${C_DOM_CLASSES.form} .form__field-radio input`).prop('checked', false);
		if (event.target.value) {
			$(this).addClass(C_CSS_CLASSES.inputHasValue);
		} else {
			$(this).removeClass(C_CSS_CLASSES.inputHasValue);
		}
	});
}
