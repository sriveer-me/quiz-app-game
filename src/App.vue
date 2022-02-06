<template>
    <div class="frame">
        <h1 class="icon-area icon-font">QZ</h1>
        <div class="top-bar">
            <div class="top-bar-box time-box">
                <h2 class="subtitle-font">Time</h2>
                <h3 class="body-text">0:00</h3>
            </div>
            <div class="top-bar-box score-box">
                <h2 class="subtitle-font">Score</h2>
                <div class="score-box__internal">
                    <h3 class="subtitle-font light-color">0</h3>
                </div>
            </div>
        </div>
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

    .top-bar{
        grid-area: top-bar;
        border: 1px solid $dark;
        padding: 0 var(--spacing-large);

        display: flex;
        justify-content: space-between;
        align-items: center;

        .time-box{
            display: flex;

            flex-direction: row;
            column-gap: var(--spacing-small);
            row-gap: 0;
            align-items: flex-end;
            h3{
                margin-bottom: 1px;
            }

            @include for-tablet-portrait-up{
                flex-direction: column;
                column-gap: 0;
                row-gap: var(--spacing-small);
                align-items: center;
                h3{
                    margin-bottom: 0;
                }
            }
        }

        .score-box{
            display: flex;
            flex-direction: row;
            column-gap: var(--spacing-small);

            .score-box__internal{
                border-radius: 100%;
                width: 32px;
                height: 32px;
                background-color: $dark;

                display: flex;
                justify-content: center;

                @include for-tablet-portrait-up{
                    width: 64px;
                    height: 64px;

                    align-items: center;
                    h3.subtitle-font{ //this is important for specificy reasons
                        font-size: 64px;
                    }
                }
            }

            @include for-tablet-portrait-up{
                align-items: center;
            }
        }
    }
</style>

<script>
import {isMobile,isTablet,isDesktop} from '@/js/breakpoints.js';

export default {
    name: "App",
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