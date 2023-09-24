import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const categories = [
	{
		name: 'Meat',
		expiry: 30
	},
	{
		name: 'Vegetables'
	},
	{
		name: 'Canned'
	}
];

const locations = [
	{
		name: 'Freezer'
	},
	{
		name: 'Cupboard'
	}
];

const items = [
	{ name: 'Bacon', categoryID: 1, locationID: 1, count: 5, expiry: null },
	{ name: 'Lettuce', categoryID: 2, locationID: 2, count: 3, expiry: null },
	{ name: 'Soup', categoryID: 3, locationID: 2, count: 1, expiry: null }
];

async function main() {
	for (const category of categories) {
		await db.category.create({
			data: category
		});
	}

	for (const location of locations) {
		await db.location.create({
			data: location
		});
	}

	for (const item of items) {
		await db.item.create({
			data: item
		});
	}
}

main();
