<template>
  <header
    class="md:flex hidden flex-row items-center px-6 bg-[#171D26] py-4 box_shadow rounded-br-3xl"
  >
    <div class="flex flex-row items-center ml-auto space-x-1 cursor-pointer">
      <div class="flex flex-row items-center space-x-4">
        <transition name="header">
          <div class="flex flex-row items-center space-x-3">
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
</template>

<style lang="scss" scoped>
@import "~/assets/scss/theheader.scss";
</style>
