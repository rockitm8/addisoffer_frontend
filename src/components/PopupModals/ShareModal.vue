<template>
	<div class="share-modal">
		<div id="share-modal" class="modal_box">
			<div class="modal_content">
				<span @click="closeShareModal" class="closebtn">&times;</span>
				<header class="mt-3">
					<h5>Share this car</h5>
				</header>
				<div class="d-grid gap-2 all-links">
					<a id="facebookBtn" href="" class="btn btn-primary">Facebook</a>
					<!-- <a id="instagramBtn" href="" class="btn btn-dark">Instagram</a> -->
					<a id="telegramBtn" href="" class="btn btn-info">Telegram</a>
					<a id="emailBtn" href="" class="btn btn-danger">Email</a>
					<a id="whatsappBtn" href="" class="btn btn-success">Whatsapp</a>
					<button
						@click="copyLink"
						id="copyBtn"
						type="button"
						class="btn btn-outline-secondary"
					>
						Copy Link
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery';

	export default {
		name: 'ShareModal',
		props: {
			showModal: Boolean,
		},
		methods: {
			openShareModal() {
				const modal = document.getElementById('share-modal');
				modal.style.display = 'block';
				const body = document.body;
				body.setAttribute('style', 'overflow: hidden');
			},

			closeShareModal() {
				this.$emit('close');
				const modal = document.getElementById('share-modal');
				const body = document.body;
				body.setAttribute('style', 'overflow: auto');
				const copyBtn = $('#copyBtn');
				copyBtn.html('Copy Link');
				modal.style.display = 'none';
			},

			copyLink() {
				let postUrl = encodeURI(document.location.href);
				const copyBtn = $('#copyBtn');
				copyBtn.html('Copied!');
				navigator.clipboard.writeText(postUrl);
			},
		},
		mounted() {
			const facebookBtn = $('#facebookBtn');
			const instagramBtn = $('#instagramBtn');
			const telegramBtn = $('#telegramBtn');
			const emailBtn = $('#emailBtn');
			const whatsappBtn = $('#whatsappBtn');

			let postUrl = encodeURI(document.location.href);
			let postTitle = encodeURI('Addis Offer Car');
			let postDesc = encodeURI('Hi everyone, check this car out: ');
			facebookBtn.attr(
				'href',
				`https://www.facebook.com/sharer.php?u=${postUrl}`
			);

			telegramBtn.attr(
				'href',
				`https://telegram.me/share/url?url=${postUrl}&text=${postDesc}`
			);

			emailBtn.attr(
				'href',
				`mailto:?subject=${postTitle}&amp;body=${postDesc} ${postUrl}`
			);

			whatsappBtn.attr('href', `https://wa.me/?text=${postDesc} ${postUrl}`);
		},
		watch: {
			showModal: {
				handler() {
					if (this.showModal == true) {
						this.openShareModal();
					}
				},
			},
		},
	};
</script>

<style scoped>
	.modal_box {
		font-family: 'segoe ui';
		position: fixed;
		z-index: 100;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: rgba(0, 0, 0, 0.5);
		display: none;
	}

	.modal_content {
		background-color: #f4f4f4;
		margin: 200px auto;
		padding: 10px 25px 40px 25px;
		width: 400px;
		box-shadow: 0 8px 40px rgb(0 0 0 / 16%);
		border-radius: 6px;
	}
	/* header css */
	header {
		text-align: center;
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

	header button {
		border: 1px solid black !important;
	}

	/*  */

	.all-links,
	header h5 {
		margin-top: 30px;
	}

	@media only screen and (max-width: 575px) {
		.modal_content {
			height: 100%;
			width: 100%;
			border-radius: 0px;
			margin-top: 80px;
		}
	}
</style>
