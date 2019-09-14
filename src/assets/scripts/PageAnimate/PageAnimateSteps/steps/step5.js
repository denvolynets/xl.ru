import { C_ANIMATE_CLASSES, C_DISPLAY_BLOCK, C_DISPLAY_NONE, C_PERCENTAGE_0, C_PERCENTAGE_100, C_PERCENTAGE_100_MIN } from '@Scripts/constants';
import { TweenMax } from 'gsap/TweenMax';
import { h_getWW } from '@Scripts/helpers';
export function step5() {
	const titleWidth = $(`.${C_ANIMATE_CLASSES.title}`).outerWidth();
	const titleOffsetLeft = $(`.${C_ANIMATE_CLASSES.title}`).offset().left;
	this.scrollEnable = false;
	this.animationEnd = false;
	
	TweenMax.to(`.${C_ANIMATE_CLASSES.title}`, this.slideSpeed / 1000, {
		x: -titleOffsetLeft - titleWidth - 50,
		autoAlpha: 0,
		ease: this.animationEasing
	});
	TweenMax.to(`.${C_ANIMATE_CLASSES.title}`, 0, {
		x: h_getWW() - titleOffsetLeft + titleWidth,
		autoAlpha: 0,
		delay: 0.85,
		ease: this.animationEasing,
		onComplete: async() => {
			this.scrollDown() ? this.slideActive += 1 : this.slideActive -= 1;
			if (this.slideActive < 1) this.slideActive = 0;
			if (this.slideActive >= this.slideTotalLength - 1) this.slideActive = this.slideTotalLength - 1;
			$(`.${C_ANIMATE_CLASSES.title}`).html(this.slideTotal[this.slideActive]);
			await this.onLightingChange(this.scrollDown());
			this.scrollEnable = true;
		}
	});
	TweenMax.to(`.${C_ANIMATE_CLASSES.title}`, this.slideSpeed / 1000, {
		x: 0,
		delay: 0.85,
		autoAlpha: 1,
		ease: this.animationEasing
	});
	TweenMax.to(`.${C_ANIMATE_CLASSES.girl}`, 1.25, {
		display: C_DISPLAY_BLOCK,
		delay: 0.75,
		autoAlpha: 1,
		scale: 1,
		y: C_PERCENTAGE_0,
		ease: this.animationEasing
	});
	TweenMax.to(`.${C_ANIMATE_CLASSES.callback}`, 1, {
		delay: 0.75,
		display: C_DISPLAY_NONE,
		autoAlpha: 0,
		ease: this.animationEasing
	});
	TweenMax.to(`.${C_ANIMATE_CLASSES.sidebar}`, 1, {
		display: C_DISPLAY_NONE,
		autoAlpha: 0,
		x: C_PERCENTAGE_100_MIN,
		ease: this.animationEasing
	});
	TweenMax.to(`.${C_ANIMATE_CLASSES.form}`, 1, {
		display: C_DISPLAY_NONE,
		autoAlpha: 0,
		x: C_PERCENTAGE_100,
		ease: this.animationEasing
	});
	TweenMax.to(`.${C_ANIMATE_CLASSES.flowers}`, 0.4, {
		display: C_DISPLAY_BLOCK,
		delay: 1.55,
		scale: 1,
		y: 0,
		autoAlpha: 1,
		ease: this.animationEasing
	});
	TweenMax.to(`.${C_ANIMATE_CLASSES.sidebar}`, 1, {
		display: C_DISPLAY_NONE,
		autoAlpha: 0,
		x: C_PERCENTAGE_100_MIN,
		delay: 0,
		ease: this.animationEasing
	});
	TweenMax.to(`.${C_ANIMATE_CLASSES.form}`, 1, {
		display: C_DISPLAY_NONE,
		autoAlpha: 0,
		x: C_PERCENTAGE_100,
		ease: this.animationEasing
	});
	TweenMax.to(`.${C_ANIMATE_CLASSES.bgLayer}`, 1, {
		display: C_DISPLAY_NONE,
		autoAlpha: 0,
		y: C_PERCENTAGE_100_MIN,
		ease: this.animationEasing
	});
}
