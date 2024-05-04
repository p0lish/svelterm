<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import FilterInput from '$lib/FilterInput.svelte';
	import WordFreq from '$lib/WordFreq.svelte';

	const chanURL = 'https://boards.4chan.org';
	let threadIsLive = false;
	let autoRefreshStopper = () => {};
	let filterString = '';
	let lastUpdated = 'n/a';

	$: board = $page.params.board;
	$: thread = $page.params.thread;
	$: posts = [];
	$: allString = '';

	$: filteredPosts = posts.filter((post) => {
		const filterstrings = filterString.split(' ');
		return (
			post?.com?.toLowerCase().includes(filterString.toLowerCase()) ||
			filterstrings.every((filter) => post?.com?.toLowerCase().includes(filter.toLowerCase()))
		);
	});

	const dateFromEpoch = (epoch) => {
		return new Date(epoch * 1000).toUTCString();
	};

	const getPosts = () => {
		fetch(`/api/4chan/${board}/${thread}`)
			.then((res) => res.json())
			.then((data) => {
				allString = data.map((thread) => thread.com).join(' ');
				posts = data;
				lastUpdated = new Date().toLocaleString();
			});
	};

	const autoRefresh = () => {
		threadIsLive = true;
		const interval = setInterval(() => {
			getPosts();
		}, 10000);
		return () => clearInterval(interval);
	};

	onMount(() => {
		getPosts();
	});
</script>

<div class="flex">
	<a class="button" target="_blank" href={`/${board}`}> back </a>
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
	<a class="button" target="_blank" href={`${chanURL}/${board}/thread/${thread}`}>go to thread</a>
</div>
<div class="margin-1rem">
	{#if allString}
		<WordFreq {allString} setSearchText={(word) => (filterString = word)} />
	{/if}
	<p>last updated: {lastUpdated}</p>
	<ul>
		{#each filteredPosts as post}
			<li id={`p${post.no}`}>
				{post.no}
				{post.name}
				{dateFromEpoch(post.time)}
				<br />
				{@html post.com || ''}
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	ul {
		list-style-type: none;
		margin: 0arem;
		padding: 0;

		li {
			margin: 1rem 0;
			padding: 1rem;
			border: 1px solid rgba(51, 255, 0, 1);
		}
	}
</style>
