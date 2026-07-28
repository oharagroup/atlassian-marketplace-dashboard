<script lang="ts">
	const { iconFileId }: { iconFileId: string } = $props(),
		src = $derived(`https://marketplace.atlassian.com/product-listing/files/${iconFileId}`);

</script>

<img alt="logo" {src}/>

<style>
	img {
		--logo-size: 56px;

		background-color: var(--white);
		width: var(--logo-size);
		height: var(--logo-size);
		border: 1px solid var(--border-secondary);
		padding: 1rem;
		border-radius: var(--border-radius);
	}
</style>