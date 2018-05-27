<template>
    <div class="test stage">
        <h2>scroll</h2>
        <div class="scrollc">
            <ul class="scrolls">
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
    
</style>
<script>
import Vue from 'vue';

export default {
    name:'v-test',
    created() {
        
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