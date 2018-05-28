import assign from 'object-assign';

class MyScroll{
    constructor(opts){
        opts = assign({
            container:'.scrollc',
            total: 0,
            len: 0,
            step: 750,
            delay: 300,
            interval: 3000,
            direction: 'left' //right,top,down
        }, opts);
        this.opts = opts; 
        this.scrollc = document.querySelector('.scrollc');    
        this.scrolls = scrollc.firstChild;
        this._insertLoopNode(this.scrolls);
        this._setContainerWidth(this.scrolls);
        this._start(this.scrolls);
    }
    _start(scrolls){
        var self = this,
            dir = self.opts.direction,
            step = self.opts.step,
            delay = self.opts.delay,
            len = self.opts.len,
            cur = 0;
        console.log('len ' + len);
        switch(dir){
            case 'left':
                cur = -step;
                break;
            case 'right':
                cur = -(len-2) * step;
                break;
            case 'top':
                break;
            case 'down':
                break;
            default:
                throw new Error('myscroll invalid direction');
                break;
        }
        this._translate(scrolls,cur);        
        setTimeout(function(){
            self._addClass(scrolls,'moving');
            setInterval(function(){
                console.log(new Date(),cur);
                switch(dir){
                    case 'left':
                        cur -= step;
                        break;
                    case 'right':
                        cur += step;
                        break;
                    default:
                        break;
                }
                self._translate(scrolls,cur);
                setTimeout(function(){
                    cur = self._resetPos(scrolls,dir,cur);
                },delay);
            },self.opts.interval); 
        },delay);
    }
    _resetPos(container,direction,cur){
        var self = this,
            step = this.opts.step,
            len = this.opts.len;
        switch(direction){
            case 'left':
                if(cur <= -(len-1) * step){
                    cur = -step;
                    self._resetContainer(container,cur);
                }
                break;
            case 'right':
                if(cur >= 0){
                    cur = -(len-2) * step;
                    self._resetContainer(container,cur);
                }
                break;
            default:
                break;
        }

        return cur;
    }
    _resetContainer(container,cur){
        var self = this;
        var delay = this.opts.delay;
        this._removeClass(container,'moving');
        this._translate(container, cur);
        //transitionend 
        setTimeout(function(){
            self._addClass(container,'moving');          
        },delay);
    }
    _insertLoopNode(container){
        var children = container.children;
        var first = children[0],
            last = children[children.length-1];
        container.insertBefore(last.cloneNode(true),first);
        container.appendChild(first.cloneNode(true));
    }
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
        this.opts.total = total;
        this.opts.len = len;
        container.style.width = total + 'px';
    }
    _translate(dom,x,y){
        x = x || 0 ;
        y = y || 0;
        dom.style.WebkitTransform = `translate3d(${x}px,${y}px,0px)`;
        dom.style.transform = `translate3d(${x},${y},0)`;
    }
    _addClass(dom,className){
        dom.classList.add(className);
    }
    _removeClass(dom,className){
        dom.classList.remove(className);
    }
}

export {MyScroll}