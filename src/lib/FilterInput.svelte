<script>
	/**
	 * @type {string}
	 */
	export let text;
</script>

<input type="text" placeholder="Filter by words" bind:value={text} />

<style>
	input {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid grey;

		background-color: inherit;
		color: inherit;
		outline: none;
	}
</style>
