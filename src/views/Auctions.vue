<template>
	<div class="auctions">
		<CarListing page="auction" />
	</div>
</template>

<script>
	import CarListing from '@/components/Auctions/CarListing.vue';
	export default {
		name: 'Auctions',
		mounted() {
			window.scrollTo(0, 0);
			const body = document.body;
			body.setAttribute('style', 'overflow: auto');
		},
		components: { CarListing },
		
	};
</script>

<style scoped></style>
