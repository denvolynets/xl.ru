// Load app style
import '../src/assets/styles/_app.scss';

// JS npm scripts

// JS assets scripts
import imgToSvg from './assets/scripts/imgToSvg';
import toggleTabs from './assets/scripts/toggleTabs';
import formValidate from './assets/scripts/formValidate';

// JS template components
import carousel from './templates/blocks/carousel/carousel';
import hamburger from './templates/blocks/hamburger/hamburger';
import svg4everybody from 'svg4everybody';
import noUiSlider from 'nouislider';

const app = {
	load: () => {
		app.bindEvents();
	},
	bindEvents: () => {
		let readyFUNC = {
			mfpOpt: {
				type: 'inline',
				fixedContentPos: false,
				fixedBgPos: true,
				overflowY: 'auto',
				closeBtnInside: true,
				preloader: false,
				midClick: true,
				removalDelay: 300,
				mainClass: 'my-mfp-slide-bottom'
			},
			isMobile: () => {
				return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
			},
			isIE: () => {
				return navigator.userAgent.indexOf('MSIE ') > -1 || navigator.userAgent.indexOf('Trident/') > -1;
			}
		};

		$('input[type="number"]').niceNumber();
		$('input[type="tel"]').inputmask('+7 (999) 999-99-99');
		$('.date-input').inputmask('99.99.9999');
		$('.email-input').inputmask('email');
		$('.js-popup').magnificPopup(readyFUNC.mfpOpt);
		$('.scrollbar-outer').overlayScrollbars({});

		var rangeSlider = document.querySelector('.range-slider');

		noUiSlider.create(rangeSlider, {
			start: [20, 80],
			connect: true,
			behaviour: 'tap',
			step: 10,
			range: {
				'min': 0,
				'max': 100
			}
		});

		imgToSvg();
		carousel();
		svg4everybody();
		toggleTabs();
		formValidate();
		hamburger();
		$('select').niceSelect();

		if (readyFUNC.isIE()) $('body').addClass('ie');
		if (readyFUNC.isMobile()) $('body').addClass('touch');

		setTimeout(() => {
			$('body').addClass('show-body');
		}, 150);

		/*
		 *@ test polyfill in IE
		 */
		// Promise.resolve(32).then(x => console.log(x));
	}
};

$(document).ready(app.load);

function requireAll(r) {
	r.keys().forEach(r);
}

requireAll(require.context('./assets/images/svg/', true, /\.svg$/));
requireAll(require.context('./templates/pages/', true, /\.pug$/));