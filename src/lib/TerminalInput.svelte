<script>
	import { onMount } from 'svelte';

	export let onType = () => {};
	export let ref = null;
	export let terminalInputBuffer = '';
	export let prompt = '';
	export let cursor = '|';

	onMount(() => {
		ref.focus();
	});

	const catchFocus = () => {
		ref.focus();
	};
</script>

<span>{prompt}{terminalInputBuffer}<input type="text" on:keydown={onType} bind:this={ref} /></span>

<style lang="scss">
	input {
		background-color: transparent;
		border: none;
		color: inherit;
		font-size: 1rem;
		outline: none;
		width: 100%;
		width: 1rem;
	}
</style>
