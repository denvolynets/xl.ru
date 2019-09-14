import { TweenMax } from 'gsap/TweenMax';
import { C_ANIMATE_CLASSES, C_PERCENTAGE_0 } from '@Scripts/constants';

export function step1() {
	this.scrollEnable = false;
	TweenMax.to(`.${C_ANIMATE_CLASSES.logoFirstPath}`, 1.25, {
		y: C_PERCENTAGE_0,
		ease: this.animationEasing,
		onComplete: () => this.scrollEnable = true
	});
}
