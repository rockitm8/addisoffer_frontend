<template>
    <div class="notification-info">
        <div class="notify_img">
            <img
                src="../../assets/profile-pic-initial.png"
                alt="profile_pic"
                style="width: 50px"
            />
        </div>
        <div class="notify_info">
            <p>{{notification.notifier}} <span>{{notification.detail}} <span @click="closeBtn" class="close">x</span></span></p>
            <span class="notify_time">{{notification.notified_time}}</span>
        </div>
    </div>
</template>

<script>
import axiosInstance from '@/js/axiosInstance'

    export default {
		name: 'NotficationInfo',
        props: {
            notification: null
        },
        methods: {
            closeBtn() {
                console.log("noti:", this.$store.state.notifications)
                this.deleteNotification()
            },
            async deleteNotification () {
                await axiosInstance.delete(`/api/users/notifications/${this.notification.id}/`).then((response) => {
                    console.log("Notification deleted...")
                }).catch((error) => {
                    console.log("error:", error)
                })
            }
        },
        mounted() {
            if (this.notification.notification_type == "notification_is_new_bid" && this.$store.state.settings.notification_is_sound)
            {
                // play sound
            }
        }
    }
</script>

<style scoped>
.notify_img {
		margin-right: 15px;
	}

    .notify_info p {
		margin-bottom: 5px;
	}

	.notify_info p span {
		color: var(--main-color);
		margin-left: 5px;
	}

	.notify_info .notify_time {
		color: #c5c5e6;
		font-size: 12px;
	}

    .close {
		cursor: pointer;
		position: absolute;
		top: 30%;
		/* right: 0%; */
		right: -10%;
		margin-right: 20px;
		transform: translate(0%, -50%);
	}
</style>