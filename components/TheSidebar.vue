<template>
  <div
    class="absolute left-0 top-0 h-full transition-all duration-500 ease-in-out rounded-br-3xl sidebar hidden md:block neuton-font"
    :class="collapse ? 'w-26' : 'width-200 delay-500'"
    @mouseover="squeeze()"
    @mouseleave="notSqueeze()"
  >
    <div class="sidebar__header">
      <a href="/" target="_self" rel="noopener noreferrer" class="h-full">
        <BaseIconSharpArchiveLogo />
      </a>
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
            id="Layer_2"
            data-name="Layer 2"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 26.23 26.23"
            class="fill-current text-orange-dark ml-0.5"
          >
            <g id="Layer_2-2" data-name="Layer 2">
              <g>
                <path
                  d="m15.83,0C18.77,0,21.7,0,24.64,0c.01.01.02.03.04.03,1.09.33,1.55.96,1.55,2.08,0,3.71,0,7.41,0,11.12,0,1.27-.8,2.07-2.06,2.07-2.64,0-5.28,0-7.91,0-.2,0-.41-.02-.61-.07-.9-.23-1.45-.97-1.45-1.96,0-2.38,0-4.76,0-7.15,0-1.37,0-2.75,0-4.12,0-.89.46-1.58,1.24-1.88C15.57.08,15.7.04,15.83,0Z"
                />
                <path
                  d="m0,24.64C0,20.61,0,16.58,0,12.55c0-.01.02-.03.03-.04.33-1.11.96-1.58,2.11-1.58,2.6,0,5.19,0,7.79,0,.22,0,.45.02.66.07.89.22,1.44.97,1.44,1.96,0,2.81,0,5.62,0,8.43,0,.96,0,1.91,0,2.87-.01,1.13-.82,1.97-1.92,1.98-2.73,0-5.46,0-8.2,0-.87,0-1.59-.56-1.84-1.4-.02-.06-.05-.12-.07-.19Z"
                />
                <path
                  d="m10.4,0c.32.15.67.26.95.47.48.36.68.89.68,1.48,0,1.61.01,3.23,0,4.84,0,1.12-.82,1.94-1.95,1.95-2.71.01-5.41,0-8.12,0-.96,0-1.67-.58-1.91-1.51C.04,7.2.02,7.16,0,7.12,0,5.28,0,3.43,0,1.59c.03-.09.07-.17.09-.26C.27.81.6.43,1.09.19c.16-.07.33-.13.49-.19,2.94,0,5.87,0,8.81,0Z"
                />
                <path
                  d="m20.22,26.23c-1.33,0-2.66,0-3.99,0-1.21,0-2.02-.81-2.03-2.02,0-1.56,0-3.12,0-4.68,0-1.23.81-2.04,2.04-2.04,2.65,0,5.29,0,7.94,0,1.25,0,2.05.81,2.05,2.05,0,1.55,0,3.11,0,4.66,0,1.23-.81,2.03-2.04,2.03-1.32,0-2.65,0-3.97,0Z"
                />
              </g>
            </g>
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
            id="Layer_2"
            data-name="Layer 2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            class="fill-current text-green-1100 ml-0.5"
            width="20"
            height="20"
          >
            <g id="Layer_2-2" data-name="Layer 2">
              <path
                id="ic_account_circle_24px"
                data-name="ic account circle 24px"
                d="m15,0C6.72,0,0,6.72,0,15s6.72,15,15,15,15-6.72,15-15C30,6.72,23.28,0,15,0Zm0,4.5c2.49,0,4.5,2.01,4.5,4.5s-2.01,4.5-4.5,4.5-4.5-2.01-4.5-4.5c0-2.48,2.01-4.5,4.49-4.5,0,0,0,0,.01,0Zm0,21.3c-3.62,0-7-1.81-9-4.83.05-2.99,6-4.62,9-4.62s8.95,1.64,9,4.62c-2,3.02-5.38,4.83-9,4.83Z"
              />
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
            id="Layer_2"
            data-name="Layer 2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30.95 26.03"
            class="fill-current text-purple-midlight ml-0.5"
            width="20"
            height="20"
          >
            <g id="Layer_2-2" data-name="Layer 2">
              <g>
                <path
                  d="m0,14.59c.06-.25.11-.51.17-.76.67-2.64,2.89-4.41,5.62-4.44,1.3-.02,2.6,0,3.9,0,.12,0,.24,0,.29,0,.21.73.33,1.46.61,2.11.28.64.73,1.21,1.12,1.81-1.62.53-2.93,1.55-3.85,3.06-.93,1.51-1.05,3.18-.95,4.93-2.39-.13-4.67-.62-6.91-1.33,0-1.79,0-3.59,0-5.38Z"
                />
                <path
                  d="m23.44,21.84c0,.83,0,1.65,0,2.48,0,.19-.06.29-.23.37-1.17.56-2.42.88-3.69,1.08-3.73.59-7.38.15-10.97-.93q-.58-.18-.59-.8c0-1.43-.02-2.86,0-4.29.07-3.05,2.42-5.51,5.46-5.65,1.59-.07,3.18-.06,4.77.01,2.25.11,4.43,1.95,4.99,4.16.15.58.2,1.19.24,1.79.04.59,0,1.19,0,1.78Z"
                />
                <path
                  d="m19.6,13.27c1.08-1.09,1.65-2.37,1.71-3.88.93,0,1.82,0,2.72,0,.84,0,1.69-.04,2.52.17,2.42.63,4.23,2.69,4.36,5.19.09,1.71.02,3.42.02,5.16-2,.97-4.15,1.31-6.4,1.42,0-.16,0-.31,0-.46.01-1.03,0-2.05-.33-3.05-.71-2.14-2.13-3.61-4.23-4.42-.11-.04-.22-.08-.37-.14Z"
                />
                <path
                  d="m11.17,9.22c0-2.5,2.01-4.53,4.52-4.55,2.49-.01,4.54,2.02,4.55,4.52.02,2.5-2.03,4.55-4.54,4.55-2.51,0-4.52-2.01-4.53-4.52Z"
                />
                <path
                  d="m3.2,4.52C3.21,2.22,4.97.25,7.23.02c2.38-.23,4.51,1.32,4.96,3.64.03.17.04.34.07.51.06.39-.05.68-.37.96-.89.79-1.45,1.79-1.68,2.97-.04.19-.12.31-.3.41-3.03,1.65-6.72-.53-6.71-3.98Z"
                />
                <path
                  d="m23.22,0c2.4,0,4.42,1.91,4.52,4.26.11,2.49-1.66,4.55-4.1,4.78-.75.07-1.47-.04-2.15-.33-.1-.04-.2-.17-.22-.27-.27-1.63-1.07-2.93-2.44-3.86-.18-.12-.15-.26-.14-.42C18.88,1.81,20.86,0,23.22,0Z"
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
