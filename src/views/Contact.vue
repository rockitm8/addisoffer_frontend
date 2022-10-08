<template>
	<div class="contact">
		<ContactMain />
		<div class="rating-area">
			<Rating />
		</div>
	</div>
</template>

<script>
	import ContactMain from "@/components/Contact/ContactMain.vue";
	import Rating from "@/components/Rating.vue";
	export default {
		name: "Contact",
		mounted() {
			window.scrollTo(0, 0);
			const body = document.body;
			body.setAttribute('style', 'overflow: auto');
		},
		components: { ContactMain, Rating },
	};
</script>
