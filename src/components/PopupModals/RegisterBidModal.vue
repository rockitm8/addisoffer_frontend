<template>
	<div class="register-bid-modal">
		<div id="register-modal" class="modal_box">
			<div class="modal_content">
				<span @click="closeRegisterBidModal" class="closebtn">&times;</span>
				<header class="mt-3">
					<h5>Register to Bid</h5>
				</header>
				<div class="content-text">
					<p class="main-p">
						We require bidders Payment before you can bid. To make a bid user
						will need to make a payment to one of the listed accounts and attach
						the confirmation photo to our telegram account. After we receive the
						payment, we will release the account to be able to bid. Bidding
						price for a single car is ETB300 (Three Hundred ETB). Bids are
						always binding so, bid wisely please.
					</p>
					<p class="bank1"><span>Bank of Abysina:</span> 23028507</p>
					<p><span>Commerical Bank of Ethiopia:</span> 1000020682527</p>
					<p><span>Cooperative Bank of Oromia:</span> 103730004363</p>
					<p><span>Dashen Bank:</span> 5237001104004</p>
					<p><span>Hibret Bank:</span> 1030416014164011</p>
					<p><span>Telebirr:</span> 0910932337</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'RegisterBidModal',
		props: {
			showModal: Boolean,
		},
		methods: {
			openRegisterBidModal() {
				const modal = document.getElementById('register-modal');
				modal.style.display = 'block';
				const body = document.body;
				body.setAttribute('style', 'overflow: hidden');
			},

			closeRegisterBidModal() {
				this.$emit('close');
				const modal = document.getElementById('register-modal');
				const body = document.body;
				body.setAttribute('style', 'overflow: auto');
				modal.style.display = 'none';
			},
		},
		watch: {
			showModal: {
				handler() {
					if (this.showModal == true) {
						this.openRegisterBidModal();
					}
				},
			},
		},
	};
</script>

<style scoped>
	.modal_box {
		display: none;
		position: fixed;
		z-index: 100 !important;
		left: 0;
		top: 0;
		width: 100%;
		height: 2000px;
		overflow: hidden;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.modal_content {
		background-color: #f4f4f4;
		margin: 100px auto;
		padding: 30px 40px 20px;
		width: 400px;
		box-shadow: 0 8px 40px rgb(0 0 0 / 16%);
		border-radius: 6px;
	}

	/* header css */
	header {
		text-align: center;
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

	header button {
		border: 1px solid black !important;
	}

	/*  */

	.main-p,
	.bank1 {
		margin-top: 20px;
	}

	p span {
		font-weight: 700;
	}

	@media only screen and (max-width: 575px) {
		.modal_content {
			height: 100%;
			width: 100%;
			border-radius: 0px;
			margin-top: 80px;
		}
	}
</style>
