import { C_CSS_CLASSES, C_DOM_CLASSES } from '@Scripts/constants';

export function socialsAnimate() {
	$(`.${C_DOM_CLASSES.socialsBtn}`).click(function() {
		$(`.${C_DOM_CLASSES.socials}`).toggleClass(C_CSS_CLASSES.show);
	});
}
