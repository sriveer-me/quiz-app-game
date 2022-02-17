<template>
    <div class="input-box">
        <fieldset class="material">
                <input type="text" autocomplete="off" required class="body-text strong-font">
                <hr>
                <label class="body-text">Your Name</label>
        </fieldset>
        <div class="icon-box">
            
            <Transition
                enter-active-class="animate__animated animate__fadeInLeft"
                leave-active-class="animate__animated animate__fadeOutRight"
            >
                <Icon size="64" color="#514A4A" class="go-button" v-show="state === 'ready'" @click="goClicked">
                    <ArrowRight />
                </Icon>
            </Transition>

            <Transition
                enter-active-class="animate__animated animate__fadeInLeft"
                leave-active-class="animate__animated animate__fadeOutRight"
            >
                <LoadingIcon v-show="state === 'loading'"/>
            </Transition>

			<Transition
                enter-active-class="animate__animated animate__fadeIn"
                leave-active-class="animate__animated animate__fadeOutRight"
            >
                <Icon size="64" color="#514A4A" class="go-button" v-show="state === 'finished'" @click="goClicked">
                    <FinishedIcon />
                </Icon>
            </Transition>

        </div>
    </div>
</template>

<script>
import {Icon} from '@vicons/utils';
import ArrowRight from '@vicons/material/ArrowRightAltSharp';
import LoadingIcon from '@/components/LoadingIcon.vue';
import FinishedIcon from '@vicons/fa/CheckCircle';

export default {
    name: "InputBox",
    components:{
        Icon,
        ArrowRight,        
        LoadingIcon,
        FinishedIcon
    },
    data(){
        return {
            name: "noName",
            state: "ready"
        }
    },
    methods:{
        goClicked(){
            this.state = "transition";
            setTimeout(function(){
                this.state = "loading"
            }.bind(this),2000)

			setTimeout(function(){
				this.state = "transition"
			}.bind(this),5000)

			setTimeout(function(){
				this.state = "finished"
			}.bind(this),7000)
        }
    },
    beforeMount(){
        // this.icon = ReadyIcon;
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_settings.scss';

.input-box{
    position: relative;
    display: flex;
}
.icon-box{
    cursor: pointer;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
	
	max-width: 64px;
	min-width: 64px;
	overflow-x: hidden;
}


.material {
	position: relative;
	padding: 0;
	margin: 5px;
	border: none;
	overflow: visible;
	
	input {
		box-sizing: border-box;
		width: 100%;
		padding: 12px 10px 8px;
		border: none;
		border-radius: 0;
		box-shadow: none;
		border-bottom: 1px solid #DDD;
		font-size: 120%;
		outline: none;
		cursor: text;

		&::-webkit-input-placeholder {
			transition: color 300ms ease;
		}
		&:not(:focus)::-webkit-input-placeholder {
			color: transparent;
		}
	}
	
	hr {
		content: '';
		display: block;
		position: absolute;
		bottom: 0;
		left: 0;
		margin: 0;
		padding: 0;
		width: 100%;
		height: 2px;
		border: none;
		background: #607D8B;
		font-size: 1px;
		will-change: transform, visibility;
		transition: all 200ms ease-out;
		transform: scaleX(0);
		visibility: hidden;
		z-index: 10;
	}
	input:focus ~ hr {
		transform: scaleX(1);
		visibility: visible;
	}
	
	label {
		position: absolute;
		top: 10px;
		left: 10px;
		font-size: 120%;
		color: #607D8B;
		transform-origin: 0 -150%;
		transition: transform 300ms ease;
		pointer-events: none;
	}
	input:focus ~ label,
	input:valid ~ label {
		transform: scale(0.6);
	}
}

input[type="text"]{
    font-size: 64px;
}

</style>