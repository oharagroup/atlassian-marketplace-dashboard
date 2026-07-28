<script lang="ts">
	import type { App } from "$lib/api/client";
	import AppSales from "./AppSales.svelte";
	import Logo from "./Logo.svelte";

	const { app }: { app: App } = $props();

</script>

<li>
	<header>
		<Logo iconFileId={app.images.iconFileId}/>
		<h1>{app.appName}</h1>
	</header>
	<AppSales {app}/>
</li>

<style>
	li {
		display: flex;
		flex-direction: column;
		flex: 0 0 calc((100% - 9rem) / 3);
		gap: 1rem;
		list-style: none;
		padding: 1rem;
		color: var(--text-primary);
		background: var(--surface-container);
		border: 1px solid var(--border-primary);
		box-shadow: 0 0 0.5rem color-mix(in oklch, var(--border-primary) 70%, transparent);
		border-radius: var(--border-radius);

		header {
			display: flex;
			gap: 1rem;

			h1 {
				text-align: left;
				font-size: 1.5rem;
				font-weight: 500;
				min-height: var(--logo-size);
			}
		}
	}
</style>