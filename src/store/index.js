import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';
import axiosInstance from '@/js/axiosInstance';
import axiosInstanceBearer from '@/js/axiosInstanceBearer';
import router from '@/router';
import axios from 'axios';

export default createStore({
  state: {
    rules: {
      usernameRule: new RegExp(
        /^[a-z A-Z 0-9 -!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]{2,}$/
      ),
      emailRule: new RegExp(/^.+@.+(\.com)$/),
      passwordRule: new RegExp(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[-!$%^@&*()_+|~=`{}\[\]:";'<>?,.\/]).{8,}$/
      ),
      numberRule: new RegExp(/^[0-9]+$/),
      alphabetRule: new RegExp(/^[A-Z a-z]+$/),
    },
    header: 'Header',
    accessToken: '',
    carList: [],
    singleCarData: [],
    logged_user: null,
    bids_left: 0,
    settings: {},
    search_text: '',
    backend_url: 'https://admin.addisoffer.com',
    notifications: {},
  },
  mutations: {
    toggleHeader(state) {
      if (state.accessToken != '') {
        state.header = 'HeaderAfter';
      } else {
        state.header = 'Header';
      }
    },
    loginSuccess(state, accessToken) {
      state.accessToken = accessToken;
    },
    logoutSuccess(state) {
      state.accessToken = '';
      state.logged_user = null;
      state.notifications = {};
      state.settings = {};
      window.localStorage.clear();
      // router.go({ name: 'auctions' });
      router.push({ name: 'auctions' });
      window.location.href = location.origin;
      // console.log(location.origin);
    },
    registerSuccess(state) {},
    listCarData(state, carList) {
      state.carList = carList;
    },
    getAccessToken(state) {
      return state.accessToken;
    },
  },
  actions: {
    async submitLogout({ commit, state }) {
      await axiosInstance
        .post(`/api/users/logout/`)
        .then((response) => {
          commit('logoutSuccess');
          commit('toggleHeader');
        })
        .catch((error) => {
          console.log('error:', error);
        });
    },

    submitCarData({ commit, state }, data) {
      axiosInstanceBearer
        .post(`/api/cars/`, data.car)
        .then((response) => {
          router.push({ name: 'auctions' });
          alert('Car submitted for inspection.');
        })
        .catch((error) => {
          console.log('error:', error);
        });
    },

    async submitSettings({ commit, state }, data) {
      await axiosInstance
        .patch(`/api/users/settings/${state.logged_user.id}/`, data)
        .then((response) => {
          location.reload();
        })
        .catch((error) => {
          console.log('error:', error);
        });
    },

    async submitComment({ commit, state }, data) {
      await axiosInstanceBearer
        .post(`/api/comments/`, data)
        .then((response) => {
          state.singleCarData.total_comments += 1;
          axiosInstance
            .patch(`/api/cars/${state.singleCarData.id}/`, state.singleCarData)
            .then((response) => {
              if (data.bid) {
                router.push({ name: 'auctions' });
                window.location.href = location.origin;
              } else {
                let d = {
                  car_id: state.singleCarData.id,
                };
                axiosInstance
                  .post('/api/users/email-is-new-comment/', d)
                  .then((response) => {
                    location.reload();
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            })
            .catch((error) => {
              console.log('error:', error);
            });
        })
        .catch((error) => {
          console.log('error:', error);
        });
    },

    async fetchUser({ commit, state }) {
      await axiosInstance
        .get(`${state.backend_url}/api/users/profile/`)
        .then((response) => {
          state.logged_user = response.data;
        })
        .catch((error) => {
          console.log('error:', error);
        });
    },
  },
  getters: {
    getAccessToken: (state) => {
      return state.accessToken;
    },
    getSearchText: (state) => state.search_text,
  },
  modules: {},
  plugins: [
    createPersistedState({
      paths: ['accessToken', 'header', 'notifications'],
      storage: {
        getItem: (key) => Cookies.get(key),
        setItem: (key, value) =>
          Cookies.set(key, value, { expires: 3, secure: false }),
        removeItem: (key) => Cookies.remove(key),
      },
    }),
  ],
});
