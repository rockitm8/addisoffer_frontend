<template>
	<div class="header">
		<nav class="navbar navbar-expand-lg navbar-light">
			<router-link class="nav-link logo-link" :to="`/${$i18n.locale}`">
				<img
					class="mt-4 logo-img"
					src="../../assets/logo-name.png"
					alt="logo"
				/>
			</router-link>
			<div
				class="ml-5 collapse navbar-collapse nav-links"
				id="navbarSupportedContent"
			>
				<ul class="navbar-nav me-auto mx-auto mb-lg-0">
					<li class="nav-item">
						<router-link class="nav-link" :to="`/${$i18n.locale}`">
							Auctions
						</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" :to="`/${$i18n.locale}/past-results`">
							Past results
						</router-link>
					</li>
					<li class="nav-item">
						<router-link
							class="sell-txt nav-link"
							:to="`/${$i18n.locale}/sell-car`"
						>
							Sell a Car
						</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" :to="`/${$i18n.locale}/about`">
							What's Addis Offers?
						</router-link>
					</li>
				</ul>
				<form class="d-flex mt-1">
					<SearchBar searchId="big" />
					
					<button
						type="button"
						@click="triggerSigninModal"
						class="signin1"
						id="modalbtn1"
					>
						Sign in
					</button>
				</form>
			</div>
		</nav>

		<SigninModal
			@closeSignin="triggerSigninModal"
			@openSignup="triggerSignupModal"
			@openForgot="triggerForgotModal"
			:showModal="isSigninActive"
		/>
		<SignupModal
			@closeSignup="triggerSignupModal"
			@openSignin="triggerSigninModal"
			@openOtp="triggerOtpModal"
			:showModal="isSignupActive"
		/>
		<OtpModal @closeOtp="triggerOtpModal" :showModal="isOtpActive" />
		<ForgotPasswordModal
			@closeForgot="triggerForgotModal"
			@openSignin="triggerSigninModal"
			:showModal="isForgotActive"
		/>

		<div class="nav3">
			<router-link class="nav-link logo-link" :to="`/${$i18n.locale}`">
				<img class="img2 logo-img" src="../../assets/logo-name.png" alt="" />
			</router-link>
			<div class="search-small">
				<SearchBar searchId="small" />
			</div>
			
			
			<button
				type="button"
				@click="triggerSigninModal"
				class="signin1"
				id="modalbtn3"
			>
				Sign in
			</button>

			<button @click="openModal" class="btn" id="modalbtn3">
				<div class="hamb"></div>
				<div class="hamb"></div>
				<div class="hamb"></div>
			</button>

			<div id="simple-modal3" class="modal_box3">
				<div class="modal_content3">
					<header class="mt-3">
						<span @click="closeModal" class="closebtn3">&times;</span>
						<h6>Menu</h6>
					</header>

					<ul>
						<li>
							<router-link @click="closeModal" :to="`/${$i18n.locale}`">
								Auctions</router-link
							>
						</li>
						<li>
							<router-link
								@click="closeModal"
								:to="`/${$i18n.locale}/past-results`"
								>Past results</router-link
							>
						</li>
						<li>
							<router-link
								@click="closeModal"
								class="sell-text3"
								:to="`/${$i18n.locale}/sell-car`"
								>Sell a Car</router-link
							>
						</li>
						<li>
							<router-link @click="closeModal" :to="`/${$i18n.locale}/about`"
								>What's Addis Offers?</router-link
							>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Line from '../Line.vue';
	import LanguageSwitcher from '../LanguageSwitcher.vue';
	import SigninModal from '../PopupModals/SigninModal.vue';
	import SignupModal from '../PopupModals/SignupModal.vue';
	import ForgotPasswordModal from '../PopupModals/ForgotPasswordModal.vue';
	import SearchBar from './SearchBar.vue';
	import OtpModal from '../PopupModals/OtpModal.vue';

	export default {
		name: 'Header',
		components: {
			Line,
			LanguageSwitcher,
			SigninModal,
			SignupModal,
			ForgotPasswordModal,
			SearchBar,
			OtpModal,
		},
		data() {
			return {
				isSigninActive: false,
				isSignupActive: false,
				isForgotActive: false,
				isOtpActive: false,
			};
		},
		methods: {
			triggerSigninModal() {
				this.isSigninActive = !this.isSigninActive;
			},
			triggerSignupModal() {
				this.isSignupActive = !this.isSignupActive;
			},
			triggerForgotModal() {
				this.isForgotActive = !this.isForgotActive;
			},
			triggerOtpModal() {
				this.isOtpActive = !this.isOtpActive;
			},
			openModal() {
				const modal3 = document.getElementById('simple-modal3');
				modal3.style.display = 'block';
			},
			closeModal() {
				const modal3 = document.getElementById('simple-modal3');
				modal3.style.display = 'none';
			},
		},
	};
</script>

<style scoped>

	nav {
		border-bottom: 1px solid #f0ecec;
		position: fixed;
		top: 0px;
		background: white;
		z-index: 10;
		padding-right: 10px;
		/* padding-left: 100px; */
	}

	.logo-img {
		width: 200px;
	}

	.logo-link {
		padding-left: 0px;
	}

	.srch-bar {
		background: #eeeef0;
		border: 0px;
		font-size: 15px;
		border-radius: 6px;
		color: #828282;
		width: 450px;
		height: 46px;
		padding-left: 20px;
	}

	.sell-txt {
		background-color: #f7941d;
		border-radius: 20px;
		margin-left: 10px;
	}

	.sell-text:hover {
		background-color: #dd8519;
		color: #555;
	}

	nav li a {
		margin-top: 20px;
		text-decoration: none;
		padding: 10px 15px;
		font-size: 15px;
		font-weight: 500;
		color: #555555;
	}

	nav li a:hover {
		color: rgb(39, 39, 39);
	}

	.signin1 {
		align-items: center;
		padding: 0px 14px;
		justify-content: center;
		width: 122px;
		height: 46px;
		font-weight: 500;
		font-size: 16px;
		line-height: 19px;
		border-radius: 6px;
		background: #f7941d;
		border: 1px solid #f7941d;
	}

	@media only screen and (min-width: 1400px) {
		.navbar {
			width: 1296px;
		}
	}

	@media only screen and (max-width: 1399px) {
		.srch-bar {
			width: 349px;
		}

		.logo-img {
			width: 150px;
		}
	}

	@media only screen and (max-width: 1199px) {
		.srch-bar {
			width: 169px;
		}

		.logo-img {
			width: 152px;
		}
	}

	@media only screen and (max-width: 991px) {
		.navbar {
			display: none;
		}

		nav {
			border: none;
		}

		.sell-text {
			background-color: #f7941d;
			border-radius: 20px;
			width: 90px;
			text-align: center;
		}

		.srch-bar {
			width: 100%;
			text-align: center;
			justify-content: center;
		}

		.logo-img {
			width: 230px;
		}
	}

	/* nav3 css */

	.nav3 {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		justify-content: space-between;
		z-index: 12;
		background-color: white;
		padding-top: 20px;
		padding-bottom: 15px;
		border-bottom: 2px solid #f0ecec;
	}

	.img2 {
		padding-left: 20px;
	}

	.srch-bar2 {
		background: #eeeef0;
		border: 0px;
		font-size: 15px;
		border-radius: 6px;
		color: #828282;
		width: 450px;
		height: 46px;
		padding-left: 20px;
		margin-right: 30px;
	}

	.hamb {
		width: 30px;
		height: 3px;
		background-color: #828282;
		margin: 6px;
		border: 0px;
	}

	.modal_box3 {
		display: none;
		position: fixed;
		z-index: 12;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.modal_box3 a {
		text-align: left;
	}

	.modal_content3 {
		background-color: #f4f4f4;
		margin: 10% auto;
		padding: 20px;
		width: 400px;
		box-shadow: 0 8px 40px rgb(0 0 0 / 16%);
		border-radius: 6px;
	}

	.closebtn3 {
		color: #ccc;
		float: right;
		font-size: 30px;
	}

	.closebtn3:hover,
	.closebtn3:focus {
		color: black;
		text-decoration: none;
		cursor: pointer;
	}

	.search-bar3 {
		background: #eeeef0;
		border: 0px;
		font-size: 15px;
		border-radius: 6px;
		color: #828282;
		width: 100%;
		height: 46px;
		padding-left: 20px;
	}

	.sell-text3 {
		background-color: #f7941d;
		border-radius: 20px;
		margin-left: 10px;
	}

	@media only screen and (min-width: 776px) {
		.search-bar3 {
			display: contents;
		}
	}

	.modal_content3 ul {
		padding-left: 0px !important ;
	}

	input[name='search']::placeholder {
		text-align: left;
	}

	header h6 {
		text-align: left;
		margin-left: 4px;
		margin-bottom: 18px;
		font-weight: 700;
		font-size: 22px;
		line-height: 22px;
	}

	header h6::before {
		content: ' ';
		display: inline-block;
		margin-right: 10px;
		width: 8px;
		height: 15px;
		background-color: #f7a23a;
		border-radius: 0 3px 3px 0;
	}

	ul {
		list-style-type: none;
	}

	div a {
		text-decoration: none;
		padding: 10px 15px;
		font-size: 15px;
		font-weight: 500;
		color: #555555;
	}

	.nav3 ul li {
		margin-top: 20px;
	}
	.hamb {
		width: 30px;
		height: 3px;
		background-color: #828282;
		margin: 6px;
		border: 0px;
	}

	form {
		margin-top: -20px;
	}

	@media only screen and (max-width: 991px) {
		.nav3 {
			display: flex;
		}
	}

	@media only screen and (max-width: 992px) {
		.modal_content3 {
			margin: 0;
			height: 100%;
			min-width: 100%;
			border-radius: 0px;
		}
	}

	@media only screen and (min-width: 992px) {
		.modal_content3 {
			display: none;
		}
	}

	@media only screen and (max-width: 776px) {
		.search-small {
			display: none;
		}

		.signin1 {
			margin-left: 150px;
		}
	}
</style>
