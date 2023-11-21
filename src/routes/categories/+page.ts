const headers = ['Name', 'Expiry Days'];

const actions = [
	{
		name: 'Add category',
		action: 'category'
	}
];

const controls = [
	{
		type: 'home-button',
		name: 'Home'
	}
];

export async function load() {
	return { headers, actions, controls };
}
