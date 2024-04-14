<script>
	export let TerminalBuffer = ['1', '2'];
	export let prompt = '';
</script>

<div>
	{#each TerminalBuffer as line, i}
		<p>{prompt}{line}</p>
	{/each}
</div>
