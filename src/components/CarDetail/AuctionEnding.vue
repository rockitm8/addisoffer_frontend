<template>
	<div class="auction-ending">
		<div class="row">
			<span class="heading-txt">Auctions ending soon</span>
		</div>
		<div class="row">
			<!-- <div class="grid-container">
				<div class="grid-item" v-for="i in 9" :key="i">
					<CarCardTest />
				</div>
			</div> -->
			<CarListing page="ending" />
		</div>
	</div>
</template>

<script>
	import CarCardTest from '../CarCardTest.vue';
	import CarListing from '../Auctions/CarListing.vue';

	export default {
		name: 'AuctionEnding',
		mounted() {},
		components: { CarCardTest, CarListing },
	};
</script>

<style scoped>
	.grid-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 10px;
		padding: 0px 15px;
	}

	.row {
		margin-top: 10px;
	}

	.heading-txt {
		color: var(--dark-text-color);
		font-size: 18px;
		font-weight: 700;
	}
</style>
