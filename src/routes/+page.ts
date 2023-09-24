const headers = ['Name', 'Category', 'Location', 'Count', 'Expiry'];
const controls = [
	{
		type: 'menu-button',
		name: 'Navigate',
		children: [
			{
				name: 'Categories',
				click: {
					type: 'nav',
					to: '/categories'
				}
			},
			{
				name: 'Locations',
				click: {
					type: 'nav',
					to: '/locations'
				}
			}
		]
	},
	{
		type: 'menu-button',
		name: 'Filter',
		children: [
			{
				name: 'Test1',
				click: {
					type: 'event'
				}
			},
			{
				name: 'Test2',
				click: {
					type: 'event'
				}
			}
		]
	},
	{
		type: 'text-input',
		css: 'ml-auto'
	}
];

export async function load() {
	return { headers, controls };
}
