<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		color: "blue" | "green" | "grey" | "purple" | "red" | "yellow";
		children?: Snippet;
	};

	const { color, children }: Props = $props();

</script>

<div class={color}>
	{@render children?.()}
</div>

<style>
	div {
		--pill-bg-color: light-dark(
			color-mix(in oklch, var(--pill-color) 18%, white),
			color-mix(in oklch, var(--pill-color) 30%, black)
		);
		--pill-ink-color: light-dark(
			color-mix(in oklch, var(--pill-color) 68%, black),
			color-mix(in oklch, var(--pill-color) 68%, white)
		);

		display: flex;
		gap: 0.4rem;
		flex: 0 0 42%;
		border-radius: 999px;
		border: 1px solid;
		padding: 0.5rem;
		font-size: 0.75rem;
		box-shadow: 0 0 0.25rem color-mix(in oklch, var(--border-primary) 70%, transparent);
		background-color: var(--pill-bg-color);
		border-color: var(--pill-ink-color);
		color: var(--pill-ink-color);

		&.green {
			--pill-color: var(--green);
		}

		&.blue {
			--pill-color: var(--blue);
		}

		&.yellow {
			--pill-color: var(--yellow);
		}

		&.purple {
			--pill-color: var(--purple);
		}

		&.red {
			--pill-color: var(--red);
		}

		&.grey {
			--pill-color: var(--grey);
		}
	}
</style>