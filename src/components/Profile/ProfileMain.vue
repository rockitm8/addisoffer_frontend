<template>
	<div class="profile-main">
		<div class="row">
			<div class="col-lg-6 col-12 mx-auto">
				<!-- sec-1 -->

				<div class="sec-1">
					<form enctype="multipart/form-data">
						<div class="wrapper">
							<input
								type="file"
								id="my_file"
								class="my_file"
								@change="checkImage"
								accept="image/jpeg, image/png, image/jpg"
							/>
						</div>
						<!-- <button @click="uploadImage" type="button">check image</button> -->
					</form>
					<div class="content1">
						<h1 class="heading1">{{ user_data.user_name }}</h1>

						<!-- <p class="p1">Joined August 2022</p> -->
					</div>
				</div>
				<hr class="grey-line mt-5" />
				<!-- sec1 end -->
				<div class="sec-2">
					<h1 class="heading2">My Listings</h1>
					<div v-if="car_list == null">
						<p class="mt-3 p2">
							You have not submitted any cars yet. want to sell your car?
						</p>
						<button class="mt-3 btn button2">Get started</button>
					</div>
					<div v-else>
						<div class="car-list-area">
							<div class="grid-container">
								<div class="grid-item" v-for="(item, i) in car_list" :key="i">
									<SimpleCarCard page="profile" :car_data="item" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr class="grey-line mt-5" />
				<!-- sec-3 -->
				<div class="sec-3">
					<h1 class="heading2">Settings</h1>
					<!-- <Line /> -->
					<div class="notifications">
						<div class="general-notifications">
							<h2>General Notifications</h2>
							<div class="row notify-row">
								<div class="col-10">
									<p>Notify me when someone replies to my comment</p>
								</div>
								<div class="col-2 ml-auto">
									<div class="switch-btn">
										<label class="switch">
											<input
												type="checkbox"
												id="notification_is_replied"
												v-model="checkedNotifications.notification_is_replied"
												true-value="1"
												false-value="0"
											/>
											<span class="slider"></span>
										</label>
									</div>
								</div>
							</div>
							<div class="row notify-row">
								<div class="col-10">
									<p>Notify me when there is a new bid</p>
								</div>
								<div class="col-2 ml-auto">
									<div class="switch-btn">
										<label class="switch">
											<input
												type="checkbox"
												id="notification_is_new_bid"
												v-model="checkedNotifications.notification_is_new_bid"
												true-value="1"
												false-value="0"
											/>
											<span class="slider"></span>
										</label>
									</div>
								</div>
							</div>
							<div class="row notify-row">
								<div class="col-10">
									<p>Play sound when bids are placed</p>
								</div>
								<div class="col-2 ml-auto">
									<div class="switch-btn">
										<label class="switch">
											<input
												type="checkbox"
												id="notification_is_sound"
												v-model="checkedNotifications.notification_is_sound"
												true-value="1"
												false-value="0"
											/>
											<span class="slider"></span>
										</label>
									</div>
								</div>
							</div>
						</div>
						<Line />
						<div class="email-notifications">
							<h2>Email Notifications</h2>
							<div class="row notify-row">
								<div class="col-10">
									<p>Notify me when my auction ends</p>
								</div>
								<div class="col-2 ml-auto">
									<div class="switch-btn">
										<label class="switch">
											<input
												type="checkbox"
												id="email_is_auction_end"
												v-model="checkedNotifications.email_is_auction_end"
												true-value="1"
												false-value="0"
											/>
											<span class="slider"></span>
										</label>
									</div>
								</div>
							</div>
							<div class="row notify-row">
								<div class="col-10">
									<p>Notify me when there are new bids</p>
								</div>
								<div class="col-2 ml-auto">
									<div class="switch-btn">
										<label class="switch">
											<input
												type="checkbox"
												id="email_is_new_bid"
												v-model="checkedNotifications.email_is_new_bid"
												true-value="1"
												false-value="0"
											/>
											<span class="slider"></span>
										</label>
									</div>
								</div>
							</div>
							<div class="row notify-row">
								<div class="col-10">
									<p>Notify me when there are new comments</p>
								</div>
								<div class="col-2 ml-auto">
									<div class="switch-btn">
										<label class="switch">
											<input
												type="checkbox"
												id="email_is_new_comment"
												v-model="checkedNotifications.email_is_new_comment"
												true-value="1"
												false-value="0"
											/>
											<span class="slider"></span>
										</label>
									</div>
								</div>
							</div>
							<div class="row notify-row">
								<div class="col-10">
									<p>Notify me when I am outbid</p>
								</div>
								<div class="col-2 ml-auto">
									<div class="switch-btn">
										<label class="switch">
											<input
												type="checkbox"
												id="email_is_out_bid"
												v-model="checkedNotifications.email_is_out_bid"
												true-value="1"
												false-value="0"
											/>
											<span class="slider"></span>
										</label>
									</div>
								</div>
							</div>
							<button @click="saveSettings" class="mt-3 btn button2">
								Save settings
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import $ from 'jquery';
	import Line from '../Line.vue';
	import SimpleCarCard from '../SimpleCarCard.vue';
	import axiosInstance from '@/js/axiosInstance';
	import axiosInstanceBearer from '@/js/axiosInstanceBearer';

	export default {
		name: 'ProfileMain',
		data() {
			return {
				user_data: [],
				checkedNotifications: {
					notification_is_replied: '0',
					notification_is_new_bid: '0',
					notification_is_sound: '0',
					email_is_auction_end: '0',
					email_is_new_bid: '0',
					email_is_new_comment: '0',
					email_is_out_bid: '0',
				},
				file: {},
				car_list: [],
			};
		},
		methods: {
			saveSettings() {
				for (const i in this.checkedNotifications) {
					this.checkedNotifications[i] = parseInt(this.checkedNotifications[i]);
				}
				this.$store.dispatch('submitSettings', this.checkedNotifications);
			},
			checkImage(event) {
				this.file = event.target.files[0];
				if (this.file.type.match('image')) {
					this.uploadImage();
				}
			},
			async uploadImage() {
				const file = this.file;
				const formData = new FormData();
				formData.append('profile_pic', file);

				await axiosInstanceBearer
					.patch(`/api/users/image/`, formData)
					.then((response) => {
						$('.wrapper').css('background', file);
						location.reload(true);
					})
					.catch((error) => {});
			},
			async fetchUser() {
				await axiosInstance
					.get(`/api/users/profile/`)
					.then((response) => {
						this.user_data = response.data;
						this.$store.state.logged_user = this.user_data;
						this.fetchSettings();
						this.fetchProfilePic();
						this.fetchMyList();
					})
					.catch((error) => {});
			},
			async fetchSettings() {
				await axiosInstance
					.get(`/api/users/settings/${this.user_data.id}/`)
					.then((response) => {
						for (const i in response.data) {
							if (response.data[i] == false) this.checkedNotifications[i] = '0';
							else {
								this.checkedNotifications[i] = '1';
							}
						}
						this.$store.state.settings = this.checkedNotifications;
					})
					.catch((error) => {});
			},
			async fetchProfilePic() {
				await axiosInstanceBearer
					.get(`/api/users/image/`)
					.then((response) => {
						if (response.data[0].profile_pic != null) {
							$('.wrapper').css(
								'background',
								`url(${this.$store.state.backend_url}${response.data[0].profile_pic})`
							);

							$('.wrapper').css('background-position', `center`);

							$('.wrapper').css('background-size', `cover`);
						}
					})
					.catch((error) => {});
			},
			async fetchMyList() {
				await axiosInstanceBearer
					.get(`/api/user-cars/`)
					.then((response) => {
						if (response.data[0] == undefined) {
							this.car_list = null;
						} else this.car_list = response.data;
					})
					.catch((error) => {});
			},
		},
		mounted() {
			if (this.$store.state.header == 'Header') {
				this.user_data = [];
				this.checkedNotifications = {
					notification_is_replied: '0',
					notification_is_new_bid: '0',
					notification_is_sound: '0',
					email_is_auction_end: '0',
					email_is_new_bid: '0',
					email_is_new_comment: '0',
					email_is_out_bid: '0',
				};
				this.file = {};
				this.car_list = null;
			} else {
				this.fetchUser();
			}
		},
		components: { Line, SimpleCarCard },
	};
</script>

<style scoped>
	/* sec1 */
	.grey-line {
		opacity: 0.1;
	}

	.wrapper {
		height: 200px;
		width: 200px;
		position: relative;
		border: 5px solid white;
		border-radius: 50%;
		background: url(../../assets/profile-pic-initial.png);

		/* margin: 100px auto; */
		overflow: hidden;
		/* object-fit: cover; */
	}

	.my_file {
		position: absolute;
		bottom: 0;
		outline: none;
		color: transparent;
		width: 100%;
		box-sizing: border-box;
		padding: 15px 80px;
		cursor: pointer;
		transition: 0.5s;
		background: rgba(0, 0, 0, 0.5);
		opacity: 0;
		border-radius: 50%;
	}
	.my_file::-webkit-file-upload-button {
		visibility: hidden;
	}

	.my_file::before {
		content: '\f030';
		font-family: fontAwesome;
		font-size: 35px;
		color: white;
		display: inline-block;
		-webkit-user-select: none;
	}

	/* .my_file::after {
		content: 'Update';
		font-weight: bold;
		color: white;
		display: block;
		top: 70px;
		font-size: 14px;
		position: absolute;
	} */

	.my_file:hover {
		opacity: 1;
	}

	.grid-container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
		padding-top: 20px;
	}

	@media only screen and (max-width: 1199px) {
		.grid-container {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media only screen and (max-width: 991px) {
		.grid-container {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	@media only screen and (max-width: 767px) {
		.grid-container {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.sec-1 {
		display: flex;
		position: relative;
		margin-top: 50px;
		width: 100%;
	}

	.heading1 {
		font-weight: 700;
		font-size: 30px;
		line-height: 36px;
		display: inline-block;
	}

	.p1 {
		font-size: 14px;
	}

	.content1 {
		margin-top: 10%;
	}

	@media only screen and (min-width: 575px) {
		.content1 {
			margin-left: 30px;
		}
	}

	.button1 {
		position: absolute;
		right: 0;
		color: #828282;
		top: 0;
	}

	@media only screen and (max-width: 575px) {
		.content1 {
			padding-left: 50px;
		}
	}
	/* sec1 */

	/* sec2 */

	.heading2 {
		font-weight: 700;
		font-size: 30px;
		line-height: 36px;
		display: inline-block;
	}

	.sec-2 {
		margin-top: 90px;
	}

	.button2 {
		padding: 10px 30px;
		background-color: #f7941d;
		font-weight: 500;
		border-color: #dd8519;
	}

	.button2:hover {
		background-color: #dd8519;
	}

	.p2 {
		font-size: 15px;
	}

	@media only screen and (max-width: 575px) {
		.sec-2 .heading2 {
			font-size: 36px;
		}

		.sec-2 .button2 {
			width: 100%;
		}
	}

	/* sec-3 */
	.sec-3 {
		margin-top: 50px;
	}

	.notify-row p {
		display: inline-flex;
		margin-bottom: 20px;
	}

	.general-notifications,
	.email-notifications {
		padding: 20px 0px;
	}

	.notifications h2 {
		font-size: 16px;
		font-weight: 700;
		color: var(--dark-text-color);
		margin: 0px 0px 16px 0px;
	}

	.notifications p {
		font-size: 15px;
		font-weight: 400;
		color: var(--dark-text-color);
		/* margin-right: 225px; */
	}

	/* The switch - the box around the slider */
	.switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 34px;
	}

	/* Hide default HTML checkbox */
	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* The slider */
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	input:checked + .slider {
		background-color: var(--main-color);
	}

	input:focus + .slider {
		box-shadow: 0 0 1px var(--main-color);
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(26px);
		-ms-transform: translateX(26px);
		transform: translateX(26px);
	}
</style>
