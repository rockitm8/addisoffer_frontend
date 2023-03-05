<template>
  <div class="car-card manual" :id="`car` + car_data.id">
    <div @mouseleave="card_focus_lost" @mouseover="card_focus" class="card">
      <router-link
        class="card-img-top"
        :to="`/${$i18n.locale}/car-detail/${car_data.id}`"
      >
        <img :src="main_image" class="main-img" alt="Car" />
        <div class="bid-bar">
          <ul id="time-ending" class="bid-stats">
            <div v-if="page == 'auction' || page == 'ending'">
              <li class="time-left">
                <span class="time-icon all-icons">
                  <font-awesome-icon icon="fa-solid fa-clock" />
                </span>
                <span class="time-value">{{ displayTime }}</span>
              </li>
              <li class="high-bid">
                <span class="bid-icon all-icons">Bid</span>
                <span class="bid-value">ETB {{ car_data.high_bid }}</span>
              </li>
            </div>
            <div v-else>
              <div v-if="car_data.high_bid > car_data.reserve_bid">
                <span class="sold-txt"
                  >Sold for ETB {{ car_data.high_bid }}</span
                >
              </div>
              <div v-else>
                <span class="sold-txt">Bid to ETB {{ car_data.high_bid }}</span>
              </div>
            </div>
          </ul>
        </div>
      </router-link>

      <div class="card-body">
        <p class="card-text">
          <a class="card-name" href="#"
            >{{ car_data.year }} {{ car_data.make }} {{ car_data.model }}</a
          >
          <br />
          <span class="card-info">
            <div class="reserve-area" v-if="car_data.reserve_bid <= 0">
              <span style="">No Reserve</span>
            </div>
            ~{{ car_data.condition }}, {{ car_data.transmission }},
            {{ car_data.mileage }}
          </span>
          <br />
          <span class="card-loc">{{ car_data.location }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import moment from 'moment';
  import axiosInstance from '@/js/axiosInstance';
  import axios from 'axios';

  export default {
    name: 'CarCard',
    components: {},
    props: {
      car_data: {
        default: [],
      },
      page: String,
    },
    data() {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        intervalId: null,
        displayTime: null,
        main_image: null,
      };
    },
    methods: {
      card_focus() {
        // $(".card-img-top").css("filter", "brightness(90%)");
      },

      card_focus_lost() {
        // $(".card-img-top").css("filter", "brightness(100%)");
      },
      setTime() {
        this.intervalId = this.countdownTimer();
      },
      countdownTimer() {
        const intervalId = setTimeout(() => {
          let nowTime = moment();
          let carTime = moment(this.car_data.time_left);

          if (nowTime > carTime) {
            console.log('here');
            this.changeCarStatus();
          } else if (carTime.diff(nowTime, 'days') < 1) {
            let hms =
              carTime.diff(nowTime, 'hours') +
              ':' +
              (carTime.diff(nowTime, 'minutes') % 60) +
              ':' +
              (carTime.diff(nowTime, 'seconds') % 60);

            let splitTime = hms.split(':');
            if (parseInt(splitTime[0]) < 10) {
              splitTime[0] = '0' + splitTime[0];
            }
            if (parseInt(splitTime[1]) < 10) {
              splitTime[1] = '0' + splitTime[1];
            }
            if (parseInt(splitTime[2]) < 10) {
              splitTime[2] = '0' + splitTime[2];
            }
            this.displayTime = splitTime.join(':');

            if (carTime.diff(nowTime, 'hours') < 1) {
              $(`#car${this.car_data.id} .bid-stats`).css(
                'background-color',
                'rgb(241, 81, 73)'
              );
              $(`#car${this.car_data.id} .all-icons`).css('color', 'white');
            }
          } else if (carTime.diff(nowTime, 'days') == 1) {
            this.displayTime = '1 day';
          } else {
            this.displayTime = moment(this.car_data.time_left).toNow(true);
          }
          this.countdownTimer();
        }, 1000);
        return intervalId;
      },
      async changeCarStatus() {
        let data = {
          car_id: this.car_data.id,
        };
        await axios
          .post(`${this.$store.state.backend_url}/api/cars-status-end/`, data, {
            withCredentials: true,
          })
          .then((response) => {
            axios
              .post(
                `${this.$store.state.backend_url}/api/users/email-is-auction-end/`,
                data,
                {
                  withCredentials: true,
                }
              )
              .then((response) => {
                location.reload();
              })
              .catch((error) => {});
          })
          .catch((error) => {});
      },
      async fetchCarImage() {
        await axios
          .get(`${this.$store.state.backend_url}/api/main-image/`, {
            params: { car_id: this.car_data.id },
          })
          .then((response) => {
            this.main_image = response.data;
          });
      },
    },
    mounted() {
      this.fetchCarImage();
      if (this.page == 'auction' || this.page == 'ending') {
        this.setTime();
      }
    },
  };
</script>

<style scoped>
  .card {
    border: none;
  }

  .card-img-top {
    position: relative;
    cursor: pointer;
  }

  .card-body {
    padding-left: 0;
  }

  .main-img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    object-position: center;
  }

  .card-name {
    color: #262626;
    font-size: 16px;
    font-weight: 700;
    text-decoration: none;
  }

  .card-name:hover {
    text-decoration: underline;
  }

  .card-info {
    color: #262626;
    font-size: 14px;
    font-weight: 400;
  }

  .card-loc {
    color: #828282;
    font-size: 14px;
    font-weight: 400;
  }

  .bid-bar {
    position: absolute;
    top: 83%;
    left: 2%;
  }

  .bid-stats {
    background-color: rgb(38, 38, 38);
    border-radius: 5px;
    padding: 1px 8px 4px 8px;
  }

  .sold-txt {
    color: white;
    font-size: 14px;
  }

  .bid-stats li {
    display: inline;
  }

  .time-left {
    padding-right: 20px;
  }

  .time-icon,
  .bid-icon {
    color: gray;
    font-size: 0.7vw;
    padding-right: 4px;
  }

  .bid-icon {
    font-weight: 600;
  }

  .time-value,
  .bid-value {
    color: white;
    font-size: 0.7vw;
    font-weight: 500;
  }

  .reserve-area {
    background-color: rgb(144, 144, 255);
    border-radius: 5px;
    padding: 5px;
    color: white;
    font-size: 12px;
    font-weight: 500;
    display: inline;
  }

  @media only screen and (max-width: 1400px) {
    .bid-bar {
      top: 83%;
      left: 2%;
    }
  }

  @media only screen and (max-width: 1200px) {
    .time-icon,
    .bid-icon {
      font-size: 0.9vw;
    }

    .time-value,
    .bid-value {
      font-size: 0.9vw;
    }

    .bid-bar {
      top: 83%;
      left: 2%;
    }
  }

  @media only screen and (max-width: 992px) {
    .time-icon,
    .bid-icon {
      font-size: 13px;
    }

    .time-value,
    .bid-value {
      font-size: 14px;
    }

    .bid-bar {
      top: 82%;
      left: 2%;
    }
  }

  @media only screen and (max-width: 768px) {
    .bid-bar {
      top: 85%;
      left: 2%;
    }

    .time-icon,
    .bid-icon {
      font-size: 15px;
    }

    .time-value,
    .bid-value {
      font-size: 17px;
    }
  }
</style>
