<template>
    <div class="frame">
        <h1 class="icon-area icon-font">QZ</h1>
        <TopBar />
        <LeftBar />
        <div class="content-area">
            <div class="question">
                <h1 class="subtitle-font">Q1.What was the capital of the roman diocese of the east?</h1>
                <h2 class="body-text">The Diocese of the East (Latin: Dioecesis Orientis; Greek: Διοίκησις Ἑῴα) was a diocese of the later Roman Empire, incorporating the provinces of the western Middle East, between the Mediterranean Sea and Mesopotamia. During late Antiquity, it was one of the major commercial, agricultural, religious and intellectual areas of the empire, and its strategic location facing the Sassanid Empire and the unruly desert tribes gave it exceptional military importance.</h2>
            </div>
            <div class="answer-options">
                <Checkbox name="answers" value="answer-1" labelName="Hanna"/>
            </div>
        </div>
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

    //relating to content-area start

    .content-area{
        padding-top: var(--spacing-large);
        padding-left: var(--spacing-small);
        padding-right: var(--spacing-small);
    }
    .question{
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-small);
    }
    
</style>

<script>
import {isMobile,isTablet,isDesktop} from '@/js/breakpoints.js';

import TopBar from '@/components/TopBar.vue';
import LeftBar from '@/components/LeftBar.vue';
import Checkbox from '@/components/Checkbox.vue';

export default {
    name: "App",
    components:{
        TopBar,
        LeftBar,
        Checkbox
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