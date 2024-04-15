<script>
	export let prompt = '$';
</script>

<b class="prompt">{prompt}</b>

<style lang="scss">
	.prompt {
		color: rgb(255, 176, 0);
		text-shadow: none;
		text-shadow:
			0 0 0.5rem rgb(255, 176, 0),
			1px 0 1px rgba(255, 0, 0, 1),
			-1px 0 1px rgba(0, 0, 255, 1);
	}
</style>
