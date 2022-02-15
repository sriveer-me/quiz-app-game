<template>
    <div class="frame">
        <h1 class="icon-area icon-font">QZ</h1>
        <TopBar />
        <LeftBar />
        <div class="content-area">
            <MCQ ref="questionRef"/>
        </div>
        <div class="next-button" @click="nextClicked">
            <h1 class="subtitle-font light-color">Next</h1>
            <Icon size="32" color="#fff">
                <ArrowRight />
            </Icon>
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
        grid-area: content-area;
        padding: 0 var(--spacing-small);

        display: flex;
        flex-direction: column;
        // justify-content: center;
        // align-items: center;

        height: calc(100vh - 112px);
        overflow-y: auto;

        @include for-tablet-portrait-up{
            height: auto;
            overflow-y: hidden;
        }
    }

    //relating to next button
    .next-button{
        grid-area: content-area;
        height: 50px;
        @include for-tablet-portrait-up{
            height: 75px;
        }
        @include for-desktop-up{
            width: 128px;
            justify-self: end;
        }

        background-color: #000;
        align-self: end;
        margin: var(--spacing-small);
        @include for-tablet-portrait-up{
            margin: var(--spacing-small) var(--spacing-small) 0 var(--spacing-small);
        }

        border-radius: 3px;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-normal);

        cursor: pointer;
    }
    
</style>

<script>
import {isMobile,isTablet,isDesktop} from '@/js/breakpoints.js';

import TopBar from '@/components/TopBar.vue';
import LeftBar from '@/components/LeftBar.vue';
import MCQ from '@/components/MultipleChoiceQuestion.vue';

import {Icon} from '@vicons/utils';
import ArrowRight from '@vicons/fa/ArrowRight';

export default {
    name: "App",
    components:{
        TopBar,
        LeftBar,
        MCQ,

        Icon,
        ArrowRight
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
        },

        nextClicked(){
            this.$refs.questionRef.getSelectedAnswer();
        }
    },
     created(){
        this.checkDevice();
        window.addEventListener('resize',this.checkDevice.bind(this));
    }
}
</script>