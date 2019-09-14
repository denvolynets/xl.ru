import { TweenMax } from 'gsap/TweenMax';
import { C_ANIMATE_CLASSES, C_PERCENTAGE_0 } from '@Scripts/constants';

export function step3(disableScroll) {
	return new Promise(resolve => {
		this.scrollEnable = disableScroll !== 1;
		
		TweenMax.to(`.${C_ANIMATE_CLASSES.logo}`, 1.25, {
			scale: 0.5,
			delay: this.scrollDown() ? 0 : 1.15,
			y: C_PERCENTAGE_0,
			ease: this.animationEasing,
			onComplete: () => {
				if (disableScroll !== 1) this.scrollEnable = true;
				resolve();
			}
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.logoFirstPath}`, 1.25, {
			y: 45,
			ease: this.animationEasing,
			delay: this.scrollDown() ? 0 : 1.35
		});
		
		this.step4Restore();
	});
}
