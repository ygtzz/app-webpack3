<template>
    <div class="test stage">
        <h2>scroll</h2>
        <div class="scrollc">
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
        transition: transform .3s ease-in-out;        
        transition: -webkit-transform .3s ease-in-out;
    }
    /*debug*/
    .scroll-item {font-size:100px;text-align:center;}
</style>
<script>
import Vue from 'vue';

export default {
    name:'v-test',
    created() {
        
    },
    mounted(){
        var self = this;
        self.$nextTick(() => {
            var scrolls = document.querySelector('.scrolls');
            self._insertLoopNode(scrolls);
            self._setContainerWidth(scrolls);
            
            setTimeout(function(){
                self._addClass(scrolls,'moving');
                var cur = 750,
                    step = self.step;
                setInterval(function(){
                    self._translate(scrolls,-cur);
                    console.log(cur,-(self.total - step));
                    if(-cur < -(self.total - step)){
                        self._resetPos(scrolls);
                        cur = self.step;
                    }
                    cur += self.step;
                },3000);
            },300);
        });
    },
    data() {
      return {
        total: 0,
        step: 750
      }
    },
    methods:{
        _resetPos(container){
            var self = this;
            this._removeClass(container,'moving');
            this._translate(container,-this.step);
            //transitionend 
            setTimeout(function(){
                self._addClass(container,'moving');            
            },300);
        },
        _insertLoopNode(container){
            var children = container.children;
            var first = children[0],
                last = children[children.length-1];
            container.insertBefore(last.cloneNode(true),first);
            container.appendChild(first.cloneNode(true));
        },
        _setContainerWidth(container){
            var children = container.children;            
            var aChild = Array.prototype.slice.call(children);
            var total = 0;
            var len = aChild.length,
                itemWidth = 0;
            aChild.forEach((item) => {
                total += item.offsetWidth;
                itemWidth = item.offsetWidth;
            });
            this.total = total;
            container.style.width = total + 'px';
            //设置初始定位
            this._translate(container,-this.step);
        },
        _translate(dom,x,y){
            x = x || 0 ;
            y = y || 0;
            dom.style.WebkitTransform = `translate3d(${x}px,${y}px,0px)`;
            dom.style.transform = `translate3d(${x},${y},0)`;
        },
        _addClass(dom,className){
            dom.classList.add(className);
        },
        _removeClass(dom,className){
            dom.classList.remove(className);
        }
    },
    components:{
        
    },
    filters:{
        
    }
}
</script>