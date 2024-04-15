<script>
	import { onMount } from 'svelte';
	import Prompt from './Prompt.svelte';
	import Caret from './Caret.svelte';

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

<div class="input-line">
	<Prompt bind:prompt />
	{terminalInputBuffer}<Caret />
</div>
<input type="text" on:keydown={onType} bind:this={ref} />

<style lang="scss">
	input {
		width: 100%;
		border: none;
		background-color: transparent;
		&:focus {
			outline: none;
		}
		height: 0;
		width: 0;
		line-height: 0;
		position: fixed;
		right: 0;
		bottom: 0;
	}
	.input-line {
		line-break: anywhere;
	}
</style>
