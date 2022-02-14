<template>
    <div class="loader-wrapper">
      <div class="loader"></div>
    </div> 
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_settings.scss';

.loader {
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid $dark;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>