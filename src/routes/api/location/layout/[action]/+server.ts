import { error, json } from '@sveltejs/kit';

const layout = {
	title: 'New Location',
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
