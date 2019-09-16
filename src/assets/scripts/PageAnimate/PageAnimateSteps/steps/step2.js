import { TweenMax } from 'gsap/TweenMax';
import { C_ANIMATE_CLASSES } from '@Scripts/constants';

export function step2(disableScroll) {
	return new Promise(resolve => {
		this.setScrollEnable = disableScroll === 1;
		TweenMax.to(`.${C_ANIMATE_CLASSES.logo}`, this.animationStepSpeed + 0.25, {
			scale: 1,
			ease: this.animationEasing
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.logoFirstPath}`, this.animationStepSpeed + 0.25, {
			y: 45,
			ease: this.animationEasing,
			onComplete: () => {
				if (disableScroll !== 1) this.setScrollEnable = true;
				resolve();
			}
		});
	});
}
