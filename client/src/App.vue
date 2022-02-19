<template>
    <n-config-provider :theme-overrides="themeOverrides"> 
        <n-message-provider>
            <Frame />
        </n-message-provider>
    </n-config-provider>
</template>

<script>
    import { NMessageProvider,NConfigProvider } from 'naive-ui'
    import Frame from '@/components/Frame.vue'
    import {getHighScores} from '@/js/serverCommunication.js';

    const themeOverrides = {
        common: {
            errorColor: '#F00',
        }
    }

    export default {
        name: "App",
        components:{
            NMessageProvider,
            NConfigProvider,
            Frame
        },
        data(){
            return{
                themeOverrides
            }
        },
        async created(){
            await getHighScores();
            console.log('back-end server working');
        }
    }
</script>

<style lang="scss">
@import '@/assets/scss/reset.scss';
@import '@/assets/scss/_font.scss';
</style>