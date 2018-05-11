<template>
    <div class="slider">
        <div ref="slideWrapper" class="slide-wrap">
            <slot></slot>
        </div>
        <div class="pager-wrap">
            <ul class="pagerList">
                <li v-for="n in amount" :key="'slider-dot' + n" class="pagerItem">
                    <span class="icon icon-dot" :class="{'active':n==idx+1}"></span>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="sass" scoped>
    .pagerList{list-style:none;}
    .pagerList,.pagerItem{margin:0;padding:0}
    .slider{position:relative;width:100%;min-height:6.4rem;overflow: hidden;}
    .slide-wrap{position:relative;width:100%;height:100%;}
    .pager-wrap{position:absolute;bottom:10px;right:20px;}
    .pagerItem{display:inline-block;margin-right:5px;}
    .icon{display:inline-block;background-size:contain;background-position:center;background-repeat:no-repeat;}
    .icon-dot{width:10px;height:10px;border-radius:50%;background-color:#ccc;
        &.active{background-color:red;}
    }
</style>
<script>
const DIRECTION = {
    horizontal: 'horizontal',
    vertical: 'vertical'
}

export default {
    name:'c-slider',
    created(){
        
    },
    mounted(){
        this.$nextTick(() => {
            this.fBindEvent();            
            this.init();
        });
    },
    destroyed(){
        clearInterval(this.timer);
    },
    props:{
        speed:{
            type:Number,
            default:3000
        },
        loop:{
            type:Boolean,
            default:true
        },
        auto:{
            type:Number,
            default:3000
        },
        dir:{
            type:String,
            defalut:DIRECTION.horizontal
        }
    },
    data(){
        return {
            width:0,
            height:0,
            amount:0,
            startX:0,
            startTime:0,
            offsetX:0,
            offsetY:0,
            idx:0,
            direction: this.dir,
            timer:'',
            touching:false
        }
    },
    computed:{
        towards(){
            var towards;
            if(this.direction == DIRECTION.horizontal){
                towards = this.offsetX <= 0 ? 'left' : 'right';
            }
            //vertical
            else{
                towards = this.offsetY <= 0 ? 'up' : 'down';
            }
            return towards;
        }
    },
    methods:{
        init(){
            const self = this;
            if(this.$children.length){
                var rect = this.$el.getBoundingClientRect();
                this.width = rect.width;
                this.height = rect.height;
                // console.log('height ' + this.height);
                this.amount = this.$children.length;
                if(this.direction == DIRECTION.horizontal){
                    this.$children.forEach((item,index) => {
                        item.style.webkitTransform = 'translate3d(' + index * 100 + '%,0,0)';
                    });
                    this.$children[this.amount-1].style.webkitTransform = 'translate3d(' + -100 + '%,0,0)';
                }   
                else{
                    this.$children.forEach((item,index) => {
                        item.style.webkitTransform = 'translate3d(0,' + index * 100 + '%,0)';
                    });
                    this.$children[this.amount-1].style.webkitTransform = 'translate3d(0,' + -100 + '%,0)';
                }
                
                if(this.loop){
                    if(this.auto > 0 && this.amount > 0){
                        this.fSetAutoPlay();
                    }
                    else{
                        throw new Error('component slider: only loop mode support auto play');
                    }
                }
            }
        },
        fBindEvent:function(){
            const self = this,
                  el = self.$el;
            //wrap add event,not child
            el.addEventListener('touchstart',function(e){
                var t = e.touches[0];
                self.startX = t.pageX;
                self.startY = t.pageY;
                self.startTime = +new Date();
                self.offsetX = 0;
                self.offsetY = 0;
                self.fStopAutoPlay();
            });
            el.addEventListener('touchmove',function(e){
                e.preventDefault();
                self.touching = true;
                var t = e.touches[0];
                self.offsetX = t.pageX - self.startX;
                self.offsetY = t.pageY - self.startY;
                self.fSwipePage();
            });
            el.addEventListener('touchend',function(e){   
                self.touching = false;
                self.fGoPage();
                self.fSetAutoPlay();
            });
        },
        fSwipePage(){
            const self = this;
            const aPageIndex = self.fGetPageIndex(self.idx);
            aPageIndex.forEach(item => {
                if(self.$children[item]){
                    self.$children[item].style.webkitTransition = '';
                }
            });
            if(self.direction == DIRECTION.horizontal){
                aPageIndex.forEach((item,i) => {
                    if(self.$children[item]){
                        self.$children[item].style.webkitTransform = 'translate3d('+ ((i-1)*100 + (self.offsetX/self.width)*100) +'%,0,0)';
                    }
                });
            }
            else{
                aPageIndex.forEach((item,i) => {
                    if(self.$children[item]){
                        self.$children[item].style.webkitTransform = 'translate3d(0,'+ ((i-1)*100 + (self.offsetY/self.height)*100) +'%,0)';
                    }
                });
            }
        },
        fGoPage(){
            const self = this;
            const boundary = self.direction == DIRECTION.horizontal ? self.width/4 : self.height/4,
                  endTime = +new Date(),
                  offset = self.direction == DIRECTION.horizontal ? self.offsetX : self.offsetY;
            //slow swipe,more than 300ms
            // debugger
            if(endTime - self.startTime > 300){
                if(offset >= boundary){
                    self.fGoIndex(-1);
                }
                else if(offset <= -boundary){
                    self.fGoIndex(1);
                }
                else{
                    self.fGoIndex(0);
                }
            }
            //quick swipe
            else{
                if(offset > 50){
                    self.fGoIndex(-1);
                }
                else if(offset < -50){
                    self.fGoIndex(1);
                }
                else{
                    self.fGoIndex(0);
                }
            }
        },  
        fGoIndex:function(n){
            const self = this, 
            cIdx = self.idx + n;
            let aPageIndex = self.fGetPageIndex(cIdx);
            self.idx = aPageIndex[1];
            let aTrans = aPageIndex,
                aTransExclude = [];
            if(self.towards == 'left' && n != 0){
                aTrans = aPageIndex.slice(0,-1);
                aTransExclude = aPageIndex.slice(-1);
            }
            else if(self.towards == 'right' && n != 0){
                aTrans = aPageIndex.slice(1);
                aTransExclude = aPageIndex.slice(0,1);
            }
            else if(self.towards == 'up' && n != 0){
                aTrans = aPageIndex.slice(0,-1);
                aTransExclude = aPageIndex.slice(-1);
            }
            else if(self.towards == 'down' && n != 0){
                aTrans = aPageIndex.slice(1);
                aTransExclude = aPageIndex.slice(0,1);
            }
            aTrans.forEach(item => {
                if(self.$children[item]){
                    self.$children[item].style.webkitTransition = '-webkit-transform ' + self.speed + 'ms ease-out';
                }
            });
            aTransExclude.forEach(item => {
                if(self.$children[item]){
                    self.$children[item].style.webkitTransition = '';
                }
            });
            if(self.direction == DIRECTION.horizontal){
                aPageIndex.forEach((item,index) => {
                    if(self.$children[item]){
                        self.$children[item].style.webkitTransform = 'translate3d(' + (index-1)*100 + '%,0,0)';
                    }
                });
            }
            else{
                aPageIndex.forEach((item,index) => {
                    if(self.$children[item]){
                        self.$children[item].style.webkitTransform = 'translate3d(0,' + (index-1)*100 + '%,0)';
                    }
                });
            }
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
                pre = pre < 0 ? -1 : pre;
                next = next > len - 1 ? len : next;
            }
            let aPageIndex = [pre,cIdx,next];
            return aPageIndex;
        },
        fSetAutoPlay(){
            if(this.auto <= 0){
                return;
            }
            this.fStopAutoPlay();
            this.timer = setInterval(() => {
                this.fGoIndex(1);
            },this.auto);
        },
        fStopAutoPlay(){
            clearInterval(this.timer);
        }
        
    },
    components:{
        
    }
}
</script>
