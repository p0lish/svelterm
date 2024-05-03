<script>
	import { onMount } from 'svelte';
	import TerminalDisplay from './TerminalDisplay.svelte';
	import TerminalInput from './TerminalInput.svelte';
	import Scanlines from './Scanlines.svelte';
	import chanCommands from '../utils/chanCommands';
	let inputRef = null;
	let terminalInputBuffer = '';
	export let prompt = 'web@terminal:~$> ';
	let cursor = '|';
	/**
	 * @type {string[]}
	 */
	let TerminalBuffer = [];
	let commandHistory = [];
	let scanlinesOn = false;
	$: historyPointer = commandHistory.length;

	const resetTerminalInputBuffer = () => {
		// window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' });
		terminalInputBuffer = ``;
	};

	const commands = {
		Enter: () => {
			TerminalBuffer = [...TerminalBuffer, terminalInputBuffer];
			if (!commandLineInterCeptor(terminalInputBuffer)) {
				if (terminalInputBuffer.length < 1) {
					TerminalBuffer = [...TerminalBuffer, prompt];
				} else {
					TerminalBuffer = [...TerminalBuffer, `command not found: ${terminalInputBuffer}`];
				}
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
		},
		ArrowUp: () => {
			console.log('commandHistory', commandHistory);
			historyPointer = historyPointer - 1 < 0 ? 0 : historyPointer - 1;
			if (commandHistory[historyPointer]) terminalInputBuffer = commandHistory[historyPointer];
			console.log('historyPointer', historyPointer);
		},
		ArrowDown: () => {
			console.log('commandHistory', commandHistory);
			historyPointer =
				historyPointer + 1 > commandHistory.length ? commandHistory.length : historyPointer + 1;
			if (commandHistory[historyPointer]) terminalInputBuffer = commandHistory[historyPointer];
			console.log('historyPointer', historyPointer);
		}
	};

	const TerminalCommands = {
		...chanCommands,
		ls: () => {
			TerminalBuffer = [...TerminalBuffer, 'Desktop Documents Downloads Music Pictures Videos'];
		},
		clear: () => {
			TerminalBuffer = [];
		},
		scanlines: () => {
			scanlinesOn = !scanlinesOn;
		}
	};

	/**
	 * Description
	 * @param {KeyboardEvent} e
	 * @returns {boolean}
	 */
	const keyPressInterceptor = (e) => {
		if (Object.keys(commands).includes(e.key)) {
			e.preventDefault();
			commands[e.key]();
			return true;
		}
		return false;
	};

	const commandLineInterCeptor = (input) => {
		if (Object.keys(TerminalCommands).includes(input)) {
			commandHistory.push(input);
			TerminalCommands[input]();
			return true;
		}
		return false;
	};

	const catchBtn = (btn) => {
		// btn.preventDefault();
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

{#if scanlinesOn}
	<Scanlines />
{/if}
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
		margin: 2rem;
	}
</style>
