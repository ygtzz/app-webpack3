<template>
    <div class="swiperItem" :style="style">
        <slot></slot>
    </div>
</template>
<style lang="sass" scoped>
    .swiperItem{position:absolute;}
</style>
<script>
export default {
    name:'c-swiperItem',
    mounted(){
        const el = this.$el;
        // el.addEventListener('touchstart',this.fTouchstart);
        // el.addEventListener('touchmove',this.fTouchmove);
        // el.addEventListener('touchend',this.fTouchEnd);
    },
    data(){
        return {
            startX:0,
            startY:0,
            offsetX:0,
            offsetY:0,
            style:{
                webkitTransform:'',
                webkitTransiton:''
            }
        }
    },
    methods:{
        fTouchstart(event){
            var self = this,e = event;
            console.log(event);
            self.startX = e.touches[0].pageX;
            self.startY = e.touches[0].pageY;
            self.startTime = +new Date();
        },
        fTouchmove(event){
            var self = this,e = event;
            var nOffsetX = e.touches[0].pageX - self.startX,
                nOffsetY = e.touches[0].pageY - self.startY;
         
            
            //self.style.webkitTransition = '-webkit-transform 0 ease-out';
            self.style.webkitTransform = 'translate3d(' + nOffsetX + 'px,0,0)';
                     
            //console.log(event);
            // e.preventDefault();
            // var oItem = e.target;
            // if (oItem.className.indexOf('list-item-content') > -1) {
            //     var nOffsetX = e.touches[0].pageX - self.offsetX,
            //         nOffsetY = e.touches[0].pageY - self.offsetY;
            //     if (nOffsetY < 5 && self.leftBoundary < nOffsetX && nOffsetX < self.rightBoundary) {
            //         oItem.style.webkitTransition = '-webkit-transform 0 ease-out';
            //         oItem.style.webkitTransform = 'translate3d(' + nOffsetX + 'px,0,0)';
            //     }
            // }
        },
        fTouchend(event){
            //console.log(event)
            // var oItem = e.target;
            //         if (oItem.className.indexOf('list-item-content') > -1) {
            //             var endTime = +new Date(),
            //                 startTime = self.startTime,
            //                 boundary = 35,
            //                 nOffsetX = self.fGetTranslate(oItem.style.webkitTransform)[0],
            //                 leftBoundary = self.leftBoundary,
            //                 rightBoundary = self.rightBoundary;
                            
            //             if (endTime - startTime > 300) {
            //                 if (nOffsetX < -boundary) {
            //                     nOffsetX = leftBoundary;
            //                 } else if (nOffsetX >= boundary) {
            //                     nOffsetX = rightBoundary;
            //                 } else {
            //                     nOffsetX = 0;
            //                 }
            //             } else {
                            
            //                 if (nOffsetX < -boundary) {
            //                     nOffsetX = leftBoundary;
            //                 } else if (nOffsetX >= boundary) {` 
            //                     nOffsetX = rightBoundary;
            //                 } else {
            //                     nOffsetX = 0;
            //                 }
            //             }
            //             self.fAnimItem(oItem,nOffsetX);
            //         }
        },
        fTouchcancel(){

        }
    },
    computed:{
        
    },
    watch:{
        
    },
    components:{

    }
}
</script>
