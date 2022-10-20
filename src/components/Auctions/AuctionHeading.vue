<template>
	<div class="auction-heading">
		<div class="row">
			<div class="col-xxl-1 col-lg-2 col-12 pb-3 px-0">
				<span class="auction-heading-txt">{{ heading_text }}</span>
			</div>
			<div class="col-xxl-5 col-lg-7 col-12 pb-3 px-0">
				<div class="all-dd utf-portfolio-section">
					<div class="dropdown">
						<button
							class="btn danger dropdown-toggle dropdown-btn"
							type="button"
							id="dropdownMenuButton1"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							Years
						</button>
						<div class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
							<div class="year-options">
								<fieldset class="form-group">
									<select
										class="form-select"
										aria-label="Default select example"
										name="start-year"
										v-model="dropDownFilters.years.start"
										@click="yearFilter()"
									>
										<option
											v-for="year in startYears"
											:key="year"
											:value="year"
										>
											{{ year }}
										</option>
									</select>
								</fieldset>
								<span class="to">To</span>
								<fieldset class="form-group">
									<select
										class="form-select"
										aria-label="Default select example"
										name="end-year"
										v-model="dropDownFilters.years.end"
										@click="yearFilter()"
									>
										<option v-for="year in endYears" :key="year" :value="year">
											{{ year }}
										</option>
									</select>
								</fieldset>
							</div>
						</div>
					</div>
					<div class="dropdown">
						<button
							class="btn danger dropdown-toggle dropdown-btn"
							type="button"
							id="dropdownMenuButton2"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							{{ dropDownFilters.transmission }}
						</button>
						<ul
							role="group"
							aria-label="Filter Control"
							class="dropdown-menu list-inline filter-control"
							aria-labelledby="dropdownMenuButton1"
						>
							<li>
								<button
									@click="transmissionFilter('Transmission')"
									class="dropdown-item"
									type="button"
								>
									All
								</button>
							</li>
							<li>
								<button
									@click="transmissionFilter('Automatic')"
									class="dropdown-item"
									type="button"
								>
									Automatic
								</button>
							</li>
							<li>
								<button
									@click="transmissionFilter('Manual')"
									class="dropdown-item"
									type="button"
								>
									Manual
								</button>
							</li>
							<li>
								<button
									@click="transmissionFilter('Other')"
									class="dropdown-item"
									type="button"
								>
									Other
								</button>
							</li>
						</ul>
					</div>
					<div class="dropdown">
						<button
							class="btn danger dropdown-toggle dropdown-btn"
							type="button"
							id="dropdownMenuButton3"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							{{ dropDownFilters.body_type }}
						</button>
						<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton3">
							<li>
								<button
									@click="bodyStyleFilter('Body Type')"
									class="dropdown-item"
									type="button"
								>
									All
								</button>
							</li>
							<li>
								<button
									@click="bodyStyleFilter('Coupe')"
									class="dropdown-item"
									type="button"
								>
									Coupe
								</button>
							</li>
							<li>
								<button
									@click="bodyStyleFilter('Convertible')"
									class="dropdown-item"
									type="button"
								>
									Convertible
								</button>
							</li>
							<li>
								<button
									@click="bodyStyleFilter('Hatchback')"
									class="dropdown-item"
									type="button"
								>
									Hatchback
								</button>
							</li>
							<li>
								<button
									@click="bodyStyleFilter('Sedan')"
									class="dropdown-item"
									type="button"
								>
									Sedan
								</button>
							</li>
							<li>
								<button
									@click="bodyStyleFilter('SUV/Crossover')"
									class="dropdown-item"
									type="button"
								>
									SUV/Crossover
								</button>
							</li>
							<li>
								<button
									@click="bodyStyleFilter('Truck')"
									class="dropdown-item"
									type="button"
								>
									Truck
								</button>
							</li>
							<li>
								<button
									@click="bodyStyleFilter('Minivan/Van')"
									class="dropdown-item"
									type="button"
								>
									Minivan/Van
								</button>
							</li>
							<li>
								<button
									@click="bodyStyleFilter('Wagon')"
									class="dropdown-item"
									type="button"
								>
									Wagon
								</button>
							</li>
							<li>
								<button
									@click="bodyStyleFilter('Other')"
									class="dropdown-item"
									type="button"
								>
									Other
								</button>
							</li>
						</ul>
					</div>
					<div class="dropdown">
						<button
							class="btn danger dropdown-toggle dropdown-btn"
							type="button"
							id="dropdownMenuButton2"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							{{ dropDownFilters.plate_code }}
						</button>
						<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
							<li>
								<button
									@click="plateCodeFilter('Plate Code')"
									class="dropdown-item"
									type="button"
								>
									All
								</button>
							</li>
							<li>
								<button
									@click="plateCodeFilter('New')"
									class="dropdown-item"
									type="button"
								>
									New
								</button>
							</li>
							<li>
								<button
									@click="plateCodeFilter('Taxi')"
									class="dropdown-item"
									type="button"
								>
									Taxi
								</button>
							</li>
							<li>
								<button
									@click="plateCodeFilter('Private')"
									class="dropdown-item"
									type="button"
								>
									Private
								</button>
							</li>
							<li>
								<button
									@click="plateCodeFilter('Commercial (Business)')"
									class="dropdown-item"
									type="button"
								>
									Commercial (Business)
								</button>
							</li>
							<li>
								<button
									@click="plateCodeFilter('Government')"
									class="dropdown-item"
									type="button"
								>
									Government
								</button>
							</li>
							<li>
								<button
									@click="plateCodeFilter('NGO AO')"
									class="dropdown-item"
									type="button"
								>
									NGO AO
								</button>
							</li>
							<li>
								<button
									@click="plateCodeFilter('UN')"
									class="dropdown-item"
									type="button"
								>
									UN
								</button>
							</li>
							<li>
								<button
									@click="plateCodeFilter('AU')"
									class="dropdown-item"
									type="button"
								>
									AU
								</button>
							</li>
							<li>
								<button
									@click="plateCodeFilter('Diplomatic CD')"
									class="dropdown-item"
									type="button"
								>
									Diplomatic CD
								</button>
							</li>
							<li>
								<button
									@click="plateCodeFilter('Temporary')"
									class="dropdown-item"
									type="button"
								>
									Temporary
								</button>
							</li>
							<li>
								<button
									@click="plateCodeFilter('Other')"
									class="dropdown-item"
									type="button"
								>
									Other
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div
				v-if="heading_text == 'Auctions'"
				class="col-xxl-5 col-lg-8 col-12 pb-3 filter-sorts-col"
			>
				<div class="filter-sorts-wrapper">
					<ul class="filter-sorts">
						<li @click="toggle_filter1">
							<span :class="{ 'selected-filter': selectedFilter1 }"
								>Ending soon</span
							>
						</li>
						<li @click="toggle_filter2">
							<span :class="{ 'selected-filter': selectedFilter2 }"
								>Newly listed</span
							>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery';

	export default {
		name: 'AuctionHeading',
		props: {
			heading_text: String,
		},
		data() {
			return {
				selectedFilter1: true,
				selectedFilter2: false,

				dropDownFilters: {
					years: {
						start: '1900',
						end: '2024',
					},
					transmission: 'Transmission',
					body_type: 'Body Type',
					plate_code: 'Plate Code',
					selectedFilter: 1,
				},
			};
		},
		methods: {
			toggle_filter1() {
				if (!this.selectedFilter1) this.selectedFilter1 = true;
				this.selectedFilter2 = false;
				this.dropDownFilters.selectedFilter = 1;
				this.$emit('filterChanged', this.dropDownFilters);
			},
			toggle_filter2() {
				if (!this.selectedFilter2) this.selectedFilter2 = true;
				this.selectedFilter1 = false;
				this.dropDownFilters.selectedFilter = 2;
				this.$emit('filterChanged', this.dropDownFilters);
			},
			transmissionFilter(val) {
				this.dropDownFilters.transmission = val;
				this.$emit('filterChanged', this.dropDownFilters);
			},
			bodyStyleFilter(val) {
				this.dropDownFilters.body_type = val;
				this.$emit('filterChanged', this.dropDownFilters);
			},
			plateCodeFilter(val) {
				this.dropDownFilters.plate_code = val;
				this.$emit('filterChanged', this.dropDownFilters);
			},
			yearFilter() {
				this.dropDownFilters.years.start = parseInt(
					this.dropDownFilters.years.start
				);
				this.dropDownFilters.years.end = parseInt(
					this.dropDownFilters.years.end
				);
				this.$emit('filterChanged', this.dropDownFilters);
			},
		},
		computed: {
			startYears() {
				const year = new Date().getFullYear();
				return Array.from(
					{ length: year - 1897 },
					(value, index) => 1900 + index
				);
			},
			endYears() {
				const year = new Date().getFullYear();
				return Array.from(
					{ length: year - 1897 },
					(value, index) => parseInt(this.dropDownFilters.years.start) + index
				);
			},
		},
	};
</script>

<style scoped>
	.auction-heading-txt {
		font-size: 24px;
		font-weight: 700;
	}

	.auction-heading .dropdown-btn,
	li button {
		font-size: 14px;
		color: var(--dark-text-color);
		border-color: rgb(229, 229, 229);
	}

	.all-dd {
		display: inline;
		padding-left: 20px;
	}

	.dropdown {
		margin-right: 10px;
		display: inline;
	}

	.year-options {
		padding: 10px 20px;
	}

	select {
		font-size: 14px;
		display: inline;
	}

	.to {
		margin: 0 5px 0 5px;
		display: inline;
		font-size: 14px;
		color: rgb(185, 185, 185);
	}

	.filter-sorts-wrapper {
		color: var(--dark-text-color);
		display: flex;
		font-size: 14px;
		margin-top: 8px;
	}

	.filter-sorts li {
		display: inline;
		padding-right: 15px;
	}

	.filter-sorts li span {
		cursor: pointer;
		color: var(--dark-text-color);
		text-decoration: none;
	}

	.filter-sorts li span:hover {
		color: rgb(140, 140, 140);
	}

	.selected-filter {
		border-bottom: 2px solid black;
		padding-bottom: 5px;
	}

	@media only screen and (max-width: 1400px) {
		.all-dd {
			padding-left: 0px;
		}
	}

	@media only screen and (max-width: 992px) {
		.filter-sorts,
		.filter-sorts-col {
			padding-left: 0px;
		}
	}
</style>
