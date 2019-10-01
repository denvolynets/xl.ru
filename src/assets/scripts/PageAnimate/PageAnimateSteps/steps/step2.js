import { TweenMax } from 'gsap/TweenMax';
import { C_ANIMATE_CLASSES, C_CHECK_MOBILE, C_PERCENTAGE_0 } from '@Scripts/constants';

export function step2(disableScroll) {
	return new Promise(resolve => {
		// this.setScrollEnable = disableScroll === 1;
		// this.setScrollEnable = false;
		TweenMax.to(`.${C_ANIMATE_CLASSES.logo}`,
			C_CHECK_MOBILE() ? this.animationStepSpeed : this.animationStepSpeed + 0.25,
			{
				scale: 0.85,
				y: '-10%'
			});
		TweenMax.to(`.${C_ANIMATE_CLASSES.logoFirstPath}`,
			C_CHECK_MOBILE() ? this.animationStepSpeed : this.animationStepSpeed + 0.25,
			{
				y: 25,
				onComplete: () => {
					if (disableScroll !== 1) this.setScrollEnable = true;
					resolve();
				}
			});
	});
}
