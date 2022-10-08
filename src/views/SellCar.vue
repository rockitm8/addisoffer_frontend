<template>
	<div class="sell-car">
		<SellCarMain />
		<div class="rating-area">
			<Rating />
		</div>
	</div>
</template>

<script>
	import SellCarMain from "@/components/SellCar/SellCarMain.vue";
	import Rating from "@/components/Rating.vue";
	export default {
		name: "SellCar",
		mounted() {
			window.scrollTo(0, 0);
			const body = document.body;
			body.setAttribute('style', 'overflow: auto');
		},
		components: { SellCarMain, Rating },
	};
</script>
