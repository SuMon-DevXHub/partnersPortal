<template>
  <div
    class="fixed transition-all duration-500 ease-in-out w-full sidebar px-5 md:hidden"
    :class="isShowFooter ? 'show' : 'hide'"
  >
    <div ref="sidemenu" class="sidemenu flex flex-row items-center">
      <div class="background" :style="{ 'margin-left': `${offsetLeftPx}px` }">
        <span class="background__circle" :class="circleBackgroundColor"></span>
      </div>
      <div class="w-full flex flex-row justify-around items-center">
        <NuxtLink
          :id="partnersPortal ? 'active' : ''"
          to="/partners-portal"
          class="sidemenu__link"
          data-theme-bg="bg-gray-1000"
          data-theme-text="text-orange-dark"
          data-theme-circle="bg-orange-dark"
          data-index="1"
          @click.native="activeHome"
        >
          <div class="link__title">
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 26.23 26.23"
              class="fill-current text-orange-dark"
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
          </div>
        </NuxtLink>
        <NuxtLink
          :id="profile ? 'active' : ''"
          to="/partners-profile/information"
          class="sidemenu__link"
          :class="
            $route.matched[0].name === 'partners-profile' ? 'activeRoute' : ''
          "
          data-theme-bg="bg-gray-1000"
          data-theme-text="text-green-1100"
          data-theme-circle="bg-green-1100"
          data-index="2"
          @click.native="activeArchive"
        >
          <div class="link__title">
            <svg
              id="Layer_2"
              data-name="Layer 2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              class="fill-current text-green-1100"
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
          </div>
        </NuxtLink>
        <NuxtLink
          :id="users ? 'active' : ''"
          to="/users"
          class="sidemenu__link"
          data-theme-bg="bg-gray-1000"
          data-theme-text="text-purple-midlight"
          data-theme-circle="bg-purple-midlight"
          data-index="3"
          @click.native="activeSearch"
        >
          <div class="link__title">
            <svg
              id="Layer_3"
              data-name="Layer 3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30.95 26.03"
              class="fill-current text-purple-midlight"
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
          </div>
        </NuxtLink>
        <NuxtLink
          :id="payment ? 'active' : ''"
          to="/payment-method"
          class="sidemenu__link"
          data-theme-bg="bg-gray-1000"
          data-theme-text="text-orange-midlight"
          data-theme-circle="bg-orange-midlight"
          data-index="4"
          @click.native="activeSearch"
        >
          <div class="link__title">
            <svg
              id="Layer_2"
              data-name="Layer 2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 479.07 479.03"
              class="fill-current text-orange-midlight ml-0.5"
              width="20"
              height="20"
            >
              <g id="Layer_2-2" data-name="Layer 2">
                <g>
                  <path
                    d="m120.75,31.74c1.82.05,3.65.15,5.47.15,54,0,108.01-.03,162.01.05,6.4,0,12.79.71,19.19.97,12.93.54,21.89,7.4,29.17,17.51,5.47,7.58,6.41,16.32,6.54,24.96.4,26.41.15,52.84.15,79.26v4.8h31.51c.22-.4.37-.53.37-.67.03-44.86.19-89.73-.08-134.59-.05-8.14-3.36-15.47-11.03-19.87-2.58-1.48-5.2-2.88-7.79-4.31h-217.55c-4.94,2.66-10.42,4.03-14.15,9.11-5,6.8-5.16,14.12-4.64,21.83.27.27.55.54.82.81Z"
                  />
                  <path
                    d="m479,299.46c-.02-18.48-9.46-27.78-26.94-27.86-38.48-.18-76.98-.1-115.43,1.08-21.37.66-36.47,13.16-44.79,32.24-7.88,18.08-6.53,36.47,4.68,53.25,10.48,15.69,25.23,24.58,44.31,24.95,18.44.37,36.9.08,55.35.08,19.61,0,39.23.02,58.84-.03,1.75,0,3.56-.23,5.24-.72,12.11-3.51,18.54-12.29,18.69-25.15.23-19.28.08-38.56.05-57.84Zm-111.9,28.09c-1.07,15.75-13.77,24.22-25.44,23.83-11.16-.37-23.21-11.14-22.33-23.99-.5-13.47,10.17-23.58,22.75-23.93,13.47-.38,25.87,11.57,25.02,24.09Z"
                  />
                  <path
                    d="m103.78,159.47c0-7.83-.02-15.44,0-23.05.02-5.85,2.74-8.62,8.62-8.7,18.81-.23,36.78-15.91,38.33-34.96.94-11.6,2.65-12.93,14.21-12.93,23.94,0,47.87,0,71.81,0,7.15,0,10.7,3.3,10.72,10.31.06,18.88,17.8,37.27,37.43,37.59,7.06.12,10.45,3.59,10.47,10.58.02,7.08,0,14.15,0,21.25h31.94c0-29.56.15-58.64-.17-87.71-.05-4.12-1.75-8.56-3.79-12.24-5.05-9.07-13.68-11.78-23.53-11.78-35.24.03-70.48,0-105.72.01-33.08,0-66.16-.05-99.24.08-12.76.05-22.95,10.42-22.97,22.82-.05,27.1-.03,54.19-.04,81.29,0,2.44,0,4.89,0,7.43h31.93Z"
                  />
                  <path
                    d="m275.3,142.6c-16.94-4.01-29.88-13.51-37.67-29.26-2.6-5.26-4.21-11.02-6.28-16.54-.28-.27-.55-.54-.83-.81-20.96,0-41.91.01-62.87.02-.26.26-.52.52-.77.79-.41,1.39-.84,2.76-1.21,4.16-2.54,9.5-6.89,17.97-13.78,25.11-8.86,9.18-19.45,15.09-31.79,17.03v16.31h159.31c0-4.1-.2-7.91.06-11.69.23-3.26-.99-4.36-4.17-5.11Z"
                  />
                  <path
                    d="m395.63,111.77c8.7.03,11.53,2.9,11.54,11.73,0,6.3,0,12.61,0,18.91v16.93h15.96c0-13.27.32-26.21-.18-39.12-.16-4.3-1.68-8.93-3.83-12.69-6.05-10.59-16.33-12.2-27.93-11.63v15.88c1.84,0,3.14,0,4.45,0Z"
                  />
                  <path
                    d="m144.1,269.55c-30.96-1.44-50.73,23.07-52.08,46.77-1.61,28.3,22.3,54.19,52.43,52.31,23.59-1.47,46.9-21.39,46.62-49.66.29-27.69-22.14-48.26-46.97-49.41Zm5.83,72.53c-3.13.67-3.08,2.28-2.76,4.3.69,4.38-3.12,5.69-6.25,5.09-2.68-.51-3.15-2.9-3.6-5.09-.2-.94-.03-1.96-.03-3.37-2.45,0-4.62.06-6.78-.01-3.47-.12-5.67-2.19-5.68-5.2,0-3.04,1.8-4.77,5.5-4.86,4.81-.13,9.62-.02,14.43-.06,3.39-.03,5.73-1.89,5.68-4.4-.05-2.47-2.53-4.35-5.68-4.51-4.19-.2-8.65.28-12.5-1-6.59-2.18-9.74-8.87-9.25-13.96.57-5.94,3.54-11.97,12.01-13.24,1.84-.28,2.31-1.27,2.32-3.08.03-4.38,1.82-6.16,5.56-6.12,3.01.03,4.31,1.53,4.24,4.46-.12,5.33-.16,4.67,4.79,4.76,2.14.04,4.54-.81,5.8,2.21,1.4,3.35-.33,6.89-3.94,6.99-5.02.13-10.06.02-15.08.05-3.63.03-5.99,1.82-6,4.47-.02,2.74,2.49,4.54,6.19,4.65,3.22.1,6.43.44,9.64.61,6.27.34,11.31,6.62,11.7,13.42.32,5.55-4.5,12.63-10.3,13.87Z"
                  />
                  <path
                    d="m450.37,399.17c-37.91,0-75.82.31-113.73-.16-14.25-.18-26.9-6.43-37.94-15.14-13.24-10.44-22.27-24.11-25.73-40.65-4.96-23.7.34-45.01,16.57-63.49,10.83-12.33,24.29-19.71,40.15-22.92,4.46-.9,9.1-1.27,13.66-1.28,35.25-.1,70.5-.06,105.75-.06h5.94v-24.01c0-9.64.19-19.29-.05-28.93-.24-9.46-2.58-18.39-11.78-22.97-4.59-2.29-10.13-3.76-15.25-3.76-127.2-.2-254.4-.19-381.6-.12-16.07,0-29.97-14.78-30.57-30.53-.57-14.85,9.65-28.84,22.16-31.79,5.66-1.33,11.6-1.47,17.7-2.19v-15.09c-15.84-1.6-30.11,2.12-41.56,13.31-6.98,6.82-12.13,15.12-13.21,25.3-.04.37-.57.69-.87,1.03v304.37c2.93,8.09,5.76,16.08,11.8,22.73,8.41,9.27,18.53,15.96,30.84,15.99,129.53.32,259.05.21,388.58.18,11.81,0,22.34-9.09,22.68-20.86.56-19.48.15-38.99.15-58.96-.79,0-2.24,0-3.68,0Zm-250.01-72.33c-1.25,9.49-4.4,18.08-9.92,25.84-9.52,13.39-22.39,21.66-38.41,25.1-1.19.26-2.4.45-3.6.67h-14.43c-4.61-1.31-9.33-2.34-13.81-4-12.7-4.69-22.27-13.33-29.39-24.67-4.37-6.96-6.8-14.64-8.01-22.85-1.91-12.97.53-25.02,6.68-36.36,8.02-14.78,20.24-24.57,36.5-28.78,5.64-1.46,11.67-2.15,17.49-1.98,13.61.41,25.81,4.94,36.41,13.84,9.74,8.18,16,18.4,19.22,30.53,1.97,7.42,2.27,14.95,1.26,22.65Z"
                  />
                </g>
              </g>
            </svg>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script>
import { storeToRefs } from "pinia";
import { useFooterStore } from "~/stores/the-footer";
export default {
  layout: "home",
  setup(props) {
    const { isShowFooter } = storeToRefs(useFooterStore());

    return {
      isShowFooter,
    };
  },
  data() {
    return {
      offsetLeftPx: 16,
      activeLinkIndex: -1,
      circleBackgroundColor: "bg-orange-dark",
      backgroundColor: "bg-orange-dark",
      textBackgroundColor: "text-ash-default",
      partnersPortal: false,
      profile: false,
      users: false,
      payment: false,
      activeLink: "",
      prevRoute: "partners-portal",
    };
  },

  // computed: {
  //   hideMobileHeader() {
  //     return this.$store.getters["header/getHideMobileHeader"];
  //   },
  // },

  watch: {
    $route(to, from) {
      if (to !== from) {
        if (to.name === "partners-portal") {
          this.activeHome();
        }
        if (to.matched[0].path === "/profile") {
          this.activeArchive();
        }
        if (to.name === "users") {
          this.activeSearch();
        }
        if (to.name === "payment-method") {
          this.activePayment();
        }
      }
    },
    // hideMobileHeader(data) {
    //   if (!data) {
    //     if (this.$route.name === "partners-portal") {
    //       this.activeHome();
    //     }
    //   }
    // },
  },

  mounted() {
    if (this.$route.name === "partners-portal") {
      this.activeHome();
    }
    if (this.$route.matched[0].name === "partners-profile") {
      this.activeArchive();
    }
    if (this.$route.name === "users") {
      this.activeSearch();
    }
    if (this.$route.name === "payment-method") {
      this.activePayment();
    }
    window.addEventListener("resize", this.animate);
  },

  destroyed() {
    setTimeout(() => {
      window.removeEventListener("resize", this.animate);
    }, 2000);
  },

  methods: {
    activeHome() {
      this.partnersPortal = true;
      this.profile = false;
      this.users = false;
      this.payment = false;
      setTimeout(() => {
        this.animate();
      });
    },
    activeArchive() {
      this.partnersPortal = false;
      this.profile = true;
      this.users = false;
      this.payment = false;
      setTimeout(() => {
        this.animate();
      });
    },
    activeSearch() {
      this.partnersPortal = false;
      this.profile = false;
      this.users = true;
      this.payment = false;
      setTimeout(() => {
        this.animate();
      });
    },
    activePayment() {
      this.partnersPortal = false;
      this.profile = false;
      this.users = false;
      this.payment = true;
      setTimeout(() => {
        this.animate();
      });
    },
    activeAlert() {
      this.partnersPortal = false;
      this.profile = false;
      this.users = false;
      this.payment = false;
      setTimeout(() => {
        this.animate();
      });
    },
    animate() {
      // const activeLink = document.querySelector('.nuxt-link-active')
      if (
        this.partnersPortal === true ||
        this.profile === true ||
        this.users === true ||
        this.payment === true
      ) {
        const activeLink = document.getElementById("active");
        this.activeLink = activeLink;
        if (this.activeLink) {
          setTimeout(() => {
            const backgroundColor =
              this.activeLink && this.activeLink.dataset.themeBg;
            const textBackgroundColor = "text-gray-1000";
            const circleBackgroundColor = this.activeLink.dataset.themeCircle;
            const activeLinkIndex = this.activeLink.dataset.index;
            this.activeLinkIndex = parseInt(activeLinkIndex);
            this.circleBackgroundColor = circleBackgroundColor;
            this.backgroundColor = backgroundColor;
            this.textBackgroundColor = textBackgroundColor;
            this.offsetLeftPx = this.activeLink.offsetLeft;
          }, 100);
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.sidemenu__label {
  color: #8e8e8e;
}
.sidebar {
  height: 65px;
  bottom: -65px;
  z-index: 2;
  // z-index: 300;
  background-color: #171d26;
  border-radius: 16px 16px 0 0;
  &__header {
    height: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.show {
  bottom: 0px;
}
.hide {
  bottom: -65px;
}
.sidemenu {
  height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  position: relative;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0;
    display: none;
  }
  .background {
    opacity: 1;
    position: absolute;
    z-index: 10;
    transition: margin-left 0.5s ease-in-out;
    height: 40px;
    @apply flex rounded-l-full;
    .background__circle {
      opacity: 1;
      width: 40px;
      height: 40px;
      position: relative;
      z-index: 50;
      transition: all 0.5s ease-in-out;
      @apply rounded-full inline-block;
    }
  }
  .router-link-active {
    position: relative;
    .link__title {
      > svg {
        @apply text-white;
      }
      p {
        @apply font-bold;
      }
    }
  }
  .activeRoute {
    position: relative;
    .link__title {
      > svg {
        @apply text-white;
      }
      p {
        @apply font-bold;
      }
    }
  }
  .router-link-exact-active .home {
    color: #e4801d;
  }
  .activeRoute .archive {
    color: #8db230;
  }
  .router-link-exact-active .search {
    color: #7d80bd;
  }
  &__link {
    outline: none;
    .link__title {
      z-index: 100;
      @apply p-2.5 flex w-full items-center relative;
      > svg {
        transition: all 0.5s ease-in-out;
      }
    }
  }
}
</style>
