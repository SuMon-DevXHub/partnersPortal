<script setup>
const file = ref([]);
const selectFile = ref("");
const personalInfoForm = ref(null);
const onFileSelected = (event) => {
  let reader;
  if (window.FileReader) {
    file.value = event.target.files[0];
    if (file.value) {
      reader = new FileReader();
      reader.onload = (event) => {
        selectFile.value = event.target.result;
      };
      reader.readAsDataURL(file.value);
    }
  }
};
onMounted(() => {
  selectFile.value = personalInfoForm.value.personalAvatar;
  if (selectFile.value === "") {
    selectFile.value = "https://i.ibb.co/vJ0XKh8/profile-Edit-Pencil.png";
  }
});
</script>

<template>
  <div class="text-center md:text-left md:px-[8%]">
    <h2 class="text-[#8DB230] text-lg py-[30px]">
      Update your personal information
    </h2>
    <div
      @click="$refs.fileInput.click()"
      class="w-fit cursor-pointer mx-auto md:mx-0"
    >
      <img
        :src="selectFile"
        class="w-[64px] md:w-[104px] h-[64px] md:h-[104px]"
        alt=""
        srcset=""
      />
      <input
        ref="fileInput"
        style="display: none"
        type="file"
        accept="image/*"
        @change="onFileSelected"
      />
    </div>
    <p class="text-[#E8EBED] text-base">Allowed file types: png, jpg, jpeg.</p>
    <PersonalInformationForm
      ref="personalInfoForm"
      class="text-left"
      :image-upload="file"
    />
  </div>
</template>

<style scoped></style>
