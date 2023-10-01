import db from '$lib/database';
import { error, json } from '@sveltejs/kit';

const layout = {
	title: 'Item',
	action: 'New',
	children: [
		{
			type: 'id',
			valueType: 'number',
			value: 0,
			css: 'hidden'
		},
		{
			type: 'name',
			valueType: 'string',
			value: '',
			css: ''
		},
		{
			type: 'category',
			valueType: 'number',
			value: 0,
			css: ''
		},
		{
			type: 'location',
			valueType: 'number',
			value: 0,
			css: ''
		},
		{
			type: 'count',
			valueType: 'number',
			value: 0,
			css: ''
		},
		{
			type: 'expiry',
			valueType: 'date',
			value: 0,
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
