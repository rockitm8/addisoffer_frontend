<template>
  <div class="simple">
    <div v-if="main_image != null">
      <img class="car-pic" :src="main_image" /> <br />
    </div>

    <div v-if="page == 'sellcar'">
      <span class="sold-for">Sold for ETB {{ car_data.high_bid }}</span>
    </div>
    <span class="car-name"
      >{{ car_data.year }} {{ car_data.make }} {{ car_data.model }}</span
    >
  </div>
</template>

<script>
  import axiosInstance from '@/js/axiosInstance';
  import axios from 'axios';

  export default {
    name: 'SimpleCarCard',
    props: {
      car_data: [],
      page: String,
    },
    data() {
      return {
        main_image: null,
      };
    },
    methods: {
      async fetchCarImage() {
        await axios
          .get(`${this.$store.state.backend_url}/api/main-image/`, {
            params: { car_id: this.car_data.id },
          })
          .then((response) => {
            this.main_image = response.data;
          })
          .catch((err) => {});
      },
    },
    mounted() {
      this.fetchCarImage();
    },
  };
</script>

<style scoped>
  .sold-for {
    font-weight: 700;
  }
  .car-pic {
    width: 100%;
    height: 100px;
    object-fit: cover;
    object-position: center;
  }

  .car-name {
    font-weight: 500;
  }
</style>
