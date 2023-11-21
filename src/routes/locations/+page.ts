const headers = ['Name'];

const actions = [
	{
		name: 'Add location',
		action: 'location'
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
