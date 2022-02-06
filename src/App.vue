<template>
    <div class="frame">
        <h1 class="icon-area icon-font">QZ</h1>
        <TopBar />
        <div class="left-bar">
            <div class="icon-box">
                <Icon size="32" color="#514A4A">
                    <Linkedin />
                </Icon>
                <Icon size="32" color="#514A4A">
                    <FirefoxBrowser />
                </Icon>
                <Icon size="32" color="#514A4A">
                    <Github />
                </Icon>
            </div>
        </div>
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
            padding: var(--spacing-large);

            grid-template-columns: 100px 1fr;
            grid-template-rows: 100px 1fr;
        }
    }

    .icon-area{
        grid-area: icon-area;
        border: 1px solid $dark;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    .icon-box{
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: var(--spacing-normal);
        
        margin-bottom: var(--spacing-large);
    }

    .left-bar{
        grid-area: left-bar;
        border-left: 1px solid $dark;
        border-right: 1px solid $dark;
        border-bottom: 1px solid $dark;

        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
</style>

<script>
import {isMobile,isTablet,isDesktop} from '@/js/breakpoints.js';
import TopBar from '@/components/TopBar.vue';

import {Icon} from '@vicons/utils';
import Linkedin from '@vicons/fa/Linkedin'
import FirefoxBrowser from '@vicons/fa/FirefoxBrowser'
import Github from '@vicons/fa/Github'

export default {
    name: "App",
    components:{
        TopBar,
        Icon,
        Linkedin,
        FirefoxBrowser,
        Github
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