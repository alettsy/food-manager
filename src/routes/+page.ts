const headers = ['Name', 'Category', 'Location', 'Count', 'Expiry'];
const actions = [
	{
		name: 'Add item',
		action: 'item'
	},
	{
		name: 'Add category',
		action: 'category'
	},
	{
		name: 'Add location',
		action: 'location'
	}
];
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
		type: 'dropdown-loader',
		name: 'category',
		route: '/api/category/all'
	},
	{
		type: 'dropdown-loader',
		name: 'location',
		route: '/api/location/all'
	},
	{
		type: 'dropdown-loader',
		name: 'expiry',
		route: '/api/expiry/all'
	},
	{
		type: 'text-input',
		css: '!ml-auto'
	}
];

export async function load() {
	return { headers, controls, actions };
}
