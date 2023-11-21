import db from '$lib/database';
import { error, json } from '@sveltejs/kit';
import { formatDate } from '$lib/utils';

const layout = {
	title: 'Edit Item',
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
			value: 1,
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
	const stringId = event.params.id;

	if (action !== 'edit') throw error(400, { message: 'Unknown action' });

	const id = parseInt(stringId);

	if (isNaN(id)) throw error(400, { message: 'Invalid ID' });

	const result: any = await db.item.findFirst({
		where: {
			id: id
		}
	});

	if (result === null) throw error(500, { message: 'Item not found' });

	let updatedLayout = layout;
	for (let child of updatedLayout.children) {
		if (child.type === 'expiry') {
			child.value = formatDate(result[child.type]);
		} else {
			child.value = result[child.type];
		}
	}

	return json(updatedLayout);
}
