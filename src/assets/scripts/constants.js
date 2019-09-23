export const C_CSS_CLASSES = {
	show: 'c-show',
	spinnerClass: 'c-spinner',
	scrollable: 'c-scrollable',
	lastAnimationStep: 'c-animation-last-step'
};

export const C_ANIMATE_CLASSES = {
	success: 'js-animate-success',
	form: 'js-animate-form',
	sidebar: 'js-animate-sidebar',
	callback: 'js-animate-callback',
	callbackScrollWrapper: 'js-animate-callback-scroll-wrapper',
	girl: 'js-animate-girl',
	flowers: 'js-animate-flowers',
	title: 'js-animate-title',
	logoFirstPath: 'js-animate-logo .st0:first-child',
	logoSecondPath: 'js-animate-logo .st0:last-child',
	logo: 'js-animate-logo',
	logoCallback: 'js-animate-logo-callback',
	socialsContainer: 'js-socials',
	scrollText: 'js-animate-scroll-text',
	progressbar: 'js-animate-progressbar',
	progressbarLine: 'js-animate-progressbar-line',
	navArrowRight: 'js-animate-nav-right svg',
	navArrowLeft: 'js-animate-nav-left svg',
	lighting: 'js-animate-lighting',
	lightingItem: 'js-animate-lighting-item',
	bgLayer: 'js-animate-bg-layer',
	spinnerEl: 'js-spinner',
	bottom: 'js-animate-bottom'
};

export const C_DOM_CLASSES = {
	main: 'js-main',
	socialsBtn: 'js-socials-btn',
	socialsBtnOpen: 'js-socials-btn-open',
	socials: 'js-socials',
	form: 'js-form',
	repeatPayBtn: 'js-repeat-pay-btn',
	parallaxParent: 'js-parallax-parent',
	inputNumber: 'js-input-number'
};

export const C_DIR_DOWN = 'down';
export const C_DIR_UP = 'up';
export const C_REVERSE = 'reverse';
export const C_RESET = 'reset';

export const C_DISPLAY_NONE = 'none';
export const C_DISPLAY_BLOCK = 'block';
export const C_DISPLAY_FLEX = 'flex';

export const C_PERCENTAGE_0 = '0%';
export const C_PERCENTAGE_100 = '100%';
export const C_PERCENTAGE_100_MIN = '-100%';

export const C_REGEX = {
	number: /^\d*$/
};

export const C_GET_WH = () => $(window).height();
export const C_GET_WW = () => $(window).width();
export const C_WW = {
	xs: () => C_GET_WW() <= 768,
	md: () => C_GET_WW() <= 1024
};

export const C_CHECK_SAFARI = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
export const C_CHECK_MOBILE = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
export const C_CHECK_IOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
export const C_CHECK_FIREFOX = () => typeof InstallTrigger !== 'undefined';
export const C_CHECK_IE = () => navigator.userAgent.indexOf('MSIE ') > -1 || navigator.userAgent.indexOf('Trident/') > -1;
