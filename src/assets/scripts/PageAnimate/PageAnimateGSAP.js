import { TweenMax, Circ } from 'gsap/TweenMax';

import { C_ANIMATE_CLASSES, C_DIR_DOWN, C_DISPLAY_BLOCK, C_DISPLAY_NONE } from '@Scripts/constants';
import { PageAnimateSteps } from '@Scripts/PageAnimate/PageAnimateSteps/PageAnimateSteps';
import { imgToSvgData } from '@Scripts/helpers';

export class PageAnimateGSAP extends PageAnimateSteps {
	constructor() {
		super();
		this.animationStep = 1;
		this.animationEnd = false;
		this.animationEasing = Circ.easeInOut;
		
		this.scrollDelay = 0;
		this.scrollEnable = true;
		this.scrollDir = '';
		this.scrollDirPrev = [];
		this.scrollDown = () => this.scrollDir === C_DIR_DOWN;
		
		this.slideActive = 0;
		this.slideTotal = $(`.${C_ANIMATE_CLASSES.title}`).data('title');
		this.slideTotalLength = parseFloat(this.slideTotal.length);
		this.slideSpeed = 1500;
		
		this.progressBarEl = $(`.${C_ANIMATE_CLASSES.progressbarLine}`);
		this.progressBarPercentage = 0;
		this.progressBarStepsCount = 6;
		this.progressBarStepsCountTotal = parseFloat(this.progressBarStepsCount + this.slideTotalLength) - 2;
		
		this.lightingTotalLength = 0;
		this.lightingActive = 0;
		this.lightingImageCount = 32;
		
		this.updateProgressBar();
		this.onArrowClick();
	}
	
	set setScrollEnable(val) {
		this.scrollEnable = val;
	}
	
	onArrowClick() {
		$(`.${C_ANIMATE_CLASSES.navArrow}`).click(() => {
			this.scrollDir = C_DIR_DOWN;
			this.onScroll();
		});
	}
	
	onLightingGenerate() {
		return new Promise(resolve => {
			let images = [];
			for (let i = 1; i <= this.lightingImageCount; i++) {
				images.push(`./assets/images/lighting/Union${i}.svg`);
			}
			images = images.sort(function(a, b) {
				return b.index - a.index;
			});
			imgToSvgData(images).then((data) => {
				[...data].map((svg, index) => {
					svg.item.css({ 'z-index': index + 1 });
					svg.item.addClass(`section-one__lighting-item ${C_ANIMATE_CLASSES.lightingItem}`);
					svg.item.attr('data-index', svg.index);
					$(`.${C_ANIMATE_CLASSES.lighting}`).append(svg.item);
				});
				this.lightingTotalLength = data.length;
				resolve();
			});
		});
	}
	
	onLightingChange(scrollDownDirection) {
		return new Promise(resolve => {
			const frame = Math.ceil(this.lightingTotalLength / this.slideTotalLength);
			const timePerOneFrame = this.slideSpeed / frame;
			const el = $(`.${C_ANIMATE_CLASSES.lightingItem}`);
			
			this.scrollEnable = false;
			
			const updateLighting = setInterval(() => {
				scrollDownDirection ? this.lightingActive += 1 : this.lightingActive -= 1;
				this.scrollEnable = false;
				
				if (this.lightingActive >= this.lightingTotalLength) {
					this.lightingActive = this.lightingTotalLength;
				}
				if (this.lightingActive <= 0) {
					this.lightingActive = 0;
				}
				
				el.each((i, el) => {
					if ($(el).data('index') == this.lightingActive - 1) {
						TweenMax.to($(el), 0, {
							display: C_DISPLAY_BLOCK,
							autoAlpha: 1
						});
					} else {
						TweenMax.to($(el), 0, {
							display: C_DISPLAY_NONE,
							autoAlpha: 0
						});
					}
				});
	
				if (
					this.lightingActive === frame * (this.slideActive + 1) ||
					this.lightingActive > this.lightingTotalLength ||
					this.lightingActive <= 0
				
				) {
					this.scrollDirPrev = [];
					resolve();
					clearInterval(updateLighting);
				}
			}, timePerOneFrame);
		});
	}
	
	updateProgressBar() {
		this.progressBarPercentage = this.animationStep / this.progressBarStepsCountTotal * 100;
		this.progressBarEl.css('width', `${this.progressBarPercentage}%`);
	}
	
	setDefaultAnimateState() {
		const hideKeys = ['sidebar', 'form', 'girl', 'callback', 'success', 'flowers', 'title', 'navArrow', 'progressbar', 'scrollText', 'shareBtn'];
		const hideClasses = Object.keys(C_ANIMATE_CLASSES).reduce((acc, thing) => {
			hideKeys.includes(thing) && acc.push(`.${C_ANIMATE_CLASSES[thing]}`);
			return acc;
		}, []);
		
		hideClasses.forEach(className => {
			TweenMax.to(className, 0, {
				display: C_DISPLAY_NONE,
				autoAlpha: 0
			});
		});
	}
	
	async onAnimate() {
		if (this.animationStep === 3 && !this.scrollDown()) {
			this.scrollEnable = false;
			await this.onLightingChange(this.scrollDown());
			TweenMax.to(`.${C_ANIMATE_CLASSES.lightingItem}`, 0.15, {
				display: C_DISPLAY_NONE,
				autoAlpha: 0
			});
			await this.step3(1);
			await this.step2(2);
			this.animationStep = 2;
			this.updateProgressBar();
			return;
		} else {
			TweenMax.killAll();
			this.updateProgressBar();
		}
		
		switch (true) {
			case this.animationStep === 1:
				this.step1();
				break;
			case this.animationStep === 2:
				this.step2();
				break;
			case this.animationStep === 3:
				this.step3();
				break;
			case this.animationStep === 4 && this.scrollDown():
				await this.step4();
				this.scrollEnable = false;
				await this.onLightingChange(this.scrollDown());
				this.scrollEnable = true;
				break;
			case !this.scrollDown() && this.animationStep === 4 || this.animationStep >= 5 && this.animationStep < this.progressBarStepsCountTotal:
				this.step5();
				break;
			case this.animationStep === this.progressBarStepsCountTotal && this.scrollDown():
				this.step6();
				break;
			default:
				break;
		}
	}
}
