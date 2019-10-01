import {
	C_ANIMATE_CLASSES,
	C_DISPLAY_BLOCK,
	C_DISPLAY_FLEX,
	C_PERCENTAGE_100,
	C_PERCENTAGE_0, C_DOM_CLASSES, C_CSS_CLASSES, C_WW, C_PERCENTAGE_100_MIN, C_CHECK_MOBILE
} from '@Scripts/constants';
import { TweenMax } from 'gsap/TweenMax';

export function step6() {
	return new Promise(resolve => {
		const titleWidth = $(`.${C_ANIMATE_CLASSES.title}`).outerWidth();
		const titleOffsetLeft = $(`.${C_ANIMATE_CLASSES.title}`).offset().left;
		
		this.slideActive = this.slideTotalLength;
		this.lightingActive = this.lightingTotalLength + 1;
		this.setScrollEnable = false;
		
		$(`.${C_DOM_CLASSES.main}`).addClass(C_CSS_CLASSES.lastAnimationStep);
		
		TweenMax.to(`.${C_ANIMATE_CLASSES.logo}`, this.animationStepSpeed, {
			y: C_PERCENTAGE_100_MIN,
			ease: this.animationEasing
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.bottom}`, this.animationStepSpeed, {
			y: C_PERCENTAGE_100,
			ease: this.animationEasing
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.navArrowRight}`, this.animationStepSpeed, {
			x: this.scrollDown() ? C_PERCENTAGE_100 : C_PERCENTAGE_0,
			autoAlpha: this.scrollDown() ? 0 : 1
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.title}`, this.animationStepSpeed, {
			x: -titleOffsetLeft - titleWidth - 50,
			autoAlpha: 0,
			ease: this.animationEasing
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.flowers}`, this.animationStepSpeed / 2, {
			display: C_DISPLAY_BLOCK,
			autoAlpha: 0,
			delay: C_CHECK_MOBILE() ? 0.75 / 2 : 0.75,
			y: 40,
			scale: 0.9,
			ease: this.animationEasing
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.callback}`, this.animationStepSpeed, {
			delay: C_CHECK_MOBILE() ? 0.25 / 2 : 0.25,
			display: C_DISPLAY_FLEX,
			autoAlpha: 1,
			ease: this.animationEasing
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.sidebar}`, this.animationStepSpeed, {
			delay: 0.85,
			display: C_DISPLAY_FLEX,
			x: C_PERCENTAGE_0,
			autoAlpha: 1,
			ease: this.animationEasing
		});
		if (!this.animationEnd) {
			TweenMax.fromTo(`.${C_ANIMATE_CLASSES.bgLayer}`, this.animationStepSpeed, {
			}, {
				delay: C_CHECK_MOBILE() ? 1.35 / 2 : 1.35,
				display: C_DISPLAY_FLEX,
				y: C_WW.md() ? C_PERCENTAGE_0 : '30%',
				autoAlpha: 1,
				ease: this.animationEasing
			});
		}
		TweenMax.fromTo(`.${C_ANIMATE_CLASSES.bgLayer}`, this.animationStepSpeed - 0.25, {
		}, {
			delay: C_CHECK_MOBILE() ? C_WW.md() ? 1.4 / 2 : 2.1 / 2 : C_WW.md() ? 1.4 : 2.1,
			y: C_PERCENTAGE_100,
			autoAlpha: 1,
			display: C_DISPLAY_FLEX,
			ease: this.animationEasing
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.logoCallback}`, this.animationStepSpeed, {
			y: C_PERCENTAGE_0,
			delay: C_CHECK_MOBILE() ? C_WW.md() ? 1.6 / 2 : 2.2 / 2 : C_WW.md() ? 1.6 : 2.2,
			ease: this.animationEasing
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.form}`, this.animationStepSpeed, {
			delay: C_CHECK_MOBILE() ? C_WW.md() ? 1.7 / 2 : 2.3 / 2 : C_WW.md() ? 1.7 : 2.3,
			x: C_PERCENTAGE_0,
			display: C_DISPLAY_FLEX,
			autoAlpha: 1,
			ease: this.animationEasing,
			onComplete: () => {
				if (C_CHECK_MOBILE()) {
					this.hammer.set({
						touchAction: 'pan-y'
					});
				}
				this.animationEnd = true;
			}
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.navArrowLeft}`, this.animationStepSpeed, {
			x: C_PERCENTAGE_0,
			display: C_DISPLAY_FLEX,
			autoAlpha: 1,
			scaleX: -1,
			scaleY: -1,
			delay: C_CHECK_MOBILE() ? 2.4 / 2 : 2.4,
			onComplete: () => {
				resolve();
			}
		});
	});
}
