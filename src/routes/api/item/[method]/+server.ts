import { error, json } from '@sveltejs/kit';
import db from '$lib/database';

export async function GET(event: any) {
	const method = event.params.method;

	try {
		const id = parseInt(method);

		const result = await db.item.findFirst({
			where: {
				id: id
			}
		});

		return json(result);
	} catch {
		throw error(404, 'Not Found');
	}
}

export async function POST(event: any) {
	const method = event.params.method;
	const options = await event.request.json();

	switch (method) {
		case 'new':
			return makeNewItem(options);
		case 'delete':
			return deleteItem(options.id);
		case 'filter':
			return filterItems(options);
		case 'edit':
			return updateItem(options.id, options.properties);
		default:
			throw error(404, 'Not Found');
	}
}

async function filterItems(options: any) {
	const sorting: any = {};
	sorting[options.sort.property] = options.sort.order;

	const search = options.search;

	const filters = options.filters;

	let lte = undefined;
	let gte = undefined;

	if (filters.expiry !== undefined && filters.expiry !== null) {
		if (filters.expiry === 3) {
			lte = new Date();
		} else if (filters.expiry === 1) {
			lte = new Date();
			lte.setDate(lte.getDate() + 7);
			gte = new Date();
		} else if (filters.expiry === 2) {
			lte = new Date();
			lte.setDate(lte.getDate() + 30);
			gte = new Date();
		}
	}

	// TODO: support null (None) of date
	// if (filters.expiry === null) {
	// 	lte = new Date();
	// 	gte = undefined;
	// }

	const items = await db.item.findMany({
		select: {
			id: true,
			name: true,
			category: true,
			location: true,
			count: true,
			expiry: true
		},
		where: {
			OR: [
				{
					name: {
						contains: search
					}
				},
				{
					category: {
						name: {
							contains: search
						}
					}
				},
				{
					location: {
						name: {
							contains: search
						}
					}
				}
			],
			categoryID: filters?.category,
			locationID: filters?.location,
			expiry: {
				lte: lte,
				gte: gte
			}
		},
		orderBy: sorting
	});

	for (let item of items) {
		if (item.expiry !== null && item.expiry !== undefined) {
			// @ts-ignore TODO!
			item.expiry = item.expiry.toISOString().split('T')[0];
		}
	}

	return json(items);
}

async function updateItem(id: number, properties: any) {
	const updated = await db.item.update({
		where: {
			id: id
		},
		data: properties
	});

	return json(updated);
}

async function deleteItem(id: number) {
	const deleted = await db.item.delete({
		where: {
			id: id
		}
	});

	return json(deleted);
}

async function makeNewItem(item: any) {
	const count = parseInt(item.count);
	const expiry = new Date(item.expiry).toISOString();

	const created = await db.item.create({
		data: {
			name: item.name,
			categoryID: item.expiry?.id,
			locationID: item.location?.id,
			count: count > 1 ? count : 1,
			expiry: expiry
		}
	});

	return json(created);
}
