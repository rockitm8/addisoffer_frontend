<template>
	<div class="signup-modal">
		<div id="signup-modal" class="modal_box">
			<div class="modal_content">
				<header class="mt-3">
					<span @click="closeSignupModal" class="closebtn">&times;</span>
					<!-- <img width="61px" src="" alt="" /> -->
					<h5>Sign up</h5>
					<p>
						Already have an account?
						<button @click="triggerSignin" type="button">Sign in here</button>
					</p>
				</header>

				<div v-if="formError != ''">
					<FormError :formError="formError" :error="errorTxt" />
				</div>

				<form @submit.prevent="checkForm" id="register">
					<div class="data">
						<label class="mb-2" for="username">Username</label>
						<input v-model="user.user_name" type="text" />
					</div>

					<div class="data">
						<label class="mb-2" for="email">Email address</label>
						<input v-model="user.email" type="email" />
					</div>
					<div class="data">
						<label class="mb-2" for="password">Password</label>
						<input v-model="user.password" type="password" />
					</div>
					<div class="data confirm-input">
						<label class="mb-2" for="confirm">Confirm Password</label>
						<input v-model="user.password2" type="password" />
					</div>

					<button id="signup-btn" class="form_btn" type="submit">
						Sign up
					</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery';
	import FormError from '../FormError.vue';
	import axiosInstance from '@/js/axiosInstance';
	import axios from 'axios';

	export default {
		name: 'SignupModal',
		props: {
			showModal: Boolean,
		},
		data() {
			return {
				user: {
					email: '',
					user_name: '',
					password: '',
					password2: '',
				},
				formError: '',
				errorTxt: false,
			};
		},
		methods: {
			openSignupModal() {
				const modal = document.getElementById('signup-modal');
				modal.style.display = 'block';

				const body = document.body;
				body.setAttribute('style', 'overflow: hidden');
			},

			closeSignupModal() {
				this.$emit('closeSignup');
				const modal = document.getElementById('signup-modal');
				const body = document.body;
				body.setAttribute('style', 'overflow: auto');
				modal.style.display = 'none';
			},
			triggerSignin() {
				this.closeSignupModal();
				this.$emit('openSignin');
			},
			triggerOtp() {
				this.closeSignupModal();
				this.$emit('openOtp');
			},
			checkForm() {
				let store = this.$store.state.rules;
				if (
					this.user.user_name == '' ||
					this.user.email == '' ||
					this.user.password == ''
				) {
					this.errorTxt = true;
					this.formError = 'All fields are required!';
					return;
				}
				this.user.email = this.user.email.toLowerCase();
				if (!store.usernameRule.test(this.user.user_name)) {
					this.errorTxt = true;
					this.formError = 'Username must have at least 2 characters!';
					return;
				}
				if (!store.emailRule.test(this.user.email)) {
					this.errorTxt = true;
					this.formError = 'Email address is not valid!';
					return;
				}
				if (!store.passwordRule.test(this.user.password)) {
					this.errorTxt = true;
					this.formError =
						'Password must contain one capital letter, one small letter, one number and one symbol!';
					return;
				}
				if (this.user.password != this.user.password2) {
					this.errorTxt = true;
					this.formError = 'Passwords do not match!';
					return;
				}

				this.errorTxt = false;
				this.formError = '';
				this.submitRegister(this.user);
			},
			async submitRegister(user) {
				this.errorTxt = false;
				this.formError = 'Processing, please wait!';

				await axios
					.post(`${this.$store.state.backend_url}/api/users/register/`, user)
					.then((response) => {
						this.triggerOtp();
					})
					.catch((error) => {
						console.log(error);
						let err = error.response.data.errors;
						this.errorTxt = true;
						for (const [key, value] of Object.entries(err)) {
							this.formError = value[0];
						}
					});
			},
		},
		watch: {
			showModal: {
				handler() {
					if (this.showModal == true) {
						this.openSignupModal();
					}
				},
			},
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

	.error-txt {
		color: red;
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

	.confirm-input {
		margin-bottom: 60px;
	}

	.form_btn {
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

	@media only screen and (max-width: 575px) {
		.modal_content {
			margin: 0;
			height: 100%;
			width: 100%;
			border-radius: 0px;
		}
	}
</style>
