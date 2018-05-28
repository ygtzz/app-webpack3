<template>
    <div class="test stage">
        <h2>test</h2>
        <div class="imgc" style="margin-top:0">
            <img src="" data-src="/static/images/1.jpg" alt="">
            <img src="" data-src="/static/images/2.jpg" alt="">
            <img src="" data-src="/static/images/3.jpg" alt="">
        </div>
        <div class="imgc">
            <img src="" data-src="/static/images/4.jpg" alt="">
            <img src="" data-src="/static/images/5.jpg" alt="">
            <img src="" data-src="/static/images/6.jpg" alt="">
        </div>
        <div class="imgc horizontal">
            <img src="" data-src="/static/images/7.jpg" alt="">
            <img src="" data-src="/static/images/8.jpg" data-defer="3000" alt="">
        </div>
    </div>
</template>
<style lang="sass" scoped>
   .imgc{
        margin-top:250px;
    }
    img{width:300px;height:200px;display:block;margin-top:50px;}
    .horizontal{overflow: hidden;}
    .horizontal *{float:left;margin-left:50px;}
    .horizontal :first-child{margin-left:0;}
</style>
<script>
import Vue from 'vue';
import {LazyLoad} from 'my-lazyload';

export default {
    name:'v-test',
    created() {
        
    },
    mounted(){
        console.log(LazyLoad);
        new LazyLoad({
            imgSelector:'img[data-src]',
            threshold: 250
        });
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
        
    },
    filters:{
        
    }
}
</script>