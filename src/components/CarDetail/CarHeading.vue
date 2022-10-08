<template>
	<div class="car-heading">
		<span class="heading-txt">
			{{ car_data.year }} {{ car_data.make }} {{ car_data.model }}
		</span>
		<div class="d-md-flex justify-content-between flex-wrap">
			<h2>
				{{ car_data.condition }}, {{ car_data.transmission }},
				{{ car_data.mileage }}
			</h2>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'CarHeading',
		props: {
			car_data: {
				default: [],
			},
		},
	};
</script>

<style scoped>
	.car-heading {
		padding-bottom: 20px;
	}

	.heading-txt {
		color: var(--dark-text-color);
		font-size: 22px;
		font-weight: 700;
	}
</style>
