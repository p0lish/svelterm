<script>
	import { onMount } from 'svelte';
	import TerminalDisplay from './TerminalDisplay.svelte';
	import TerminalInput from './TerminalInput.svelte';

	let inputRef = null;
	let terminalInputBuffer = '';
	export let prompt = 'root@localhost:~$> ';
	let cursor = '|';
	let TerminalBuffer = [];

	const resetTerminalInputBuffer = () => {
		window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' });
		terminalInputBuffer = ``;
	};

	const commands = {
		Enter: () => {
			TerminalBuffer = [...TerminalBuffer, terminalInputBuffer];
			if (!commandLineInterCeptor(terminalInputBuffer)) {
				TerminalBuffer = [...TerminalBuffer, `command not found: ${terminalInputBuffer}`];
			}
			resetTerminalInputBuffer();
		},
		Backspace: () => {
			terminalInputBuffer = terminalInputBuffer.slice(0, -1);
		},
		Tab: () => {
			terminalInputBuffer += '    ';
		},
		Alt: () => {
			return null;
		},
		Control: () => {
			return null;
		}
	};

	const TerminalCommands = {
		ls: () => {
			TerminalBuffer = [...TerminalBuffer, 'Desktop Documents Downloads Music Pictures Videos'];
		},
		clear: () => {
			TerminalBuffer = [];
		},
		help: () => {
			TerminalBuffer = [...TerminalBuffer, 'scp - load scp database terminal'];
		},
		scp: () => {
			location.href = '/scp-db';
		}
	};

	const keyPressInterceptor = (e) => {
		if (Object.keys(commands).includes(e.key)) {
			commands[e.key]();
			return true;
		}
		return false;
	};

	const commandLineInterCeptor = (input) => {
		if (Object.keys(TerminalCommands).includes(input)) {
			TerminalCommands[input]();
			return true;
		}
		return false;
	};

	const catchBtn = (btn) => {
		btn.preventDefault();
		if (!keyPressInterceptor(btn)) {
			terminalInputBuffer += btn.key;
		}
	};

	const catchFocus = () => {
		inputRef.focus();
	};

	onMount(() => {
		catchFocus();
		resetTerminalInputBuffer();
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="display" on:click={catchFocus} on:focus={catchFocus}>
	<div>
		<TerminalDisplay bind:TerminalBuffer />
	</div>
	<div>
		<TerminalInput
			bind:cursor
			bind:terminalInputBuffer
			bind:prompt
			bind:ref={inputRef}
			onType={catchBtn}
		/>
	</div>
</div>

<style lang="scss">
	.display {
		margin: 1rem;
	}
</style>
