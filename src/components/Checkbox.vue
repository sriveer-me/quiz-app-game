<template>
    <label class="check-box">
        <input type="radio" :name="name" :value="value">
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
    }
    
    input[type="radio"]{
        transition: 0.25s background-color ease-in-out;
        appearance: none;
        
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
    }
    input[type="radio"]:hover{
        background-color: $dark;
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
    }
}
</script>