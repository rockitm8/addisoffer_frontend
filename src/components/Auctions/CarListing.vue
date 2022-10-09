<template>
	<div class="car-listing">
		<div v-if="page == 'ending'">
			<div class="grid-container2">
				<div class="grid-item" v-for="(item, i) in car_list" :key="i">
					<div v-if="car_data_fetched && i <= 10">
						<CarCard :page="page" :car_data="item" />
					</div>
					<div v-else><h1>FETCHING DATA...</h1></div>
				</div>
			</div>
			<!-- <AuctionEnding /> -->
		</div>
		<div v-else>
			<div class="auction-heading-area">
				<div v-if="page == 'auction'">
					<AuctionHeading @filterChanged="updateList" heading_text="Auctions" />
				</div>
				<div v-else>
					<AuctionHeading @filterChanged="updateList" heading_text="Results" />
				</div>
				<div class="car-list-area">
					<div class="grid-container">
						<div class="grid-item" v-for="(item, i) in car_list" :key="i">
							<div v-if="car_data_fetched">
								<CarCard :page="page" :car_data="item" />
							</div>
							<div v-else><h1>FETCHING DATA...</h1></div>
						</div>
					</div>
				</div>

				<div v-if="page == 'auction'">
					<ViewResult />
				</div>
				<div v-else></div>
			</div>

			<div class="rating-area">
				<Rating />
			</div>
		</div>
	</div>
</template>

<script>
	import CarCard from '../CarCard.vue';
	import AuctionHeading from './AuctionHeading.vue';
	import Rating from '@/components/Rating.vue';
	import CarCardTest from '@/components/CarCardTest.vue';
	import ForgotPasswordModal from '@/components/PopupModals/ForgotPasswordModal.vue';
	import ShareModal from '@/components/PopupModals/ShareModal.vue';
	import SigninModal from '@/components/PopupModals/SigninModal.vue';
	import SignupModal from '@/components/PopupModals/SignupModal.vue';
	import ViewResult from './ViewResult.vue';
	import { mapGetters } from 'vuex';
	import axiosInstance from '@/js/axiosInstance';
	import axios from 'axios';

	export default {
		name: 'CarListing',
		props: {
			page: String,
		},
		data() {
			return {
				car_list: [],
				car_data_fetched: false,
				filtered_cars: [],
				filterarray: null,
				searchTxt: '',
			};
		},

		methods: {
			async fetchCarData(filter = false, filterConditions = null) {
				let url = '';
				if (this.page == 'auction' || this.page == 'ending')
					url = `${this.$store.state.backend_url}/api/cars`;
				else url = `${this.$store.state.backend_url}/api/car-results/`;
				await axios
					.get(url)
					.then((response) => {
						this.car_list = response.data;
						if (filter) {
							this.car_list = this.car_list.filter(function (item) {
								if (filterConditions.transmission === 'Transmission')
									return true;
								return item.transmission === filterConditions.transmission;
							});

							this.car_list = this.car_list.filter(function (item) {
								if (filterConditions.body_type === 'Body Type') return true;
								return item.body_type === filterConditions.body_type;
							});

							this.car_list = this.car_list.filter(function (item) {
								if (filterConditions.plate_code === 'Plate Code') return true;
								return item.plate_code === filterConditions.plate_code;
							});

							this.car_list = this.car_list.filter(function (item) {
								return (
									item.year >= filterConditions.years.start &&
									item.year <= filterConditions.years.end
								);
							});

							this.car_list.sort((a, b) => {
								let a1 = new Date(a.time_left);
								let b1 = new Date(b.time_left);
								return b1.getTime() - a1.getTime();
							});
							if (filterConditions.selectedFilter == 1) this.car_list.reverse();
						} else {
							if (this.filterarray != null) {
								this.car_list = this.filterarray;
							}
							this.car_list.sort((a, b) => {
								let a1 = new Date(a.time_left);
								let b1 = new Date(b.time_left);
								return b1.getTime() - a1.getTime();
							});
							this.car_list.reverse();
						}
						this.$store.commit('listCarData', this.car_list);
					})
					.catch((err) => {});
			},

			updateList(filterConditions) {
				this.fetchCarData(true, filterConditions);
			},
			filterSearch() {
				let text = this.searchText;
				this.filterarray = this.car_list.filter(function (a) {
					let carName = a.year + ' ' + a.make + ' ' + a.model;
					if (carName.includes(text)) {
						return carName;
					}
				});

				if (text == '') {
					this.filterarray = null;
				}
				this.fetchCarData();
			},
		},
		watch: {
			car_list: {
				handler() {
					if (this.car_list == []) {
						this.car_data_fetched = false;
					} else {
						this.car_data_fetched = true;
						this.filtered_cars = this.car_list;
					}
				},
			},
			searchText: {
				handler() {
					this.filterSearch();
				},
			},
		},
		computed: {
			...mapGetters({
				searchText: 'getSearchText',
			}),
		},
		mounted() {
			this.fetchCarData();
		},
		components: {
			CarCard,
			AuctionHeading,
			Rating,
			CarCardTest,
			ForgotPasswordModal,
			ShareModal,
			SigninModal,
			SignupModal,
			ViewResult,
		},
	};
</script>

<style scoped>
	.grid-container {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 20px;
	}

	.grid-container2 {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;
	}

	.filterDiv {
		display: none;
	}

	.show {
		display: block;
	}

	.auction-heading-area {
		padding-top: 20px;
		margin-left: 1%;
	}

	.car-info {
		margin-bottom: 3%;
		min-width: 25%;
	}

	/* @media only screen and (max-width: 1399px) {
		.grid-container2 {
			display: grid;
			grid-template-columns: repeat(1, 1fr);
			gap: 20px;
		}
	} */

	@media only screen and (max-width: 1199px) {
		.grid-container {
			grid-template-columns: repeat(3, 1fr);
		}

		.auction-heading-area {
			margin-left: 2%;
		}
	}

	@media only screen and (max-width: 991px) {
		.grid-container {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media only screen and (max-width: 767px) {
		.grid-container {
			grid-template-columns: repeat(1, 1fr);
		}
	}
</style>
