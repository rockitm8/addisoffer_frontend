<template>
	<div class="side-nav">
		<nav>
			<ul>
				<li class="about_us_dec"><a href="#aboutus">About Us</a></li>
				<li class="headers">HOW IT WORKS</li>
				<li><a href="#buying">Buying a Car</a></li>
				<li><a href="#selling">Selling a Car</a></li>
				<li><a href="#sale">Finalizing the sale</a></li>
			</ul>
			<ul>
				<li class="headers">FAQ</li>
				<li><a href="#buyerfaq">Buyer FAQ</a></li>
				<li><a href="#sellerfaq">Seller FAQ</a></li>
				<li><a href="#signinfaq">Sign in FAQ</a></li>
			</ul>
		</nav>
	</div>
</template>

<script>
	export default {
		name: "SideNav",
	};
</script>

<style scoped>
	nav {
		position: fixed;
	}

	nav ul {
		list-style: none;
		text-align: left;
		padding-top: 10px;
		align-items: left;
	}

	nav a {
		text-decoration: none;
		color: #363535;
	}

	nav li {
		opacity: 0.6;
		padding-top: 10px;
		text-decoration: none;
		font-weight: 600;
		font-size: 14px;
		line-height: 24px;
	}

	a:hover {
		color: rgb(0, 0, 0);
	}
	@media only screen and (max-width: 1200px) {
		nav {
			display: none;
		}
	}

	.about_us_dec {
		padding-bottom: 30px;
	}

	.headers {
		font-size: 12px;
		font-weight: 900px;
		line-height: 1.5;
		text-transform: uppercase;
		color: #bdbdbd;
	}
</style>
