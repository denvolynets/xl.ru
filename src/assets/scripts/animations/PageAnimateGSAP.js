import { Back, Elastic, TweenMax, Circ } from 'gsap/TweenMax';
import { C_ANIMATE_CLASSES, C_DIR_DOWN, C_REVERSE } from '@Scripts/constants';
import { h_getWW, h_jsonParse } from '@Scripts/helpers';
import { imgToSvgData } from '@Scripts/imgToSvg';

export class PageAnimateGSAP {
	constructor() {
		this.animationStep = 1;
		this.animationEnd = false;
		
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
							display: 'block',
							autoAlpha: 1
						});
					} else {
						TweenMax.to($(el), 0, {
							display: 'none',
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
				display: 'none',
				autoAlpha: 0
			});
		});
	}
	
	async onAnimate() {
		if (this.animationStep === 3 && !this.scrollDown()) {
			this.scrollEnable = false;
			await this.onLightingChange(this.scrollDown());
			TweenMax.to(`.${C_ANIMATE_CLASSES.lightingItem}`, 0.15, {
				display: 'none',
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
	
	restoreStep4() {
		TweenMax.to(`.${C_ANIMATE_CLASSES.title}`, 1, {
			y: '-100%',
			autoAlpha: 0,
			display: 'block',
			ease: Back.easeOut.config(1.4)
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.flowers}`, 0.35, {
			display: 'block',
			autoAlpha: 0,
			y: 40,
			scale: 0.9
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.girl}`, this.scrollDown() ? 0 : 1, {
			y: '100%',
			autoAlpha: 0,
			delay: this.scrollDown() ? 0 : 0.75,
			scale: 0.55,
			display: 'block',
			ease: Elastic.easeOut.config(1, 0.9)
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.navArrow}`, 1, {
			x: '100%',
			autoAlpha: 0,
			display: 'block',
			ease: Elastic.easeOut.config(1, 0.6)
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.progressbar}`, 1, {
			y: 200,
			autoAlpha: 0,
			display: 'block',
			ease: Elastic.easeOut.config(1, 0.9)
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.scrollText}`, 1, {
			y: 200,
			autoAlpha: 0,
			display: 'block',
			ease: Elastic.easeOut.config(1, 0.9)
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.shareBtn}`, 1, {
			y: 200,
			autoAlpha: 0,
			display: 'flex',
			ease: Elastic.easeOut.config(1, 0.9)
		});
	}
	
	step1() {
		this.scrollEnable = true;
		TweenMax.to(`.${C_ANIMATE_CLASSES.logoFirstPath}`, 1.25, {
			y: 0,
			ease: Elastic.easeOut.config(1, 0.6),
			onComplete: () => this.scrollEnable = true
		});
	}
	
	step2(disableScroll = 2) {
		return new Promise(resolve => {
			if (disableScroll !== 1) this.scrollEnable = true;
			TweenMax.to(`.${C_ANIMATE_CLASSES.logo}`, 1.25, {
				scale: 1,
				ease: Elastic.easeOut.config(1, 0.6)
			});
			TweenMax.to(`.${C_ANIMATE_CLASSES.logoFirstPath}`, 1.25, {
				y: 45,
				ease: Elastic.easeOut.config(1, 0.6),
				onComplete: () => {
					if (disableScroll !== 1) this.scrollEnable = true;
					resolve();
				}
			});
		});
	}
	
	step3(disableScroll = 2) {
		return new Promise(resolve => {
			if (disableScroll !== 1) this.scrollEnable = true;
			else this.scrollEnable = false;
			
			TweenMax.to(`.${C_ANIMATE_CLASSES.logo}`, 1.25, {
				scale: 0.5,
				delay: this.scrollDown() ? 0 : 1.15,
				y: '0%',
				ease: Elastic.easeOut.config(1, 0.6),
				onComplete: () => {
					if (disableScroll !== 1) this.scrollEnable = true;
					resolve();
				}
			});
			TweenMax.to(`.${C_ANIMATE_CLASSES.logoFirstPath}`, 1.25, {
				y: 45,
				ease: Elastic.easeOut.config(1, 0.6),
				delay: this.scrollDown() ? 0 : 1.35
			});
			
			this.restoreStep4();
		});
	}
	
	async step4() {
		return new Promise(resolve => {
			this.scrollEnable = false;
			TweenMax.to(`.${C_ANIMATE_CLASSES.logo}`, 1.25, {
				y: '-36%',
				scale: 0.5,
				ease: Elastic.easeOut.config(1, 0.9)
			});
			TweenMax.to(`.${C_ANIMATE_CLASSES.logoFirstPath}`, 1.25, {
				y: 8,
				ease: Elastic.easeOut.config(1, 0.6)
			});
			TweenMax.to(`.${C_ANIMATE_CLASSES.title}`, 1, {
				display: 'block',
				delay: 0.25,
				autoAlpha: 1,
				y: '0%'
			});
			TweenMax.to(`.${C_ANIMATE_CLASSES.girl}`, 1.25, {
				display: 'block',
				delay: 0.75,
				autoAlpha: 1,
				scale: 1,
				y: '0%',
				ease: Elastic.easeOut.config(1, 0.9)
			});
			TweenMax.to(`.${C_ANIMATE_CLASSES.flowers}`, 0.4, {
				display: 'block',
				delay: 1.55,
				scale: 1,
				y: 0,
				autoAlpha: 1
			});
			TweenMax.to(`.${C_ANIMATE_CLASSES.navArrow}`, 1, {
				display: 'block',
				delay: 2,
				autoAlpha: 1,
				x: '0%',
				ease: Elastic.easeOut.config(1, 0.6)
			});
			TweenMax.to(`.${C_ANIMATE_CLASSES.progressbar}`, 1, {
				display: 'block',
				delay: 2,
				autoAlpha: 1,
				y: 0,
				ease: Elastic.easeOut.config(1, 0.9)
			});
			TweenMax.to(`.${C_ANIMATE_CLASSES.scrollText}`, 1, {
				display: 'block',
				delay: 2,
				autoAlpha: 1,
				y: 0,
				ease: Elastic.easeOut.config(1, 0.9)
			});
			TweenMax.to(`.${C_ANIMATE_CLASSES.shareBtn}`, 1, {
				display: 'flex',
				delay: 2,
				autoAlpha: 1,
				y: 0,
				ease: Elastic.easeOut.config(1, 0.9),
				onComplete: () => {
					this.scrollEnable = true;
					resolve();
				}
			});
		});
	}
	
	step5() {
		const titleWidth = $(`.${C_ANIMATE_CLASSES.title}`).outerWidth();
		const titleOffsetLeft = $(`.${C_ANIMATE_CLASSES.title}`).offset().left;
		this.scrollEnable = false;
		this.animationEnd = false;
		
		TweenMax.to(`.${C_ANIMATE_CLASSES.title}`, this.slideSpeed / 1000, {
			x: -titleOffsetLeft - titleWidth - 50,
			autoAlpha: 0,
			ease: Elastic.easeInOut.config(1, 0.75)
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.title}`, 0, {
			x: h_getWW() - titleOffsetLeft + titleWidth,
			autoAlpha: 0,
			delay: 0.85,
			onComplete: async() => {
				this.scrollDown() ? this.slideActive += 1 : this.slideActive -= 1;
				if (this.slideActive < 1) this.slideActive = 0;
				if (this.slideActive >= this.slideTotalLength - 1) this.slideActive = this.slideTotalLength - 1;
				$(`.${C_ANIMATE_CLASSES.title}`).html(this.slideTotal[this.slideActive]);
				await this.onLightingChange(this.scrollDown());
				this.scrollEnable = true;
			}
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.title}`, this.slideSpeed / 1000, {
			x: 0,
			delay: 0.85,
			autoAlpha: 1,
			ease: Elastic.easeInOut.config(1, 0.75)
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.girl}`, 1.25, {
			display: 'block',
			delay: 0.75,
			autoAlpha: 1,
			scale: 1,
			y: '0%',
			ease: Elastic.easeOut.config(1, 0.9)
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.callback}`, 1, {
			delay: 0.75,
			display: 'none',
			autoAlpha: 0
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.sidebar}`, 1, {
			display: 'none',
			autoAlpha: 0,
			x: '-100%',
			ease: Elastic.easeOut.config(1, 0.9)
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.form}`, 1, {
			display: 'none',
			autoAlpha: 0,
			x: '100%',
			ease: Elastic.easeOut.config(1, 0.9)
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.flowers}`, 0.4, {
			display: 'block',
			delay: 1.55,
			scale: 1,
			y: 0,
			autoAlpha: 1
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.sidebar}`, 1, {
			display: 'none',
			autoAlpha: 0,
			x: '-100%',
			delay: 0
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.form}`, 1, {
			display: 'none',
			autoAlpha: 0,
			x: '100%'
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.bgLayer}`, 1, {
			display: 'none',
			autoAlpha: 0,
			y: '-100%'
		});
	}
	
	step6() {
		this.slideActive = this.slideTotalLength;
		this.lightingActive = this.lightingTotalLength + 1;
		this.scrollEnable = false;
		
		const titleWidth = $(`.${C_ANIMATE_CLASSES.title}`).outerWidth();
		const titleOffsetLeft = $(`.${C_ANIMATE_CLASSES.title}`).offset().left;
		
		TweenMax.to(`.${C_ANIMATE_CLASSES.title}`, 1, {
			x: -titleOffsetLeft - titleWidth - 50,
			autoAlpha: 0,
			ease: Back.easeOut.config(1.4)
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.flowers}`, 0.35, {
			display: 'block',
			autoAlpha: 0,
			delay: 0.75,
			y: 40,
			scale: 0.9
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.callback}`, 1, {
			delay: 0.75,
			display: 'flex',
			autoAlpha: 1
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.sidebar}`, 1, {
			delay: 1.35,
			display: 'flex',
			x: '0%',
			autoAlpha: 1,
			ease: Elastic.easeOut.config(1, 0.9)
		});
		if (!this.animationEnd) {
			TweenMax.to(`.${C_ANIMATE_CLASSES.bgLayer}`, 1, {
				delay: 2.35,
				display: 'flex',
				y: '30%',
				autoAlpha: 1,
				ease: Elastic.easeOut.config(1, 0.9)
			});
		}
		TweenMax.to(`.${C_ANIMATE_CLASSES.bgLayer}`, 0.75, {
			delay: 3.6,
			y: '100%',
			ease: Elastic.easeOut.config(1, 0.9)
		});
		TweenMax.to(`.${C_ANIMATE_CLASSES.form}`, 1, {
			delay: 3.7,
			x: '0%',
			display: 'flex',
			autoAlpha: 1,
			ease: Elastic.easeOut.config(1, 1.5),
			onComplete: () => {
				this.scrollEnable = true;
				this.animationEnd = true;
			}
		});
	}
	
	step7(reverse) {
		return new Promise(resolve => {
			if (reverse === C_REVERSE) {
				TweenMax.to(`.${C_ANIMATE_CLASSES.success}`, 1, {
					delay: 0,
					x: '100%',
					autoAlpha: 0,
					ease: Elastic.easeOut.config(1, 1.5)
				});
				TweenMax.to(`.${C_ANIMATE_CLASSES.form}`, 1, {
					delay: 0.1,
					y: '0%',
					autoAlpha: 1,
					ease: Elastic.easeOut.config(1, 1.5),
					onComplete: () => {
						resolve();
					}
				});
			} else {
				TweenMax.to(`.${C_ANIMATE_CLASSES.form}`, 1, {
					delay: 0,
					y: '100%',
					display: 'flex',
					autoAlpha: 0,
					ease: Elastic.easeOut.config(1, 1.5)
				});
				TweenMax.fromTo(`.${C_ANIMATE_CLASSES.success}`, 1, {
					x: '100%',
					autoAlpha: 0
				}, {
					delay: 0.1,
					x: '0%',
					display: 'flex',
					autoAlpha: 1,
					ease: Elastic.easeOut.config(1, 1.5),
					onComplete: () => {
						resolve();
					}
				});
			}
		});
	}
}
