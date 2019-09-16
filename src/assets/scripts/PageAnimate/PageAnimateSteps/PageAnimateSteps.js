import { Circ } from 'gsap';
import { TweenMax } from 'gsap/TweenMax';

import { step1 } from '@Scripts/PageAnimate/PageAnimateSteps/steps/step1';
import { step2 } from '@Scripts/PageAnimate/PageAnimateSteps/steps/step2';
import { step3 } from '@Scripts/PageAnimate/PageAnimateSteps/steps/step3';
import { step4, step4Restore } from '@Scripts/PageAnimate/PageAnimateSteps/steps/step4';
import { step5 } from '@Scripts/PageAnimate/PageAnimateSteps/steps/step5';
import { step6 } from '@Scripts/PageAnimate/PageAnimateSteps/steps/step6';
import { step7 } from '@Scripts/PageAnimate/PageAnimateSteps/steps/step7';
import { C_ANIMATE_CLASSES, C_PERCENTAGE_0 } from '@Scripts/constants';

export class PageAnimateSteps {
	constructor() {
		this.animationEasing = Circ.easeInOut;
	}
	
	onInitAnimate() {
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
			}
		});
	}
	
	step1() {
		step1.apply(this);
	}
	async step2(disableScroll = 2) {
		return step2.apply(this, [disableScroll]);
	}
	
	async step3(disableScroll = 2) {
		return step3.apply(this, [disableScroll]);
	}
	
	async step4() {
		return step4.apply(this);
	}
	
	step4Restore() {
		return step4Restore.apply(this);
	}
	
	step5() {
		step5.apply(this);
	}
	
	step6() {
		step6.apply(this);
	}
	
	async step7(reverse) {
		return step7.apply(this, [reverse]);
	}
}
