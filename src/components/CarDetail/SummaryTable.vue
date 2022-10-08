<template>
	<div class="summary-table">
		<div class="row">
			<span class="end-time">{{end_time}} </span>
		</div>
		<div class="row">
			<div class="table-display">
				<table class="col-lg-6 col-12 table-1">
					<tr>
						<th>Make</th>
						<td>{{ car_data.make }}</td>
					</tr>
					<tr>
						<th>Transmission</th>
						<td>{{ car_data.transmission }}</td>
					</tr>
					<tr>
						<th>Mileage</th>
						<td>{{ car_data.mileage }}</td>
					</tr>
					<tr>
						<th>Plate Code</th>
						<td>{{ car_data.plate_code }}</td>
					</tr>
					<tr>
						<th>Body Type</th>
						<td>{{ car_data.body_type }}</td>
					</tr>
					<tr>
						<th>Interior Color</th>
						<td>{{ car_data.interior_color }}</td>
					</tr>
					<tr>
						<th>Seller Name</th>
						<td>{{ car_data.seller_name }}</td>
					</tr>
				</table>
				<table class="col-lg-6 col-12 table-2">
					<tr>
						<th>Model</th>
						<td>{{ car_data.model }}</td>
					</tr>
					<tr>
						<th>Condition</th>
						<td>{{ car_data.condition }}</td>
					</tr>
					<tr>
						<th>Gas Type</th>
						<td>{{ car_data.gas_type }}</td>
					</tr>
					<tr>
						<th>Location</th>
						<td>{{ car_data.location }}</td>
					</tr>
					<tr>
						<th>Engine</th>
						<td>{{ car_data.engine }}</td>
					</tr>
					<tr>
						<th>Exterior Color</th>
						<td>{{ car_data.exterior_color }}</td>
					</tr>
					<tr>
						<th>Seller Type</th>
						<td>{{ car_data.seller_type }}</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	import moment from 'moment';

	export default {
		name: 'SummaryTable',
		props: {
			car_data: {
				default: [],
			},
		},
		data () {
			return {
				end_time: null
			}
		},
		methods: {
			setTime() {
				this.end_time = moment(this.car_data.time_left).format("dddd, MMMM Do YYYY, h:mm:ss a")
			}
		},
		mounted() {
			this.setTime()
		}
	};
</script>

<style scoped>
	.end-time {
		text-align: right;
		margin-top: 12px;
		margin-bottom: 10px;
		font-size: 16px;
		font-weight: 400;
		color: rgb(113, 111, 111);
	}

	table th {
		background-color: rgb(248, 248, 248);
	}

	table td {
		padding-left: 16px;
		font-size: 15px;
		line-height: 41px;
		border: 1px solid #ebebeb;
	}

	table th {
		padding-left: 16px;
		font-size: 15px;
		line-height: 41px;
		border: 1px solid #ebebeb;
	}

	.table-display {
		display: flex;
	}

	.table-display a {
		color: black;
	}

	.table-display a:hover {
		color: black;
	}

	table tr th {
		font-size: 15px;
		font-weight: 700;
		color: grey;
	}

	.table-1 th {
		padding-right: 40px;
	}

	.table-2 th {
		padding-right: -80px;
	}

	@media only screen and (max-width: 991px) {
		.table-display {
			flex-direction: column;
		}
	}
</style>
