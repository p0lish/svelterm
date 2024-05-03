<script>
	export let TerminalBuffer = [];
	$: terminalText = TerminalBuffer.join('\n');
</script>

<pre>{terminalText}{`\n\n`}</pre>

<style>
	pre {
		margin: 0;
	}
</style>
