<script>
	import { page } from '$app/stores';
	import FilterInput from '$lib/FilterInput.svelte';
	import { onMount } from 'svelte';
	import WordFreq from '$lib/WordFreq.svelte';

	let threadIsLive = false;
	let filterString = '';
	let autoRefreshStopper = () => {};
	let lastUpdated = 'n/a';

	$: board = $page.params.board;
	$: threads = [];
	$: allString = '';

	$: filteredThreads = threads.filter((thread) => {
		const filterstrings = filterString.split(' ');
		return (
			thread?.com?.toLowerCase().includes(filterString.toLowerCase()) ||
			filterstrings.every((filter) => thread?.com?.toLowerCase().includes(filter.toLowerCase()))
		);
	});

	const dateFromEpoch = (epoch) => {
		return new Date(epoch * 1000).toUTCString();
	};

	const reverseOrderByLastModified = (a, b) => {
		return b.last_modified - a.last_modified;
	};

	const getCatalogs = async () => {
		const response = await fetch(`/api/4chan/${board}/catalog`);
		const data = await response.json();
		threads = data.flat().sort(reverseOrderByLastModified);
		allString = data.map((thread) => thread.com).join(' ');
		lastUpdated = new Date().toLocaleString();
	};

	const autoRefresh = () => {
		threadIsLive = true;
		const interval = setInterval(() => {
			getCatalogs();
		}, 10000);
		return () => clearInterval(interval);
	};

	onMount(() => {
		getCatalogs();
	});
</script>

<div class="flex">
	<a class="button" target="_blank" href="/"> back </a>
	<FilterInput bind:text={filterString} />
	{#if threadIsLive}
		<button
			on:click={() => {
				threadIsLive = false;
				autoRefreshStopper();
			}}>Stop auto refresh</button
		>
	{:else}
		<button
			on:click={() => {
				autoRefreshStopper = autoRefresh();
			}}>Auto refresh</button
		>
	{/if}
</div>
<div class="margin-1rem">
	{#if allString}
		<WordFreq {allString} setSearchText={(word) => (filterString = word)} />
	{/if}
	<p>last updated: {lastUpdated}</p>
</div>

<ul>
	{#each filteredThreads as thread}
		<li id={`p${thread.no}`}>
			<a href={`${board}/${thread.no}`}>{thread.no}</a>
			{thread.name}
			{dateFromEpoch(thread.last_modified)}
			<br />
			{@html thread.com}
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		list-style-type: none;
		margin: 1rem;
		padding: 0;

		li {
			margin: 1rem 0;
			padding: 1rem;
			border: 1px solid rgba(51, 255, 0, 1);
		}
	}
</style>
