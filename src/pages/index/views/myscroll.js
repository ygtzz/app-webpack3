import assign from 'object-assign';

class MyScroll{
    constructor(opts){
        opts = assign({
            container:'.scrollc',
            total: 0,
            len: 0,
            step: 0,
            delay: 300,
            interval: 3000,
            direction: 'left' //right,top,down
        }, opts);
        this.opts = opts; 
        this.scrollc = document.querySelector('.scrollc');    
        this.scrolls = scrollc.firstChild;
        this._insertLoopNode(this.scrolls);
        this._setContainerSize(this.scrolls);
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
                cur = -step;
                break;
            case 'down':
                cur = -(len-2) * step;
                break;
            default:
                throw new Error('myscroll invalid direction');
                break;
        }
        this._translate(scrolls,cur,dir);        
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
                    case 'top':
                        cur -= step;
                        break;
                    case 'down':
                        cur += step;
                        break;
                    default:
                        break;
                }
                self._translate(scrolls,cur,dir);
                setTimeout(function(){
                    cur = self._resetPos(scrolls,cur,dir);
                },delay);
            },self.opts.interval); 
        },delay);
    }
    _resetPos(container,cur,direction){
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
            case 'top':
                if(cur <= -(len-1) * step){
                    cur = -step;
                    self._resetContainer(container,cur);
                }
                break;
            case 'down':
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
        this._translate(container, cur, this.opts.direction);
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
    _setContainerSize(container){
        var children = container.children,        
            aChild = Array.prototype.slice.call(children),
            total = 0,
            len = aChild.length,
            dir = this.opts.direction,
            sizeKey = 'width',
            sizeClass = 'scrolls-h',            
            itemSize = 0;
        if(dir == 'top' || dir == 'down'){
            sizeKey = 'height';
            sizeClass = 'scrolls-v';
        }
        var pSizeKey = sizeKey.slice(0,1).toUpperCase() + sizeKey.slice(1);        
        aChild.forEach((item) => {
            itemSize = item['offset' + pSizeKey]
            total += itemSize;
        });
        this.opts.total = total;
        this.opts.len = len;
        if(this.opts.step == 0){
            this.opts.step = itemSize;
        }
        container.style[sizeKey] = total + 'px';
        this.scrollc.style[sizeKey] = itemSize + 'px';
        this._addClass(container,sizeClass);
    }
    _translate(dom,step,dir){
        var x = step,
            y = 0;
        if(dir == 'top' || dir == 'down'){
            x = 0;
            y = step;
        }
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