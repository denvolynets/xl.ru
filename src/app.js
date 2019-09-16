// Load app style
import '@Styles/app.scss';

// JS npm scripts
import './libs';
import svg4everybody from 'svg4everybody';

// JS assets scripts
import { imgToSvg } from '@Scripts/helpers';
import formValidate from '@Scripts/form/formValidate';
import PageAnimate from '@Scripts/PageAnimate/PageAnimate';
import { formSubmit } from '@Scripts/form/formSubmit';
import '@Scripts/jqFunctions/jqFunctions';
import { C_DOM_CLASSES, C_REGEX } from '@Scripts/constants';

const app = {
	load: () => {
		app.bindEvents();
	},
	bindEvents: async() => {
		const INIT_DATA = {
			masks: {
				tel: '+7 (999) 999-99-99',
				date: '99.99.9999',
				email: 'email',
				card: [ '9{4} 9{4} 9{4} 9{4}', { placeholder: '∗' } ]
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
				this.initMasks();
			}
		};

		INIT_DATA.initLibs();
		svg4everybody();
		formValidate();
		await imgToSvg();
		const pageAnimate = new PageAnimate();
		formSubmit(pageAnimate);
		
		$(`.${C_DOM_CLASSES.inputNumber}`).inputFilter((value) => C_REGEX.number.test(value));
	}
};

$(document).ready(app.load);

const requireAll = (r) => {
	r.keys().forEach(r);
};

requireAll(require.context('./assets/images/svg-icons/', true, /\.svg$/));
requireAll(require.context('./templates/pages/', true, /\.pug$/));
