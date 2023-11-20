export function formatDate(date: Date, daysOffset: number = 0) {
	if (date === null) {
		return '';
	}

	if (daysOffset > 0) {
		date.setDate(date.getDate() + daysOffset);
	}

	const year = date.getFullYear();
	let month: any = date.getMonth() + 1;
	let day: any = date.getDate();

	if (month < 10) {
		month = `0${month}`;
	}

	if (day < 10) {
		day = `0${day}`;
	}

	return `${year}-${month}-${day}`;
}
