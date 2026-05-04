<script lang="ts">
	import type { Snippet } from "svelte";
	import favicon from "$lib/assets/favicon.ico";

	const { children }: { children?: Snippet } = $props();

</script>

<svelte:head>
	<link href={favicon} rel="icon"/>
</svelte:head>

{@render children?.()}

<style>
	:global {
		:root {
			color-scheme: light dark;

			--text-error: var(--red);
			--border-radius: 12px;

			--white: oklch(100% 0.00011 271.152);
			--black: oklch(0% 0 0);
			--green: oklch(67.122% 0.18384 149.285);
			--blue: oklch(66% 0.15 245);
			--yellow: oklch(90% 0.12 95);
			--purple: oklch(60% 0.14 320);
			--red: oklch(62% 0.17 25);

			--surface: light-dark(oklch(96.115% 0.00011 271.152), var(--black));
			--surface-container: light-dark(var(--white), oklch(20.463% 0.00002 271.152));

			--text-primary: light-dark(var(--black), var(--white));
			--text-secondary: light-dark(oklch(59.987% 0.00007 271.152), oklch(71.547% 0.00008 271.152));

			--border-primary: light-dark(oklch(90.67% 0.0001 271.152), var(--green));
			--border-secondary: light-dark(var(--border-primary), var(--text-secondary));

			--grey: light-dark(oklch(99% 0 0), oklch(10% 0 0));
		}

		body {
			margin: 1rem;
			background-color: var(--surface);
			font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
		}
	}
</style>