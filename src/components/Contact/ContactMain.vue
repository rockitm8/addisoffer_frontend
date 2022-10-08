<template>
	<div class="contact-main">
		<h1 class="contact-mail">Contact Us</h1>
		<div class="row">
			<div class="col-12 mx-auto">
				<span class="contact-h">Email: </span
				><span class="contact-p"
					><a href="mailto:contact@addisoffer.com"
						>Contact@addisoffer.com</a
					></span
				>
				<br />
				<span class="contact-h">Phone: </span
				><span class="contact-p">+251910932337</span>
			</div>
		</div>

		<div class="mail">
			<h1 class="contact-mail">Mailing Address</h1>
		</div>
		<div class="row">
			<div class="col-lg-4 col-md-3 col-4">
				<p class="mail-p">Gerji Mebrat Hail, Addis Ababa Ethiopia</p>
			</div>
			<div class="col-3">
				<img class="map-img" src="../../assets/map.png" />
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ContactMain',
	};
</script>

<style scoped>
	/* ContactUs and mail header */

	.contact-mail {
		padding-top: 40px;
		font-size: 36px;
		font-weight: 700;
		margin-bottom: 28px;
		text-align: left;
		line-height: 26px;
	}

	/* Contact us row */

	.contact-h {
		font-size: 17px;
		font-weight: 700;
		line-height: 27px;
		text-align: left;
	}

	.contact-p {
		font-size: 17px;
		font-weight: 400;
		line-height: 27px;
		text-align: left;
	}

	.contact-link {
		text-decoration: none;
		color: #facb92;
	}

	/* hover */

	.contact-link:hover {
		text-decoration: underline;
		color: #ca9555;
	}

	/* mail paragraph and map picture */

	.mail-p {
		font-size: 16px;
		font-weight: 400;
		line-height: 26px;
		width: 185.26px;
		margin-bottom: 26px;
	}

	.map-img {
		margin-left: 30px;
		width: 400px;
	}

	/* media max */

	@media only screen and (max-width: 768px) {
		.map-img {
			margin-left: 10px;
		}
	}

	/* media min for containers */

	@media only screen and (min-width: 993px) {
		.container-lg {
			width: 740px;
		}
	}

	@media only screen and (min-width: 769px) {
		.container-fluid {
			padding-left: 40px;
			padding-right: 40px;
		}
	}

	@media only screen and (max-width: 650px) {
		.map-img {
			margin-left: 30px;
			width: 250px;
		}
	}
</style>
