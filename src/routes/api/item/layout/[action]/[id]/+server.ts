import db from '$lib/database';
import { error, json } from '@sveltejs/kit';
import { updated } from '$app/stores';

const layout = {
	title: 'Item',
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
			title: 'Category',
			valueType: 'number',
			value: 0,
			css: ''
		},
		{
			type: 'locationID',
			title: 'location',
			valueType: 'number',
			value: 0,
			css: ''
		},
		{
			type: 'count',
			title: 'count',
			valueType: 'number',
			value: 0,
			css: ''
		},
		{
			type: 'expiry',
			title: 'expiry',
			valueType: 'date',
			value: 0,
			css: ''
		}
	]
};

export async function GET(event: any) {
	const action = event.params.action;
	const stringId = event.params.id;

	if (action !== 'edit') return json({ error: 'action unknown' });

	try {
		const id = parseInt(stringId);

		const result = await db.item.findFirst({
			where: {
				id: id
			}
		});

		if (result === null) return json({ error: 'item not found' });

		let updatedLayout = layout;
		for (let child of updatedLayout.children) {
			child.value = result[child.type];
		}

		return json(updatedLayout);
	} catch {
		throw error(404, 'Not Found');
	}
}
