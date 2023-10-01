import { error, json } from '@sveltejs/kit';
import db from '$lib/database';

export async function GET(event: any) {
	const method = event.params.method;

	if (method === 'all') {
		const categories = await db.category.findMany();
		return json(categories);
	} else {
		try {
			const id = parseInt(method);

			const result = await db.category.findFirst({
				where: {
					id: id
				}
			});

			return json(result);
		} catch {
			throw error(404, 'Not Found');
		}
	}
}

export async function POST(event: any) {
	const method = event.params.method;
	const options = await event.request.json();

	switch (method) {
		case 'new':
			return newCategory(options);
		case 'edit':
			return updateCategory(options.id, options.properties);
		case 'delete':
			return deleteCategory(options.id);
		default:
			throw error(404, 'Not Found');
	}
}

async function newCategory(loc: any) {
	const created = await db.category.create({
		data: loc
	});

	return json(created);
}

async function updateCategory(id: number, properties: any) {
	const updated = await db.category.update({
		where: {
			id: id
		},
		data: properties
	});

	return json(updated);
}

async function deleteCategory(id: number) {
	const deleted = await db.category.delete({
		where: {
			id: id
		}
	});

	return json(deleted);
}
