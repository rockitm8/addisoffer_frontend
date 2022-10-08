<template>
	<div class="renderer">
		<div class="header-section container-lg container-fluid">
			<component :is="$store.state.header" />
			<!-- <HeaderAfter /> -->
		</div>
		<div class="body-section container-lg container-fluid">
			<router-view></router-view>
		</div>
		<div class="footer-section">
			<div class="container-lg container-fluid"></div>
			<Footer />
		</div>
	</div>
</template>

<script>
	import Header from '@/components/Headers/Header.vue';
	import Footer from '@/components/Footer.vue';
	import HeaderAfter from '../components/Headers/HeaderAfter.vue';
	

	export default {
		components: { Header, Footer, HeaderAfter },
	};
</script>

<style scoped>
	.body-section {
		margin-top: 100px;
	}

	.footer-section {
		background-color: rgba(238, 238, 238, 0.842);
	}

	@media only screen and (max-width: 992px) {
		.body-section {
			padding-left: 30px;
			padding-right: 30px;
		}
	}
</style>
