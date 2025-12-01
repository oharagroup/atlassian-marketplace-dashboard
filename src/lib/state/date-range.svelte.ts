import { SvelteDate } from "svelte/reactivity";

function yesterday(): string {
	const DATE_LENGTH = 10,
		today = new SvelteDate();

	today.setDate(today.getDate() - 1);

	return today.toISOString().slice(0, DATE_LENGTH);
}

export const dateRange = $state({
	start: yesterday(),
	end: yesterday(),
});
