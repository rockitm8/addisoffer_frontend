import "bootstrap/dist/css/bootstrap.min.css";
import { createApp } from "vue/dist/vue.esm-bundler";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import i18n from "./i18n";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFacebook, faTelegram, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'

/* import specific icons */
import {
    faUserSecret,
    faClock,
    faArrowAltCircleDown,
    faBars,
    faBell,
    faUser,
    faArrowRightFromBracket,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

// LANGUAGE SWITCHING RULES!!!!!!!!!!  //
// use beforeEach route guard to set the language
router.beforeEach((to, from, next) => {
    let language = to.params.lang;

    if (!language) {
        language = "en";
    }
    console.log(language);
    // set the current language for i18n.
    i18n.locale = language;
    next();
});
// LANGUAGE SWITCHING RULES!!!!!!!!!!  //

// FONT AWESOME RULES!!!!!!!!!!  //

/* add icons to the library */
library.add(
    faUserSecret,
    faClock,
    faArrowAltCircleDown,
    faBars,
    faBell,
    faUser,
    faArrowRightFromBracket,
    faEnvelope,
    faFacebook,
    faTelegram,
    faYoutube,
    faInstagram
);

// FONT AWESOME RULES!!!!!!!!!!  //

createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .use(i18n)
    .use(store)
    .use(router)
    .mount("#app");