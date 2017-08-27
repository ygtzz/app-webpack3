<template>
    <div class="swiper">
        <div ref="slideWrapper" class="slide-wrap">
            <slot></slot>
        </div>
        <div class="pager-wrap">
            <ul class="pagerList">
                <li v-for="n in pageCount" class="pagerItem">
                    <span class="icon icon-dot"></span>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="sass" scoped>
    .swiper{position:relative;}
    .slide-wrap{position:relative;}
    .swiperItem{}
    .pager-wrap{position:absolute;bottom:10px;right:10px;}
    .icon-dot{width:10px;height:10px;border-radius:50%;background-color:#ccc;
        &.active{background-color:red;}
    }
</style>
<script>
export default {
    name:'c-swiper',
    created(){
        
    },
    mounted(){
        this.fInitPages();
        this.fBindEvent();        
    },
    props:{
        speed:{
            type:Number,
            default:300
        },
        loop:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            pageCount:1,
            swipeW:window.innerWidth,
            startX:0,
            startTime:0,
            offsetX:0,
            idx:0
        }
    },
    methods:{
        fInitPages(){
            const self = this;
            this.pageCount = this.$children.length;
            this.$children.forEach((item,index) => {
                item.style.webkitTransform = 'translate3d(' + index * self.swipeW + 'px,0,0)';
            });
            this.$children[this.pageCount-1].style.webkitTransform = 'translate3d(' + -self.swipeW + 'px,0,0)';
        },
        fSwipePage(){
            const self = this;
            const aPageIndex = self.fGetPageIndex(self.idx);
            aPageIndex.forEach(item => {
                self.$children[item].style.webkitTransition = '';
            });
            aPageIndex.forEach((item,i) => {
                self.$children[item].style.webkitTransform = 'translate3d('+ ((i-1)*self.swipeW + self.offsetX) +'px,0,0)';
            });
            // for(var i=self.idx-1;i<self.idx+2;i++){
            //     if(self.$children[i]){
            //         self.$children[i].style.webkitTransition = '-webkit-transform 0 ease-out';                                                                        
            //     }
            // }
            // //transition与transform分开写，避免滑动出现延迟
            // for(var i=self.idx-1;i<self.idx+2;i++){
            //     if(self.$children[i]){
            //         const offsetX = ((i-self.idx)*self.swipeW + self.offsetX);
            //         self.$children[i].style.webkitTransform = 'translate3d('+ offsetX +'px,0,0)';                        
            //     }
            // }
        },
        fBindEvent:function(){
            const self = this,el = self.$el;
            //wrap add event,not child
            el.addEventListener('touchstart',function(e){
                self.startX = e.touches[0].pageX;
                self.startTime = +new Date();
                //clear offsetX
                self.offsetX = 0;
            });
            el.addEventListener('touchmove',function(e){
                e.preventDefault();
                //e.stopPropagation();
                self.offsetX = e.touches[0].pageX - self.startX;
                self.fSwipePage();
            });
            el.addEventListener('touchend',function(e){
                e.preventDefault();
                //e.stopPropagation();            
                self.fGoPage();
            });
        },
        fGoPage(){
            const self = this;
            const boundary = self.swipeW/4,
                  endTime = +new Date();
            //slow swipe,more than 300ms
            if(endTime - self.startTime > 300){
                if(self.offsetX >= boundary){
                    self.fGoIndex(-1);
                }
                else if(self.offsetX <= -boundary){
                    self.fGoIndex(1);
                }
                else{
                    self.fGoIndex(0);
                }
            }
            //quick swipe
            else{
                if(self.offsetX > 50){
                    self.fGoIndex(-1);
                }
                else if(self.offsetX < -50){
                    self.fGoIndex(1);
                }
                else{
                    self.fGoIndex(0);
                }
            }
        },  
        fGoIndex:function(n){
            var self = this, 
            cIdx = self.idx + n;
            const aPageIndex = self.fGetPageIndex(cIdx);
            self.idx = aPageIndex[1];
            console.log(self.$children[self.idx]);
            //self.$children[self.idx].classList.add('swpipe-active');
            console.log(aPageIndex)
            aPageIndex.forEach(item => {
                self.$children[item].style.webkitTransition = '-webkit-transform ' + self.speed + 'ms ease-out';
            });
            aPageIndex.forEach((item,index) => {
                self.$children[item].style.webkitTransform = 'translate3d(' + (index-1)*self.swipeW + 'px,0,0)';
            });
        },
        fGetPageIndex(cIdx){
            const self = this;
            const len = self.$children.length;
            if(self.loop){
                if(cIdx > len -1){
                    cIdx = 0;
                }
                else if(cIdx < 0){
                    cIdx = len - 1;
                }                
            }
            else{
                if(cIdx > len -1){
                    cIdx = len - 1;
                }
                else if(cIdx < 0){
                    cIdx = 0;
                }
            }
            //range check
            let pre = cIdx - 1,
                next = cIdx + 1;
            
            if(self.loop){
                pre = pre < 0 ? len - 1 : pre;
                next = next > len - 1 ? 0 : next;
            }
            else{
                pre = pre < 0 ? 0 : pre;
                next = next > len - 1 ? len - 1 : next;
            }
            return [pre,cIdx,next];
        }
    },
    components:{

    }
}
</script>
