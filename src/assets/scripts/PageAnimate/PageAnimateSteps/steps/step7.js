import {
	C_ANIMATE_CLASSES,
	C_DISPLAY_FLEX,
	C_REVERSE,
	C_PERCENTAGE_0,
	C_PERCENTAGE_100,
	C_DISPLAY_NONE, C_WW, C_DIR_DOWN, C_DIR_UP
} from '@Scripts/constants';
import { TweenMax } from 'gsap/TweenMax';

export function step7(reverse) {
	const scrollTopSpeed = 300;
	const onStep7 = () => {
		return new Promise(resolve => {
			if (reverse === C_REVERSE) {
				TweenMax.to(`.${C_ANIMATE_CLASSES.success}`, this.animationStepSpeed / 2, {
					delay: 0,
					x: C_PERCENTAGE_100,
					autoAlpha: 0,
					ease: this.animationEasing,
					display: C_DISPLAY_NONE,
					onComplete: () => {
						TweenMax.to(`.${C_ANIMATE_CLASSES.form}`, this.animationStepSpeed / 1.5, {
							delay: 0,
							y: C_PERCENTAGE_0,
							autoAlpha: 1,
							display: C_DISPLAY_FLEX,
							ease: this.animationEasing,
							onComplete: () => {
								resolve(C_DIR_UP);
							}
						});
					}
				});
			} else {
				TweenMax.to(`.${C_ANIMATE_CLASSES.form}`, this.animationStepSpeed / 2, {
					delay: 0,
					y: C_PERCENTAGE_100,
					display: C_DISPLAY_NONE,
					autoAlpha: 0,
					ease: this.animationEasing,
					onComplete: () => {
						TweenMax.fromTo(`.${C_ANIMATE_CLASSES.success}`, this.animationStepSpeed / 1.5, {
							x: C_PERCENTAGE_100,
							autoAlpha: 0,
							display: C_DISPLAY_NONE
						}, {
							delay: 0,
							x: C_PERCENTAGE_0,
							display: C_DISPLAY_FLEX,
							autoAlpha: 1,
							ease: this.animationEasing,
							onComplete: () => {
								resolve(C_DIR_DOWN);
							}
						});
					}
				});
			}
		});
	};
	
	if (C_WW.md()) {
		$(`.${C_ANIMATE_CLASSES.callback}`).animate({ scrollTop: 0 }, scrollTopSpeed, async() => {
			const dir = await onStep7();
			const scrollTop = $(`.${dir === C_DIR_DOWN ? C_ANIMATE_CLASSES.success : C_ANIMATE_CLASSES.form}`).offset().top;
			$(`.${C_ANIMATE_CLASSES.callback}`).animate({ scrollTop }, scrollTopSpeed);
		});
	} else {
		$(`.${C_ANIMATE_CLASSES.callbackScrollWrapper}`).animate({ scrollTop: 0 }, scrollTopSpeed, onStep7());
	}
}
