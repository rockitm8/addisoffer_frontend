<template>
  <div class="forgot-password-modal">
    <div id="forgot-modal" class="modal_box">
      <div class="modal_content">
        <header class="mt-3">
          <span @click="closeForgotModal" class="closebtn">&times;</span>
          <!-- <img width="61px" src="imgs/logo.png" alt="" /> -->
          <h5>Forgot password</h5>
          <button @click="triggerSignin" type="button">Back to sign in</button>
        </header>

        <div v-if="formError != ''">
          <FormError :formError="formError" :error="errorTxt" />
        </div>

        <form @submit.prevent="checkEmail">
          <div class="data">
            <label class="mb-2" for="Email address">Email address</label>
            <input v-model="email" type="text" />
          </div>

          <button id="forgot-btn" class="form_btn" type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import FormError from '../FormError.vue';
  import axiosInstance from '@/js/axiosInstance';
  import axios from 'axios';

  export default {
    name: 'ForgotPasswordModal',
    props: {
      showModal: Boolean,
    },
    data() {
      return {
        email: '',
        formError: '',
        errorTxt: false,
      };
    },
    methods: {
      openForgotModal() {
        const modal = document.getElementById('forgot-modal');
        modal.style.display = 'block';
        const body = document.body;
        body.setAttribute('style', 'overflow: hidden');
      },
      closeForgotModal() {
        this.$emit('closeForgot');
        const modal = document.getElementById('forgot-modal');
        const body = document.body;
        body.setAttribute('style', 'overflow: auto');
        modal.style.display = 'none';
      },
      triggerSignin() {
        this.closeForgotModal();
        this.$emit('openSignin');
      },
      checkEmail() {
        let store = this.$store.state.rules;

        if (!store.emailRule.test(this.email)) {
          this.errorTxt = true;
          this.formError = 'Email address is not valid!';

          return;
        }
        this.errorTxt = false;
        this.formError = '';

        this.submitEmail(this.email);
      },
      async submitEmail(emailadd) {
        let data = {
          email: emailadd,
        };
        $('#forgot-btn').prop('disabled', 'true');
        this.errorTxt = false;
        this.formError = 'Processing, please wait!';
        await axios
          .post(
            `${this.$store.state.backend_url}/api/users/send-reset-password-email/`,
            data,
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            this.errorTxt = false;
            this.formError = 'Please check your email!';
          })
          .catch((error) => {
            this.errorTxt = true;
            this.formError = 'Not a registered User!';

            $('#forgot-btn').prop('disabled', 'false');
          });
      },
    },
    watch: {
      showModal: {
        handler() {
          if (this.showModal == true) {
            this.openForgotModal();
          }
        },
      },
    },
    components: { FormError },
  };
</script>

<style scoped>
  .modal_box {
    display: none;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal_content {
    background-color: #f4f4f4;
    margin: 100px auto;
    padding: 10px 25px 40px 25px;
    width: 400px;
    box-shadow: 0 8px 40px rgb(0 0 0 / 16%);
    border-radius: 6px;
  }
  /* header css */
  header {
    text-align: center;
  }

  header img {
    margin-left: 20px;
  }

  header button {
    text-decoration: none;
    color: #f7941d;
    border: none;
    background-color: #f4f4f4;
  }

  header button:hover {
    text-decoration: underline;
    color: #dd8519;
  }

  header p {
    font-size: 15px;
    line-height: 21px;
    color: rgb(38, 38, 38);
  }

  header h5 {
    margin-bottom: 20px;
    margin-top: 10px;
    font-size: 20px;
    font-weight: 700;
  }

  .closebtn {
    color: #ccc;
    float: right;
    font-size: 30px;
  }

  .closebtn:hover,
  .closebtn:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  /*  */

  form {
    margin-top: -20px;
  }

  .data {
    height: 44px;
    width: 100%;
    margin-top: 50px;
  }

  .data input {
    height: 100%;
    width: 100%;
    border-radius: 6px;
    border: 1px solid #d5d5d5;
  }

  .data {
    margin-bottom: 60px;
  }

  .data label {
    font-size: 15px;
    color: rgb(38, 38, 38);
  }

  .form_btn {
    /* margin-top: 60px; */
    margin-bottom: 29px;
    height: 44px;
    width: 32%;
    background-color: #f7a23a;
    font-size: 18px;
    font-weight: 500px;
    cursor: pointer;
    border-radius: 6px;
    border: none;
  }

  form .form_btn:hover {
    background-color: #dd8519;
  }

  form a {
    text-decoration: none;
    color: #f7a23a;
  }

  form a:hover {
    color: #dd8519;
    text-decoration: underline;
  }

  .help-txt {
    padding-bottom: 20px;
  }

  @media only screen and (max-width: 575px) {
    .modal_content {
      border-radius: 0;
      margin: 0;
      width: 100%;
      height: 100%;
    }
  }

  @media only screen and (max-width: 575px) {
    .form_btn {
      width: 100%;
    }
  }
</style>
