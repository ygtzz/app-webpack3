<template>
    <div class="test stage">
        <h2>test</h2>
        <c-swiper>
            <c-swiperItem>
                <div class="slide">
                    1
                </div>
            </c-swiperItem>
            <c-swiperItem>
                <div class="slide">
                    2
                </div>
            </c-swiperItem>
            <c-swiperItem>
                <div class="slide">
                    3
                </div>
            </c-swiperItem>
            <c-swiperItem>
                <div class="slide">
                    4
                </div>
            </c-swiperItem>
        </c-swiper>
        <div class="luck-unit" style="margin-top:500px;"></div>
        
    </div>
</template>
<style lang="sass" scoped>
    .slide{width:750px;height:300px;text-align:center;font-size:80px;line-height:300px;}
    .slide:nth-child(1){background-color:pink;}
    .slide:nth-child(2){background-color:lightgreen;}
    .slide:nth-child(3){background-color:pink;}
    .luck-unit{width:174px;height:167px;background-color:green;}
</style>
<script>
import Vue from 'vue';
import swiper from 'index/widget/swiper.vue';
import swiperItem from 'index/widget/swiperItem.vue';

console.log(swiper.name);
console.log(swiperItem.name);

Vue.component(swiper.name, swiper);
Vue.component(swiperItem.name, swiperItem);

export default {
    name:'v-test',
    created() {
        
    },
    data() {
      return {
        
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
        
    },
    filters:{
        
    }
}
</script>