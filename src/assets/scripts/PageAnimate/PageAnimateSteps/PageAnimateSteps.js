import { Circ } from 'gsap';

import { step1 } from '@Scripts/PageAnimate/PageAnimateSteps/steps/step1';
import { step2 } from '@Scripts/PageAnimate/PageAnimateSteps/steps/step2';
import { step3 } from '@Scripts/PageAnimate/PageAnimateSteps/steps/step3';
import { step4, step4Restore } from '@Scripts/PageAnimate/PageAnimateSteps/steps/step4';
import { step5 } from '@Scripts/PageAnimate/PageAnimateSteps/steps/step5';
import { step6 } from '@Scripts/PageAnimate/PageAnimateSteps/steps/step6';
import { step7 } from '@Scripts/PageAnimate/PageAnimateSteps/steps/step7';

export class PageAnimateSteps {
	constructor() {
		this.animationEasing = Circ.easeInOut;
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
