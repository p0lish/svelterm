<script>
	export let TerminalBuffer = ['1', '2'];
	export let prompt = '';
</script>

<div>
	{#each TerminalBuffer as line, i}
		<pre>{prompt}{line}</pre>
	{/each}
</div>

<style>
	pre {
		margin: 0;
	}
</style>
