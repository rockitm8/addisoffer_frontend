<template>
	<div class="gallery">
		<div class="gallery-images">
			<div v-if="car_images_fetched">
				<div class="row mt-4">
					<div class="item col-8 mb-3 main-img-div">
						<a
							:href="car_main_image.image"
							class="fancybox"
							data-fancybox="gallery1"
						>
							<!-- <div
								style="background-image: url({{car_main_image.image}});"
							></div> -->
							<img :src="car_main_image.image" />
						</a>
					</div>
					<div class="col-4 mb-3 next-col">
						<div class="row small-imgs">
							<div
								class="item col-xxl-6 col-12 gallery-columns fancy-img"
								v-for="(pic, i) in car_display_image"
								:key="i"
								id=""
							>
								<a
									rel="group1"
									:href="pic.image"
									class="fancybox"
									data-fancybox="gallery1"
								>
									<img :src="pic.image" />
								</a>
							</div>
							<div
								class="dont-show"
								v-for="(pic, i) in car_rest_image"
								:key="i"
								id=""
							>
								<a
									rel="group1"
									:href="pic.image"
									class="fancybox"
									data-fancybox="gallery1"
								>
									<img :src="pic.image" />
								</a>
							</div>
							<div class="rest_images">
								<span id="rest_images-txt"
									>All Photos ({{ car_images.length }})</span
								>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-else><h1>FETCHING Images...</h1></div>
		</div>
	</div>
</template>

<script>
	import axiosInstance from '@/js/axiosInstance';
	import axios from 'axios';

	export default {
		name: 'Gallery',
		props: {
			car_data: {
				default: [],
			},
		},
		data() {
			return {
				car_images: [],
				car_main_image: [],
				car_display_image: [],
				car_rest_image: [],
				car_images_fetched: false,
			};
		},
		methods: {
			async fetchImages() {
				let car_id = this.car_data.id;
				await axios
					.get(`${this.$store.state.backend_url}/api/cars-images`, {
						params: { car_id: this.car_data.id },
					})
					.then((response) => {
						this.car_images = response.data;

						for (let i = 0; i < this.car_images.length; i++) {
							if (i == 0) this.car_main_image = this.car_images[i];
							else if (i > 0 && i <= 8)
								this.car_display_image.push(this.car_images[i]);
							else this.car_rest_image.push(this.car_images[i]);
						}
					})
					.catch((error) => {});
			},
		},
		mounted() {
			this.fetchImages();
		},
		updated() {
			// $('.gallery-columns:nth-child(odd)').css('display', 'none');
		},
		watch: {
			car_images: {
				handler() {
					if (this.car_images == []) {
						this.car_images_fetched = false;
					} else {
						this.car_images_fetched = true;
					}
				},
			},
		},
		components: {},
	};
</script>

<style scoped>
	.item {
		transition: 0.5s ease-in-out;
	}

	.item:hover {
		filter: brightness(80%);
	}

	.main-img-div {
		padding: 4px 13px 4px;
		width: 65%;
	}

	.main-img-div img {
		object-fit: cover;
		object-position: center;
	}

	.gallery-images {
		width: 100%;
	}

	.gallery-columns,
	.next-col {
		padding: 2px;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}
	.small-imgs {
		position: relative;
	}

	.rest_images {
		position: absolute;
		width: 150px;
		height: 100px;
		right: 8%;
		bottom: 0;
		z-index: 5;
		text-align: center;
	}

	.rest_images span {
		font-size: 20px;
		color: white;
		font-weight: 600;
	}

	.dont-show {
		display: none;
	}

	.gallery-columns:nth-child(8) {
		filter: brightness(50%);
	}

	@media only screen and (max-width: 1399px) {
		.gallery-columns:nth-child(odd) {
			display: none;
		}

		.main-img-div {
			padding: 4px 13px 4px;
			/* width: 60%; */
		}

		.small-imgs img {
			/* width: 80%; */
			max-height: 150px;
		}

		.rest_images {
			right: 30%;
		}
	}
</style>
