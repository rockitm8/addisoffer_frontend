<template>
	<div class="about">
		<div class="row">
			<div class="col-xl-3">
				<SideNav />
			</div>
			<div class="col-xl-9 col-12 sec-2">
				<AboutMain />
				<Faq />
			</div>
		</div>
		<div class="rating-section">
			<Rating />
		</div>
	</div>
</template>

<script>
	import SideNav from "../components/About/SideNav.vue";
	import Faq from "../components/About/Faq.vue";
	import AboutMain from "../components/About/AboutMain.vue";
	import Rating from "@/components/Rating.vue";

	export default {
		name: "About",
		mounted() {
			window.scrollTo(0, 0);
			const body = document.body;
			body.setAttribute('style', 'overflow: auto');
		},
		components: { SideNav, Faq, AboutMain, Rating },
	};
</script>

<style scoped>
	.about {
		padding-top: 30px;
	}
</style>
