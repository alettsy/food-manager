import { writable } from 'svelte/store';

export const toast: any = writable({});

function success(text: string) {
	toast.set({
		type: 'success',
		text
	});
}

function error(text: string) {
	toast.set({
		type: 'error',
		text
	});
}

function info(text: string) {
	toast.set({
		type: 'info',
		text
	});
}

export default {
	success,
	error,
	info
};
