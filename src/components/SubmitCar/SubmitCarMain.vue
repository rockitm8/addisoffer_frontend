<template>
	<div class="submit-car-main">
		<div class="content-box">
			<h1 id="top">Tell us about your car</h1>
			<p>
				Please give us some basics about yourself and the car you’d like to
				sell. We’ll also need details about the car’s status as well as photos
				that highlight the car’s exterior and interior condition.
				<br /><br />
				We’ll respond to your application within a business day. Once accepted,
				we’ll work with you to build a custom and professional listing and get
				the auction live.
			</p>
			<h3 class="app">Application</h3>

			<FormError :formError="formError" :error="errorTxt" />
			<form>
				<!-- sec1 -->
				<div class="box">
					<div class="content">
						<h2 class="">Your Info</h2>

						<span class="d-flex mb-2">Dealer or private party?</span>
						<div class="grid-container">
							<input
								v-model="car.seller_type"
								class="btn-check"
								type="radio"
								name="sellerType"
								id="dealer"
								@click="checkSellerType"
								value="dealer"
							/>
							<label for="dealer" class="label1 dealer-type btn-outline-dark">
								Dealer
							</label>

							<input
								v-model="car.seller_type"
								class="btn-check"
								type="radio"
								name="sellerType"
								id="private"
								@click="checkSellerType"
								value="private"
							/>
							<label for="private" class="label2 dealer-type btn-outline-dark">
								Private party
							</label>

							<input
								v-model="car.seller_type"
								class="btn-check"
								type="radio"
								name="sellerType"
								id="broker"
								@click="checkSellerType"
								value="broker"
							/>
							<label for="broker" class="label3 dealer-type btn-outline-dark">
								Broker
							</label>
						</div>

						<div class="grid-container2">
							<div>
								<p>Name</p>
								<input
									v-model="car.seller_name"
									class="txt-input"
									type="text"
									name=""
								/>
							</div>
							<div>
								<p>Phone Number:</p>
								<input
									v-model="car.phone_number"
									class="txt-input"
									type="text"
									name=""
								/>
							</div>
						</div>
					</div>
				</div>
				<!-- sec 2 -->
				<div class="box">
					<div class="content2">
						<h2>Car Details</h2>

						<div class="grid-container2">
							<div>
								<p>VIN</p>
								<input
									v-model="car.vin_number"
									class="txt-input"
									type="text"
									name=""
								/>
							</div>
							<div>
								<p>Year</p>
								<select
									v-model="car.year"
									class="txt-input d-down"
									aria-label="Default select example"
									name="start-year"
								>
									<option value="1980" selected="">1980</option>
									<option value="1981">1981</option>
									<option value="1982">1982</option>
									<option value="1983">1983</option>
									<option value="1984">1984</option>
									<option value="1985">1985</option>
									<option value="1986">1986</option>
									<option value="1987">1987</option>
									<option value="1988">1988</option>
									<option value="1989">1989</option>
									<option value="1990">1990</option>
									<option value="1991">1991</option>
									<option value="1992">1992</option>
									<option value="1993">1993</option>
									<option value="1994">1994</option>
									<option value="1995">1995</option>
									<option value="1996">1996</option>
									<option value="1997">1997</option>
									<option value="1998">1998</option>
									<option value="1999">1999</option>
									<option value="2000">2000</option>
									<option value="2001">2001</option>
									<option value="2002">2002</option>
									<option value="2003">2003</option>
									<option value="2004">2004</option>
									<option value="2005">2005</option>
									<option value="2006">2006</option>
									<option value="2007">2007</option>
									<option value="2008">2008</option>
									<option value="2009">2009</option>
									<option value="2010">2010</option>
									<option value="2011">2011</option>
									<option value="2012">2012</option>
									<option value="2013">2013</option>
									<option value="2014">2014</option>
									<option value="2015">2015</option>
									<option value="2016">2016</option>
									<option value="2017">2017</option>
									<option value="2018">2018</option>
									<option value="2019">2019</option>
									<option value="2020">2020</option>
									<option value="2021">2021</option>
									<option value="2022">2022</option>
									<option value="2023">2023</option>
									<option value="2024">2024</option>
								</select>
							</div>
						</div>
						<div class="grid-container2">
							<div>
								<p>Make</p>
								<input
									v-model="car.make"
									class="txt-input"
									type="text"
									name=""
								/>
							</div>
							<div>
								<p>Model</p>
								<input
									v-model="car.model"
									class="txt-input"
									type="text"
									name=""
								/>
							</div>
						</div>
						<div class="grid-container2">
							<div>
								<p>Body Type</p>
								<select
									v-model="car.body_type"
									class="txt-input d-down"
									aria-label="Default select example"
									name="start-year"
								>
									<option value="Coupe">Coupe</option>
									<option value="Hatchback">Hatchback</option>
									<option value="Sedan">Sedan</option>
									<option value="SUV/Crossover">SUV/Crossover</option>
									<option value="Truck">Truck</option>
									<option value="Minivan/Van">Minivan/Van</option>
									<option value="Wagon">Wagon</option>
									<option value="Other">Other</option>
								</select>
							</div>
							<div>
								<p>Engine</p>
								<input
									v-model="car.engine"
									class="txt-input"
									type="text"
									name=""
								/>
							</div>
						</div>
						<div class="grid-container2">
							<div>
								<p>Interior color</p>
								<input
									v-model="car.interior_color"
									class="txt-input"
									type="text"
									name=""
								/>
							</div>
							<div>
								<p>Exterior color</p>
								<input
									v-model="car.exterior_color"
									class="txt-input"
									type="text"
									name=""
								/>
							</div>
						</div>

						<div class="grid-container2">
							<div>
								<p>Transmission</p>
								<select
									v-model="car.transmission"
									class="txt-input d-down"
									aria-label="Default select example"
									name="start-year"
								>
									<option value="Manual">Manual</option>
									<option value="Automatic">Automatic</option>
									<option value="Other">Other</option>
								</select>
							</div>
							<div>
								<p>Condition</p>
								<select
									v-model="car.condition"
									class="txt-input d-down"
									aria-label="Default select example"
									name="start-year"
								>
									<option value="Brand New">Brand New</option>
									<option value="Used Like New">
										Used Like New (&lt; 20000Kms)
									</option>
									<option value="Used Good">Used Good 20,001-100,000KMs</option>
									<option value="Used">Used ( > 100,001KMs)</option>
									<option value="Needs repair">Needs repair</option>
									<option value="Totaled">Totaled</option>
								</select>
							</div>
						</div>
						<div class="grid-container2">
							<div>
								<p>Mileage (in miles)</p>
								<input
									v-model="car.mileage"
									class="txt-input"
									type="text"
									name=""
								/>
							</div>
							<div>
								<p>Gas Type</p>
								<select
									v-model="car.gas_type"
									class="txt-input d-down"
									aria-label="Default select example"
									name="start-year"
								>
									<option value="Regular (Benzine)">Regular (Benzine)</option>
									<option value="Diesel">Diesel</option>
									<option value="Electric">Electric</option>
									<option value="Hybrid">Hybrid</option>
									<option value="Other">Other</option>
								</select>
							</div>
						</div>
						<div class="grid-container2">
							<div>
								<p>Plate Code</p>
								<select
									v-model="car.plate_code"
									class="txt-input d-down"
									aria-label="Default select example"
									name="start-year"
								>
									<option value="All">All</option>
									<option value="Taxi">Taxi</option>
									<option value="Private">Private</option>
									<option value="Commercial (Business)">
										Commercial (Business)
									</option>
									<option value="Government">Government</option>
									<option value="NGO AO">NGO AO</option>
									<option value="UN">UN</option>
									<option value="AU">AU</option>
									<option value="Diplomatic CD">Diplomatic CD</option>
									<option value="Temporary">Temporary</option>
									<option value="Other">Other</option>
								</select>
							</div>
							<div>
								<p>Location</p>
								<input
									v-model="car.location"
									class="txt-input"
									type="text"
									name=""
								/>
							</div>
						</div>
						<div>
							<label class="mb-3" for="Highlights-and-Modifications"
								>Highlights and Modifications:</label
							>
							<textarea
								v-model="car.highlight_modification"
								class="form-control"
								name="Highlights-and-Modifications"
								autocomplete="off"
								autocapitalize="on"
								autocorrect="on"
								spellcheck="true"
								id="id-Highlights-and-Modifications:"
							></textarea>
						</div>

						<div>
							<label class="mb-3 mt-5" for="Known-Flaws">Known Flaws:</label>
							<textarea
								v-model="car.known_flaws"
								class="form-control"
								name="Known-Flaws::"
								autocomplete="off"
								autocapitalize="on"
								autocorrect="on"
								spellcheck="true"
								id="Known-Flaws"
							></textarea>
						</div>
						<div>
							<label class="mb-3 mt-5" for="Known-Flaws:"
								>Other Items included in the sale and Sellers Note</label
							>
							<textarea
								v-model="car.other_info"
								class="form-control"
								name="Highlights and Modifications:"
								autocomplete="off"
								autocapitalize="on"
								autocorrect="on"
								spellcheck="true"
								id="id-Highlights and Modifications:"
							></textarea>
						</div>
					</div>
				</div>
				<div class="box">
					<div class="content3">
						<h2>AUCTION INFO</h2>

						<div class="grid-container2">
							<p>Do you want to add a reserve bid?</p>
							<br />
							<input
								class="btn-check"
								type="radio"
								name="reserveBid"
								id="reserveYes"
								@click="checkReserve"
								value="yes"
							/>
							<label for="reserveYes" class="label1 btn-outline-dark">
								Yes
							</label>

							<input
								class="btn-check"
								type="radio"
								name="reserveBid"
								id="reserveNo"
								@click="checkReserve"
								value="no"
								checked
							/>
							<label for="reserveNo" class="label2 btn-outline-dark">No</label>
							<p class="show-reserve">Reserve Bid</p>

							<input
								v-model="car.reserve_bid"
								class="txt-input show-reserve"
								type="text"
								name=""
							/>
							<p>Bidding days</p>
							<input
								v-model="car.bid_days"
								class="txt-input"
								type="text"
								name=""
							/>
						</div>
					</div>
				</div>
				<div class="box">
					<div class="content3">
						<h2>PHOTOS</h2>
						<p>
							The cars uploaded should be in an arrangements of exterior,
							interior, engine, underneath the car, flaws you may consider
							should be seen, documentation and any other photos you may want to
							include.
						</p>
						<div class="">
							<form enctype="multipart/form-data">
								<input
									class="txt-input"
									type="file"
									id="myFiles"
									name="filename"
									multiple="multiple"
									accept="image/jpeg, image/png, image/jpg"
									@change="checkSize"
									hidden
								/>
								<label class="choose-photo" for="myFiles">Upload photos</label>
								<label @click="clearPhotos" class="clear-photo"
									>Clear Photos</label
								>
								<output id="resultImages"> </output>
							</form>
						</div>
					</div>
				</div>
				<div class="box">
					<div class="content3">
						<h2>COUPON CODE</h2>

						<div class="grid-container2">
							<input
								v-model="car.coupon_code"
								class="txt-input"
								type="text"
								name=""
							/>
						</div>
					</div>
				</div>
				<button
					id="submitCarBtn"
					@click="checkForm"
					type="button"
					class="btn submit-car-btn"
				>
					Submit
				</button>
			</form>
		</div>
	</div>
</template>

<script>
	import FormError from '../FormError.vue';
	import $ from 'jquery';

	export default {
		name: 'SubmitCarMain',
		data() {
			return {
				car: {
					vin_number: '',
					seller_name: '',
					reserve_bid: '',
					bid_days: '',
					seller_type: '',
					year: '',
					make: '',
					model: '',
					body_type: '',
					engine: '',
					interior_color: '',
					exterior_color: '',
					transmission: '',
					condition: '',
					mileage: '',
					gas_type: '',
					plate_code: '',
					location: '',
					phone_number: '',
					coupon_code: '',
					highlight_modification: '',
					known_flaws: '',
					other_info: '',
					image: null,
				},
				formError: '',
				errorTxt: false,
				formTest: {},
			};
		},
		methods: {
			checkForm() {
				let storeState = this.$store.state;
				let storeRules = this.$store.state.rules;
				const formData = new FormData();
				$('#top')[0].scrollIntoView();

				if (this.$store.state.header == 'Header') {
					this.errorTxt = true;
					this.formError = '* You must login to continue!';
					return;
				}

				for (const [key, value] of Object.entries(this.car)) {
					if (value == '' && key != 'coupon_code' && key != 'reserve_bid') {
						this.errorTxt = true;
						this.formError = '* All fields are required!';
						return;
					}
				}

				if (!storeRules.numberRule.test(this.car.phone_number)) {
					this.errorTxt = true;
					this.formError = '* Phone Number must contain numbers only!';
					return;
				}
				if (!storeRules.numberRule.test(this.car.mileage)) {
					this.errorTxt = true;
					this.formError = '* Mileage must contain numbers only!';
					return;
				}
				if (
					!storeRules.numberRule.test(this.car.reserve_bid) &&
					$('input[name=reserveBid]:checked')[0].value == 'yes'
				) {
					this.errorTxt = true;
					this.formError = '* Reserve Bid must contain numbers only!';
					return;
				}
				if (!storeRules.numberRule.test(this.car.bid_days)) {
					this.errorTxt = true;
					this.formError = '* Bidding Days must contain numbers only!';
					return;
				}
				if (parseInt(this.car.bid_days) < 5) {
					this.errorTxt = true;
					this.formError =
						'* You must allow the bidding days for atleast 5 days';
					return;
				}
				if (parseInt(this.car.bid_days) > 15) {
					this.errorTxt = true;
					this.formError =
						'* You must allow the bidding days for atmost 15 days';
					return;
				}
				if (this.car.image.length < 10) {
					this.errorTxt = true;
					this.formError = '* You must upload atleast 10 images';
					return;
				}
				if (this.car.image.length > 20) {
					this.errorTxt = true;
					this.formError = '* You must upload atmost 20 images';

					return;
				}

				for (var key in this.car) {
					if (key !== 'image') {
						formData.append(key, this.car[key]);
					}
				}
				for (var i = 0; i < this.car.image.length; i++) {
					formData.append('image' + i, this.car.image[i]);
				}

				this.formError = '';
				this.errorTxt = false;

				let data = {
					car: formData,
					accessToken: storeState.accessToken,
				};
				$('#submitCarBtn').prop('disabled', 'true');
				this.errorTxt = false;
				this.formError = 'Processing data, please wait.';
				this.$store.dispatch('submitCarData', data);
				$('#submitCarBtn').prop('disabled', 'true');
				this.formError = '';
			},
			checkSellerType() {
				this.car.seller_type = $('input[name=sellerType]:checked')[0].value;
			},
			checkReserve() {
				if ($('input[name=reserveBid]:checked')[0].value == 'yes') {
					$('.show-reserve').css('display', 'block');
				} else {
					$('.show-reserve').css('display', 'none');
				}
			},
			checkSize(event) {
				const allFiles = event.target.files;

				for (let i = 0; i < allFiles.length; i++) {
					const fileSize = allFiles[i].size;
					const fileMb = fileSize / 1024 ** 2;
					if (fileMb >= 3) {
						this.clearPhotos();
						alert('Images with file size greater than 3mb are not allowed.');
						return;
					}
				}

				this.showImages(event);
			},
			showImages(event) {
				$('#resultImages').html('');
				if (
					window.File &&
					window.FileReader &&
					window.FileList &&
					window.Blob
				) {
					const files = event.target.files;
					const output = document.querySelector('#resultImages');

					if (this.car.image == null) {
						this.car.image = files;
					} else {
						console.log(Array.from(this.car.image).concat(Array.from(files)));
						this.car.image = Array.from(this.car.image).concat(
							Array.from(files)
						);
					}

					for (let i = 0; i < this.car.image.length; i++) {
						if (!this.car.image[i].type.match('image')) continue;
						const picReader = new FileReader();
						picReader.addEventListener('load', (e) => {
							const picFile = e.target;
							const div = document.createElement('div');
							div.innerHTML = `<div class="grid-container-imgs"><img class="thumbnail" width="200px" height="auto" src="${picFile.result}" title="${picFile.name}" /></div>`;
							output.appendChild(div);
						});
						picReader.readAsDataURL(this.car.image[i]);
					}
				} else {
					alert("Your browser doesn't support the file API!");
				}
			},
			clearPhotos() {
				$('#myFiles').val('');
				$('#resultImages').html('');
				this.car.image = null;
			},
		},
		components: { FormError },
	};
</script>

<style scoped>
	/* sec 1 */
	.content-box {
		font-family: 'segoe ui';
		margin: auto;
		max-width: 576px;
	}

	.box {
		background-color: #f4f4f4;
		padding-top: 20px;
		border-radius: 0px;
	}

	@media only screen and (min-width: 575px) {
		.box {
			margin: 0 -14px 30px !important;
			background: #f6f6f7;
			border-radius: 6px;
		}
	}

	.content-box h1 {
		margin-bottom: 24px;
		font-weight: 700;
		font-size: 30px;
		line-height: 36px;
	}

	.app {
		margin-bottom: 24px;
		font-weight: 700;
		font-size: 20px;
		line-height: 36px;
	}

	.content {
		margin-left: 20px;
	}

	.content-box h6 {
		margin-top: 30px;
		margin-bottom: 20px;
		color: #828282;
		font-weight: 400;
		font-size: 15px;
		line-height: 21px;
		letter-spacing: -0.011em;
	}

	.content-box h2 {
		margin-bottom: 32px;
		font-weight: 700;
		font-size: 22px;
		line-height: 22px;
	}

	.content-box h2::before {
		content: ' ';
		display: inline-block;
		margin-right: 10px;
		width: 8px;
		height: 15px;
		background-color: #f7a23a;
		border-radius: 0 3px 3px 0;
	}

	input[type='radio'] {
		display: none;
	}

	.label1,
	.label2,
	.label3 {
		display: inline-block;
		position: relative;
		/* background: white; */
		padding: 8px 16px 9px;
		border: 1px solid #ccc !important;
		border-radius: 6px;
		text-align: center;
		margin-bottom: 30px;
		font-size: 15px;
		cursor: pointer;
	}

	.grid-container {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 15px;
	}

	.grid-container2 {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 5px;
	}

	#resultImages {
		display: grid;
		gap: 10px;
		padding: 10px 0;
		grid-template-columns: repeat(2, 1fr);
	}

	@media only screen and (max-width: 575px) {
		.grid-container2 {
			display: block;
		}
	}

	.txt-input {
		margin-bottom: 30px;
		margin-top: -10px;
		border: 1px solid #ccc;
		border-radius: 6px;
		width: 93%;
		height: 35px;
	}

	/* sec-1 end */
	/* sec2 */

	.content2 {
		margin-left: 20px;
		padding-bottom: 30px;
	}

	.d-down {
		cursor: pointer;
	}

	.form-control {
		display: block;
		width: 97% !important;
		height: 100px !important;
		height: calc(1.5em + 0.75rem + 2px);
		padding: 0.375rem 0.75rem;
		font-size: 0.875rem;
		font-weight: 400;
		line-height: 1.5;
		color: #262626;
		background-color: #fff;
		background-clip: padding-box;
		border: 1px solid #d5d5d5;
		border-radius: 6px;
	}

	.show-reserve {
		display: none;
	}

	/* sec3 */

	/* @media only screen and (max-width: 575px) {
	.box3 {
		margin: 0 -14px 100px;
		background: #f6f6f7;
	}
} */

	.choose-photo {
		text-align: center;
		padding: 0.5rem;
		font-family: sans-serif;
		border-radius: 0.3rem;
		cursor: pointer;
		border: 1px solid #828282;
		margin-bottom: 20px;
		width: 140px;
		cursor: pointer;
	}

	.clear-photo {
		text-align: center;
		/* padding: 0.5rem; */
		margin-left: 20px;
		font-family: sans-serif;
		border-radius: 0.3rem;
		cursor: pointer;
		/* border: 1px solid #828282; */
		margin-bottom: 20px;
		/* width: 140px; */
		cursor: pointer;
	}

	.content3 {
		margin-left: 20px;
	}

	.submit-car-btn {
		margin-bottom: 80px;
		font-size: 20px;
		font-weight: 500;
		padding: 12px 80px;
		background-color: #f7941d;
		border-color: #f7941d;
		border-radius: 5px;
	}

	.submit-car-btn:hover {
		background-color: #dd8519;
	}
</style>
