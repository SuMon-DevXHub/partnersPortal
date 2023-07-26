<script setup lang="ts"></script>

<template>
  <div class="px-2 md:px-4 xl:px-8 py-4">
    <!-- <h2 class="text-[#8DB230] text-lg pt-[30px]">Account Security</h2> -->
    <p class="text-[#8DB230] text-lg text-center md:text-left">
      Update your account security
    </p>
    <div class="mt-[50px]">
      <div class="text-lg md:text-xl font-bold text-[#8DB230] flex space-x-5">
        <BaseIconRightTickIcon />
        <p>Two-Factor Authentication</p>
      </div>
      <p class="mt-2.5 text-[#656565]">
        Your account is secured with two-factor authentication.
      </p>
      <div class="flex flex-col space-y-3 mt-[38px]">
        <div class="flex justify-between w-full">
          <div class="flex flex-col md:flex-row md:w-2/3">
            <div class="font-bold md:w-1/2 text-[#656565]">
              Delivery Preference
            </div>
            <div class="md:w-1/2 text-[#656565]">Email</div>
          </div>
          <NuxtLink
            to="/partners-profile/information"
            class="text-[#8DB230] cursor-pointer md:w-1/3 text-center flex justify-end lg:justify-center items-start"
          >
            <BaseIconEditIcon />
          </NuxtLink>
        </div>

        <div class="flex justify-between w-full">
          <div class="flex flex-col md:flex-row md:w-2/3">
            <div class="font-bold md:w-1/2 text-[#656565]">Email Address</div>
            <div class="md:w-1/2 text-[#656565]">hudacse6@gmail.com</div>
          </div>
          <NuxtLink
            to="/partners-profile/information"
            class="text-[#8DB230] cursor-pointer md:w-1/3 text-center flex justify-end lg:justify-center items-start"
          >
            <BaseIconEditIcon />
          </NuxtLink>
        </div>

        <div class="flex justify-between w-full">
          <div class="flex flex-col md:flex-row md:w-2/3">
            <div class="font-bold md:w-1/2 text-[#656565]">Phone Number</div>
            <div class="md:w-1/2 text-[#656565]">+8801745-969697</div>
          </div>
          <NuxtLink
            to="/partners-profile/information"
            class="text-[#8DB230] cursor-pointer md:w-1/3 text-center flex justify-end lg:justify-center items-start"
          >
            <BaseIconEditIcon />
          </NuxtLink>
        </div>
      </div>
      <div class="text-[#8DB230] text-center md:text-left font-bold mt-[50px]">
        Turn off two-factor authentication
      </div>
    </div>
  </div>
</template>

<style scoped></style>
