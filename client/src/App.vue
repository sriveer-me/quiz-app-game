<template>
    <n-message-provider>
        <Frame />
    </n-message-provider>
</template>

<script>
    import { NMessageProvider } from 'naive-ui'
    import Frame from '@/components/Frame.vue'

    export default {
        name: "App",
        components:{
            NMessageProvider,
            Frame
        }
    }
</script>

<style lang="scss">
@import '@/assets/scss/reset.scss';
@import '@/assets/scss/_font.scss';
</style>