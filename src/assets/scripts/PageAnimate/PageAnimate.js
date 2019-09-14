import WheelIndicator from 'wheel-indicator';
import Parallax from 'parallax-js';
import 'tilt.js';

import { PageAnimateGSAP } from './PageAnimateGSAP';
import { C_ANIMATE_CLASSES, C_CSS_CLASSES, C_DOM_CLASSES } from '@Scripts/constants';

export default class PageAnimate extends PageAnimateGSAP {
	constructor() {
		super();
		this.scrollEl = document.querySelector(`.${C_DOM_CLASSES.main}`);
		this.init();
	}
	
	async init() {
		this.onSocialsAnimate();
		this.setDefaultAnimateState();
		await this.onLightingGenerate();
		this.onWheelIndicator();
		this.onChangeSpinner();
		
		const parallaxInstance = [...document.querySelectorAll(`.${C_DOM_CLASSES.parallaxParent}`)].map(el => new Parallax(el));
	}
	
	onChangeSpinner() {
		$(`.${C_ANIMATE_CLASSES.spinnerEl}`).toggleClass(C_CSS_CLASSES.spinnerClass);
	}
	
	onScroll() {
		if (!this.scrollEnable) return;
		if (!this.scrollDown()) {
			if (this.animationStep === 2) this.scrollEnable = true;
			if (this.animationStep > 1) this.animationStep -= 1;
		} else {
			if (this.animationStep < this.progressBarStepsCountTotal) this.animationStep += 1;
		}
		this.onAnimate();
	}
	
	onWheelIndicator() {
		let currentTime = (new Date()).getTime();
		new WheelIndicator({
			elem: this.scrollEl,
			callback: (e) => {
				const nowTime = (new Date()).getTime();
				const diff = Math.abs((nowTime - currentTime) / this.scrollDelay);
				
				if (diff >= 1) {
					this.scrollDir = e.direction;
					this.onScroll();
					currentTime = nowTime;
				}
			}
		});
	}
	
	onSocialsAnimate() {
		$(`.${C_DOM_CLASSES.socialsBtn}`).click(function() {
			$(`.${C_DOM_CLASSES.socials}`).toggleClass(C_CSS_CLASSES.show);
		});
	}
}
