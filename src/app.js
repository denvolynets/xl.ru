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
		let initData = {
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
			masks: {
				tel: '+7 (999) 999-99-99',
				date: '99.99.9999',
				email: 'email',
				card: ['9{4} 9{4} 9{4} 9{4}', { placeholder: '∗' }]
			},
			isMobile: function() {
				return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
			},
			isIE: function() {
				return navigator.userAgent.indexOf('MSIE ') > -1 || navigator.userAgent.indexOf('Trident/') > -1;
			},
			initMasks: function() {
				Object.keys(this.masks).map((maskName, index) => {
					let maskPlaceholder = this.masks[maskName];

					if (typeof maskPlaceholder == 'object') {
						$(`input.${maskName}-input`).inputmask(...maskPlaceholder);
					} else {
						$(`input.${maskName}-input`).inputmask(maskPlaceholder);
					}
				});
			},
			initLibs: function() {
				$('select').niceSelect();
				$('input[type="number"]').niceNumber();
				$('.js-popup').magnificPopup(this.mfpOpt);
				$('.js-popup-close').click(function() { $.magnificPopup.close(); });
				$('.scrollbar-outer').overlayScrollbars({});
				this.initMasks();
				noUiSlider.create(document.querySelector('.range-slider'), {
					start: [20, 80],
					connect: true,
					behaviour: 'tap',
					step: 10,
					range: {
						'min': 0,
						'max': 100
					}
				});
			}
		};

		initData.initLibs();
		imgToSvg();
		carousel();
		svg4everybody();
		toggleTabs();
		formValidate();
		hamburger();

		if (initData.isIE()) $('body').addClass('ie');
		if (initData.isMobile()) $('body').addClass('touch');
	}
};

$(document).ready(app.load);

function requireAll(r) {
	r.keys().forEach(r);
}

requireAll(require.context('./assets/images/svg/', true, /\.svg$/));
requireAll(require.context('./templates/pages/', true, /\.pug$/));