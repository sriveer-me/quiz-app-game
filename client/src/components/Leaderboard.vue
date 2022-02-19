<template>
    <!-- eslint-disable-next-line -->
    <n-modal v-model:show="showModal">
        <n-card
            style="width: 600px;"
            title="Leaderboard"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
        >
            <n-table striped>
                    <thead>
                        <tr>
                            <th class="subtitle-font">Name</th>
                            <th class="subtitle-font">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(highScore,index) in highScores" :key="index+'leaderboard-table-row'">
                            <td class="body-text">{{highScore.name}}</td>
                            <td class="body-text">{{highScore.score}}</td>
                        </tr>
                    </tbody>
                </n-table>
        </n-card>
    </n-modal>
</template>

<script>
import {NModal,NCard,NTable} from 'naive-ui';
import {getHighScores} from '@/js/serverCommunication.js';

export default {
    name: "Leaderboard",
    components:{
        NModal,
        NCard,
        NTable
    },
    props:{
        highScores:{
            default: {
                name: "Default Entry",
                score: "No Score Provided"
            },
            type: Object
        }
    },
    data(){
        return{
            showModal: false
        }
    },
    methods:{
        show(){
            this.showModal = true;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_settings.scss';
@import '@/assets/scss/_breakpoints.scss';
</style>