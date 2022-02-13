<template>
    <div class="input-box">
        <fieldset class="material">
                <input type="text" autocomplete="off" required class="body-text strong-font">
                <hr>
                <label class="body-text">Your Name</label>
        </fieldset>
        <div class="icon-box">
            <Icon size="64" class="go-button">
                <ArrowRight />
            </Icon>
            <LoadingIcon />
        </div>
    </div>
</template>

<script>
import {Icon} from '@vicons/utils';
import ArrowRight from '@vicons/material/ArrowRightAltSharp';
import LoadingIcon from '@/components/LoadingIcon.vue';

export default {
    name: "InputBox",
    components:{
        Icon,
        ArrowRight,
        LoadingIcon
    },
    data(){
        return {
            name: "noName"
        }
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