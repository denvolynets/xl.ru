import { C_ANIMATE_CLASSES, C_DISPLAY_FLEX, C_REVERSE, C_PERCENTAGE_0, C_PERCENTAGE_100 } from '@Scripts/constants';
import { TweenMax } from 'gsap/TweenMax';

export function step7(reverse) {
	return new Promise(resolve => {
		if (reverse === C_REVERSE) {
			TweenMax.to(`.${C_ANIMATE_CLASSES.success}`, 1, {
				delay: 0,
				x: C_PERCENTAGE_100,
				autoAlpha: 0,
				ease: this.animationEasing
			});
			TweenMax.to(`.${C_ANIMATE_CLASSES.form}`, 1, {
				delay: 0.1,
				y: C_PERCENTAGE_0,
				autoAlpha: 1,
				ease: this.animationEasing,
				onComplete: () => {
					resolve();
				}
			});
		} else {
			TweenMax.to(`.${C_ANIMATE_CLASSES.form}`, 1, {
				delay: 0,
				y: C_PERCENTAGE_100,
				display: C_DISPLAY_FLEX,
				autoAlpha: 0,
				ease: this.animationEasing
			});
			TweenMax.fromTo(`.${C_ANIMATE_CLASSES.success}`, 1, {
				x: C_PERCENTAGE_100,
				autoAlpha: 0
			}, {
				delay: 0.1,
				x: C_PERCENTAGE_0,
				display: C_DISPLAY_FLEX,
				autoAlpha: 1,
				ease: this.animationEasing,
				onComplete: () => {
					resolve();
				}
			});
		}
	});
}
