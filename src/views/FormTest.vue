<template>
	<form>
		<input v-model="data" type="text" />
		<button type="button" @click="checkForm">submit</button>
	</form>
</template>

<script>
	export default {
		name: "FormTest",
		data() {
			return {
				data: "",
			};
		},
		methods: {
			checkForm() {
				const requiredRule = new RegExp(/^[a-z]+$/);

				if (this.$store.state.rules.passwordRule.test(this.data)) {
					console.log("True");
				} else {
					console.log("False");
				}
			},
		},
	};
</script>

<style scoped></style>
