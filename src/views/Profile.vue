<template>
	<div class="profile">
		<ProfileMain />
		<div class="rating-area">
			<Rating />
		</div>
	</div>
</template>

<script>
	import Rating from "@/components/Rating.vue";
	import ProfileMain from "@/components/Profile/ProfileMain.vue";
	export default {
		name: "Profile",
		mounted() {
			window.scrollTo(0, 0);
			const body = document.body;
			body.setAttribute('style', 'overflow: auto');
		},
		components: { Rating, ProfileMain },
	};
</script>

<style scoped></style>
