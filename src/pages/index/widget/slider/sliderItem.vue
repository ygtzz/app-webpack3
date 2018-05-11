<template>
    <div class="sliderItem" :style="style">
        <slot></slot>
    </div>
</template>
<style lang="sass" scoped>
    .sliderItem{position:absolute;width:100%;height:100%}
</style>
<script>
export default {
    name:'c-slider-item',
    created(){
        this.$parent.init();
    },
    data(){
        return {
            style:{
                webkitTransform:'',
                webkitTransiton:''
            }
        }
    }
}
</script>
