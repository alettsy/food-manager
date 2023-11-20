import { error, json } from '@sveltejs/kit';
import db from '$lib/database';
import { formatDate } from '$lib/utils';

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
			options.expiry = options.expiry === '' ? null : new Date(options.expiry);
			return updateItem(options.id, options);
		default:
			throw error(404, 'Not Found');
	}
}

async function filterItems(options: any) {
	const sorting: any = {};

	if (options.sort.property.includes('location') || options.sort.property.includes('category')) {
		options.sort.property += 'ID';
	}

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
			item.expiry = formatDate(item.expiry);
		}
	}

	items.sort(function (a: any, b: any) {
		return sortItems(a, b, options.sort.property, options.sort.order);
	});

	if (filters.expiry === null) {
		const result = items.filter((v: any) => v.expiry === null);
		return json(result);
	}

	return json(items);
}

function sortItems(a: any, b: any, property: string, order: string) {
	if (order === 'asc') {
		if (property === 'categoryID') {
			return sortHelper(a, b, 'category', true);
		} else if (property === 'locationID') {
			return sortHelper(a, b, 'location', true);
		} else if (property === 'expiry') {
			return sortHelper(a, b, 'expiry', true);
		}
		return a[property].toString().localeCompare(b[property].toString());
	} else {
		if (property === 'categoryID') {
			return sortHelper(a, b, 'category', false);
		} else if (property === 'locationID') {
			return sortHelper(a, b, 'location', false);
		} else if (property === 'expiry') {
			return sortHelper(a, b, 'expiry', false);
		}
		return b[property].toString().localeCompare(a[property].toString());
	}
}

function sortHelper(a: any, b: any, type: any, asc: any) {
	if (type === 'expiry') {
		const dateA = a[type] ?? 'null';
		const dateB = b[type] ?? 'null';

		if (asc) {
			return dateA.localeCompare(dateB);
		}

		return dateB.localeCompare(dateA);
	} else {
		const aValue = a[type] === null ? 'null' : a[type]['name'];
		const bValue = b[type] === null ? 'null' : b[type]['name'];

		if (asc) {
			return aValue.localeCompare(bValue);
		}

		return bValue.localeCompare(aValue);
	}
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
	const expiry = item.expiry === '' ? null : new Date(item.expiry).toISOString();

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
