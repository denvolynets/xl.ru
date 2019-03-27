// Load app style
import '../src/assets/styles/_app.scss';

// JS npm scripts
import '../node_modules/jquery.nice-number/dist/jquery.nice-number';
import '../node_modules/magnific-popup/dist/jquery.magnific-popup.min';
// import '../node_modules/jquery-nice-select/js/jquery.nice-select.min';
import '../node_modules/overlayscrollbars/js/jquery.overlayScrollbars.min';
import '../node_modules/inputmask/dist/jquery.inputmask.bundle';

// JS assets scripts
import imgToSvg from '../src/assets/scripts/imgToSvg';
import toggleTabs from '../src/assets/scripts/toggleTabs';

// JS template components
import carousel from './template/components/carousel/carousel';
import svg4everybody from 'svg4everybody';

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
		$('select').niceSelect();
		$('input[type="tel"]').inputmask('+7 (999) 999-99-99');
		$('.date-input').inputmask('99.99.9999');
		$('.js-popup').magnificPopup(readyFUNC.mfpOpt);
		$('.scrollbar-outer').overlayScrollbars({});

		imgToSvg();
		carousel();
		svg4everybody();
		toggleTabs();

		if (readyFUNC.isIE()) $('body').addClass('ie');
		if (readyFUNC.isMobile()) $('body').addClass('touch');

		setTimeout(() => {
			$('body').addClass('show-body');
		}, 150);

		/*
			*@ test polyfill in IE
		*/
		Promise.resolve(32).then(x => console.log(x));
	}
};

$(document).ready(app.load);

function requireAll(r) {
	r.keys().forEach(r);
}

requireAll(require.context('./assets/images/svg/', true, /\.svg$/));
requireAll(require.context('./template/pages/', true, /\.pug$/));