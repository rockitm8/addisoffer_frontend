<template>
	<div class="car-card">
		<div @mouseleave="card_focus_lost" @mouseover="card_focus" class="card">
			<router-link class="card-img-top" :to="`/${$i18n.locale}/car-detail`">
				<img src="../assets/car-card.png" class="img img-fluid" alt="Car" />
				<div class="bid-bar">
					<ul class="bid-stats">
						<li class="time-left">
							<span class="time-icon">
								<font-awesome-icon icon="fa-solid fa-clock" />
							</span>
							<span class="time-value">10:00:00</span>
						</li>
						<li class="high-bid">
							<span class="bid-icon">Bid</span>
							<span class="bid-value">ETB 30,000</span>
						</li>
					</ul>
				</div>
			</router-link>

			<div class="card-body">
				<p class="card-text">
					<a class="card-name" href="#">1991 Nissan 300ZX</a>
					<br />
					<span class="card-info"
						>~5-Speed Manual, Cardinal Red Interior, Some Modifications</span
					>
					<br />
					<span class="card-loc">Torrance, CA 90503</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from "jquery";
	export default {
		name: "CarCardTest",
		components: {},
		props: {
			car_data: {
				default: [],
			},
		},
		methods: {
			card_focus() {
				// $(".card-img-top").css("filter", "brightness(90%)");
			},

			card_focus_lost() {
				// $(".card-img-top").css("filter", "brightness(100%)");
			},
		},
	};
</script>

<style scoped>
	.card {
		border: none;
	}

	.card-img-top {
		position: relative;
		cursor: pointer;
	}

	.card-body {
		padding-left: 0;
	}

	.card-name {
		color: #262626;
		font-size: 16px;
		font-weight: 700;
		text-decoration: none;
	}

	.card-name:hover {
		text-decoration: underline;
	}

	.card-info {
		color: #262626;
		font-size: 14px;
		font-weight: 400;
	}

	.card-loc {
		color: #828282;
		font-size: 14px;
		font-weight: 400;
	}

	.bid-bar {
		position: absolute;
		top: 75%;
		left: 2%;
	}

	.bid-stats {
		background-color: rgb(38, 38, 38);
		border-radius: 5px;
		padding: 1px 8px 4px 8px;
	}

	.bid-stats li {
		display: inline;
	}

	.time-left {
		padding-right: 20px;
	}

	.time-icon,
	.bid-icon {
		color: gray;
		font-size: 11px;
		padding-right: 4px;
	}

	.bid-icon {
		font-weight: 600;
	}

	.time-value,
	.bid-value {
		color: white;
		font-size: 11px;
		font-weight: 500;
	}

	@media only screen and (max-width: 1400px) {
		.bid-bar {
			top: 70%;
		}

		.time-icon,
		.bid-icon {
			font-size: 9px;
		}

		.time-value,
		.bid-value {
			font-size: 9px;
		}
	}

	@media only screen and (max-width: 1200px) {
		.time-icon,
		.bid-icon {
			font-size: 12px;
		}

		.time-value,
		.bid-value {
			font-size: 12px;
		}
	}

	@media only screen and (max-width: 992px) {
		.time-icon,
		.bid-icon {
			font-size: 13px;
		}

		.time-value,
		.bid-value {
			font-size: 14px;
		}
	}

	@media only screen and (max-width: 768px) {
		.bid-bar {
			top: 90%;
			left: 2%;
		}

		.time-icon,
		.bid-icon {
			font-size: 15px;
		}

		.time-value,
		.bid-value {
			font-size: 17px;
		}
	}
</style>
