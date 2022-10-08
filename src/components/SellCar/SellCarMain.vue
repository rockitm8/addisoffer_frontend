<template>
	<div class="sell-car-main">
		<h1 class="sell-h1">
			<span class="h1-tag">Sell on Addis Offer!</span>
			<br />
			More money, fewer headaches.
		</h1>
		<div class="row all-rows">
			<!-- <div class="col-xl-5 col-1 d-none d-lg-block empty-1div px-0"></div> -->
			<div class="col-12">
				<img class="icons-img" src="../../assets/icons.png" alt="" />
			</div>

			<div class="col-12 order-md-last">
				<div class="btn-align">
					<h2 class="apply-h">
						Apply in minutes and we’ll respond within a <br />
						day.
					</h2>
					<router-link class="btn-links" :to="`/${$i18n.locale}/submit-car`">
						<button type="button" class="btn result-btn">
							Sell now — it’s free!
						</button>
					</router-link>
				</div>
			</div>
		</div>
		<div class="row all-rows">
			<h2 class="three-h">Why Addis Offer?</h2>
			<div class="col-xl-3 col-lg-2 col-1 d-none d-md-block"></div>
			<div class="col-xl-3 col-lg-4 col-md-5 col-12 px-md-4 px-0">
				<div class="rating-txt">
					<div class="rating-tags pb-4">
						<div class="rate">7,000+</div>
						<div class="rate-p pt-3">Auctions completed</div>
					</div>
					<div class="rating-tags pb-4">
						<div class="rate">$130M+</div>
						<div class="rate-p pt-3">Value of cars sold</div>
					</div>
					<div class="rating-tags">
						<div class="rate">9 out of 10</div>
						<div class="rate-p pt-3">
							Sellers strongly recommend Cars & Bids
						</div>
					</div>
				</div>
			</div>
			<div class="col-xl-3 col-lg-4 col-md-5 col-12">
				<div class="rating-txt">
					<div class="rating-tags pb-4">
						<div class="rate">85%+</div>
						<div class="rate-p pt-3">Sell-through rate</div>
					</div>
					<div class="rating-tags pb-4">
						<div class="rate">240k+</div>
						<div class="rate-p pt-3">Registered members</div>
					</div>
					<div class="rating-tags">
						<div class="rate">200k+</div>
						<div class="rate-p pt-3">
							Social media followers, and more from Doug DeMuro’s engaged
							audience
						</div>
					</div>
				</div>
			</div>
		</div>

		<h2 class="three-h">Recent Sales</h2>
		<div class="grid-container">
			<div class="grid-item" v-for="i in 4" :key="i">
				<img class="car-pic" src="../../assets/car1.png" /> <br />
				<span class="recent-prize">Sold for $138,000</span> <br />
				<span class="recent-years">2022 Rivian R1T Launch Edition</span>
			</div>
		</div>

		<div class="row auctions-row">
			<h2 class="three-h">Our Auctions</h2>
			<div class="col-xl-2 col-1 d-none d-lg-block"></div>
			<div class="col-xl-4 col-lg-5 col-md-6 col-12 px-0">
				<div class="reserve auction">
					<h5 class="reserve-h">Reserve Auction</h5>
					<p class="reserve-p">
						A reserve auction has a secret minimum price that you’ll accept in
						order to sell your car. If your reserve isn't met, the car does not
						sell. We'll work with you to agree on a fair reserve price during
						the submission process.
					</p>
				</div>
			</div>
			<div class="col-xl-4 col-lg-5 col-md-6 col-12 px-0">
				<div class="no-reserve auction">
					<h5 class="reserve-h noreserve-h">No Reserve Auction</h5>
					<p class="noreserve-p">
						An auction without a reserve means that the car will sell to the
						highest bidder at the end of the auction regardless of price. We've
						found that cars offered with no reserve get more bids, more
						interest, and more attention.
					</p>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<h2 class="three-h">How it works</h2>
			</div>
			<div class="col-12">
				<img
					class="how-it-works-img"
					src="../../assets/SellCar/how-it-works.png"
					alt=""
				/>
			</div>
			<div class="col-12">
				<div class="btn-align">
					<router-link class="btn-links" :to="`/${$i18n.locale}/submit-car`">
						<button type="button" class="btn result-btn">
							Get Started Now
						</button>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery';

	export default {
		name: 'SellCarMain',
		methods: {
			checkSignin() {
				if (this.$store.state.header == 'header') {
				}
			},
		},
	};
</script>

<style scoped>
	.grid-container {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 10px;
		text-align: center;
	}

	.icons-img {
		width: 30%;
		margin-bottom: 100px;
		margin-left: 35%;
		position: relative;
	}

	.how-it-works-img {
		width: 60%;
		margin-bottom: 100px;
		margin-left: 20%;
		position: relative;
	}

	.sell-car-main {
		padding-top: 50px;
	}

	.all-rows {
		margin-bottom: 48px;
	}

	/* first heading */

	.sell-h1 {
		font-size: 40px;
		line-height: 48px;
		font-weight: 700;
		width: 840px;
		margin: 0 25% 80px;
	}

	.h1-tag {
		border-bottom: 7px solid #ffe55f;
	}

	/* empty first div */

	.empty-1div {
		width: 218px;
		margin: 0;
	}

	/* first images and paragraph */

	.images-p {
		width: 400px;
		margin: 0 auto 48px;
		text-align: left;
	}
	.sell-img {
		width: 36px;
		height: 36px;
		align-items: center;
	}

	.sell-sepimg {
		margin-bottom: 27px;
	}

	.sell-p {
		font-size: 16px;
		height: 16px;
		display: inline-block;
		margin-bottom: 0px;
		margin-left: 13px;
	}

	.sell-tags {
		font-weight: bolder;
	}

	/* carousel */

	.carousel {
		height: 208px;
		background: #fffadf;
		border-radius: 10px;
		margin: 0;
		width: 340px;
		color: rgb(0, 0, 0);
		position: relative;
	}
	.customers-h {
		margin-bottom: 8px;
		font-size: 24px;
		line-height: 31px;
		font-weight: 700;
	}

	/* applying section */

	.apply-h {
		text-align: center;
		font-size: 32px;
		line-height: 51px;
		font-weight: 700;
		margin-bottom: 23px;
	}

	.btn-align {
		text-align: center;
	}

	.result-btn {
		margin-bottom: 80px;
		font-size: 20px;
		font-weight: 500;
		padding: 12px 80px;
		background-color: #f7941d;
		border-color: #f7941d;
		border-radius: 5px;
	}

	.result-btn:hover {
		background-color: #dd8519;
	}

	/* three headings */

	.three-h {
		margin-bottom: 32px;
		font-weight: 700;
		font-size: 34px;
		text-align: center;
	}

	/* rates */

	.rating-tags {
		text-align: center;
	}

	.sep-p {
		text-align: center;
		font-size: 17px;
		font-weight: 300;
		color: #262626;
	}

	.rate {
		color: black;
		font-size: 45px;
		font-weight: 700;
		display: inline-block;
		border-bottom: 7px solid #ffe55f;
	}

	/* Recent Sales div */

	.cars {
		padding-right: 0px;
	}
	.car-pic {
		width: 166px;
	}

	/* our aucations */

	.auctions-row {
		padding-bottom: 80px;
	}

	.auction {
		background-color: #ffedd7;
		padding: 24px 45px;
	}

	.reserve-h {
		font-size: 16px;
		font-weight: 700;
	}

	.reserve {
		font-size: 16px;
		border-top-left-radius: 6px;
		border-bottom-left-radius: 6px;
	}

	.no-reserve {
		font-size: 16px;
		border-top-right-radius: 6px;
		border-bottom-right-radius: 6px;
	}

	.noreserve-h {
		padding-left: 12px;
	}

	.noreserve-p {
		border-left: 1px solid #b3b6b5;
		margin-left: -45px;
		padding-left: 40px;
	}

	.btn-links:hover {
		color: #212529;
		height: 100%;
	}

	/* media */

	@media screen and (max-width: 1399px) {
		.empty-1div {
			width: 100px;
		}

		.images-p {
			width: 380px;
		}
	}

	@media screen and (max-width: 1200px) {
		.empty-1div {
			width: 60px;
		}

		.images-p {
			width: 400px;
		}
	}

	@media screen and (max-width: 991px) {
		.apply-div {
			padding: 0 30px;
			align-items: center;
		}

		.empty-1div {
			width: 40px;
		}

		.images-p {
			padding-left: 10px;
			width: 390px;
			margin: 0 auto 32px;
		}

		.sell-h1 {
			width: 760px;
			margin: 0 auto 80px;
		}

		.reserve-h {
			font-size: 20px;
		}

		.noreserve-p {
			padding-left: 39px;
		}

		.auction {
			padding: 24px 31px;
		}
	}

	@media screen and (max-width: 768px) {
		.grid-container {
			grid-template-columns: repeat(2, 1fr);
		}

		.sell-h1 {
			max-width: 386px;
			text-align: left;
			margin: 0 auto;
			margin-bottom: 25px;
			font-size: 37px;
		}

		.images-p {
			padding-left: 0px;
			max-width: 386px;
			text-align: left;
			margin: 0 auto;
			padding-bottom: 20px;
		}

		.slide-div {
			max-width: 386px;
			margin-left: 30%;
			margin: 0 auto;
			text-align: left;
		}

		.rate {
			text-align: center;
			font-size: 33px;
		}

		.rating-tags {
			text-align: center;
		}

		.rating-txt {
			padding: 0 15px;
		}

		.sep-p {
			text-align: center;
		}

		.noreserve-p {
			border-left: 0px;
		}

		.auction {
			padding: 24px 45px;
		}

		.reserve {
			padding-left: 59px;
			padding-bottom: 5px;
			border-bottom-left-radius: 0px;
			border-top-right-radius: 10px;
		}

		.no-reserve {
			padding-top: 5px;
			border-top-right-radius: 0px;
			border-bottom-left-radius: 10px;
		}

		.reserve-p {
			margin-bottom: 3px;
		}

		.noreserve-p {
			padding-left: 57px;
		}

		.customers-h {
			text-align: center;
		}

		.apply-h {
			font-size: 26px;
			text-align: center;
		}

		.carousel {
			margin: 0 auto;
		}
	}
</style>
