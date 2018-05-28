<template>
    <div class="test stage">
        <h2>scroll</h2>
        <div id="scrollc" class="scrollc">
            <ul class="scrolls fix scrolls-h">
                <li class="scroll-item">1</li>
                <li class="scroll-item">2</li>
                <li class="scroll-item">3</li>
                <li class="scroll-item">4</li>
                <li class="scroll-item">5</li>
            </ul>
        </div>
    </div>
</template>
<style lang="sass" scoped>
    .scrollc{width:100%;overflow:hidden;}
    .scrolls{}
    .scrolls-h .scroll-item{width:750px;float:left;}
    .scrolls.moving{
        transition: transform .3s linear;        
        transition: -webkit-transform .3s linear;
    }
    /*debug*/
    .scroll-item {font-size:100px;text-align:center;}
</style>
<script>
import Vue from 'vue';
import {MyScroll} from './myscroll';

export default {
    name:'v-test',
    created() {
        
    },
    mounted(){
        var self = this;
        self.$nextTick(() => {
            var myscroll = new MyScroll({
                container:'#scrollc',
                direction:'left'
            });
        });
    },
    data() {
      return {
  
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