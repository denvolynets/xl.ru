import { C_DOM_CLASSES } from '@Scripts/constants';

export function jsElByClass(className) {
	return document.querySelector(`.${className}`);
}

export function jqElByClass(className) {
	return $(`.${className}`);
}

export const h_getWW = () => $(window).width();

export const h_jsonParse = (obj) => {
	obj = JSON.stringify(obj);
	return JSON.parse(obj);
};
