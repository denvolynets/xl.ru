import WheelIndicator from 'wheel-indicator';
// import 'tilt.js';
import Hammer from 'hammerjs';
import { PageAnimateGSAP } from './PageAnimateGSAP';
import {
	C_ANIMATE_CLASSES,
	C_CHECK_MOBILE,
	C_CSS_CLASSES,
	C_DIR_DOWN,
	C_DIR_UP,
	C_DOM_CLASSES
} from '@Scripts/constants';
import { stepLogoFinal } from '@Scripts/PageAnimate/PageAnimateSteps/steps/step1';

export default class PageAnimate extends PageAnimateGSAP {
	constructor() {
		super();
		this.hammer = '';
		this.scrollEl = document.querySelector(`.${C_DOM_CLASSES.main}`);
		this.init();
	}
	
	async init() {
		this.onSocialsAnimate();
		
		if (!this.scrollEl) {
			await stepLogoFinal.apply(this);
			this.onChangeSpinner();
			return;
		}
		this.setDefaultAnimateState();
		await this.onLightingGenerate();
		this.onWheelIndicator();
		this.onChangeSpinner();
	}
	
	onChangeSpinner() {
		$(`.${C_ANIMATE_CLASSES.spinnerEl}`).toggleClass(C_CSS_CLASSES.spinnerClass);
	}
	
	onScroll() {
		if (!this.scrollEnable) return;
		if (!this.scrollDown()) {
			if (this.animationStep === 2) this.setScrollEnable = true;
			if (this.animationStep > 1) this.animationStep -= 1;
		} else {
			if (this.animationStep < this.progressBarStepsCountTotal) this.animationStep += 1;
		}
		this.onAnimate();
	}
	
	onWheelIndicator() {
		let currentTime = (new Date()).getTime();
		
		if (C_CHECK_MOBILE()) {
			this.hammer = new Hammer(this.scrollEl, {
				touchAction: 'none'
			});
			this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
			this.hammer.on('swipeup swipedown', (ev) => {
				const nowTime = (new Date()).getTime();
				const diff = Math.abs((nowTime - currentTime) / this.scrollDelay);
				
				if (diff >= 1) {
					this.scrollDir = ev.type === 'swipedown' ? C_DIR_UP : C_DIR_DOWN;
					this.onScroll();
					currentTime = nowTime;
				}
			});
		} else {
			new WheelIndicator({
				preventMouse: false,
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
	}
	
	onSocialsAnimate() {
		$(`.${C_DOM_CLASSES.socialsBtn}, .${C_DOM_CLASSES.socialsBtnOpen}`).click(function() {
			$(`.${C_DOM_CLASSES.socials}`).toggleClass(C_CSS_CLASSES.show);
		});
	}
}
