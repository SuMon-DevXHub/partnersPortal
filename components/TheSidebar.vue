<template>
  <div
    class="absolute left-0 top-0 h-full transition-all duration-500 ease-in-out rounded-br-3xl sidebar hidden md:block neuton-font"
    :class="collapse ? 'w-26' : 'width-200 delay-500'"
    @mouseover="squeeze()"
    @mouseleave="notSqueeze()"
  >
    <div class="sidebar__header">
      <!-- <a href="/" target="_self" rel="noopener noreferrer" class="h-full">
          <sharp-archive-logo></sharp-archive-logo>
        </a> -->
    </div>
    <div ref="sidemenu" class="sidemenu flex flex-col">
      <!-- <div
          class="h-5 w-full bg-offgray spacer"
          data-index="0"
        ></div>-->

      <!-- Spill -->
      <div
        class="background"
        :class="selectedBgColor"
        :style="{ 'margin-top': `${offsetTopPx}px` }"
      >
        <span class="background__circle" :class="circleBackgroundColor"></span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="corner-top hidden fill-current"
          :class="selctedTextColor"
          width="20"
          height="20"
          viewBox="0 0 30 30.004"
        >
          <path
            id="Subtraction_11"
            data-name="Subtraction 11"
            d="M60.008,60.008h-30a30.037,30.037,0,0,0,30-30v30Z"
            transform="translate(-30.009 -30.004)"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="corner-bottom hidden fill-current"
          :class="selctedTextColor"
          width="20"
          height="20"
          viewBox="0 0 30 30.004"
        >
          <path
            id="Subtraction_11"
            data-name="Subtraction 11"
            d="M60.008,60.008h-30a30.037,30.037,0,0,0,30-30v30Z"
            transform="translate(-30.009 -30.004)"
          />
        </svg>
      </div>

      <div class="h-5 w-full bg-offgray spacer" data-index="0"></div>

      <!-- Home -->
      <NuxtLink
        to="/partners-portal"
        class="sidemenu__link mb-2.5"
        data-theme-bg="bg-gray-1000"
        data-theme-text="text-orange-dark"
        data-theme-circle="bg-orange-dark"
        data-index="1"
      >
        <div class="link__title">
          <svg
            id="Capa_1"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 460.298 460.297"
            class="fill-current text-orange-dark ml-0.5"
            style="enable-background: new 0 0 460.298 460.297"
            xml:space="preserve"
          >
            <g>
              <g>
                <path
                  d="M230.149,120.939L65.986,256.274c0,0.191-0.048,0.472-0.144,0.855c-0.094,0.38-0.144,0.656-0.144,0.852v137.041
			c0,4.948,1.809,9.236,5.426,12.847c3.616,3.613,7.898,5.431,12.847,5.431h109.63V303.664h73.097v109.64h109.629
			c4.948,0,9.236-1.814,12.847-5.435c3.617-3.607,5.432-7.898,5.432-12.847V257.981c0-0.76-0.104-1.334-0.288-1.707L230.149,120.939
			z"
                />
                <path
                  d="M457.122,225.438L394.6,173.476V56.989c0-2.663-0.856-4.853-2.574-6.567c-1.704-1.712-3.894-2.568-6.563-2.568h-54.816
			c-2.666,0-4.855,0.856-6.57,2.568c-1.711,1.714-2.566,3.905-2.566,6.567v55.673l-69.662-58.245
			c-6.084-4.949-13.318-7.423-21.694-7.423c-8.375,0-15.608,2.474-21.698,7.423L3.172,225.438c-1.903,1.52-2.946,3.566-3.14,6.136
			c-0.193,2.568,0.472,4.811,1.997,6.713l17.701,21.128c1.525,1.712,3.521,2.759,5.996,3.142c2.285,0.192,4.57-0.476,6.855-1.998
			L230.149,95.817l197.57,164.741c1.526,1.328,3.521,1.991,5.996,1.991h0.858c2.471-0.376,4.463-1.43,5.996-3.138l17.703-21.125
			c1.522-1.906,2.189-4.145,1.991-6.716C460.068,229.007,459.021,226.961,457.122,225.438z"
                />
              </g>
            </g>
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
          </svg>

          <p
            class="sidemenu__label home transition-all duration-500 ease-in-out"
            :class="collapse ? 'opacity-0' : 'opacity-100 delay-500'"
          >
            Partner Portal
          </p>
        </div>
      </NuxtLink>

      <!-- Archive -->
      <NuxtLink
        to="/profile/information"
        class="sidemenu__link mb-2.5"
        data-theme-bg="bg-gray-1000"
        data-theme-text="text-green-1100"
        data-theme-circle="bg-green-1100"
        data-index="2"
      >
        <div class="link__title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 47.24 37.79"
            class="fill-current text-green-1100 ml-0.5"
            width="20"
            height="20"
          >
            <g id="Layer_2" data-name="Layer 2">
              <g id="Poster_1" data-name="Poster 1">
                <path
                  id="ic_storage_24px"
                  data-name="ic storage 24px"
                  d="M0,37.79H47.24V28.34H0ZM4.72,30.7H9.45v4.73H4.72ZM0,0V9.45H47.24V0ZM9.45,7.09H4.72V2.36H9.45ZM0,23.62H47.24V14.17H0Zm4.72-7.09H9.45v4.73H4.72Z"
                />
              </g>
            </g>
          </svg>

          <p
            class="sidemenu__label archive transition-all duration-500 ease-in-out"
            :class="collapse ? 'opacity-0' : 'opacity-100 delay-500'"
          >
            Profile
          </p>
        </div>
      </NuxtLink>

      <!-- Search -->
      <NuxtLink
        to="/users"
        class="sidemenu__link mb-2.5"
        data-theme-bg="bg-gray-1000"
        data-theme-text="text-purple-midlight"
        data-theme-circle="bg-purple-midlight"
        data-index="3"
      >
        <div class="link__title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 47.27 47.27"
            class="fill-current text-purple-midlight ml-0.5"
            width="20"
            height="20"
          >
            <g id="Layer_2" data-name="Layer 2">
              <g id="Poster_1" data-name="Poster 1">
                <path
                  id="ic_search_24px"
                  data-name="ic search 24px"
                  d="M33.8,29.75H31.67L30.91,29A17.57,17.57,0,1,0,29,30.91l.73.76V33.8l13.5,13.47,4-4Zm-16.2,0A12.15,12.15,0,1,1,29.75,17.6,12.15,12.15,0,0,1,17.6,29.75Z"
                />
              </g>
            </g>
          </svg>

          <p
            class="sidemenu__label search transition-all duration-500 ease-in-out"
            :class="collapse ? 'opacity-0' : 'opacity-100 delay-500'"
          >
            Users
          </p>
        </div>
      </NuxtLink>

      <div class="flex-grow w-full bg-offgray spacer" data-index="14"></div>
    </div>
  </div>
</template>

<script>
// import SharpArchiveLogo from './SharpArchiveLogo.vue'
import { storeToRefs } from "pinia";
import { useSidebarStore } from "~/stores/the-sidebar";
export default {
  // components: { SharpArchiveLogo },

  layout: "home",
  setup() {
    const { setIsSqueeze } = useSidebarStore();
    const { isSqueeze } = storeToRefs(useSidebarStore());
    return {
      isSqueeze,
      setIsSqueeze,
    };
  },
  data() {
    return {
      showSidebar: false,
      offsetTopPx: 20,
      activeLinkIndex: -1,
      circleBackgroundColor: "bg-orange-dark",
      backgroundColor: "bg-ash-default",
      textBackgroundColor: "text-ash-default",
      selctedTextColor: "text-ash-1000",
      selectedBgColor: "bg-ash-1000",
      fade: false,
      collapse: true,
    };
  },

  watch: {
    $route(to, from) {
      this.$nextTick(() => this.animate());
    },
  },

  mounted() {
    this.animate();
  },

  methods: {
    getRadius(index) {
      const radius = "";
      // if (parseInt(index) - 1 === this.activeLinkIndex) {
      //   radius = "rounded-tr-2xl";
      // } else if (parseInt(index) + 1 === this.activeLinkIndex) {
      //   radius = "rounded-br-2xl";
      // } else {
      //   radius = "";
      // }

      return radius;
    },
    animate() {
      // const activeLink = event.target.closest(".sidemenu__link");
      const activeLink = document.querySelector(".router-link-active");
      const oldPreviousLink = document.querySelector(".rounded-br-2xl");
      if (oldPreviousLink) {
        oldPreviousLink.classList.remove("rounded-br-2xl");
      }
      const oldNextLink = document.querySelector(".rounded-tr-2xl");
      if (oldNextLink) {
        oldNextLink.classList.remove("rounded-tr-2xl");
      }
      // const previousLink = activeLink.previousSibling
      // const nextLink = activeLink.nextSibling

      // setTimeout(() => {
      const backgroundColor = activeLink.dataset.themeBg;
      const textBackgroundColor = "text-gray-1000";
      const circleBackgroundColor = activeLink.dataset.themeCircle;
      const activeLinkIndex = activeLink.dataset.index;
      this.activeLinkIndex = parseInt(activeLinkIndex);
      this.circleBackgroundColor = circleBackgroundColor;
      this.backgroundColor = backgroundColor;
      this.textBackgroundColor = textBackgroundColor;
      this.offsetTopPx = activeLink.offsetTop;
      // previousLink.classList.add('rounded-br-2xl')
      // activeLink.classList.add('bg-gradient')
      // nextLink.classList.add('rounded-tr-2xl')
      // }, 2000)
    },
    squeeze() {
      this.collapse = false;
      this.setIsSqueeze(true);
    },
    notSqueeze() {
      this.collapse = true;
      this.setIsSqueeze(false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Neuton");
.a {
  fill: #cecece;
}
.b {
  filter: url(#a);
}
.neuton-font {
  font-family: "Neuton", serif;
}
.sidemenu__label {
  color: #8e8e8e;
}
.sidebar {
  width: 100px;
  min-width: 100px;
  overflow: hidden;
  z-index: 300;
  background-color: #171d26;
  // filter: blur(10px);
  // -webkit-filter: blur(10px);

  &__header {
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    // width: 200px;
    // min-width: 200px;

    // .sidemenu__label {
    //   opacity: 1;
    // }

    .sidemenu__link {
      &.bg-gradient {
        background: linear-gradient(
          to right,
          rgba(33, 33, 33, 1) 20%,
          rgba(255, 255, 255, 0)
        );
      }
    }
  }
}

.sidemenu {
  height: calc(100% - 150px);
  overflow-y: hidden;
  overflow-x: hidden;
  position: relative;
  /* this will hide the scrollbar in mozilla based browsers */
  overflow: -moz-scrollbars-none;
  /* this will hide the scrollbar in internet explorers */
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */

  &::-webkit-scrollbar {
    width: 0;
    display: none;
  }
  .background {
    opacity: 1;
    // backdrop-filter: blur(6px);
    /* Add the blur effect */
    // filter: blur(1px);
    // -webkit-filter: blur(1px);
    background-color: #f1f2f6; /* Fallback color */
    // background-color: #393e46; /* Black w/opacity/see-through */
    position: absolute;
    left: 27px;
    z-index: 10;
    width: calc(100% - 27px);
    transition: margin-top 0.5s ease-in-out;
    height: 40px;
    @apply flex rounded-l-full;

    .background__circle {
      opacity: 1;
      width: 40px;
      height: 40px;
      // left: 27px;
      position: relative;
      z-index: 50;
      transition: all 0.5s ease-in-out;
      @apply rounded-full inline-block;
    }

    .corner-top {
      opacity: 1 !important;
      position: absolute;
      top: -20px;
      right: 0;
      display: inline-block;
      color: #f1f2f6;
    }

    .corner-bottom {
      opacity: 1 !important;
      position: absolute;
      bottom: -20px;
      right: 0;
      transform: rotate(270deg);
      display: inline-block;
      color: #f1f2f6;
    }
  }

  .router-link-active {
    position: relative;
    .link__title {
      > svg {
        @apply text-white;
      }
    }
    // ~ .sidemenu__link {
    //   border-top-right-radius: 30px;
    // }
  }

  .router-link-exact-active .home {
    color: #e4801d;
  }

  .router-link-exact-active .archive {
    color: #8db230;
  }

  .router-link-exact-active .search {
    color: #7d80bd;
  }

  .router-link-exact-active .alert {
    color: #ff5959;
  }

  .router-link-exact-active .settings,
  .router-link-exact-active .help {
    color: #e0ad1f;
  }

  &__link {
    outline: none;
    // transition: background 0.2s ease-in;
    // transition: border-top-right-radius .5s ease-in, border-bottom-right-radius .5s ease-in;
    //@apply flex bg-offgray;

    .link__title {
      margin-left: 25px;
      z-index: 100;
      @apply p-2.5 flex w-full items-center relative;

      > svg {
        transition: all 0.5s ease-in-out;
      }
    }
    // &.bg-gradient {
    //   // background: transparent;
    //   background: linear-gradient(
    //     to right,
    //     rgba(33, 33, 33, 1) 50%,
    //     rgba(255, 255, 255, 0) 70%,
    //     transparent
    //   );
    // }
    // &::before {
    //   content: '';
    //   opacity: 1;
    //   width: 45px;
    //   height: 100%;
    //   // left: -27px;
    //   position: absolute;
    //   // z-index: 10;
    //   //@apply bg-offgray;
    // }
  }

  &__label {
    font-size: 20px;
    position: absolute;
    transform: translate(45px, -1px);
    // opacity: 0;
    white-space: nowrap;
    // transition: all 0.5s ease-in;
    // transition-delay: 0.5s;
  }
}
.width-200 {
  width: 200px;
  min-width: 200px;
}
</style>
