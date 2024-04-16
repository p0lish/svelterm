<script>
	export let content = {};
	export let scpItem = undefined;
	export let index = 0;

	$: contentKeys = Object.keys(content);

	const init = (e) => {
		e.focus();
	};
</script>

{#if contentKeys.length > 0 && !scpItem}
	<section>
		<ul>
			{#each contentKeys as item, idx}
				<li class:selected={index === idx}>
					{#if index === idx}
						<button use:init>{item}</button>
					{:else}
						<button>{item}</button>
					{/if}
				</li>
			{/each}
		</ul>
	</section>
{:else if scpItem}
	<section>
		<div id="page">
			{@html scpItem.raw_content}
		</div>
	</section>
{/if}

<style lang="scss">
	section {
		display: flex;
		justify-content: center;
		text-align: center;
	}
	ul {
		height: 50%;
		list-style-type: none;
		padding: 0;
		margin: 0;
		width: 50%;
		overflow: hidden;
		overflow-y: auto;
		height: 50vh;
	}
	li {
		padding: 0.5rem;
	}
	button {
		outline: none;
		border: none;
		background: none;
		color: inherit;

		&:focus {
			border: 1px solid #00ff00;
		}
	}
	#page {
		margin: 1rem;
		width: 50%;
		height: 80%;

		text-align: justify;
	}
</style>
