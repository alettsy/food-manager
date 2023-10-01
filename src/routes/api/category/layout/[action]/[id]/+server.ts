import { error, json } from '@sveltejs/kit';
import db from '$lib/database';

const layout = {
	title: 'Edit Category',
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
	const stringId = event.params.id;

	if (action !== 'edit') return json({ error: 'action unknown' });

	try {
		const id = parseInt(stringId);

		const result: any = await db.category.findFirst({
			where: {
				id: id
			}
		});

		if (result === null) return json({ error: 'category not found' });

		let updatedLayout = layout;
		for (let child of updatedLayout.children) {
			child.value = result[child.type];
		}

		console.log(updatedLayout);

		return json(updatedLayout);
	} catch {
		throw error(404, 'Not Found');
	}
}
