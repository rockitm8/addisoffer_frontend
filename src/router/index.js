import { createRouter, createWebHistory } from 'vue-router';
import Auctions from '../views/Auctions.vue';
import CarDetail from '../views/CarDetail.vue';
import PastResults from '../views/PastResults.vue';
import SellCar from '../views/SellCar.vue';
import About from '../views/About.vue';
import Contact from '../views/Contact.vue';
import Profile from '../views/Profile.vue';
import SubmitCar from '../views/SubmitCar.vue';
import ResetPassword from '../components/PopupModals/ResetPassword';
import PrivacyPolicy from '../views/PrivacyPolicy';
import TermsConditions from '../views/TermsConditions';

// import LanguageTest from "../views/LanguageTest.vue";
// import i18n from "../i18n";

const routes = [
  {
    path: '/',
    redirect: '/en',
  },
  // {
  // 	path: '/ws',
  // 	redirect: '/en',
  // },
  {
    path: '/:lang',
    component: {
      template: '<router-view></router-view>',
    },
    children: [
      {
        path: '',
        name: 'auctions',
        component: Auctions,
      },
      {
        path: 'past-results',
        name: 'past_results',
        component: PastResults,
      },
      {
        path: 'sell-car',
        name: 'sell_car',
        component: SellCar,
      },
      {
        path: 'about',
        name: 'about',
        component: About,
      },
      {
        path: 'contact',
        name: 'contact',
        component: Contact,
      },
      {
        path: 'profile',
        name: 'profile',
        component: Profile,
      },
      {
        path: 'submit-car',
        name: 'submit_car',
        component: SubmitCar,
      },
      {
        path: 'car-detail/:id',
        name: 'car_detail',
        component: CarDetail,
      },
      {
        path: 'reset-password/:uid/:token',
        name: 'reset_password',
        component: ResetPassword,
      },
      {
        path: 'privacy-policy',
        name: 'provicy_policy',
        component: PrivacyPolicy,
      },
      {
        path: 'terms-conditions',
        name: 'terms_conditions',
        component: TermsConditions,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  base: process.env.BASE_URL,
});

export default router;
