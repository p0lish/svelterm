<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import FilterInput from '$lib/FilterInput.svelte';
	import WordFreq from '$lib/WordFreq.svelte';

	const chanURL = 'https://boards.4chan.org';
	const threadIsLive = false;
	$: board = $page.params.board;
	$: thread = $page.params.thread;
	$: posts = [];
	$: newest = posts.sort(reverseOrderByLastModified)[0];
	$: allString = '';

	const dateFromEpoch = (epoch) => {
		return new Date(epoch * 1000).toUTCString();
	};

	const reverseOrderByLastModified = (a, b) => {
		return b.last_modified - a.last_modified;
	};

	const getPosts = () => {
		fetch(`/api/4chan/${board}/${thread}`)
			.then((res) => res.json())
			.then((data) => {
				allString = data.map((thread) => thread.com).join(' ');
				posts = data;
			});
	};

	onMount(() => {
		getPosts();
		// const interval = setInterval(() => {
		// 	getCatalogs();
		// }, 10000);
		// return () => clearInterval(interval);
	});
</script>

<FilterInput />
<a target="_blank" href={`${chanURL}/${board}/thread/${thread}`}>go to thread</a>
<div>
	{#if allString}
		<WordFreq {allString} />
	{/if}
</div>

<ul>
	{#each posts as post}
		<li id={`p${post.no}`}>
			{post.no}
			{post.name}
			{dateFromEpoch(post.time)}
			<br />
			{@html post.com || ''}
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		list-style-type: none;
		margin: 1rem;
		padding: 0;

		li {
			margin: 1rem;
			padding: 1rem;
			border: 1px solid rgba(51, 255, 0, 1);
		}
	}
</style>
