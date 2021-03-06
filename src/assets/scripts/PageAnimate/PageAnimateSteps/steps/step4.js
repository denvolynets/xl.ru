import { TweenMax } from 'gsap/TweenMax';
import {
	C_ANIMATE_CLASSES, C_CHECK_MOBILE,
	C_DISPLAY_BLOCK,
	C_DISPLAY_FLEX, C_PERCENTAGE_0,
	C_PERCENTAGE_100,
	C_PERCENTAGE_100_MIN
} from '@Scripts/constants';

export function step4() {
	return new Promise(resolve => {
		this.setScrollEnable = false;
		TweenMax.to(`.${C_ANIMATE_CLASSES.logo}`, C_CHECK_MOBILE() ? this.animationStepSpeed : this.animationStepSpeed + 0.25, {
			y: '-41%',
			scale: 0.5
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.logoFirstPath}`, C_CHECK_MOBILE() ? this.animationStepSpeed : this.animationStepSpeed + 0.25, {
			y: 8
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.title}`, this.animationStepSpeed, {
			display: C_DISPLAY_BLOCK,
			delay: C_CHECK_MOBILE() ? 0.25 / 2 : 0.25,
			autoAlpha: 1,
			y: C_PERCENTAGE_0,
			ease: this.animationEasing
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.girl}`, C_CHECK_MOBILE() ? this.animationStepSpeed : this.animationStepSpeed + 0.25, {
			display: C_DISPLAY_BLOCK,
			delay: C_CHECK_MOBILE() ? 0.75 / 2 : 0.75,
			autoAlpha: 1,
			scale: 1,
			y: C_PERCENTAGE_0,
			ease: this.animationEasing
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.flowers}`, this.animationStepSpeed / 2, {
			display: C_DISPLAY_BLOCK,
			delay: C_CHECK_MOBILE() ? 1.55 / 2 : 1.55,
			scale: 1,
			y: 0,
			autoAlpha: 1,
			ease: this.animationEasing
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.navArrowRight}`, this.animationStepSpeed, {
			display: C_DISPLAY_BLOCK,
			delay: C_CHECK_MOBILE() ? 2 / 2 : 2,
			autoAlpha: 1,
			x: C_PERCENTAGE_0,
			ease: this.animationEasing
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.progressbar}`, this.animationStepSpeed, {
			display: C_DISPLAY_BLOCK,
			delay: C_CHECK_MOBILE() ? 2 / 2 : 2,
			autoAlpha: 1,
			y: 0,
			ease: this.animationEasing
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.scrollText}`, this.animationStepSpeed, {
			display: C_DISPLAY_BLOCK,
			delay: C_CHECK_MOBILE() ? 2 / 2 : 2,
			autoAlpha: 1,
			y: 0,
			ease: this.animationEasing
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.socialsContainer}`, this.animationStepSpeed, {
			display: C_DISPLAY_FLEX,
			delay: C_CHECK_MOBILE() ? 2 / 2 : 2,
			autoAlpha: 1,
			y: 0,
			ease: this.animationEasing,
			onComplete: () => {
				this.setScrollEnable = true;
				resolve();
			}
		});
	});
}

export function step4Restore() {
	TweenMax.to(`.${C_ANIMATE_CLASSES.title}`, this.animationStepSpeed, {
		y: C_PERCENTAGE_100_MIN,
		autoAlpha: 0,
		display: C_DISPLAY_BLOCK,
		ease: this.animationEasing
	});
	TweenMax.to(`.${C_ANIMATE_CLASSES.flowers}`, this.animationStepSpeed / 2, {
		display: C_DISPLAY_BLOCK,
		autoAlpha: 0,
		y: 40,
		scale: 0.9,
		ease: this.animationEasing
	});
	TweenMax.to(`.${C_ANIMATE_CLASSES.girl}`, this.scrollDown() ? 0 : this.animationStepSpeed, {
		y: C_PERCENTAGE_100,
		autoAlpha: 0,
		delay: C_CHECK_MOBILE() ? this.scrollDown() ? 0 : 0.75 / 2 : this.scrollDown() ? 0 : 0.75,
		scale: 0.55,
		display: C_DISPLAY_BLOCK,
		ease: this.animationEasing
	});
	TweenMax.to(`.${C_ANIMATE_CLASSES.navArrowRight}`, this.animationStepSpeed, {
		x: C_PERCENTAGE_100,
		autoAlpha: 0,
		display: C_DISPLAY_BLOCK,
		ease: this.animationEasing
	});
	// TweenMax.to(`.${C_ANIMATE_CLASSES.progressbar}`, this.animationStepSpeed, {
	// 	y: 200,
	// 	autoAlpha: 0,
	// 	display: C_DISPLAY_BLOCK,
	// 	ease: this.animationEasing,
	// 	delay: 1
	// });
	// TweenMax.to(`.${C_ANIMATE_CLASSES.scrollText}`, this.animationStepSpeed, {
	// 	y: 200,
	// 	autoAlpha: 0,
	// 	display: C_DISPLAY_BLOCK,
	// 	ease: this.animationEasing
	// });
	// TweenMax.to(`.${C_ANIMATE_CLASSES.socialsContainer}`, this.animationStepSpeed, {
	// 	y: 200,
	// 	autoAlpha: 0,
	// 	display: C_DISPLAY_FLEX,
	// 	ease: this.animationEasing
	// });
}
