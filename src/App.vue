<template>
    <div class="frame">
        <h1 class="icon-area icon-font">QZ</h1>
        <TopBar />
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
            margin: var(--spacing-large);

            grid-template-columns: 100px 1fr;
            grid-template-rows: 100px 1fr;
        }
    }

    .icon-area{
        grid-area: icon-area;
        border-top: 1px solid $dark;
        border-left: 1px solid $dark;

        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<script>
import {isMobile,isTablet,isDesktop} from '@/js/breakpoints.js';

import TopBar from '@/components/TopBar.vue';

export default {
    name: "App",
    components:{
        TopBar
    },
    data(){
        return{
            isMobile: true,
            isTablet: false,
            isDesktop: false
        }
    },
    methods:{
        checkDevice(){
            if(isMobile() === true){
                this.isMobile = true;
                this.isTablet = false;
                this.isDesktop = false;
            }
            else if(isTablet() === true){
                this.isMobile = false;
                this.isTablet = true;
                this.isDesktop = false;
            }
            else if(isDesktop() === true){
                this.isMobile = false;
                this.isTablet = false;
                this.isDesktop = true;
            }
            else console.log('for some reason this device is detected as not a mobile,tablet or desktop');
        }
    },
     created(){
        this.checkDevice();
        window.addEventListener('resize',this.checkDevice.bind(this));
    }
}
</script>