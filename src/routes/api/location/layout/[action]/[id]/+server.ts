import { error, json } from '@sveltejs/kit';
import db from '$lib/database';

const layout = {
	title: 'Edit Location',
	action: 'Edit',
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
	const stringId = event.params.id;

	if (action !== 'edit') throw error(400, { message: 'Unknown action' });

	const id = parseInt(stringId);

	if (isNaN(id)) throw error(400, { message: 'Invalid ID' });

	const result: any = await db.location.findFirst({
		where: {
			id: id
		}
	});

	if (result === null) throw error(500, { message: 'Location not found' });

	let updatedLayout = layout;
	for (let child of updatedLayout.children) {
		child.value = result[child.type];
	}

	return json(updatedLayout);
}
