const createSlug = (title, id) => {
	const slug =
		title
			.toLocaleLowerCase('tr')
			.replace(/ğ/gim, 'g')
			.replace(/ü/gim, 'u')
			.replace(/ş/gim, 's')
			.replace(/ı/gim, 'i')
			.replace(/ö/gim, 'o')
			.replace(/ç/gim, 'c')
			.replace(/â/gim, 'a')
			.replace(/û/gim, 'u')
			.replace(/î/gim, 'i')
			.replace(/[&\/\\#,+()|$~%.'":*?<>{}]/g, '')
			.replace(/\s+/g, '-') +
		'-' +
		id;
	return slug;
};

module.exports = createSlug;
