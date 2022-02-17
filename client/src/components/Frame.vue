<template>
    <div class="frame">
        <h1 class="icon-area icon-font">QZ</h1>
        <TopBar />
        <LeftBar />
        <div class="content-area">
            <MCQ
                :showQuestionNumber="gameStarted"
                :question="question" :questionContext="questionContext" 
                :label1="option1" :label2="option2" :label3="option3"
                ref="questionRef"
            />
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

import { defineComponent, h } from "vue";
import { NAlert, useMessage } from "naive-ui";

const renderMessage = (props) => {
  const { type } = props;
  return h(NAlert, {
    closable: props.closable,
    onClose: props.onClose,
    type: type === "loading" ? "default" : type,
    title: "Please Select A Valid Option",
    style: {
      boxShadow: "var(--n-box-shadow)",
      maxWidth: "calc(100vw - 32px)",
      width: "480px"
    }
  }, {
    default: () => props.content
  });
};

export default {
    name: "Frame",
    components:{
        TopBar,
        LeftBar,
        MCQ,

        Icon,
        ArrowRight,
        NAlert
    },
    data(){
        return{
            isMobile: true,
            isTablet: false,
            isDesktop: false,

            gameStarted: false,
            question: "this is a test question",
            questionContext: "this is a test question context",
            option1: "option-1",
            option2: "option-2 ",
            option3: "option-3",

            message: useMessage()
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
            let selectedAnswer = this.$refs.questionRef.getSelectedAnswer();
            // console.log(selectedAnswer)

            if(this.gameStarted === false){
                if(selectedAnswer === null){
                    console.log('test')
                    this.message.error('An option has to be selected to start the game. please try selecting a relevant option using the checkboxes provided.',{
                        render: renderMessage,
                        closable: true
                    })
                    return;
                }
                
                //start the game here

            }
            // this.question = "next " + this.question;
            // this.questionContext = "next " + this.questionContext;
            // this.option1 = "next " + this.option1;
            // this.option2 = "next " + this.option2;
            // this.option3 = "next " + this.option3;
        }
    },
     created(){
        this.checkDevice();
        window.addEventListener('resize',this.checkDevice.bind(this));

        this.question = "the objective of the game is to achieve a score of 10 as quickly as possible"
        this.questionContext = "The game is played by selecting one of the three options given below for each question. Each right option gives the player plus 1 point while each wrong option gives the player -1 point.  Score can never go below zero. The game ends when the player successfully reaches 10 points. Questions are asked in bold on the top and this paragraph generally contains a small snipet elucidating the context of the question. The highest scores from around  the world are stored in our server for everyone to see. Achieve a high score by gaining a score of 10 in the shortest possible time with few mistakes as possible."

        this.option1 = "Easy"
        this.option2 = "Aurelian"
        this.option3 = "Majorian"
    }
}
</script>