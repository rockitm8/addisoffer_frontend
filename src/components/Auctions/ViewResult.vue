<template>
	<div class="view-result">
		<div class="result-btn-section">
			<router-link class="" :to="`/${$i18n.locale}/past-results`">
				<button type="button" class="btn result-btn">
					View auction results
				</button>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ViewResult',
	};
</script>

<style scoped>
	.result-btn-section {
		margin: 40px 0px;
		text-align: center;
	}

	.result-btn {
		font-size: 16px;
		font-weight: 500;
		padding: 10px 40px;
		background-color: var(--main-color);
		border-color: var(--main-color);
		border-radius: 5px;
	}

	.result-btn:hover {
		background-color: #dd8519;
		color: #212529;
	}
</style>
