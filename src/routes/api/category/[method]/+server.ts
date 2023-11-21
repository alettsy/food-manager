import { error, json } from '@sveltejs/kit';
import db from '$lib/database';

export async function GET(event: any) {
	const method = event.params.method;

	if (method === 'all') {
		const categories = await db.category.findMany();
		if (categories === null) throw error(500, { message: 'Failed to load categories' });
		return json(categories);
	} else {
		const id = parseInt(method);

		if (isNaN(id)) {
			throw error(400, { message: 'Invalid ID' });
		}

		const result = await db.category.findFirst({
			where: {
				id: id
			}
		});

		if (result === null) throw error(500, { message: 'Category not found' });

		return json(result);
	}
}

export async function POST(event: any) {
	const method = event.params.method;
	const options = await event.request.json();

	switch (method) {
		case 'new':
			return newCategory(options);
		case 'edit':
			return updateCategory(options.id, options);
		case 'delete':
			return deleteCategory(options.id);
		default:
			throw error(404, { message: 'Unknown method' });
	}
}

async function newCategory(content: any) {
	if (content['expiry'] !== undefined) {
		content['expiry'] = parseInt(content['expiry']);
	}

	const created = await db.category.create({
		data: content
	});

	if (created === null) throw error(500, { message: 'Failed to create category' });

	return json(created);
}

async function updateCategory(id: number, properties: any) {
	if (properties['expiry'] !== undefined) {
		properties['expiry'] = parseInt(properties['expiry']);
	}

	const updated = await db.category.update({
		where: {
			id: id
		},
		data: properties
	});

	if (updated === null) throw error(500, { message: 'Failed to update category' });

	return json(updated);
}

async function deleteCategory(id: number) {
	const deleted = await db.category.delete({
		where: {
			id: id
		}
	});

	if (deleted === null) throw error(500, { message: 'Failed to delete category' });

	return json(deleted);
}
