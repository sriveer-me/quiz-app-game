<template>
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
</template>

<style lang="scss">
    @import '@/assets/scss/_settings.scss';
    @import '@/assets/scss/_breakpoints.scss';

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