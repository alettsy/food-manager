import { error, json } from '@sveltejs/kit';

export async function GET(event: any) {
	const method = event.params.method;

	if (method === 'all') {
		return json(expiryOptions);
	} else {
		try {
			const id = parseInt(method);
			const result = expiryOptions.filter((o) => {
				return o.id === id;
			});

			if (result.length === 1) {
				return json(result[0]);
			}

			return json(result);
		} catch {
			throw error(404, 'Not Found');
		}
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
