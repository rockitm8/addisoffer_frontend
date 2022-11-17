<template>
  <div class="rating">
    <div class="line">
      <Line />
    </div>
    <div class="row">
      <div class="col-md-6 col-12">
        <h6>Why Addis Offer?</h6>
        <div class="row">
          <div class="col-6">
            <span class="rating-value">{{ auctions_completed }}</span> <br />
            <span class="rating-heading">Auctions completed</span>
          </div>
          <div class="col-6">
            <span class="rating-value">ETB {{ value_cars_sold }}</span> <br />
            <span class="rating-heading">Value of cars sold</span>
          </div>
        </div>
        <div class="row">
          <!-- <div class="col-6">
						<span class="rating-value">85%+</span> <br />
						<span class="rating-heading">Sell-through rate</span>
					</div> -->
          <div class="col-6">
            <span class="rating-value">{{ registered_members }}</span> <br />
            <span class="rating-heading">Registered members</span>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-12 pt-md-0 pt-5">
        <h6>Our customers love us!</h6>
        <div class="stars-holder">
          <span v-for="i in review_stars" :key="i"
            ><img class="star" src="../assets/star-yellow.png" alt=""
          /></span>
        </div>

        <span class="comment-name">{{ review_name }}</span>
        <span class="comment-date">{{ review_date }}</span>
        <p class="comment-heading">
          {{ review }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import Line from './Line.vue';
  import axiosInstance from '@/js/axiosInstance';
  import axios from 'axios';

  export default {
    name: 'Rating',
    data() {
      return {
        auctions_completed: null,
        value_cars_sold: null,
        registered_members: null,
        review: '',
        review_date: '',
        review_name: '',
        review_stars: 5,
      };
    },
    methods: {
      async fetchCarStats() {
        await axios
          .get(`${this.$store.state.backend_url}/api/auctions-completed/`)
          .then((response) => {
            this.auctions_completed = response.data.auctions_completed;
            this.value_cars_sold = response.data.value_cars_sold;
          })
          .catch((error) => {});
      },
      async fetchRegisteredMembers() {
        await axios
          .get(`${this.$store.state.backend_url}/api/users/registered-members/`)
          .then((response) => {
            this.registered_members = response.data;
          })
          .catch((error) => {});
      },
      async fetchRating() {
        await axios
          .get(`${this.$store.state.backend_url}/api/changes/`)
          .then((response) => {
            this.review = response.data[0].review;
            this.review_name = response.data[0].review_name;
            this.review_date = response.data[0].review_date;
            this.review_stars = response.data[0].review_stars;
          })
          .catch((error) => {});
      },
    },
    mounted() {
      this.fetchCarStats();
      this.fetchRegisteredMembers();
      this.fetchRating();
    },
    components: { Line },
  };
</script>

<style scoped>
  .rating {
    margin-bottom: 20px;
  }

  .line {
    padding: 10px 0px;
  }

  .rating-value {
    font-size: 16px;
    font-weight: 700;
    border-bottom: 5px solid #ffe55f;
    border-radius: 3px;
  }

  .stars-holder {
    display: inline;
  }

  .star {
    width: 20px;
  }

  .comment-name {
    font-size: 14px;
    font-weight: 700;
  }

  .comment-date {
    color: #bababa;
    font-size: 14px;
    font-weight: 400;
  }

  .comment-heading {
    font-size: 15px;
    font-weight: 400;
    padding-top: 10px;
  }

  .stars-holder,
  .comment-name {
    margin-right: 10px;
  }
</style>
