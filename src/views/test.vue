<template>
	<div>
		<!-- <label for="username">Type something</label>
		<input id="username" type="text" />
		<button id="button">Click me</button>
		<p id="log"></p> -->

		
	</div>
</template>

<script>
	import moment from 'moment';
	export default {
		mounted() {
			// const notificationSocket = new WebSocket(
			// 	'ws://' + window.location.host + '/ws/notification'
			// );

			// notificationSocket.onmessage = (e) => {
			// 	const data = JSON.parse(e.data);
			// 	console.log(data.message);
			// 	document.querySelector('#log').innerHTML += data.message + '<br />';
			// };

			// notificationSocket.onclose = (e) => {
			// 	console.error('Chat socket closed unexpectedly!');
			// };

			// document.querySelector('#button').onclick = (e) => {
			// 	const username = document.querySelector('#username');
			// 	const message = username.value + ' clicked the button!';

			// 	notificationSocket.send(
			// 		JSON.stringify({
			// 			message: message,
			// 		})
			// 	);
			// };
		},
	};
</script>

<style scoped></style>
