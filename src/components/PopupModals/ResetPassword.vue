<template>
	<div class="reset-password-modal">
		<div v-if="formError != ''">
			<FormError :formError="formError" :error="errorTxt" />
		</div>

		<form action="#">
			<div class="data">
				<label class="mb-2" for="password">New Password</label>
				<input v-model="password" type="text" />
			</div>

			<div class="data">
				<label class="mb-2" for="password2">Confirm New Password</label>
				<input v-model="password2" type="text" />
			</div>

			<button @click="checkForm" class="form_btn" type="button">Submit</button>
		</form>
	</div>
</template>

<script>
	import FormError from '../FormError.vue';
	import axiosInstance from '@/js/axiosInstance';
	import axios from 'axios';

	export default {
		name: 'ResetPasswordModal',
		props: {
			showModal: Boolean,
		},
		data() {
			return {
				password: '',
				password2: '',
				formError: '',
				errorTxt: false,
			};
		},
		methods: {
			openResetModal() {
				const modal = document.getElementById('reset-modal');
				modal.style.display = 'block';
				const body = document.body;
				body.setAttribute('style', 'overflow: hidden');
			},
			closeResetModal() {
				// this.$emit('closeForgot');
				const modal = document.getElementById('reset-modal');
				const body = document.body;
				body.setAttribute('style', 'overflow: auto');
				modal.style.display = 'none';
			},
			checkForm() {
				let store = this.$store.state.rules;

				if (this.password == '' || this.password2 == '') {
					this.formError = 'All fields are required!';
					this.errorTxt = true;
					return;
				}

				if (this.password != this.password2) {
					this.formError = 'Passwords do not match!';
					this.errorTxt = true;
					return;
				}

				this.formError = '';
				this.errorTxt = false;
				this.submitPasswords();
			},
			async submitPasswords() {
				console.log('Password submitted...');
				let data = {
					password: this.password,
					password2: this.password2,
				};
				console.log(data);
				await axios
					.post(
						`${this.$store.state.backend_url}/api/users/changepassword/`,
						data
					)
					.then((response) => {
						console.log('response:', response);
					})
					.catch((error) => {
						console.log('error:', error);
					});
			},
		},
		watch: {
			showModal: {
				handler() {
					if (this.showModal == true) {
						this.openResetModal();
					}
				},
			},
		},
		components: { FormError },
	};
</script>

<style scoped>
	.reset-password-modal {
		margin-top: 120px;
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
	}

	.data input {
		height: 100%;
		width: 100%;
		border-radius: 6px;
		border: 1px solid #d5d5d5;
	}

	.data {
		margin-bottom: 60px;
	}

	.data label {
		font-size: 15px;
		color: rgb(38, 38, 38);
	}

	.form_btn {
		/* margin-top: 60px; */
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
			border-radius: 0;
			margin: 0;
			width: 100%;
			height: 100%;
		}
	}

	@media only screen and (max-width: 575px) {
		.form_btn {
			width: 100%;
		}
	}
</style>
