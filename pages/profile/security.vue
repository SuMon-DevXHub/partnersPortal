<script setup lang="ts"></script>

<template>
  <div class="xl:px-4">
    <h2 class="text-[#8DB230] text-lg pt-[30px]">Account Security</h2>
    <p class="text-[#656565] text-base">Update your account security</p>
    <div class="px-4 xl:px-8 mt-10">
      <div class="text-xl font-bold">Two-Factor Authentication</div>
      <p class="mt-6">
        Your account is secured with two-factor authentication.
      </p>
      <div class="flex flex-col ml-4 space-y-3 mt-4">
        <div class="flex justify-between w-full">
          <div class="font-bold w-1/3">Delivery Preference</div>
          <div class="w-1/3">email</div>
          <NuxtLink
            to="/profile/information"
            class="text-[#8DB230] cursor-pointer w-1/3 text-center"
            >edit</NuxtLink
          >
        </div>

        <div class="flex justify-between w-full">
          <div class="font-bold w-1/3">Email Address</div>
          <div class="w-1/3">hudacse6@gmail.com</div>
          <NuxtLink
            to="/profile/information"
            class="text-[#8DB230] cursor-pointer w-1/3 text-center"
            >edit</NuxtLink
          >
        </div>

        <div class="flex justify-between w-full">
          <div class="font-bold w-1/3">Phone Number</div>
          <div class="w-1/3">+8801745-969697</div>
          <NuxtLink
            to="/profile/information"
            class="text-[#8DB230] cursor-pointer w-1/3 text-center"
            >edit</NuxtLink
          >
        </div>
      </div>
      <div class="text-[#8DB230] text-end mt-4">
        Turn off two-factor authentication
      </div>
    </div>
  </div>
</template>

<style scoped></style>
