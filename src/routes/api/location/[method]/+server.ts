import { error, json } from '@sveltejs/kit';
import db from '$lib/database';

export async function GET(event: any) {
	const method = event.params.method;

	if (method === 'all') {
		const locations = await db.location.findMany();
		return json(locations);
	} else {
		try {
			const id = parseInt(method);

			const result = await db.location.findFirst({
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
			return newLocation(options);
		case 'edit':
			return updateLocation(options.id, options.properties);
		case 'delete':
			return deleteLocation(options.id);
		default:
			throw error(404, 'Not Found');
	}
}

async function newLocation(loc: any) {
	const created = await db.location.create({
		data: loc
	});

	return json(created);
}

async function updateLocation(id: number, properties: any) {
	const updated = await db.location.update({
		where: {
			id: id
		},
		data: properties
	});

	return json(updated);
}

async function deleteLocation(id: number) {
	const deleted = await db.location.delete({
		where: {
			id: id
		}
	});

	return json(deleted);
}
