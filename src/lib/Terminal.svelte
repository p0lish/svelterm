<script>
	import { onMount } from 'svelte';
	import TerminalDisplay from './TerminalDisplay.svelte';
	import TerminalInput from './TerminalInput.svelte';

	let inputRef = null;
	let terminalInputBuffer = '';
	let prompt = 'root@localhost:~$> ';
	let cursor = '|';
	let TerminalBuffer = [];

	const resetTerminalInputBuffer = () => {
		terminalInputBuffer = ``;
	};

	const commands = {
		enter: () => {
			TerminalBuffer = [...TerminalBuffer, terminalInputBuffer];
			resetTerminalInputBuffer();
		},
		backspace: () => {
			terminalInputBuffer = terminalInputBuffer.slice(0, -1);
		},
		tab: () => {
			terminalInputBuffer += '    ';
		},
		alt: () => {
			return null;
		}
	};

	const commandKey = [
		...new Set([
			'Enter',
			'Backspace',
			'ArrowLeft',
			'ArrowRight',
			'ArrowUp',
			'ArrowDown',
			'Tab',
			'Alt'
		])
	];

	const keyPressInterceptor = (e) => {
		if (commandKey.includes(e.key)) {
			commands[`${e.key}`.toLowerCase()]();
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
		inputRef.focus();
		resetTerminalInputBuffer();
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={catchFocus} on:focus={catchFocus}>
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
