import { writable } from 'svelte/store';

export const filters: any = writable({
	expiry: undefined,
	location: undefined,
	category: undefined
});
