<template>
    <div class="frame">
        <div class="icon-area"></div>
        <div class="top-bar"></div>
        <div class="left-bar"></div>
        <div class="content-area"></div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/scss/reset.scss';
    @import '@/assets/scss/_font.scss';
    @import '@/assets/scss/_settings.scss';
    @import '@/assets/scss/_breakpoints.scss';

    .frame{
        display: grid;
        grid-template-columns: 50px 1fr;
        grid-template-rows: 50px 1fr;
        grid-template-areas: 
            "icon-area top-bar"
            "left-bar content-area";
        
        height: 100vh;

        @include for-tablet-portrait-up{
            grid-template-columns: 100px 1fr;
            grid-template-rows: 100px 1fr;
        }
    }

    .icon-area{
        grid-area: icon-area;
        
    }
</style>