<template>
    <div class="left-bar">
        <div class="icon-box">
            <Icon color="#514A4A" class="left-bar-icon">
                <Linkedin />
            </Icon>
            <Icon color="#514A4A" class="left-bar-icon">
                <FirefoxBrowser />
            </Icon>
            <Icon color="#514A4A" class="left-bar-icon">
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

    .left-bar-icon{
        transition: font-size 0.5s ease-in-out;
        font-size: 32px;
        cursor: pointer;
    }
    .left-bar-icon:hover{
        font-size: 64px;
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