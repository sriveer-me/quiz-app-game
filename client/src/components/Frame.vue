<template>
    <div class="frame">
        <h1 class="icon-area icon-font">QZ</h1>
        <TopBar :timerValue="gameTimeString" :gameScore="gameScore"/>
        <LeftBar />
        <div class="content-area">
            <transition enter-active-class="animate__animated animate__fadeIn animate__faster" leave-active-class="animate__animated animate__fadeOut animate__faster">
                <MCQ 
                    v-if="showQuestion"
                    :showQuestionNumber="gameStarted"
                    :question="question" :questionContext="questionContext" :questionNumber="gameQuestionNumber"
                    :label1="option1" :label2="option2" :label3="option3"
                    ref="questionRef"
                />
            </transition>
            <transition enter-active-class="animate__animated animate__fadeIn animate__faster" leave-active-class="animate__animated animate__fadeOut animate__faster">
                <InputBox 
                    v-show="showInputBox" 
                    @inputName:changed="inputNameChanged" @input:submit="nameSubmited"
                    ref="inputBoxComp"
                />
            </transition>
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
import InputBox from '@/components/InputBox.vue';

import {Icon} from '@vicons/utils';
import ArrowRight from '@vicons/fa/ArrowRight';

import { defineComponent, h } from "vue";
import { NAlert, useMessage } from "naive-ui";

import { Timer } from "easytimer.js";

import {easyQuestions} from '@/json/Questions.js';

import {getHighScores,postScore} from '@/js/serverCommunication.js'

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
        InputBox,

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
            gameEnded: false,
            gameTimer: new Timer(),
            gameTimeString: "00:00",
            gameScore: 0,
            gameQuestionNumber: 0,

            playerName: "noName",

            showQuestion: true,
            showInputBox: false,
            question: "this is a test question",
            questionContext: "this is a test question context",
            option1: "option-1",
            option2: "option-2 ",
            option3: "option-3",
            correctOption: null,

            message: useMessage()
        }
    },
    methods:{
        calculateScore(){
            let baseScore = 10000;

            let timeTaken = this.gameTimer.getTimeValues().minutes * 60;
            timeTaken = timeTaken + this.gameTimer.getTimeValues().seconds;

            let questionsPenalty = this.gameQuestionNumber - 10;

            baseScore = baseScore - (timeTaken * 20) - (questionsPenalty * 100);

            if(baseScore < 0)
                baseScore = 0;

            console.log(`calculated baseScore : ${baseScore}`);

            return baseScore;

        },

        inputNameChanged(newValue){
            this.playerName = newValue;
        },
        
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
            
            if(this.gameEnded === true){
                if(selectedAnswer === null){
                    this.message.error('An option has to be selected Here. please try selecting a relevant option using the checkboxes provided.',{
                        render: renderMessage,
                        closable: true
                    })
                    return;
                }

                if(selectedAnswer === 1){
                    //the option retry is selected initialize the game
                    this.startGame();
                }
                else if(selectedAnswer === 2){
                    //redirect to my personal website for now.

                }
                else if(selectedAnswer === 3){
                    //open a modal to show off the leaderboards

                }
                return;
            }

            if(this.gameStarted === false){
                if(selectedAnswer === null){
                    this.message.error('An option has to be selected to start the game. please try selecting a relevant option using the checkboxes provided.',{
                        render: renderMessage,
                        closable: true
                    })
                    return;
                }
                
                //start the game here
                this.startGame();
                return;
            }

            //game is running.. 
            //step-1 calculate score
            if(selectedAnswer === this.correctOption){
                if(this.gameScore === 9){
                    this.endGame();
                    return;
                }
                else this.gameScore++;
            }
            else if(this.gameScore != 0)
                this.gameScore--;

            //step-2 update to new question if game did not end
            this.$refs.questionRef.clearSelection();
            this.updateQuestion();
        },
        startGame(){
            this.gameTimer.reset();
            this.gameQuestionNumber = 0;
            this.updateQuestion();
            this.$refs.questionRef.clearSelection();

            this.gameScore = 9

            this.gameStarted = true;
            this.gameEnded = false;
        },
        async endGame(){
            this.gameEnded = true;
            this.gameTimer.stop();

            this.showQuestion = false;
            
            setTimeout(function(){
                this.showInputBox = true;
            }.bind(this),500);
        },
        async nameSubmited(){
            await postScore({
                name: this.playerName,
                score: this.calculateScore()
            });

            let highScores = await getHighScores();
                
            this.question = "Congratulations!! On Achieving 10 points and Finishing The Game"
            this.questionContext = `Your rank has been posted on the global leaderboards. The current AUGUSTUS on the leaderboards is ${highScores[0].name} with a score of ${highScores[0].score}. The title CEASER is held by ${highScores[1].name} with a score of ${highScores[1].score}. PRAETORIAN PREFECT ${highScores[2].name} has ${highScores[2].score} points.`

            this.option1 = "Retry"
            this.option2 = "Contact Dev"
            this.option3 = "Leaderboard"

            this.$refs.inputBoxComp.setFinished();
            this.showInputBox = false;
            setTimeout(function(){
                this.showQuestion = true;
            }.bind(this),2000)
        },

        updateQuestion(){
            this.showQuestion = false;
            this.gameQuestionNumber = this.gameQuestionNumber + 1;

            let randNumber = parseInt(this.randomNumberInRange(0,easyQuestions.length));
            this.question = easyQuestions[randNumber].question;
            this.questionContext = easyQuestions[randNumber].questionContext;
            this.option1 = easyQuestions[randNumber].options[0];
            this.option2 = easyQuestions[randNumber].options[1];
            this.option3 = easyQuestions[randNumber].options[2];
            this.correctOption = easyQuestions[randNumber].correctOption;

            setTimeout(function(){
                this.showQuestion = true;
            }.bind(this),2000)
        },

        randomNumberInRange(min, max) {
            return Math.random() * (max - min) + min;
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

        this.gameTimer.addEventListener("secondsUpdated", function (e) {
            this.gameTimeString = `${this.gameTimer.getTimeValues().minutes.toString().padStart(2,0)}:${this.gameTimer.getTimeValues().seconds.toString().padStart(2,0)}`
        }.bind(this));
    }
}
</script>