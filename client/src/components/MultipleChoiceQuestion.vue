<template>
    <div class="question">
        <h1 class="subtitle-font"><span v-show="showQuestionNumber">Q{{questionNumber}}.</span>{{question}}</h1>
        <h2 class="body-text">{{questionContext}}</h2>
        <Checkbox class="first-box" name="answers" value="1" :labelName="label1" ref="checkbox1"/>
        <Checkbox name="answers" value="2" :labelName="label2" ref="checkbox2"/>
        <Checkbox name="answers" value="3" :labelName="label3" ref="checkbox3"/>
    </div>
</template>

<script>
import Checkbox from '@/components/Checkbox.vue';

export default {
    name: "QuestionComponent",
    components:{
        Checkbox
    },
    props:{
        showQuestionNumber: {
            default: true,
            type: Boolean
        },
        questionNumber:{
            default: 0,
            type: Number
        },

        question:{
            default: "Question Placeholder",
            type: String
        },
        questionContext:{
            default: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor est voluptate enim, atque provident explicabo. Velit voluptate molestiae doloribus fugit! Laudantium soluta, nam atque earum quos expedita voluptates hic dolore excepturi veritatis voluptatibus eveniet explicabo laboriosam enim ex eos cumque voluptas quibusdam est temporibus suscipit a necessitatibus. Beatae commodi esse ducimus, distinctio quae maiores facilis perferendis laboriosam, omnis reprehenderit veritatis.",
            type: String
        },

        label1:{
            default: "Option 1",
            type: String
        },
        label2:{
            default: "Option 2",
            type: String
        },
        label3: {
            default: "Option 3",
            type: String
        }
    },
    data(){
        return {
            checkboxes: []
        }
    },
    methods: {
        checkBoxAdded(ele){
            if(this.che)
            this.checkboxes.push(ele);

        },

        //this method returns null if no option is selected or either 1,2,3 depending on the option selected.
        getSelectedAnswer(){
            let answers = this.$el.querySelectorAll('input[type=radio]');
            answers = [...answers]
            let answer = answers.filter(function(ele){
                return ele.checked;
            });
            answer = answer.map(function(ele){
                return parseInt(ele.value);
            })
            answer = answer[0] || null;
            return answer;
        },
        clearSelection(){
            this.$refs.checkbox1.clear();
            this.$refs.checkbox2.clear();
            this.$refs.checkbox3.clear();
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