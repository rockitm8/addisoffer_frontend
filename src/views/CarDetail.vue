<template>
	<div class="car-detail">
		<div v-if="car_data_fetched">
			<div class="sticky-heading">
				<CarHeading :car_data="car_data" />
			</div>
			<Gallery :car_data="car_data" />
			<div class="sticky-bar">
				<BlackBar :car_data="car_data" />
			</div>
			<div class="table-specs-section">
				<div class="row">
					<div class="col-xl-8 col-12">
						<SummaryTable :car_data="car_data" />
						<Specs :car_data="car_data" />
						<CommentSection />
					</div>
					<div class="col-xl-4 auc-sec">
						<AuctionEnding />
					</div>
				</div>
			</div>
			<div class="rating-area">
				<Rating />
			</div>
		</div>
		<div v-else><h1>FETCHING DATA...</h1></div>
	</div>
</template>

<script>
	import Gallery from '@/components/CarDetail/Gallery.vue';
	import BlackBar from '../components/CarDetail/BlackBar.vue';
	import SummaryTable from '@/components/CarDetail/SummaryTable.vue';
	import Specs from '@/components/CarDetail/Specs.vue';
	import AuctionEnding from '../components/CarDetail/AuctionEnding.vue';
	import Rating from '@/components/Rating.vue';
	import CommentSection from '@/components/Comments/CommentSection.vue';
	import CarHeading from '@/components/CarDetail/CarHeading.vue';

	import axiosInstance from '@/js/axiosInstance';
	import axiosInstanceBearer from '@/js/axiosInstanceBearer';
	import axios from 'axios';

	export default {
		name: 'CarDetail',
		data() {
			return {
				car_data: {},
				car_data_fetched: false,
			};
		},
		methods: {
			async fetchCar() {
				let car_id = this.$route.params.id;
				let list = this.$store.state.carList;

				await axios
					.get(`${this.$store.state.backend_url}/api/cars/${car_id}/`)
					.then((response) => {
						this.car_data = response.data;
						this.$store.state.singleCarData = this.car_data;
					})
					.catch((error) => {});
			},
			async fetchBidsLeft() {
				await axiosInstanceBearer
					.get(`/api/users/bids_left/`)
					.then((response) => {
						this.$store.state.bids_left = response.data.bids_left;
					})
					.catch((error) => {});
			},
			fetchCarAllowed() {
				axiosInstanceBearer
					.get(`/api/allowed-bid/`, { params: { car_id: this.car_data.id } })
					.then((response) => {
						console.log('WHEFHRGWLGJKWELJGWE', response);
						// this.car_data.car_allowed = response.data;
					})
					.catch((error) => {
						console.log(error);
					});
			},
		},
		watch: {
			car_data: {
				handler() {
					if (this.car_data == []) {
						this.car_data_fetched = false;
					} else {
						this.car_data_fetched = true;
					}
				},
			},
		},
		mounted() {
			window.scrollTo(0, 0);
			const body = document.body;
			body.setAttribute('style', 'overflow: auto');
			this.fetchCar();
			if (this.$store.state.header != 'Header') {
				this.fetchBidsLeft();
				this.fetchCarAllowed();
			}
		},
		components: {
			Gallery,
			BlackBar,
			SummaryTable,
			Specs,
			AuctionEnding,
			Rating,
			CommentSection,
			CarHeading,
		},
	};
</script>

<style scoped>
	.sticky-heading {
		position: sticky;
		top: 92px;
		z-index: 10;
		background: white;
		margin-right: -10px;
	}

	.sticky-bar {
		position: sticky;
		top: 150px;
		z-index: 10;
		background: white;
	}

	@media only screen and (max-width: 1399px) {
		.sticky-heading {
			top: 80px;
		}

		.sticky-bar {
			top: 140px;
		}
	}
	@media only screen and (max-width: 1199px) {
		.auc-sec {
			display: none;
		}
	}
	@media only screen and (max-width: 991px) {
		.sticky-heading {
			top: 88px;
			margin-right: -20px;
		}

		.sticky-bar {
			top: 147px;
		}
	}
</style>
