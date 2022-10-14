<template>
	<div class="comment">
		<div class="container">
			<div class="row">
				<div class="comment-heading col-12">
					<div v-if="profile_pic == null" class="if-else">
						<img
							id="profile-pic"
							class="comment-dp img"
							src="../../assets/profile-pic-initial.png"
							alt=""
						/>
					</div>
					<div v-else class="if-else">
						<img
							id="profile-pic"
							class="comment-dp img"
							:src="profile_pic"
							alt=""
						/>
					</div>

					<span class="comment-name">{{ comment_data.commentor_name }}</span>
					<span
						v-if="comment_data.commentor_type != 'None'"
						class="comment-seller"
						id="comment-seller"
						>{{ comment_data.commentor_type }}</span
					>
					<span class="light-text comment-time">
						{{ comment_data.published_time }}
					</span>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<p class="comment-txt">
						<span class="reply-to">{{ reply_to_username }}</span>
						{{ comment_data.comment }}
					</p>
				</div>
			</div>
			<div class="row">
				<div class="light-txt reply-txt-section">
					<span @click="reply_clicked" class="reply-txt">
						Reply <font-awesome-icon icon="fa-solid fa-arrow-alt-circle-down" />
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery';
	import axios from 'axios';

	export default {
		name: 'Comment',
		props: {
			comment_data: {
				default: [],
			},
		},
		data() {
			return {
				reply_to_username: '',
				profile_pic: null,
			};
		},
		methods: {
			reply_clicked() {
				let c = 'Re: ' + this.comment_data.commentor_name;
				let obj = {
					reply_to_id: this.comment_data.commentor,
					reply_to_commentor: c,
				};
				this.$emit('replyuser', obj);
			},
			async fetchUsername() {
				await axios
					.get(
						`${this.$store.state.backend_url}/api/users/user/${this.comment_data.reply_to}/`
					)
					.then((response) => {
						this.reply_to_username = 'Re: ' + response.data.user_name;
					})
					.catch((error) => {});
			},
			async fetchProfilePic() {
				await axios
					.get(
						`${this.$store.state.backend_url}/api/users/profile_pic/${this.comment_data.commentor}/`,
						{ params: { user_id: this.comment_data.commentor } }
					)
					.then((response) => {
						if (response.data != '') {
							this.profile_pic = response.data;
						} else {
							this.profile_pic = null;
						}
					})
					.catch((error) => {});
			},
		},
		mounted() {
			this.fetchProfilePic();
			if (this.comment_data.reply_to != null) {
				this.fetchUsername();

				$('.reply-to').css('display', 'inline');
			}
			$('#comment-seller').attr('id', 'comment-seller' + this.comment_data.id);
			if (this.comment_data.commentor_type == 'none') {
				$('#comment-seller' + this.comment_data.id).css('display', 'none');
			} else if (this.comment_data.commentor_type == 'seller') {
				$('#comment-seller' + this.comment_data.id).css(
					'background-color',
					'#f7941d'
				);
			} else {
				$('#comment-seller' + this.comment_data.id).css(
					'background-color',
					'rgb(125, 79, 255)'
				);
			}
		},
	};
</script>

<style scoped>
	.if-else {
		display: inline;
	}
	.comment-dp {
		border-radius: 50%;
		padding: 0;
		width: 30px;
		height: 30px;
	}

	.comment-name {
		color: var(--dark-text-color);
		font-size: 14px;
		font-weight: 600;
	}

	.comment-seller {
		background-color: rgb(125, 79, 255);
		color: white;
		font-size: 14px;
		font-weight: 600;
		border-radius: 4px;
		padding: 1px 4px;
	}

	.light-txt,
	.comment-time {
		color: rgb(173, 173, 173);
		font-size: 14px;
		font-weight: 400;
	}

	.comment-dp,
	.comment-name,
	.comment-seller,
	.comment-time {
		margin-right: 10px;
	}

	.comment-txt {
		font-size: 16px;
		color: var(--dark-text-color);
		font-weight: 400;
		padding-left: 40px;
	}

	.reply-txt-section {
		padding-left: 50px;
	}

	.reply-txt {
		cursor: pointer;
	}

	.reply-txt:hover {
		color: #323232;
	}

	.reply-to {
		font-size: 16px;
		font-weight: 400;
		color: var(--main-color);
		display: none;
	}
</style>
