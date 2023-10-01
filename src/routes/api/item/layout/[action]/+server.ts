import { error, json } from '@sveltejs/kit';

const layout = {
	title: 'New Item',
	action: 'New',
	children: [
		{
			type: 'id',
			title: '',
			valueType: 'number',
			value: 0,
			css: 'hidden'
		},
		{
			type: 'name',
			title: 'Name',
			valueType: 'string',
			value: '',
			css: ''
		},
		{
			type: 'categoryID',
			route: '/api/category/all',
			title: 'Category',
			valueType: 'dropdown',
			value: 'undefined',
			css: ''
		},
		{
			type: 'locationID',
			route: '/api/location/all',
			title: 'Location',
			valueType: 'dropdown',
			value: 'undefined',
			css: ''
		},
		{
			type: 'count',
			title: 'Count',
			valueType: 'number',
			value: 0,
			css: ''
		},
		{
			type: 'expiry',
			title: 'Expiry',
			valueType: 'date',
			value: '',
			css: ''
		}
	]
};

export async function GET(event: any) {
	const action = event.params.action;

	if (action !== 'new') return json({ error: 'action unknown' });

	try {
		return json(layout);
	} catch {
		throw error(404, 'Not Found');
	}
}
