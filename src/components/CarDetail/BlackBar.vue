<template>
  <div class="black-bar" :id="`car` + car_data.id">
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="bid-bar col-9">
            <ul class="bid-stats">
              <div v-if="!time_ended">
                <li class="time-left">
                  <span class="time-icon all-icons">
                    <i class="fa fa-clock-o"></i>
                    <span>Time Left</span>
                  </span>
                  <span class="time-value">{{ displayTime }}</span>
                </li>
                <li class="high-bid">
                  <span class="bid-icon all-icons"
                    ><span><i class="fa fa-arrow-up"></i></span> High Bid</span
                  >
                  <span class="bid-value">ETB {{ car_data.high_bid }}</span>
                </li>
                <li class="bids">
                  <span class="bids-icon all-icons">
                    <span class="hash">#</span> Bids</span
                  >
                  <span class="bids-value">{{ car_data.total_bids }}</span>
                </li>
                <li class="comments">
                  <span class="comments-icon all-icons">
                    <span><i class="fa fa-comments"></i></span> Comments</span
                  >
                  <span class="comments-value">
                    {{ car_data.total_comments }}
                  </span>
                </li>
                <li class="view">
                  <span class="view-icon all-icons">
                    <span><i class="fa fa-eye"></i></span> Views</span
                  >
                  <span class="view-value">{{ car_data.views }}</span>
                </li>
              </div>
              <div v-else>
                <li>
                  <div v-if="car_data.high_bid > car_data.reserve_bid">
                    <span class="sold-txt"
                      >Sold for ETB {{ car_data.high_bid }}</span
                    >
                  </div>
                  <div v-else>
                    <span class="sold-txt"
                      >Bid to ETB {{ car_data.high_bid }}</span
                    >
                  </div>
                </li>
                <div class="right-icons">
                  <li class="bids">
                    <span class="bids-icon">
                      <span class="hash">#</span> Bids</span
                    >
                    <span class="bids-value">{{ car_data.total_bids }}</span>
                  </li>
                  <li class="comments">
                    <span class="comments-icon">
                      <span><i class="fa fa-comments"></i></span> Comments</span
                    >
                    <span class="comments-value">
                      {{ car_data.total_comments }}
                    </span>
                  </li>
                  <li class="view">
                    <span class="view-icon">
                      <span><i class="fa fa-eye"></i></span> Views</span
                    >
                    <span class="view-value">{{ car_data.views }}</span>
                  </li>
                </div>
              </div>
            </ul>
          </div>

          <div class="col-3 buttons">
            <div v-if="!time_ended">
              <div v-if="bid_allowed != null">
                <button
                  @click="triggerPlaceBidModal"
                  type="button"
                  class="bid-btn"
                >
                  Place Bid
                </button>
              </div>
              <div v-else>
                <button
                  @click="triggerRegisterBidModal"
                  type="button"
                  class="bid-btn"
                >
                  Place Bid
                </button>
              </div>
            </div>

            <button @click="triggerShareModal" type="button" class="share-btn">
              Share
            </button>
            <RegisterBidModal
              @close="triggerRegisterBidModal"
              :showModal="isRegisterBidActive"
            />
            <PlaceBidModal
              @close="triggerPlaceBidModal"
              :showModal="isPlaceBidActive"
              :car_data="car_data"
              :bid_allowed="bid_allowed"
            />
            <ShareModal @close="triggerShareModal" :showModal="isShareActive" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ShareModal from '../PopupModals/ShareModal.vue';
  import RegisterBidModal from '../PopupModals/RegisterBidModal.vue';
  import PlaceBidModal from '../PopupModals/PlaceBidModal.vue';
  import moment from 'moment';
  import axios from 'axios';
  import axiosInstance from '@/js/axiosInstance';

  export default {
    name: 'BlackBar',
    components: { ShareModal, RegisterBidModal, PlaceBidModal },
    props: {
      car_data: {
        default: [],
      },
      car_allowed: Boolean,
    },
    data() {
      return {
        isShareActive: false,
        isRegisterBidActive: false,
        isPlaceBidActive: false,
        bid_allowed: null,
        intervalId: null,
        displayTime: null,
        time_ended: false,
      };
    },
    methods: {
      triggerShareModal() {
        this.isShareActive = !this.isShareActive;
      },
      triggerRegisterBidModal() {
        this.isRegisterBidActive = !this.isRegisterBidActive;
      },
      triggerPlaceBidModal() {
        this.isPlaceBidActive = !this.isPlaceBidActive;
      },
      setTime() {
        this.intervalId = this.countdownTimer();
      },
      countdownTimer() {
        const intervalId = setTimeout(() => {
          let nowTime = moment();
          let carTime = moment(this.car_data.time_left);

          if (nowTime > carTime) {
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

            if (carTime.diff(nowTime, 'hours') < 1) {
              $(`#car${this.car_data.id} .bid-stats`).css(
                'background-color',
                'rgb(241, 81, 73)'
              );
              $(`#car${this.car_data.id} .all-icons`).css('color', 'white');
            }
            this.displayTime = splitTime.join(':');
          } else if (carTime.diff(nowTime, 'days') == 1) {
            this.displayTime = '1 day';
          } else {
            this.displayTime = moment(this.car_data.time_left).toNow(true);
          }
          this.countdownTimer();
        }, 1000);
        return intervalId;
      },
      async submitView() {
        this.car_data.views++;

        await axios
          .patch(
            `${this.$store.state.backend_url}/api/cars/${this.car_data.id}/`,
            this.car_data
          )
          .then((response) => {})
          .catch((error) => {});
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
            axiosInstance
              .post(`/api/users/email-is-auction-end/`, data)
              .then((response) => {
                location.reload();
              })
              .catch((error) => {});
          })
          .catch((error) => {});
      },
    },
    mounted() {
      let bids_left = this.$store.state.bids_left;

      if (this.car_allowed) {
        this.bid_allowed = 'car_allowed';
      } else if (bids_left > 0) {
        this.bid_allowed = 'bids_left';
      } else {
        this.bid_allowed = null;
      }
      let nowTime = moment();
      let carTime = moment(this.car_data.time_left);
      if (nowTime < carTime) this.setTime();
      else this.time_ended = true;
      this.submitView();
    },
  };
</script>

<style scoped>
  .bid-stats {
    background-color: rgb(38, 38, 38);
    border-radius: 5px;
    padding: 1px 8px 4px 8px;
  }

  .bid-stats li {
    display: inline;
  }

  .time-left,
  .high-bid,
  .bids,
  .comments {
    padding-right: 20px;
  }

  .time-icon i,
  .bid-icon i,
  .bids-icon i,
  .comments-icon i,
  .view-icon i {
    font-size: 20px;
    padding-right: 5px;
  }

  .time-icon,
  .bid-icon,
  .bids-icon,
  .comments-icon,
  .view-icon {
    color: gray;
    font-size: 16px;
    padding-right: 4px;
    font-weight: 400;
    padding-right: 10px;
  }

  .hash {
    font-size: 20px;
  }

  .time-value,
  .bid-value,
  .bids-value,
  .comments-value,
  .view-value {
    color: white;
    font-size: 18px;
    font-weight: 400;
    /* display: inline-block; */
    /* width: 105%; */
  }

  .sold-txt {
    color: white;
    font-size: 18px;
    font-weight: 600;
  }

  .right-icons {
    display: inline;
    margin-left: 30%;
  }

  .high-bid {
    padding-top: 9px;
  }

  .bid-bar ul {
    padding: 10px;
  }

  button {
    border: none;
    outline: none;
    margin-right: 20px;
  }

  .buttons {
    display: flex;
  }

  .bid-btn {
    background-color: #f7a23a;
    color: white;
    padding: 0px 20px;
    text-align: center;
    text-decoration: none;
    font-size: 15px;
    border-radius: 5px;
    height: 50px;
    color: black;
    font-weight: 600;
  }

  .share-btn {
    background-color: none;
    color: white;
    padding: 0px 20px;
    text-align: center;
    text-decoration: none;
    font-size: 15px;
    border-radius: 5px;
    height: 50px;
    color: black;
    font-weight: 600;
    border: none;
    outline: none;
  }

  @media screen and (max-width: 1399px) {
    .time-icon i,
    .bid-icon i,
    .bids-icon i,
    .comments-icon i,
    .view-icon i {
      font-size: 20px;
    }

    .time-icon,
    .bid-icon,
    .bids-icon,
    .comments-icon,
    .view-icon {
      color: gray;
      font-size: 20px;
    }

    .time-value,
    .bid-value,
    .bids-value,
    .comments-value,
    .view-value {
      color: white;
      font-size: 20px;
    }
  }

  @media only screen and (max-width: 1199px) {
    .time-icon i,
    .bid-icon i,
    .bids-icon i,
    .comments-icon i,
    .view-icon i {
      font-size: 18px;
    }

    .time-icon,
    .bid-icon,
    .bids-icon,
    .comments-icon,
    .view-icon {
      color: gray;
      font-size: 16px;
    }

    .time-value,
    .bid-value,
    .bids-value,
    .comments-value,
    .view-value {
      color: white;
      font-size: 14px;
    }

    .hash {
      font-size: 20px;
    }
  }

  @media screen and (max-width: 991px) {
    .time-value,
    .bid-value,
    .bids-value,
    .comments-value,
    .view-value,
    .time-icon,
    .bid-icon,
    .bids-icon,
    .comments-icon,
    .view-icon {
      font-size: 14px;
      font-weight: 400;
    }

    /* .bid-btn {
			font-size: 10px;
			padding: 5px 22px;
			height: 44px;
		} */
  }

  @media screen and (max-width: 767px) {
    /* .time-value,
		.bid-value,
		.bids-value,
		.comments-value,
		.view-value,
		.time-icon,
		.bid-icon,
		.bids-icon,
		.comments-icon,
		.view-icon {
			font-size: 5px;
			font-weight: 400;
		} */

    /* .bid-btn {
			font-size: 3px;
			padding: 5px 22px;
			height: 44px;
		} */
  }
</style>
