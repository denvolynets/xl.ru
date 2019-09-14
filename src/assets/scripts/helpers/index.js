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

export function imgToSvg() {
	const promises = [];
	
	return new Promise(resolve => {
		$('img.svg').each(function(i, e) {
			let $img = $(e);
			let imgID = $img.attr('id');
			let imgClass = $img.attr('class');
			let imgURL = $img.attr('src');
			
			promises.push($.ajax({
				method: 'GET',
				url: imgURL,
				dataType: 'xml'
			}).then(function(data) {
				let $svg = $(data).find('svg');
				if (typeof imgID !== 'undefined') {
					$svg = $svg.attr('id', imgID);
				}
				if (typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass + ' replaced-svg');
				}
				$svg = $svg.removeAttr('xmlns:a');
				
				if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
					$svg.attr('viewBox 0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
				}
				$img.replaceWith($svg);
			}));
		});
		$.when.apply($, promises).then(function() {
			resolve();
		});
	});
}

export function imgToSvgData(urls) {
	const promises = [];
	const svgArray = [];
	
	return new Promise(resolve => {
		urls.map(function(url, i) {
			promises.push($.ajax({
				method: 'GET',
				url: url,
				dataType: 'xml'
			}).then(function(data) {
				let $svg = $(data).find('svg');
				$svg = $svg.removeAttr('xmlns:a');
				
				if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
					$svg.attr('viewBox 0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
				}
				svgArray.push({
					item: $svg,
					index: i
				});
			}));
		});
		$.when.apply($, promises).then(function() {
			resolve(svgArray);
		});
	});
}
