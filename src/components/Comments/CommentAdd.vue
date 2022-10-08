<template>
	<div class="comment-add">
		<form class="form-area form-floating" action="">
			<textarea
				v-model="comment"
				type="email"
				class="form-control"
				id="floatingInputValue"
				placeholder="Add a Comment..."
			>
			</textarea>
			<label class="floating-label" for="floatingInputValue">
				{{ reply_to.reply_to_commentor }}
			</label>

			<button @click="checkComment" id="submit-btn" type="button">
				<span class="icon-btn"
					><font-awesome-icon icon="fa-solid fa-arrow-alt-circle-down"
				/></span>
			</button>
		</form>
	</div>
</template>

<script>
	import $ from 'jquery';

	export default {
		name: 'CommentAdd',
		props: {
			reply_to: [],
		},
		data() {
			return {
				comment: '',
			};
		},
		methods: {
			checkComment() {
				if (this.comment == "")
				{
					return;
				}

				if (this.$store.state.header == "Header")
				{
					alert("Please login to comment!")
					return;
				}

				let data = {
					reply_to: this.reply_to.reply_to_id,
					comment: this.comment,
					accessToken: this.$store.state.accessToken,
					commented_on: this.$route.params.id,
				};
				this.$store.dispatch('submitComment', data);

				$("#submit-btn").prop("disabled", "true")
			},
		},
		watch: {
			comment: {
				handler() {
					if (this.comment != "")
					{
						$(".icon-btn").css("color", "var(--main-color)")
					}
					else {
						$(".icon-btn").css("color", "gray")
					}
				},
			},
		},
	};
</script>

<style scoped>
	.floating-label {
		color: var(--main-color);
	}

	.form-area {
		position: relative;
	}

	/* .comment-area {
		padding: 12px 50px 12px 11px;
		border-radius: 6px;
		font-size: 15px;
		width: 100%;
		overflow-wrap: break-word;
		column-count: auto;
		resize: none;
	} */

	#submit-btn {
		position: relative;
		left: 96%;
		/* top: 15%; */
		bottom: 50px;
		background-color: Transparent;
		background-repeat: no-repeat;
		border: none;
		font-size: 25px;
	}

	.icon-btn {
		color: gray;
	}
</style>
