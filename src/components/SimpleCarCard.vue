<template>
	<div class="simple">
		<img class="car-pic" :src="main_image" /> <br />
		<span class="car-name"
			>{{ car_data.year }} {{ car_data.make }} {{ car_data.model }}</span
		>
	</div>
</template>

<script>
	import axiosInstance from '@/js/axiosInstance';
	
	export default {
		name: 'SimpleCarCard',
		props: {
			car_data: [],
		},
		data() {
			return {
				main_image: null
			}
		},
		methods: {
			async fetchCarImage() {
				await axiosInstance
					.get(`${this.$store.state.backend_url}/api/main-image/`, {
						params: { car_id: this.car_data.id },
					})
					.then((response) => {
						this.main_image = response.data;
					})
					.catch((err) => console.log(err.message));
			},
		},
		mounted() {
			this.fetchCarImage();
		}
	};
</script>

<style scoped>
	.car-pic {
		width: 166px;
	}

	.car-name {
		font-weight: 500;
	}
</style>
