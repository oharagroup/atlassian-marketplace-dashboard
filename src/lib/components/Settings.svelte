<script lang="ts">
	import { saveSettings, settings } from "$lib/state/settings.svelte";

	let { isOpen = $bindable() }: { isOpen: boolean } = $props();

	const	newSettings = $state({ ...settings });

	function onsubmit(): void {
		saveSettings(newSettings);
		isOpen = false;
	}

	function cancel(): void {
		Object.assign(newSettings, settings);
		isOpen = false;
	}
</script>

{#if isOpen}
	<form {onsubmit}>
		<label>
			Atlassian ID
			<input autocomplete="username" type="text" bind:value={newSettings.userName}/>
		</label>
		<label>
			Password
			<input autocomplete="current-password" type="password" bind:value={newSettings.password}/>
		</label>
		<label>
			Developer ID
			<input type="text" bind:value={newSettings.developerId}/>
		</label>
		<label>
			API URL
			<input type="url" bind:value={newSettings.apiUrl}/>
		</label>
		<div>
			<input type="submit" value="Save"/>
			<button onclick={cancel} type="button">Cancel</button>
		</div>
	</form>
{/if}

<style>
	form {
		position: absolute;
		top: 5rem;
		right: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: end;;
		padding: 1rem;
		color: var(--text-primary);
		background: var(--surface-container);
		border: 1px solid var(--border-primary);
		box-shadow: 0 0 0.5rem color-mix(in oklch, var(--border-primary) 70%, transparent);
		border-radius: var(--border-radius);

		label {
			display: flex;
			gap: 0.5rem;
			align-items: center;
			font-weight: 500;

			 input {
				width: 19.75rem;
				border: 1px solid var(--border-secondary);
				border-radius: 0.5rem;
				padding: 0.5rem;
			}
		}

		div {
			display: flex;
			gap: 0.5rem;

			input[type=submit], button {
				border: 1px solid var(--border-secondary);
				border-radius: 0.5rem;
				padding: 0.34rem;
				min-width: 5rem;
				font-size: 1.25rem;
			}

			input[type=submit] {
				background-color: var(--green);
			}
		}
	}

	@media (max-width: 768px) {
		form {
			label {
				flex-direction: column;
				align-items: start;
			}
		}
	}
</style>