import { error, json } from '@sveltejs/kit';

const layout = {
	title: 'New Category',
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
			type: 'expiry',
			title: 'Days to expire',
			valueType: 'number',
			value: 1,
			css: ''
		}
	]
};

export async function GET(event: any) {
	const action = event.params.action;

	if (action !== 'new') throw error(400, { message: 'Unknown action' });

	return json(layout);
}
