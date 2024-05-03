<script>
	import Scanlines from '$lib/Scanlines.svelte';
	import '../../styles/global.scss';

	const scanlinesOn = false;
</script>

{#if scanlinesOn}
	<Scanlines />
{/if}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div>
	<div>
		<slot />
	</div>
</div>

<style lang="scss">
	* {
		font-size: 12px;
	}
	.display {
		margin: 2rem;
	}

	a {
		font-weight: 900;
		&:hover {
			text-decoration: underline;
		}
	}
</style>
