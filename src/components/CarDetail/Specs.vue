<template>
	<div class="specs">
		<div class="simple-text">
			<h1 class="mt-5">Highlights and Modifications</h1>
			<p>
				{{ car_data.highlight_modification }}
			</p>
			<div class="line"><Line /></div>
			<h1>Known Flaws</h1>
			<p>{{ car_data.known_flaws }}</p>
			<div class="line"><Line /></div>
			<h1>Other Items included in the sale and Sellers Note</h1>
			<p>{{ car_data.other_info }}</p>
		</div>
		<div class="line"><Line /></div>
	</div>
</template>

<script>
	import Line from '../Line.vue';
	export default {
		name: 'Specs',
		props: {
			car_data: {
				default: [],
			},
		},
		components: { Line },
	};
</script>

<style scoped>
	.simple-text h1 {
		font-size: 22px;
		font-weight: 700;
	}

	.line {
		margin: 40px 0px;
	}
</style>
