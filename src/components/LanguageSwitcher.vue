<template>
	<div class="language-switcher">
		<button class="en-btn" type="button">en</button>
		<button class="am-btn" type="button">am</button>
	</div>
</template>

<script>
	export default {
		name: 'LanguageSwitcher',
	};
</script>

<style scoped>
	button {
		outline: none;
		border: none;
	}

	button:hover {
		text-decoration: underline;
	}

	.en-btn {
		background-color: rgb(31, 31, 255);
	}

	.am-btn {
		background-color: rgb(255, 255, 47);
	}
</style>
