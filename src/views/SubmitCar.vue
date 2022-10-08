<template>
	<div class="submit-car">
		<SubmitMain />
		<div class="rating-area">
			<Rating />
		</div>
	</div>
</template>

<script>
	import Rating from "@/components/Rating.vue";
	import SubmitMain from "@/components/SubmitCar/SubmitCarMain.vue";
	export default {
		name: "SubmitCar",
		mounted() {
			window.scrollTo(0, 0);
			const body = document.body;
			body.setAttribute('style', 'overflow: auto');
		},
		components: { Rating, SubmitMain },
	};
</script>

<style scoped></style>
