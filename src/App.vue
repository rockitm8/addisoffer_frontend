<template>
	<div class="">
		<Renderer />
		<!-- <SearchBar /> -->
		<!-- <NotificationBell /> -->
	</div>
</template>

<script>
	import Renderer from './views/Renderer.vue';
	import NotificationBell from './components/Headers/NotificationBell.vue';
	import SearchBar from './components/Headers/SearchBar.vue';
	import $ from 'jquery';

	export default {
		components: { Renderer, NotificationBell, SearchBar },
	};
</script>

<style lang="scss">
	:root {
		--main-color: #f7941d;
		--dark-text-color: rgb(38, 38, 38);
	}

	#app {
		font-family: 'Montserrat';
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: var(--dark-text-color);
	}

	h1 {
		font-size: 36px;
		font-weight: 700;
	}

	h2 {
		font-size: 18px;
		font-weight: 400;
	}

	h3 {
		font-size: 22px;
		font-weight: 700;
	}

	h4 {
		font-size: 22px;
		font-weight: 700;
	}

	h6 {
		font-size: 20px;
		font-weight: 700;
	}

	@media only screen and (max-width: 576px) {
		:root {
			min-width: 576px;
		}
	}
</style>
