<script lang="ts">
	import { onMount } from 'svelte';
	import '../styles/global.scss';

	const getBoards = async () => {
		const response = await fetch(`/api/4chan/boards`);
		const result = await response.json();
		return result;
	};

	let boards = [];

	onMount(async () => {
		const result = await getBoards();
		boards = result.boards;
		console.log('boards', boards);
	});
</script>

<h1 class="center">4CHAN watcher</h1>
<div class="flex wrap">
	{#each boards as board}
		<a href={board.board}>{board.title}</a>
	{/each}
</div>

<style lang="scss">
	a {
		background: inherit;
		border: 2px solid gray;
		font-weight: bold;
		margin: 0.4rem;
		padding: 0.4rem;
	}
	.wrap {
		flex-wrap: wrap;
	}
	.center {
		text-align: center;
	}
</style>
