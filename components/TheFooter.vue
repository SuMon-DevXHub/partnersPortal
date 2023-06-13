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
              id="Capa_1"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 460.298 460.297"
              class="fill-current text-orange-dark"
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
          </div>
        </NuxtLink>
        <NuxtLink
          :id="profile ? 'active' : ''"
          to="/profile/information"
          class="sidemenu__link"
          data-theme-bg="bg-gray-1000"
          data-theme-text="text-green-1100"
          data-theme-circle="bg-green-1100"
          data-index="2"
          @click.native="activeArchive"
        >
          <div class="link__title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 47.24 37.79"
              class="fill-current text-green-1100"
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
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 47.27 47.27"
              class="fill-current text-purple-midlight"
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
    if (this.$route.matched[0].path === "/profile") {
      this.activeArchive();
    }
    if (this.$route.name === "users") {
      this.activeSearch();
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
      setTimeout(() => {
        this.animate();
      });
    },
    activeArchive() {
      this.partnersPortal = false;
      this.profile = true;
      this.users = false;
      setTimeout(() => {
        this.animate();
      });
    },
    activeSearch() {
      this.partnersPortal = false;
      this.profile = false;
      this.users = true;
      setTimeout(() => {
        this.animate();
      });
    },
    activeAlert() {
      this.partnersPortal = false;
      this.profile = false;
      this.users = false;
      setTimeout(() => {
        this.animate();
      });
    },
    animate() {
      // const activeLink = document.querySelector('.nuxt-link-active')
      if (
        this.partnersPortal === true ||
        this.profile === true ||
        this.users === true
      ) {
        const activeLink = document.getElementById("active");
        this.activeLink = activeLink;
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
  z-index: 300;
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
  .router-link-exact-active .home {
    color: #e4801d;
  }
  .router-link-exact-active .archive {
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
