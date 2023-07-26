import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

/* import specific icons */
import {
  faMagnifyingGlass,
  faAngleRight,
  faCalendarDays,
  faChevronRight,
  faUserSecret,
  faUserCircle,
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
  faDollarSign,
  faDownload,
  faBars,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(
  faMagnifyingGlass,
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
  faUserCircle,
  faLock,
  faEyeSlash,
  faEye,
  faCheck,
  faDollarSign,
  faDownload,
  faBars,
  faMinus,
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("fa", FontAwesomeIcon);
});
