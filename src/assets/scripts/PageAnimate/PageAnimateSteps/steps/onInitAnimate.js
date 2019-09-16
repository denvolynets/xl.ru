import { C_ANIMATE_CLASSES, C_DISPLAY_BLOCK, C_DISPLAY_FLEX, C_DOM_CLASSES, C_PERCENTAGE_0 } from '@Scripts/constants';
import { TweenMax } from 'gsap/TweenMax';

export function onBottomAnimate() {
	TweenMax.fromTo(`.${C_ANIMATE_CLASSES.progressbar}`, this.animationStepSpeed, {
		y: 200,
		autoAlpha: 0
	}, {
		display: C_DISPLAY_BLOCK,
		delay: 0.6,
		autoAlpha: 1,
		y: C_PERCENTAGE_0,
		ease: this.animationEasing
	});
	TweenMax.fromTo(`.${C_ANIMATE_CLASSES.scrollText}`, this.animationStepSpeed, {
		y: 200,
		autoAlpha: 0
	}, {
		display: C_DISPLAY_BLOCK,
		delay: 0.6,
		autoAlpha: 1,
		y: C_PERCENTAGE_0,
		ease: this.animationEasing
	});
	TweenMax.fromTo(`.${C_ANIMATE_CLASSES.socialsContainer}`, this.animationStepSpeed, {
		y: 200,
		autoAlpha: 0
	}, {
		display: C_DISPLAY_FLEX,
		delay: 0.6,
		autoAlpha: 1,
		y: C_PERCENTAGE_0,
		ease: this.animationEasing
	});
}
export function onInitAnimate() {
	if (!document.querySelector(`.${C_DOM_CLASSES.main}`)) return;
	return new Promise(resolve => {
		this.setScrollEnable = false;
		TweenMax.fromTo(`.${C_ANIMATE_CLASSES.logoFirstPath}`, this.animationStepSpeed, {
			scale: 1.75,
			y: '-10%',
			x: '400%',
			autoAlpha: 0
		}, {
			x: C_PERCENTAGE_0,
			scale: 1,
			y: C_PERCENTAGE_0,
			autoAlpha: 1
		});
		
		TweenMax.fromTo(`.${C_ANIMATE_CLASSES.logoSecondPath}`, this.animationStepSpeed, {
			scale: 1.75,
			y: '10%',
			x: '-400%',
			autoAlpha: 0
		}, {
			x: C_PERCENTAGE_0,
			scale: 1,
			y: C_PERCENTAGE_0,
			autoAlpha: 1,
			onComplete: () => {
				this.setScrollEnable = true;
				this.goToEnd();
				resolve();
			}
		});
		
		onBottomAnimate.apply(this);
	});
}
