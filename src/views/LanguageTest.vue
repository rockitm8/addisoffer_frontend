<template>
	<div class="locale-changer">
		<button @click.prevent="setLocale('en')">en</button>
		<button @click.prevent="setLocale('am')">am</button>
		<p>{{ $t("message") }}</p>
	</div>
</template>

<script>
	export default {
		name: "LiveAuctions",
		components: {},
		data: function () {
			return {
				langs: ["en", "am"],
			};
		},
		methods: {
			setLocale(locale) {
				this.$i18n.locale = locale;
				console.log(this.$i18n.locale);
				this.$router.push({
					params: { lang: locale },
				});
			},
		},
	};
</script>
