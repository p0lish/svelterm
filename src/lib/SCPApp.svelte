<script>
	import { onMount } from 'svelte';
	import TerminalDisplay from './TerminalDisplay.svelte';
	import TerminalInput from './TerminalInput.svelte';
	import { getData } from '../utils/getData';
	import ContentLoader from './ContentLoader.svelte';

	let inputRef = null;
	let terminalInputBuffer = '';
	export let prompt = 'scp-db:~>';
	let cursor = '|';
	let TerminalBuffer = ['Welcome to the [SCP] database type help for a list of commands'];
	let content = {};
	let scpItem = undefined;
	let selected_index = 0;
	$: contentKeys = Object.keys(content);
	const geometricChars = ['▉', '▊', '▋', '▌', '▍', '▎', '▏'];
	let interval = null;
	const intervalTime = 200;
	let counter = 0;

	const renderLoading = () => {
		TerminalBuffer = ['Loading data '];
		interval = setInterval(() => {
			counter += 1;
			TerminalBuffer = [TerminalBuffer[0] + geometricChars[1]];
		}, intervalTime);
		// TerminalBuffer = ['Loading...'];
	};
	const terminateLoading = () => {
		clearInterval(interval);
		counter = 0;
		TerminalBuffer = [`Data loaded in ${(counter * intervalTime) / 1000}s`];
	};

	const resetTerminalInputBuffer = () => {
		terminalInputBuffer = ``;
	};

	const commands = {
		Enter: () => {
			if (contentKeys.length > 0 && selected_index >= 0) {
				terminalInputBuffer = `content ${contentKeys[selected_index]}`;
			}

			const command = terminalInputBuffer.split(' ')[0];
			const params = terminalInputBuffer.split(' ').slice(1);

			if (!commandLineInterCeptor(command, params)) {
				TerminalBuffer = [`command not found: ${terminalInputBuffer}`];
			}
			resetTerminalInputBuffer();
			catchFocus();
		},
		Backspace: () => {
			terminalInputBuffer = terminalInputBuffer.slice(0, -1);
			selected_index = -1;
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
			selected_index = selected_index - 1 < 0 ? contentKeys.length - 1 : selected_index - 1;
		},
		ArrowDown: () => {
			selected_index = selected_index + 1 > contentKeys.length - 1 ? 0 : selected_index + 1;
		}
	};

	const initiateDatabase = () => {
		renderLoading();
		getData('/data/content_index.json')
			.then((data) => {
				content = data;
			})
			.finally(() => {
				terminateLoading();
				TerminalBuffer = ['Welcome to the [SCP] database type help for a list of commands'];
				catchFocus();
			});
	};

	const TerminalCommands = {
		clear: (params) => {
			TerminalBuffer = [];
			content = {};
		},
		help: (params) => {
			TerminalBuffer = [
				'init - initialize the database',
				'clear - clear the terminal',
				'content - load content',
				'load - load SCP item',
				'help - display this message'
			];
		},
		content: (params) => {
			renderLoading();
			let file = 'content_index.json';
			if (params.length > 0) {
				file = `${content[params[0]]}`;
			}
			getData(`/data/${file}`)
				.then((data) => {
					content = data;
				})
				.finally(() => {
					terminateLoading();
				});
		},
		load: (params) => {
			renderLoading();
			const SCP_Name = params[0].toUpperCase();
			scpItem = content[SCP_Name];
			terminateLoading();
		},
		init: (params) => {
			initiateDatabase();
		}
	};

	const keyPressInterceptor = (e) => {
		if (Object.keys(commands).includes(e.key)) {
			commands[e.key]();
			return true;
		}
		return false;
	};

	const commandLineInterCeptor = (input, params) => {
		if (Object.keys(TerminalCommands).includes(input)) {
			TerminalCommands[input](params);
			return true;
		}
		return false;
	};

	const catchBtn = (btn) => {
		btn.preventDefault();
		if (!keyPressInterceptor(btn)) {
			selected_index = -1;
			terminalInputBuffer += btn.key;
		}
	};

	const catchFocus = () => {
		inputRef.focus();
	};

	onMount(() => {
		catchFocus();
		resetTerminalInputBuffer();
		initiateDatabase();
	});
</script>

<div class="background"></div>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="display" on:focus={catchFocus}>
	<content class="height-90vh overflow-y-auto">
		<ContentLoader bind:content bind:scpItem bind:index={selected_index} />
	</content>
	<section class="glow fixed fixed-bottom width-100">
		<TerminalDisplay bind:TerminalBuffer />
		<TerminalInput
			bind:cursor
			bind:terminalInputBuffer
			bind:prompt
			bind:ref={inputRef}
			onType={catchBtn}
		/>
	</section>
</div>

<style>
	section {
		border: 1px solid #00ff00;
		font-family: monospace;
		font-size: 1.2em;
		overflow-y: auto;
		padding: 1rem;
	}

	.glow {
		box-shadow:
			0 0 0.4rem rgba(51, 255, 0, 1),
			2px 0 1px rgba(0, 0, 255, 1),
			-1px 0 1px rgba(255, 0, 0, 1);
	}
</style>
