<template>
    <div class="question">
        <h1 class="subtitle-font">Q1.What was the capital of the roman diocese of the east?</h1>
        <h2 class="body-text">The Diocese of the East (Latin: Dioecesis Orientis; Greek: Διοίκησις Ἑῴα) was a diocese of the later Roman Empire, incorporating the provinces of the western Middle East, between the Mediterranean Sea and Mesopotamia. During late Antiquity, it was one of the major commercial, agricultural, religious and intellectual areas of the empire, and its strategic location facing the Sassanid Empire and the unruly desert tribes gave it exceptional military importance.</h2>
        <Checkbox class="first-box" name="answers" value="1" labelName="Antioch" ref="checkboxRef"/>
        <Checkbox name="answers" value="2" labelName="Byzantium"/>
        <Checkbox name="answers" value="3" labelName="Alexandria"/>
    </div>
</template>

<script>
import Checkbox from '@/components/Checkbox.vue';

export default {
    name: "QuestionComponent",
    components:{
        Checkbox
    },
    data(){
        return {
            getSelectedAnswer(){
                let answers = this.$el.querySelectorAll('input[type=radio]');
                answers = [...answers]
                let answer = answers.filter(function(ele){
                    return ele.checked;
                })[0];

                console.log(parseInt(answer.value));
            }
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/_settings.scss';
@import '@/assets/scss/_breakpoints.scss';

.question{
    margin: auto;
    display: flex;
    flex-direction: column;
    row-gap: var(--spacing-small);

    @include for-desktop-up{
        max-width: 100ch;
    }

    .first-box{
        margin-top: var(--spacing-large);
    }
}
</style>