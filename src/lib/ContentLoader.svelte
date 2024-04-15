<script>
	export let content = null;
	export let index = 0;
</script>

{#if content.length > 0}
	<ul>
		{#each content as item, idx}
			<li class:selected={index === idx}>{item}</li>
		{/each}
	</ul>
{:else}
	<!-- else content here -->
{/if}

<style>
	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}
	li {
		padding: 0.5rem;
	}
	li.selected {
		border: 1px solid #00ff00;
	}
</style>
