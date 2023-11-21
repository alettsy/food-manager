import { error, json } from '@sveltejs/kit';

export async function GET(event: any) {
	const method = event.params.method;

	if (method === 'all') {
		return json(expiryOptions);
	} else {
		const id = parseInt(method);

		if (isNaN(id)) throw error(400, { message: 'Invalid ID' });

		const result = expiryOptions.filter((o) => {
			return o.id === id;
		});

		if (result === undefined) throw error(500, { message: 'Expiry not found' });

		if (result.length === 1) {
			return json(result[0]);
		}

		return json(result);
	}
}

const expiryOptions = [
	{
		id: 1,
		name: 'Nearly Expired'
	},
	{
		id: 2,
		name: 'Expires In 1 Month'
	},
	{
		id: 3,
		name: 'Expired'
	}
];
