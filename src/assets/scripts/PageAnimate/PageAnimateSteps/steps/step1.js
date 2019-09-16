import { TweenMax } from 'gsap/TweenMax';
import { C_ANIMATE_CLASSES, C_PERCENTAGE_0 } from '@Scripts/constants';

export function step1() {
	this.setScrollEnable = false;
	TweenMax.to(`.${C_ANIMATE_CLASSES.logoFirstPath}`, this.animationStepSpeed + 0.25, {
		y: C_PERCENTAGE_0,
		ease: this.animationEasing,
		onComplete: () => this.setScrollEnable = true
	});
}

export function stepLogoFinal() {
	return new Promise(resolve => {
		TweenMax.to(`.${C_ANIMATE_CLASSES.logo}`, 0, {
			scale: 0.5,
			delay: 0,
			y: C_PERCENTAGE_0,
			ease: this.animationEasing
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.logoFirstPath}`, 0, {
			y: 45,
			delay: 0,
			ease: this.animationEasing,
			onComplete: () => {
				TweenMax.to(`.${C_ANIMATE_CLASSES.logo}`, 0, {
					y: '-41%',
					scale: 0.5,
					ease: this.animationEasing
				});
				TweenMax.to(`.${C_ANIMATE_CLASSES.logoFirstPath}`, 0, {
					y: 8,
					delay: 0.1,
					ease: this.animationEasing,
					onComplete: () => {
						resolve();
					}
				});
			}
		});
	});
}
