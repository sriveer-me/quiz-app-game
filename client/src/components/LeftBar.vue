<template>
    <div class="left-bar">
        <div class="icon-box">
            <Icon size="32" color="#514A4A">
                <Linkedin />
            </Icon>
            <Icon size="32" color="#514A4A">
                <FirefoxBrowser />
            </Icon>
            <Icon size="32" color="#514A4A">
                <Github />
            </Icon>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/scss/_settings.scss';
    @import '@/assets/scss/_breakpoints.scss';
    
    .left-bar{
        grid-area: left-bar;
        border-left: 1px solid $dark;
        border-right: 1px solid $dark;
        border-bottom: 1px solid $dark;

        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .icon-box{
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: var(--spacing-large);
        
        margin-bottom: var(--spacing-larger);
    }
</style>

<script>
import {Icon} from '@vicons/utils';
import Linkedin from '@vicons/fa/Linkedin'
import FirefoxBrowser from '@vicons/fa/FirefoxBrowser'
import Github from '@vicons/fa/Github'

export default {
    name: "LeftBar",
    components:{
        Icon,
        Linkedin,
        FirefoxBrowser,
        Github
    }
}
</script>