<script lang="ts">
	import { type Apps, getApps } from "$lib/api/client";
	import App from "$lib/components/App.svelte";
	import Boundary from "./Boundary.svelte";
	import Loading from "./Loading.svelte";
	import { settings } from "$lib/state/settings.svelte";
	import { useAsyncEffect } from "$lib/utils/async-effect.svelte";

	let	apps: Apps = $state({
		items: []
	}),
		loading = $state(false),
		error: Error | null = $state(null);

	useAsyncEffect(
		async (signal: AbortSignal): Promise<void> => {
			if (!settings.developerId) {
				return;
			}

			apps = await getApps(settings.developerId, signal);
		},
		(isLoading: boolean): boolean => (loading = isLoading),
		(e: Error | null): Error | null => (error = e),
		(): unknown => [settings.developerId]
	);

</script>

<Boundary {error}>
	<Loading {loading}/>
	<ul>
		{#each apps.items as app (app.productId)}
			<App {app}/>
		{/each}
	</ul>
</Boundary>

<style>
	ul {
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: space-around;
	}

	@media (max-width: 1024px) {
		ul {
			flex-direction: column;
		}
	}
</style>