import {
	C_ANIMATE_CLASSES, C_CSS_CLASSES,
	C_DISPLAY_BLOCK,
	C_DISPLAY_FLEX,
	C_DISPLAY_NONE, C_DOM_CLASSES,
	C_PERCENTAGE_0,
	C_PERCENTAGE_100,
	C_PERCENTAGE_100_MIN
} from '@Scripts/constants';
import { TweenMax } from 'gsap/TweenMax';
import { h_getWW } from '@Scripts/helpers';
export function step5(slideAnimate = true) {
	return new Promise(resolve => {
		const titleWidth = $(`.${C_ANIMATE_CLASSES.title}`).outerWidth();
		const titleOffsetLeft = $(`.${C_ANIMATE_CLASSES.title}`).offset().left;
		this.setScrollEnable = false;
		this.animationEnd = false;
		
		$(`.${C_DOM_CLASSES.main}`).removeClass(C_CSS_CLASSES.lastAnimationStep);
		TweenMax.to(`.${C_ANIMATE_CLASSES.bottom}`, this.animationStepSpeed, {
			y: C_PERCENTAGE_0,
			ease: this.animationEasing
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.logo}`, this.animationStepSpeed, {
			y: '-41%',
			ease: this.animationEasing
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.logoCallback}`, this.animationStepSpeed, {
			y: '-170%',
			ease: this.animationEasing
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.navArrowLeft}`, this.animationStepSpeed, {
			x: C_PERCENTAGE_100_MIN,
			autoAlpha: 0,
			scaleX: -1,
			scaleY: -1,
			display: C_DISPLAY_FLEX
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.navArrowRight}`, this.animationStepSpeed, {
			x: 0,
			autoAlpha: 1,
			display: C_DISPLAY_FLEX
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.title}`, this.slideSpeed, {
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
				if (slideAnimate) {
					this.scrollDown() ? this.slideActive += 1 : this.slideActive -= 1;
					if (this.slideActive < 1) this.slideActive = 0;
					if (this.slideActive >= this.slideTotalLength - 1) this.slideActive = this.slideTotalLength - 1;
					$(`.${C_ANIMATE_CLASSES.title}`).html(this.slideTotal[this.slideActive]);
					await this.onLightingChange(this.scrollDown());
				}
				resolve();
				this.setScrollEnable = true;
			}
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.title}`, this.slideSpeed, {
			x: 0,
			delay: 0.85,
			autoAlpha: 1,
			ease: this.animationEasing
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.girl}`, this.animationStepSpeed + 0.25, {
			display: C_DISPLAY_BLOCK,
			delay: 0.75,
			autoAlpha: 1,
			scale: 1,
			y: C_PERCENTAGE_0,
			ease: this.animationEasing
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.callback}`, this.animationStepSpeed, {
			delay: 0.75,
			display: C_DISPLAY_NONE,
			autoAlpha: 0,
			ease: this.animationEasing
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.sidebar}`, this.animationStepSpeed, {
			display: C_DISPLAY_NONE,
			autoAlpha: 0,
			x: C_PERCENTAGE_100_MIN,
			ease: this.animationEasing
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.form}`, this.animationStepSpeed, {
			display: C_DISPLAY_NONE,
			autoAlpha: 0,
			x: C_PERCENTAGE_100,
			ease: this.animationEasing
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.flowers}`, this.animationStepSpeed - 0.6, {
			display: C_DISPLAY_BLOCK,
			delay: 1.55,
			scale: 1,
			y: 0,
			autoAlpha: 1,
			ease: this.animationEasing
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.sidebar}`, this.animationStepSpeed, {
			display: C_DISPLAY_NONE,
			autoAlpha: 0,
			x: C_PERCENTAGE_100_MIN,
			delay: 0,
			ease: this.animationEasing
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.form}`, this.animationStepSpeed, {
			display: C_DISPLAY_NONE,
			autoAlpha: 0,
			x: C_PERCENTAGE_100,
			ease: this.animationEasing
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.bgLayer}`, this.animationStepSpeed, {
			display: C_DISPLAY_NONE,
			autoAlpha: 0,
			y: C_PERCENTAGE_100_MIN,
			delay: this.scrollDown() ? 0 : 2,
			ease: this.animationEasing
		});
	});
}
