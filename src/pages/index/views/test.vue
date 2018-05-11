<template>
    <div class="test stage">
        <h2>test</h2>
        <div class="slider2c">
            <c-slider class="slider" :loop="true" :dir="dir">
                <c-slider-item v-for="n in list" :key="'slider' + n">
                    <div class="slide">{{n}}</div>
                </c-slider-item>
            </c-slider>
        </div>
    </div>
</template>
<style lang="sass" scoped>
    //height required
    .slider{height:300px;background-image:url('http://pic2.ooopic.com/10/55/95/20b1OOOPICfa.jpg');background-size:cover;}
    .slide{width:100%;height:300px;text-align:center;font-size:80px;line-height:300px;}
    .slide:nth-child(1){background-color:pink;}
    .slide:nth-child(2){background-color:lightgreen;}
    .slide:nth-child(3){background-color:pink;}
    .slider2c{
        margin-top:50px;
    }
</style>
<script>
import Vue from 'vue';
import 'vue-countdown2/dist/vue-countdown.css';
// in ES6 modules
import { countdown } from 'vue-countdown2';
import { slider, sliderItem } from 'index/widget/slider';

Vue.component('c-countdown',countdown);

export default {
    name:'v-test',
    created() {
        setTimeout(() => {
            this.list = [1,2,3,4];
        },3000);
    },
    data() {
      return {
        list:[],
        dir:'vertical'
      }
    },
    watch:{
        
    },
    computed:{
       data(){
           return {

           }
       }
    },
    methods:{
        
    },
    components:{
        'c-slider': slider,
        'c-slider-item': sliderItem
    },
    filters:{
        
    }
}
</script>