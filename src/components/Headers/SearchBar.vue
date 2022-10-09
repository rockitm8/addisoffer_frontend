<template>
	<div class="search-bar">
		<input
			type="text"
			class="form-control srch-bar me-4"
			:id="searchId"
			name="search"
			placeholder="&#xF002;   Search for Cars (ex.BMW,Audi,Ford)"
			aria-label="Search"
			style="font-family: Arial, FontAwesome"
			@keyup="filterSearch"
		/>
	</div>
</template>

<script>
	export default {
		name: 'SearchBar',
		props: {
			searchId: String,
		},
		data() {
			return {
				filterarray: [],
			};
		},
		methods: {
			filterSearch() {
				this.$store.state.search_text = document.getElementById(
					this.searchId
				).value;
			},
		},
		mounted() {},
	};
</script>

<style scoped>
	.srch-bar {
		background: #eeeef0;
		border: 0px;
		font-size: 15px;
		border-radius: 6px;
		color: #828282;
		width: 450px;
		height: 46px;
		padding-left: 20px;
	}

	input[name='search']::placeholder::before {
		/* background: url(../../assets/search-icon.png); */
	}

	input[name='search']::placeholder {
		text-align: left;
	}

	@media only screen and (max-width: 1399px) {
		.srch-bar {
			width: 349px;
		}
	}

	@media only screen and (max-width: 1199px) {
		.srch-bar {
			width: 168px;
		}
	}

	@media only screen and (max-width: 991px) {
		.srch-bar {
			width: 350px;
		}
	}

	@media only screen and (max-width: 776px) {
		.srch-bar {
			width: 350px;
		}
	}

	@media only screen and (max-width: 715px) {
		.srch-bar {
			width: 168px;
		}
	}
</style>
