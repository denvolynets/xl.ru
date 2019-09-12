import { C_CSS_CLASSES, C_DOM_CLASSES } from '@Scripts/constants';

export function animateSocials() {
	$(`.${C_DOM_CLASSES.socialsBtn}`).click(function() {
		$(`.${C_DOM_CLASSES.socials}`).toggleClass(C_CSS_CLASSES.show);
	});
}
