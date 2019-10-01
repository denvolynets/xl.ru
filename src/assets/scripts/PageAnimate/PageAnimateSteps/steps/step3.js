import { TweenMax } from 'gsap/TweenMax';
import { C_ANIMATE_CLASSES, C_CHECK_MOBILE, C_PERCENTAGE_0 } from '@Scripts/constants';

export function step3(disableScroll) {
	return new Promise(resolve => {
		// this.setScrollEnable = disableScroll !== 1;
		
		TweenMax.to(`.${C_ANIMATE_CLASSES.logo}`, C_CHECK_MOBILE() ? this.animationStepSpeed : this.animationStepSpeed + 0.25, {
			scale: 0.70,
			delay: C_CHECK_MOBILE() ? this.scrollDown() ? 0 : 1.15 / 2 : this.scrollDown() ? 0 : 1.15,
			y: '-25%',
			onComplete: () => {
				if (disableScroll !== 1) this.setScrollEnable = true;
				resolve();
			}
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.logoFirstPath}`, C_CHECK_MOBILE() ? this.animationStepSpeed : this.animationStepSpeed + 0.25, {
			y: 45,
			delay: C_CHECK_MOBILE() ? this.scrollDown() ? 0 : this.animationStepSpeed + 0.35 / 2 : this.scrollDown() ? 0 : this.animationStepSpeed + 0.35
		});
		
		this.step4Restore();
	});
}
