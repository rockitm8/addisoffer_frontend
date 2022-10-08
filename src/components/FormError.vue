<template>
	<div class="form-error">
		<span class="error-txt">{{ formError }}</span>
	</div>
</template>

<script>
	import $ from 'jquery';

	export default {
		name: 'FormError',
		props: {
			formError: String,
			error: Boolean,
		},
		mounted() {
			if (this.error) {
				$('.error-txt').css('color', 'red');
			} else {
				$('.error-txt').css('color', 'green');
			}
		},
	};
</script>

<style scoped>
	.error-txt {
		color: red;
	}
</style>
