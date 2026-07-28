<script lang="ts">
	import DateRange from "$lib/components/DateRange.svelte";
	import DeveloperSales from "./DeveloperSales.svelte";
	import Settings from "$lib/components/Settings.svelte";

	let	showSettings = $state(false);

	function openSettings(): void {
		showSettings = true;
	}
</script>

<header>
	<section class="total-sales">
		<DeveloperSales/>
	</section>
	<div class="period">
		<DateRange/>
	</div>
	<div class="settings">
		<button onclick={openSettings} type="button">&#9965;</button>
		<Settings bind:isOpen={showSettings}/>
	</div>
</header>

<style>
	header {
		display: flex;
		align-items: top;
		gap: 1rem;
		color: var(--text-primary);
		background: var(--surface-container);
		border: 1px solid var(--border-primary);
		box-shadow: 0 0 0.5rem color-mix(in oklch, var(--border-primary) 70%, transparent);
		border-radius: var(--border-radius);
		padding: 1rem;

		.total-sales {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		.period {
			display: flex;
			margin-left: auto;
		}

		.settings {
			display: flex;
			flex-direction: column;

			button {
				border: 0;
				background: var(--surface-container);
				font-size: 2rem;
				color: var(--text-primary);
			}
		}
	}

	@media (max-width: 768px) {
		header {
			flex-wrap: wrap;

			.period {
				order: 1;
				margin-left: unset
			}

			.settings {
				order: 2;
				margin-left: auto;
			}

			.total-sales {
				order: 3;
			}
		}
	}
</style>