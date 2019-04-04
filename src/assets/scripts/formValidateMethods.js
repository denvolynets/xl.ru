$.validator.addMethod('phoneValid', function(phoneVal, element) {
	return phoneVal.replace(/\D+/g, '').length > 10;
}, $.validator.format('Введите полый номер телефона'));

$.validator.addMethod('dateValid', function(dateVal, element) {
	let dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
	return dateRegex.test(dateVal);
}, $.validator.format('Введите дату в формате DD.MM.YYYY'));

$.validator.addMethod('emailValid', function(emailVal, element) {
	let emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	return emailRegex.test(emailVal);
}, $.validator.format('Введите полный E-mail адресс'));

$.validator.addMethod('valueNotEquals', function(value, element, arg) {
	return arg !== value;
}, 'Выбрано пустое значение');

$.validator.addMethod('vmcardsonly', function(value, element, param) {
	value = value.replace(/\D/g, '');
	if (value.charAt(0) == 4 || value.charAt(0) == 5) {
		return value.length == 16;
	} else {
		return false;
	}
}, 'Введите правильный номер банковской карты.');