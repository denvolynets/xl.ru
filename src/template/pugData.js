exports.headerLink = [
	{
		name: 'header link 1',
		link: '#headerlink-1'
	},
	{
		name: 'header link 2',
		link: '#headerlink-2'
	}
];

exports.footerLink = (max = 5) => {
	let arr = [];
	for (let i = 1; i <= max; i++) {
		arr.push({
			name: `footer link - ${i}`,
			link: `#footerlink-${i}`
		});
	}
	return arr;
};