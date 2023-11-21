import { error, json } from '@sveltejs/kit';
import db from '$lib/database';

export async function GET(event: any) {
	const method = event.params.method;

	if (method === 'all') {
		const locations = await db.location.findMany();
		if (locations === null) throw error(500, { message: 'Failed to load locations' });
		return json(locations);
	} else {
		const id = parseInt(method);

		if (isNaN(id)) throw error(400, { message: 'Invalid ID' });

		const result = await db.location.findFirst({
			where: {
				id: id
			}
		});

		if (result === null) throw error(500, { message: 'Location not found' });

		return json(result);
	}
}

export async function POST(event: any) {
	const method = event.params.method;
	const options = await event.request.json();

	switch (method) {
		case 'new':
			return newLocation(options);
		case 'edit':
			return updateLocation(options.id, options);
		case 'delete':
			return deleteLocation(options.id);
		default:
			throw error(404, 'Unknown method');
	}
}

async function newLocation(loc: any) {
	const created = await db.location.create({
		data: loc
	});

	if (created === null) throw error(500, { message: 'Failed to create location' });

	return json(created);
}

async function updateLocation(id: number, properties: any) {
	const updated = await db.location.update({
		where: {
			id: id
		},
		data: properties
	});

	if (updated === null) throw error(500, { message: 'Failed to update location' });

	return json(updated);
}

async function deleteLocation(id: number) {
	const deleted = await db.location.delete({
		where: {
			id: id
		}
	});

	if (deleted === null) throw error(500, { message: 'Failed to delete location' });

	return json(deleted);
}
