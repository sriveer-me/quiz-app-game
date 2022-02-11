<template>
    <label class="check-box" @mouseover="hover = true" @mouseleave="hover = false" :data-name="name">
        <input type="radio" :name="name" :value="value" @click="onClicked">
        <span class="hero-font">{{labelName}}</span>
    </label>
</template>

<style lang="scss" scoped>
    @import '@/assets/scss/_settings.scss';
    @import '@/assets/scss/_breakpoints.scss';
    
    .check-box{
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        column-gap: var(--spacing-small);
    }
    
    input[type="radio"]{
        transition: 0.25s background-color ease-in-out;
        appearance: none;
        
        margin: 0;
        width: 48px;
        height: 48px;
        @include for-tablet-portrait-up{
            width: 64px;
            height: 64px;
        }

        border-radius: 50%;
        border: 1px solid black;
        background-color: #fff;

        cursor: pointer;
        display: grid;
        place-items: center;
        overflow-y: hidden;
    }
    input[type="radio"]:hover{
        background-color: $dark;
    }

    input[type="radio"]::before{
        transition: 0.25s transform ease-in-out;

        content: '';

        width: 32px;
        height: 32px;
        background-color: $light;
        border-radius: 50%;

        transform: scale(0);
    }

    input[type="radio"]:checked{
        background-color: $dark;
    }

    input[type="radio"]:checked::before{
        transform: scale(1);
    }

</style>

<script>
export default {
    name: "Checkbox",
    props:{
        name:{
            default: "Byzantium",
            type: String
        },
        labelName:{
            default: "def-group",
            type: String
        },
        value:{
            default: "no-value",
            type: String
        }
    },
    data(){
        return{
            hover: false,
            checked: false
        }
    },
    watch:{
        hover(newValue){
            if(newValue === false){
                //if the element is checked.. dont remove filled-in else remove filled-in
                let radioElement = this.$el.querySelector('input[type="radio"]');
                if(radioElement.checked === false){
                    let heroFont = this.$el.querySelector('.hero-font');
                    heroFont.classList.remove('filled-in');
                }
            }
            else {
                //whatever the case filled in must be applied
                let heroFont = this.$el.querySelector('.hero-font');
                heroFont.classList.add('filled-in');
            }
        }
    },
    methods:{
        onClicked(){
            //remove filled-in from all checkboxes of the same name
            let checkboxes = document.querySelectorAll('.check-box');
            checkboxes.forEach(function(element){
                if(element.dataset.name === this.name){
                    let heroFont = element.querySelector('.hero-font');
                    heroFont.classList.remove('filled-in');
                }
            }.bind(this))

            let heroFont = this.$el.querySelector('.hero-font');
            heroFont.classList.add('filled-in');
        }
    }
}
</script>