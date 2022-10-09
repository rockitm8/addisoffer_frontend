<template>
	<div class="notification-bell">
		<font-awesome-icon
			@click="toggleNotification"
			class="fa-icon"
			icon="fa-solid fa-bell"
		/>
		<div class="dropdown">
			<div
				v-if="Object.keys($store.state.notifications).length !== 0"
				class="notify_item"
				v-for="(item, i) in $store.state.notifications"
				:key="i"
			>
				<NotificationInfo :notification="item" />
			</div>
			<div v-else>
				<div class="empty">
					No notifications yet. Check your profile settings.
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery';
	import axiosInstanceBearer from '@/js/axiosInstanceBearer';
	import NotificationInfo from './NotificationInfo.vue';
	import moment from 'moment';

	export default {
		name: 'NotficationBell',
		data() {
			return {
				notifications: null,
			};
		},
		methods: {
			toggleNotification() {
				$('.dropdown').toggleClass('active');
			},
			countdownTimer() {
				const intervalId = setTimeout(() => {
					this.fetchNotifications();
					this.countdownTimer();
				}, 10000);
				return intervalId;
			},
			startTime() {
				this.intervalId = this.countdownTimer();
			},
			async fetchNotifications() {
				await axiosInstanceBearer
					.get('/api/users/notifications/')
					.then((response) => {
						let temp = response.data;
						for (const notification in temp) {
							temp[notification].notified_time = moment(
								temp[notification].notified_time
							).fromNow();
						}
						temp.reverse();
						this.$store.state.notifications = temp;
					})
					.catch((error) => {});
			},
		},
		mounted() {
			if (this.$store.state.header === 'HeaderAfter') this.startTime();
		},
		components: { NotificationInfo },
	};
</script>

<style scoped>
	.fa-icon {
		border-radius: 50%;
		padding: 10px;
		cursor: pointer;
		color: rgb(255, 198, 101);
		font-size: 20px;
	}

	.fa-icon:hover {
		background-color: rgb(239, 239, 239);
	}

	.dropdown {
		width: 350px;
		height: auto;
		background: #fff;
		border-radius: 5px;
		box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.372);
		margin: 15px auto 0;
		padding: 15px;
		position: absolute;
		display: none;
		right: 2%;
	}

	.empty {
		color: #828282;
		font-size: 14px;
	}

	.dropdown .notify_item {
		display: flex;
		align-items: center;
		padding: 10px 0;
		border-bottom: 1px solid #dbdaff;
	}

	.dropdown .notify_item:last-child {
		border-bottom: 0px;
	}

	.notify_item {
		position: relative;
	}

	.dropdown:before {
		content: '';
		position: absolute;
		top: -30px;
		left: 80%;
		transform: translateX(-50%);
		border: 15px solid;
		border-color: transparent transparent #fff transparent;
	}

	.dropdown.active {
		display: block;
		padding-right: 30px;
	}
</style>
