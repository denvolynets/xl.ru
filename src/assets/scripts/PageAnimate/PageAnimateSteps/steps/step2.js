import { TweenMax } from 'gsap/TweenMax';
import { C_ANIMATE_CLASSES } from '@Scripts/constants';

export function step2(disableScroll) {
	return new Promise(resolve => {
		if (disableScroll !== 1) this.scrollEnable = true;
		TweenMax.to(`.${C_ANIMATE_CLASSES.logo}`, 1.25, {
			scale: 1,
			ease: this.animationEasing
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.logoFirstPath}`, 1.25, {
			y: 45,
			ease: this.animationEasing,
			onComplete: () => {
				if (disableScroll !== 1) this.scrollEnable = true;
				resolve();
			}
		});
	});
}
