<script setup>
import Logo from "~/assets/img/icon/logo.svg";
import { storeToRefs } from "pinia";
import { useHeaderStore } from "~/stores/the-header";
import { useFooterStore } from "~/stores/the-footer";
import { useProfileStore } from "~/stores/the-profile";

const logo = ref(Logo);
// pinia
const { setIsUserModal } = useHeaderStore();
const { setIsShowFooter } = useFooterStore();
const { setIsShowProfile } = useProfileStore();
const { isShowFooter } = storeToRefs(useFooterStore());
</script>

<template>
  <section>
    <header
      class="md:flex hidden flex-row items-center px-6 bg-[#171D26] py-4 box_shadow rounded-br-3xl"
    >
      <div class="flex flex-row items-center ml-auto space-x-1 cursor-pointer">
        <div class="flex flex-row items-center space-x-4">
          <transition name="header">
            <div
              class="flex flex-row items-center space-x-3"
              @click.stop="setIsShowProfile(true)"
            >
              <p class="text-xl font-bold lg:block hidden text-[#F1F2F6]">
                Hi, Chad Gordon
              </p>
              <ClientOnly>
                <fa
                  :style="{ color: `#e4801d` }"
                  class="text-3xl mr-2"
                  :icon="['fas', 'user-circle']"
                />
              </ClientOnly>
              <!-- <p
              v-if="loggedIn"
              class="text-xl font-bold block lg:hidden name-color"
            >
              {{ `${user.firstName}` }}
            </p> -->
              <!-- <p v-else class="text-xl font-bold name-color">Guest</p> -->
            </div>
          </transition>
        </div>
      </div>
    </header>
    <header
      class="md:hidden relative flex justify-between items-center flex-nowrap py-3 px-3 shadow-lg rounded-b-2xl bg-[#171D26]"
    >
      <div
        class="w-[21px] h-[24px]"
        @click="isShowFooter ? setIsShowFooter(false) : setIsShowFooter(true)"
      >
        <ClientOnly>
          <fa
            class="w-full h-full"
            :class="
              $route.name === 'partners-portal'
                ? 'text-[#e4801d]'
                : $route.matched[0].path === '/profile'
                ? 'text-[#8DB230]'
                : 'text-[#7D80BD]'
            "
            :icon="['fas', 'fa-bars']"
          />
        </ClientOnly>
      </div>
      <div>
        <img
          class="w-9 h-9 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          :src="logo"
          alt="SharpArchive Logo"
        />
      </div>
      <div class="flex space-x-4">
        <div v-if="$route.name === 'users'" @click="setIsUserModal(true)">
          <svg
            id="Capa_1"
            enable-background="new 0 0 512 512"
            height="25"
            viewBox="0 0 512 512"
            width="25"
            class="fill-current"
            :class="
              $route.name === 'partners-portal'
                ? 'text-[#e4801d]'
                : $route.matched[0].path === '/profile'
                ? 'text-[#8DB230]'
                : 'text-[#7D80BD]'
            "
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="m420.041 0h-328.082c-50.708 0-91.959 41.251-91.959 91.959v328.081c0 50.709 41.251 91.96 91.959 91.96h328.082c50.708 0 91.959-41.251 91.959-91.959v-328.082c0-50.708-41.251-91.959-91.959-91.959zm12.649 399.561h-164.091c-14.422 42.69-75.006 42.755-89.449 0h-99.84c-19.922 0-19.927-30.118 0-30.118h99.84c14.421-42.69 75.006-42.755 89.449 0h164.091c19.922 0 19.928 30.118 0 30.118zm0-128.502h-35.589c-14.422 42.69-75.006 42.755-89.45 0h-228.341c-19.922 0-19.927-30.118 0-30.118h228.342c14.421-42.69 75.006-42.755 89.45 0h35.589c19.921 0 19.927 30.118-.001 30.118zm0-128.502h-228.342c-14.422 42.69-75.006 42.755-89.449 0h-35.589c-19.922 0-19.927-30.118 0-30.118h35.589c14.421-42.69 75.006-42.755 89.449 0h228.342c19.922 0 19.928 30.118 0 30.118z"
              />
              <path
                d="m223.875 367.435c-22.581 0-22.569 34.133 0 34.133 22.58.001 22.568-34.133 0-34.133z"
              />
              <path
                d="m159.624 110.431c-22.581 0-22.569 34.133 0 34.133 22.58.001 22.568-34.133 0-34.133z"
              />
              <path
                d="m352.376 238.933c-22.581 0-22.569 34.133 0 34.133 22.581.001 22.569-34.133 0-34.133z"
              />
            </g>
          </svg>
        </div>
        <div @click.stop="setIsShowProfile(true)">
          <ClientOnly>
            <fa
              :class="
                $route.name === 'partners-portal'
                  ? 'text-[#e4801d]'
                  : $route.matched[0].path === '/profile'
                  ? 'text-[#8DB230]'
                  : 'text-[#7D80BD]'
              "
              class="text-2xl text-right"
              :icon="['fas', 'user-circle']"
            />
          </ClientOnly>
        </div>
      </div>
    </header>
  </section>
</template>

<style lang="scss" scoped>
@import "~/assets/scss/theheader.scss";
</style>
