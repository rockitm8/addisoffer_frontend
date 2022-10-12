<template>
	<div class="signin-modal">
		<div id="signin-modal" class="modal_box1">
			<div class="modal_content1">
				<span @click="closeSigninModal" class="closebtn1">&times;</span>
				<header class="mt-3 header1">
					<h5>Sign in</h5>
					<p>
						Need to create an account?
						<button @click="triggerSignup" type="button">Sign up here</button>
					</p>
				</header>

				<div v-if="formError != ''">
					<FormError :formError="formError" :error="errorTxt" />
				</div>

				<form @submit.prevent="checkForm" class="form1">
					<div class="data1">
						<label class="mb-2" for="email">Email address</label>
						<input v-model="user.email" type="email" />
					</div>
					<div class="data1 password-input">
						<label for="password" class="mb-2">Password</label>
						<input v-model="user.password" type="password" />
					</div>

					<button id="signin-btn" class="form_btn1" type="submit">
						Sign in
					</button>

					<button class="forgot" @click="triggerForgot" type="button">
						Forgot your password?
					</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import SignupModal from './SignupModal.vue';
	import FormError from '../FormError.vue';
	import axiosInstance from '@/js/axiosInstance';
	import axios from 'axios';
	import router from '../../router';

	export default {
		name: 'SigninModal',
		props: {
			showModal: Boolean,
		},
		data() {
			return {
				user: {
					email: '',
					password: '',
				},
				formError: '',
				errorTxt: false,
			};
		},
		methods: {
			openSigninModal() {
				const modal = document.getElementById('signin-modal');
				modal.style.display = 'block';
				const body = document.body;
				body.setAttribute('style', 'overflow: hidden');
			},
			closeSigninModal() {
				this.$emit('closeSignin');
				const modal = document.getElementById('signin-modal');
				document.body.setAttribute('style', 'overflow: auto');

				modal.style.display = 'none';
			},
			triggerSignup() {
				this.closeSigninModal();
				this.$emit('openSignup');
			},
			triggerForgot() {
				this.closeSigninModal();
				this.$emit('openForgot');
			},
			checkForm() {
				let store = this.$store.state.rules;
				if (this.user.email == '' || this.user.password == '') {
					this.errorTxt = true;
					this.formError = 'All fields are required!';
					return;
				}

				this.user.email = this.user.email.toLowerCase();
				if (!store.emailRule.test(this.user.email)) {
					this.errorTxt = true;
					this.formError = 'Email address is not valid!';
					return;
				}

				this.formError = '';
				this.errorTxt = false;
				this.submitLogin(this.user);
			},
			async submitLogin(user) {
				await axios
					.post(`${this.$store.state.backend_url}/api/users/login/`, user)
					.then((response) => {
						localStorage.setItem(
							'authTokens',
							JSON.stringify(response.data.token)
						);
						this.$store.commit('loginSuccess', response.data.token.access);
						this.$store.commit('toggleHeader');
						router.push({ name: 'auctions' });
						location.reload();
					})
					.catch((error) => {
						this.formError = error.response.data.errors.non_field_errors[0];
						this.errorTxt = true;
					});
			},
		},
		watch: {
			showModal: {
				handler() {
					if (this.showModal == true) {
						this.openSigninModal();
					}
				},
			},
		},
		mounted() {
			document.body.setAttribute('style', 'overflow: auto');
		},
		components: { SignupModal, FormError },
	};
</script>

<style scoped>
	.modal_box1 {
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

	.modal_content1 {
		background-color: #f4f4f4;
		margin: 100px auto;
		padding: 10px 25px 40px 25px;
		width: 400px;
		box-shadow: 0 8px 40px rgb(0 0 0 / 16%);
		border-radius: 6px;
	}
	/* header css */
	.header1 {
		text-align: center;
	}

	.header1 img {
		margin-left: 20px;
	}

	.header1 button {
		text-decoration: none;
		color: #f7941d;
		border: none;
		background-color: #f4f4f4;
	}

	.header1 button:hover {
		text-decoration: underline;
		color: #dd8519;
	}

	.header1 p {
		font-size: 15px;
		line-height: 21px;
		color: rgb(38, 38, 38);
	}

	.header1 h5 {
		margin-bottom: 20px;
		margin-top: 40px;
		font-size: 20px;
		font-weight: 700px;
	}

	.closebtn1 {
		color: #ccc;
		float: right;
		font-size: 30px;
		margin-top: 20px;
	}

	.closebtn1:hover,
	.closebtn1:focus {
		color: black;
		text-decoration: none;
		cursor: pointer;
	}

	/*  */

	.form1 {
		margin-top: -20px;
	}

	.data1 {
		height: 44px;
		width: 100%;
		margin-top: 50px;
	}

	.data1 input {
		height: 100%;
		width: 100%;
		border-radius: 6px;
		border: 1px solid #d5d5d5;
	}

	.data1 label {
		font-size: 15px;
		color: rgb(38, 38, 38);
	}

	.password-input {
		margin-bottom: 60px;
	}

	.form_btn1 {
		margin-bottom: 30px;
		height: 44px;
		width: 100%;
		background-color: #f7a23a;
		font-size: 18px;
		font-weight: 500px;
		cursor: pointer;
		border-radius: 6px;
		border: none;
	}

	.form1 .form_btn2:hover {
		background-color: #dd8519;
	}

	.forgot {
		text-decoration: none;
		color: #f7a23a;
		border: none;
		background-color: #f4f4f4;
	}

	.forgot:hover {
		color: #dd8519;
		text-decoration: underline;
	}

	.forgot-pass1 {
		padding-bottom: 20px;
	}

	@media only screen and (max-width: 575px) {
		.modal_content1 {
			height: 100%;
			width: 100%;
			border-radius: 0px;
			margin-top: 0px;
		}
	}
</style>
