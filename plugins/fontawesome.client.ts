import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

/* import specific icons */
import {
  faAngleRight,
  faCalendarDays,
  faChevronRight,
  faUserSecret,
  faLongArrowRight,
  faCaretUp,
  faCaretDown,
  faSpinner,
  faTimes,
  faUser,
  faLock,
  faEyeSlash,
  faEye,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(
  faUserSecret,
  faAngleRight,
  faCalendarDays,
  faChevronRight,
  faLongArrowRight,
  faCaretUp,
  faCaretDown,
  faSpinner,
  faTimes,
  faUser,
  faLock,
  faEyeSlash,
  faEye,
  faCheck,
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("fa", FontAwesomeIcon);
});
