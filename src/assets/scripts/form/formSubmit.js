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
				$this.trigger(C_RESET);
				$this.find('button').removeClass(C_CSS_CLASSES.spinnerClass);
				checkFormOnInit.apply(vData);
				
				pageAnimate.setScrollEnable = false;
				pageAnimate.step7();
			});
		});
	});
	
	$(`.${C_DOM_CLASSES.repeatPayBtn}`).click(async function() {
		await pageAnimate.step7(C_REVERSE);
		pageAnimate.setScrollEnable = true;
	});
}
