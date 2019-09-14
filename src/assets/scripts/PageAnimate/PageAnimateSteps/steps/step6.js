import { C_ANIMATE_CLASSES, C_DISPLAY_BLOCK, C_DISPLAY_FLEX, C_PERCENTAGE_100, C_PERCENTAGE_0 } from '@Scripts/constants';
import { TweenMax } from 'gsap/TweenMax';

export function step6() {
	const titleWidth = $(`.${C_ANIMATE_CLASSES.title}`).outerWidth();
	const titleOffsetLeft = $(`.${C_ANIMATE_CLASSES.title}`).offset().left;
	
	this.slideActive = this.slideTotalLength;
	this.lightingActive = this.lightingTotalLength + 1;
	this.scrollEnable = false;
	
	TweenMax.to(`.${C_ANIMATE_CLASSES.title}`, 1, {
		x: -titleOffsetLeft - titleWidth - 50,
		autoAlpha: 0,
		ease: this.animationEasing
	});
	TweenMax.to(`.${C_ANIMATE_CLASSES.flowers}`, 0.35, {
		display: C_DISPLAY_BLOCK,
		autoAlpha: 0,
		delay: 0.75,
		y: 40,
		scale: 0.9,
		ease: this.animationEasing
	});
	TweenMax.to(`.${C_ANIMATE_CLASSES.callback}`, 1, {
		delay: 0.75,
		display: C_DISPLAY_FLEX,
		autoAlpha: 1,
		ease: this.animationEasing
	});
	TweenMax.to(`.${C_ANIMATE_CLASSES.sidebar}`, 1, {
		delay: 1.35,
		display: C_DISPLAY_FLEX,
		x: C_PERCENTAGE_0,
		autoAlpha: 1,
		ease: this.animationEasing
	});
	if (!this.animationEnd) {
		TweenMax.to(`.${C_ANIMATE_CLASSES.bgLayer}`, 1, {
			delay: 2.35,
			display: C_DISPLAY_FLEX,
			y: '30%',
			autoAlpha: 1,
			ease: this.animationEasing
		});
	}
	TweenMax.to(`.${C_ANIMATE_CLASSES.bgLayer}`, 0.75, {
		delay: 3.6,
		y: C_PERCENTAGE_100,
		ease: this.animationEasing
	});
	TweenMax.to(`.${C_ANIMATE_CLASSES.form}`, 1, {
		delay: 3.7,
		x: C_PERCENTAGE_0,
		display: C_DISPLAY_FLEX,
		autoAlpha: 1,
		ease: this.animationEasing,
		onComplete: () => {
			this.scrollEnable = true;
			this.animationEnd = true;
		}
	});
}
