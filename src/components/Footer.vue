<template>
	<div class="footer">
		<div class="bg">
			<div class="container-lg container-fluid">
				<div class="row footer-row">
					<div class="col-md-3 col-12 logo-c px-lg-2">
						<router-link class="logo-link" :to="`/${$i18n.locale}`">
							<img class="logo-footer" src="../assets/logo-title.png" />
						</router-link>
					</div>
					<div class="col-md-2 col-sm-4 col-12 py-4 px-md-0 px-3 items-c">
						<div>
							<div>
								<h6 class="h-footer">HOW IT WORKS</h6>
							</div>
							<div>
								<div>
									<a :href="`/${$i18n.locale}/about#buying`" class="a-footer"
										>Buying a Car</a
									>
								</div>
								<div>
									<a :href="`/${$i18n.locale}/about#selling`" class="a-footer"
										>Selling a Car</a
									>
								</div>
								<div>
									<a :href="`/${$i18n.locale}/about#sale`" class="a-footer"
										>Finalizing the Sale</a
									>
								</div>
								<div>
									<a :href="`/${$i18n.locale}/about#buyerfaq`" class="a-footer"
										>FAQs
									</a>
								</div>
							</div>
						</div>
					</div>
					<div
						class="col-md-2 col-sm-4 col-12 py-4 px-sm-0 px-3 items-c sell-div"
					>
						<h6 class="h-footer">SELLERS</h6>
						<router-link
							class="nav-link link"
							:to="`/${$i18n.locale}/sell-car`"
						>
							Submit Your Car
						</router-link>
					</div>
					<div class="col-md-2 col-sm-3 col-12 py-4 px-sm-0 px-3 items-c">
						<h6 class="h-footer">HELPFUL LINKS</h6>
						<div class="">
							<router-link
								class="nav-link links"
								:to="`/${$i18n.locale}/contact`"
							>
								Contact Us
							</router-link>
						</div>
					</div>
					<div class="col-md-3 col-12 py-4 hole-div">
						<div class="social-icons">
							<a
								href=" https://www.facebook.com/Addis0ffer/"
								class="social-links"
								><font-awesome-icon
									:icon="{ prefix: 'fab', iconName: 'facebook' }"
							/></a>
							<a
								href="https://www.instagram.com/addisoffer/"
								class="social-links"
								><font-awesome-icon icon="fa-brands fa-instagram"
							/></a>
							<a href="https://T.me/addis_offer" class="social-links"
								><font-awesome-icon icon="fa-brands fa-telegram"
							/></a>
							<a
								href="https://www.youtube.com/channel/UCAfpDnsjOaPv5lgyUOXrXEg"
								class="social-links"
								><font-awesome-icon icon="fa-brands fa-youtube"
							/></a>
							<a href="mailto:contact@addisoffer.com" class="social-links"
								><font-awesome-icon class="fa-icon" icon="fa-solid fa-envelope"
							/></a>
						</div>
						<p class="last-div my-1">© Copyright 2023 Subel Partners</p>
						<a
							class="link-footer last-div px-1"
							href="../assets/documents/TermsofUse.pdf"
							download
							>Terms of Use</a
						>
						<a
							class="link-footer last-div"
							href="../assets/documents/PrivacyPolicy.pdf"
							download
							>Privacy Policy</a
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Footer',
		components: {},
	};
</script>

<style scoped>
	.bg {
		padding: 0px !important;
	}

	.footer-row {
		padding-top: 20px;
	}

	.logo-footer {
		width: 250px;
		margin-top: 10px;
	}

	.items-c {
		padding-left: 0px;
	}

	.h-footer {
		font-size: 12px;
		font-weight: 400;
		color: #828282;
		line-height: 18px;
	}
	.a-footer {
		line-height: 30px;
		font-size: 15px;
		font-weight: 400;
		color: black;
		text-decoration: none;
	}

	.a-footer:hover {
		color: black;
		text-decoration: underline;
	}

	.last-div {
		font-size: 12px;
	}
	.link-footer {
		text-decoration: none;
		color: black;
	}
	.link-footer:hover {
		color: black;
		text-decoration: underline;
	}
	.hole-div {
		padding-right: 0px;
	}

	.social-links {
		color: black;
		font-size: 20px;
		margin-right: 15px;
	}

	@media only screen and (max-width: 1399px) {
		.logo-footer {
			width: 200px;
		}
	}

	@media only screen and (max-width: 992px) {
		.last-div {
			font-size: 11px;
		}
		.a-footer {
			font-size: 13px;
		}

		.logo-footer {
			width: 160px;
		}
	}

	@media only screen and (max-width: 768px) {
		.logo-footer {
			width: 300px;
		}
		.logo-c {
			padding-bottom: 8px;
			text-align: center;
		}
		.items-c {
			padding-left: 0px;
			padding-right: 0px;
		}
		.a-footer {
			font-size: 15px;
		}
		.hole-div {
			text-align: left;
		}
		.last-div {
			font-size: 12px;
		}
	}

	@media only screen and (max-width: 576px) {
		.items-c {
			padding-right: 70px;
			font-size: 14px;
		}
		.last-div {
			font-size: 10px;
			padding-left: 0px;
		}
		.logo-c {
			text-align: center;
		}
	}
</style>
