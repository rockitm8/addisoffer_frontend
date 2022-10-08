<template>
	<div class="comment-section">
		<h4>Comments & Bids</h4>
		<CommentAdd :reply_to="reply_to" />
		<div v-for="(item, i) in comment_list" :key="i">
			<div v-if="comment_list">
				<Comment @replyuser="receiveuser" :comment_data="item" />
			</div>
			<div v-else><h1>FETCHING DATA...</h1></div>
		</div>
	</div>
</template>

<script>
	import Comment from './Comment.vue';
	import CommentAdd from './CommentAdd.vue';
	import moment from 'moment';
	import axiosInstance from '@/js/axiosInstance';
	import axios from 'axios'

	export default {
		name: 'CommentSection',
		components: {
			Comment,
			CommentAdd,
		},
		data() {
			return {
				comment_list: [],
				comment_list_fetched: false,
				reply_to: {},
			};
		},
		methods: {
			receiveuser(reply_to) {
				this.reply_to = reply_to;
			},
			async fetchCommentData() {
				await axios
					.get(`${this.$store.state.backend_url}/api/comments`, {
						params: { car_id: this.$route.params.id },
					})
					.then((response) => {
						let temp = response.data;
						for (const comment in temp) {
							temp[comment].published_time = moment(
								temp[comment].published_time
							).fromNow();
						}

						this.comment_list = temp;
						this.comment_list.reverse();
					})
					.catch((err) => console.log(err.message));
			},
		},
		mounted() {
			this.fetchCommentData();
		},
		watch: {
			comment_list: {
				handler() {
					if (this.comment_list == []) {
						this.comment_list_fetched = false;
					} else {
						this.comment_list_fetched = true;
					}
				},
			},
		},
	};
</script>

<style scoped>
	h4 {
		margin-bottom: 10px;
	}
</style>
