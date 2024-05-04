<script>
	const tooCommonWords = [
		'the',
		'be',
		'to',
		'of',
		'and',
		'a',
		'in',
		'that',
		'have',
		'I',
		'it',
		'for',
		'not',
		'on',
		'with',
		'he',
		'as',
		'you',
		'do',
		'at',
		'this',
		'but',
		'his',
		'by',
		'from',
		'they',
		'we',
		'say',
		'her',
		'she',
		'or',
		'an',
		'will',
		'my',
		'one',
		'all',
		'would',
		'there',
		'their',
		'what',
		'so',
		'up',
		'out',
		'if',
		'about',
		'who',
		'get',
		'which',
		'go',
		'me',
		'when',
		'make',
		'can',
		'like',
		'time',
		'no',
		'just',
		'him',
		'know',
		'take',
		'people',
		'into',
		'year',
		'your',
		'good',
		'some',
		'could',
		'them',
		'see',
		'other',
		'than',
		'then',
		'now',
		'look',
		'only',
		'come',
		'its',
		'over',
		'think',
		'also',
		'back',
		'after',
		'use',
		'two',
		'how',
		'our',
		'work',
		'first',
		'well',
		'way',
		'even',
		'new',
		'want',
		'because',
		'any',
		'these',
		'give',
		'day',
		'most',
		'us',
		'what'
	];
	const bannedWords = [
		...tooCommonWords,
		'class',
		'script',
		'style',
		'src',
		'href',
		'onload',
		'onerror',
		'https',
		'http',
		'quot',
		'quote',
		'undefined',
		'span',
		'null',
		'quotelink',
		'thread',
		'boards'
	];

	export let allString;
	export let setSearchText = () => {};

	let wordCounts = {};
	const words = allString.split(/\b/);

	const pickHighest = (obj, num = 1) => {
		const requiredObj = {};
		if (num > Object.keys(obj).length) {
			return false;
		}
		Object.keys(obj)
			.sort((a, b) => obj[b] - obj[a])
			.forEach((key, ind) => {
				if (ind < num) {
					requiredObj[key] = obj[key];
				}
			});
		return requiredObj;
	};

	words.forEach((word) => {
		word = word.toLowerCase();
		if (word.length > 3 && word.match(/[a-zA-Z]/) && bannedWords.indexOf(word) === -1) {
			wordCounts[word] = (wordCounts[word] || 0) + 1;
		}
	});

	const highestWords = pickHighest(wordCounts, 20);
</script>

<p class="margin-mb-1">top words</p>
<div>
	{#each Object.keys(highestWords) as word}
		<button
			on:click={() => {
				setSearchText(word);
			}}
			class="tag">{word}: {highestWords[word]}</button
		>
	{/each}
</div>

<style>
	.tag {
		border: 1px solid rgba(51, 255, 0, 0.5);
		padding: 0.5rem;
		margin: 0rem;
		background: none;
		color: inherit;
		margin: 0.1rem;
	}
</style>
