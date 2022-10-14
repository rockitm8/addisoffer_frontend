<template>
	<div class="place-bid-modal">
		<div id="place-bid-modal" class="modal_box">
			<div class="modal_content">
				<header class="mt-3">
					<span @click="closePlaceBidModal" class="closebtn">&times;</span>
					<!-- <img width="61px" src="imgs/logo.png" alt="" /> -->
					<h5>Place Your Bid</h5>
				</header>

				<div v-if="formError != ''">
					<FormError :formError="formError" :error="errorTxt" />
				</div>

				<form @submit.prevent="checkBid">
					<div class="data">
						<label class="mb-2" for="bid">Your bid</label>
						<input v-model="bid_amount" type="text" />
					</div>

					<button id="submit-bid-btn" class="form_btn" type="submit">
						Submit
					</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import FormError from '../FormError.vue';
	import axiosInstanceBearer from '@/js/axiosInstanceBearer';
	import axiosInstance from '@/js/axiosInstance';
	import moment from 'moment';

	export default {
		name: 'PlaceBidModal',
		props: {
			showModal: Boolean,
			car_data: {
				default: [],
			},
			bid_allowed: String,
		},
		data() {
			return {
				bid_amount: '',
				formError: '',
				errorTxt: false,
				highest_bid: 0,
			};
		},
		methods: {
			openPlaceBidModal() {
				const modal = document.getElementById('place-bid-modal');
				modal.style.display = 'block';
				const body = document.body;
				body.setAttribute('style', 'overflow: hidden');
			},
			closePlaceBidModal() {
				this.$emit('close');
				const modal = document.getElementById('place-bid-modal');
				const body = document.body;
				body.setAttribute('style', 'overflow: auto');
				modal.style.display = 'none';
			},
			checkBid() {
				let store = this.$store.state.rules;
				let highestBid = this.$store.state.singleCarData.high_bid;
				this.highest_bid = highestBid;
				if (this.bid_amount == '') {
					this.errorTxt = true;
					this.formError = 'Enter an amount.';

					return;
				}
				let bid_amount_num = parseInt(this.bid_amount);
				if (!store.numberRule.test(this.bid_amount)) {
					this.errorTxt = true;
					this.formError = 'Amount must be in numbers.';

					return;
				}
				if (bid_amount_num - highestBid < 5000) {
					this.errorTxt = true;
					this.formError = 'Amount must be more than 5000 of the highest bid.';

					return;
				}
				if (bid_amount_num > 1000000000) {
					this.errorTxt = true;
					this.formError = 'Amount can not be that high.';

					return;
				}

				this.errorTxt = false;
				this.formError = '';

				let data = {
					bid_amount: this.bid_amount,
					accessToken: this.$store.state.accessToken,
					bid_on: this.$route.params.id,
				};

				// Checking 5 minutes
				let nowTime = moment();
				let carTime = moment(this.car_data.time_left);
				if (
					carTime.diff(nowTime, 'days') < 1 &&
					carTime.diff(nowTime, 'hours') < 1 &&
					carTime.diff(nowTime, 'minutes') < 5
				) {
					this.increaseCarTime();
				}

				this.submitBid();
				$('#submit-bid-btn').prop('disabled', 'true');
			},
			increaseCarTime() {
				axiosInstance
					.patch(`/api/car-time/${this.car_data.id}/`)
					.then((response) => {
						this.$store.state.singleCarData = response.data;
					})
					.catch((error) => {});
			},
			async submitBid() {
				let data = {
					bid_on: this.$store.state.singleCarData.id,
					bid_amount: this.bid_amount,
					bidder: this.$store.state.accessToken,
				};
				this.errorTxt = false;
				this.formError = 'Bid processing, please wait!';

				if (this.bid_allowed == 'car_allowed') {
					await axiosInstanceBearer
						.post(`/api/bids/`, data)
						.then((response) => {
							this.$store.state.singleCarData.total_bids += 1;
							this.$store.state.singleCarData.high_bid = this.bid_amount;

							axiosInstance
								.patch(
									`/api/cars/${this.$store.state.singleCarData.id}/`,
									this.$store.state.singleCarData
								)
								.then((response) => {})
								.catch((error) => {});

							let commentData = {
								reply_to: null,
								comment: 'Bid: ETB ' + this.bid_amount,
								accessToken: this.$store.state.accessToken,
								commented_on: this.$route.params.id,
								bid: true,
							};

							let data = {
								car_id: this.$store.state.singleCarData.id,
								last_bid: this.highest_bid,
							};
							axiosInstance
								.post('api/users/email-is-new-bid/', data)
								.then((response) => {})
								.catch((error) => {});
							axiosInstance
								.post('api/users/email-is-out-bid/', data)
								.then((response) => {
									this.$store.dispatch('submitComment', commentData);
								})
								.catch((error) => {});
						})
						.catch((error) => {
							this.errorTxt = true;
							this.formError = "Sellers can't bid on their cars.";
						});
				} else {
					await axiosInstanceBearer
						.post(`/api/bids/`, data)
						.then((response) => {
							this.$store.state.singleCarData.total_bids += 1;
							this.$store.state.singleCarData.high_bid = this.bid_amount;
							this.$store.state.bids_left -= 1;
							let updatedUser = this.$store.state.logged_user;
							updatedUser.bids_left = this.$store.state.bids_left;

							axiosInstance
								.post(`/api/allowed-bid/`, data)
								.then((response) => {})
								.catch((error) => {
									console.log(error);
								});

							axiosInstance
								.patch(
									`/api/cars/${this.$store.state.singleCarData.id}/`,
									this.$store.state.singleCarData
								)
								.then((response) => {})
								.catch((error) => {
									console.log(error);
								});
							axiosInstance
								.patch(
									`/api/users/update/${this.$store.state.logged_user.id}/`,
									updatedUser
								)
								.then((response) => {})
								.catch((error) => {
									console.log(error);
								});
							let commentData = {
								reply_to: null,
								comment: 'Bid: ETB ' + this.bid_amount,
								accessToken: this.$store.state.accessToken,
								commented_on: this.$route.params.id,
								bid: true,
							};

							let data = {
								car_id: this.$store.state.singleCarData.id,
								last_bid: this.highest_bid,
							};
							axiosInstance
								.post('api/users/email-is-new-bid/', data)
								.then((response) => {})
								.catch((error) => {
									console.log(error);
								});
							axiosInstance
								.post('api/users/email-is-out-bid/', data)
								.then((response) => {
									this.$store.dispatch('submitComment', commentData);
								})
								.catch((error) => {
									console.log(error);
								});
						})
						.catch((error) => {
							this.errorTxt = true;
							this.formError = "Sellers can't bid on their cars.";
						});
				}
			},
		},
		watch: {
			showModal: {
				handler() {
					if (this.showModal == true) {
						this.openPlaceBidModal();
					}
				},
			},
		},
		mounted() {
			this.$store.dispatch('fetchUser');
		},
		components: { FormError },
	};
</script>

<style scoped>
	.modal_box {
		display: none;
		position: fixed;
		z-index: 100;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.modal_content {
		background-color: #f4f4f4;
		margin: 100px auto;
		padding: 10px 25px 40px 25px;
		width: 400px;
		box-shadow: 0 8px 40px rgb(0 0 0 / 16%);
		border-radius: 6px;
	}
	/* header css */
	header {
		text-align: center;
	}

	header img {
		margin-left: 20px;
	}

	header button {
		text-decoration: none;
		color: #f7941d;
		border: none;
		background-color: #f4f4f4;
	}

	header button:hover {
		text-decoration: underline;
		color: #dd8519;
	}

	header p {
		font-size: 15px;
		line-height: 21px;
		color: rgb(38, 38, 38);
	}

	header h5 {
		margin-bottom: 20px;
		margin-top: 10px;
		font-size: 20px;
		font-weight: 700;
	}

	.closebtn {
		color: #ccc;
		float: right;
		font-size: 30px;
	}

	.closebtn:hover,
	.closebtn:focus {
		color: black;
		text-decoration: none;
		cursor: pointer;
	}

	/*  */

	form {
		margin-top: -20px;
	}

	.data {
		height: 44px;
		width: 100%;
		margin-top: 50px;
		margin-bottom: 60px;
	}

	.data input {
		height: 100%;
		width: 100%;
		border-radius: 6px;
		border: 1px solid #d5d5d5;
	}

	.data label {
		font-size: 15px;
		color: rgb(38, 38, 38);
	}

	.form_btn {
		margin-bottom: 29px;
		height: 44px;
		width: 32%;
		background-color: #f7a23a;
		font-size: 18px;
		font-weight: 500px;
		cursor: pointer;
		border-radius: 6px;
		border: none;
	}

	form .form_btn:hover {
		background-color: #dd8519;
	}

	form a {
		text-decoration: none;
		color: #f7a23a;
	}

	form a:hover {
		color: #dd8519;
		text-decoration: underline;
	}

	.help-txt {
		padding-bottom: 20px;
	}

	@media only screen and (max-width: 575px) {
		.modal_content {
			height: 100%;
			width: 100%;
			border-radius: 0px;
			margin-top: 0px;
		}

		.form_btn {
			width: 100%;
		}
	}
</style>
