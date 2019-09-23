import { Circ } from 'gsap';
import { TweenMax } from 'gsap/TweenMax';

import { step1 } from '@Scripts/PageAnimate/PageAnimateSteps/steps/step1';
import { step2 } from '@Scripts/PageAnimate/PageAnimateSteps/steps/step2';
import { step3 } from '@Scripts/PageAnimate/PageAnimateSteps/steps/step3';
import { step4, step4Restore } from '@Scripts/PageAnimate/PageAnimateSteps/steps/step4';
import { step5 } from '@Scripts/PageAnimate/PageAnimateSteps/steps/step5';
import { step6 } from '@Scripts/PageAnimate/PageAnimateSteps/steps/step6';
import { step7 } from '@Scripts/PageAnimate/PageAnimateSteps/steps/step7';
import {
	C_ANIMATE_CLASSES,
	C_DIR_DOWN,
	C_PERCENTAGE_100
} from '@Scripts/constants';
import { onInitAnimate } from '@Scripts/PageAnimate/PageAnimateSteps/steps/onInitAnimate';

export class PageAnimateSteps {
	constructor() {
		this.animationEasing = Circ.easeInOut;
	}
	
	async goToEnd() {
		return;
		
		const params = new window.URLSearchParams(window.location.search);
		console.log(params.get('end'));
		if (params.get('end')) {
			this.setScrollEnable = false;
			this.scrollDir = C_DIR_DOWN;
			this.step1();
			this.step2();
			this.step3();
			this.step4();
			this.step5();
			await this.step6();
			TweenMax.to(`.${C_ANIMATE_CLASSES.navArrowRight}`, this.animationStepSpeed, {
				x: C_PERCENTAGE_100,
				autoAlpha: 0,
				delay: 3,
				onComplete: () => {
					this.animationStep = 8;
					this.slideActive = this.slideTotalLength;
					// this.updateProgressBar();
					$(`.${C_ANIMATE_CLASSES.title}`).html(this.slideTotal[this.slideActive]);
				}
			});
		}
	}
	
	onInitAnimate() {
		onInitAnimate.apply(this);
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
	
	async step5() {
		return step5.apply(this);
	}
	
	async step6() {
		return step6.apply(this);
	}
	
	async step7(reverse) {
		return step7.apply(this, [reverse]);
	}
}
