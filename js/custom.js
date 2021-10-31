//背景黑色线条bynote.cn
!function(){function o(w,v,i){return w.getAttribute(v)||i}function j(i){return document.getElementsByTagName(i)}function l(){var i=j("script"),w=i.length,v=i[w-1];return{l:w,z:o(v,"zIndex",-1),o:o(v,"opacity",0.5),c:o(v,"color","0,0,0"),n:o(v,"count",99)}}function k(){r=u.width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,n=u.height=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}function b(){e.clearRect(0,0,r,n);var w=[f].concat(t);var x,v,A,B,z,y;t.forEach(function(i){i.x+=i.xa,i.y+=i.ya,i.xa*=i.x>r||i.x<0?-1:1,i.ya*=i.y>n||i.y<0?-1:1,e.fillRect(i.x-0.5,i.y-0.5,1,1);for(v=0;v<w.length;v++){x=w[v];if(i!==x&&null!==x.x&&null!==x.y){B=i.x-x.x,z=i.y-x.y,y=B*B+z*z;y<x.max&&(x===f&&y>=x.max/2&&(i.x-=0.03*B,i.y-=0.03*z),A=(x.max-y)/x.max,e.beginPath(),e.lineWidth=A/2,e.strokeStyle="rgba("+s.c+","+(A+0.2)+")",e.moveTo(i.x,i.y),e.lineTo(x.x,x.y),e.stroke())}}w.splice(w.indexOf(i),1)}),m(b)}var u=document.createElement("canvas"),s=l(),c="c_n"+s.l,e=u.getContext("2d"),r,n,m=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(i){window.setTimeout(i,1000/45)},a=Math.random,f={x:null,y:null,max:20000};u.id=c;u.style.cssText="position:fixed;top:0;left:0;z-index:"+s.z+";opacity:"+s.o;j("body")[0].appendChild(u);k(),window.onresize=k;window.onmousemove=function(i){i=i||window.event,f.x=i.clientX,f.y=i.clientY},window.onmouseout=function(){f.x=null,f.y=null};for(var t=[],p=0;s.n>p;p++){var h=a()*r,g=a()*n,q=2*a()-1,d=2*a()-1;t.push({x:h,y:g,xa:q,ya:d,max:6000})}setTimeout(function(){b()},100)}();
//运行时间bynote.cn
var now = new Date(); 
function createtime() { 
    var grt= new Date("10/30/2021 21:38:00");//在此处修改你的建站时间，格式：月/日/年 时:分:秒
    now.setTime(now.getTime()+250); 
    days = (now - grt ) / 1000 / 60 / 60 / 24; dnum = Math.floor(days); 
    hours = (now - grt ) / 1000 / 60 / 60 - (24 * dnum); hnum = Math.floor(hours); 
    if(String(hnum).length ==1 ){hnum = "0" + hnum;} minutes = (now - grt ) / 1000 /60 - (24 * 60 * dnum) - (60 * hnum); 
    mnum = Math.floor(minutes); if(String(mnum).length ==1 ){mnum = "0" + mnum;} 
    seconds = (now - grt ) / 1000 - (24 * 60 * 60 * dnum) - (60 * 60 * hnum) - (60 * mnum); 
    snum = Math.round(seconds); if(String(snum).length ==1 ){snum = "0" + snum;} 
    document.getElementById("timeDate").innerHTML = "本站已各种夹缝中安全运行 "+dnum+" 天 "; 
    document.getElementById("times").innerHTML = hnum + " 小时 " + mnum + " 分 " + snum + " 秒"; 
} 
setInterval("createtime()",250);
//动态彩带bynote.cn
(function (name, factory) {
  if (typeof window === "object") {
    window[name] = factory()
  }
})("Ribbons", function () {
  var _w = window,
    _b = document.body,
    _d = document.documentElement;
  var random = function () {
    if (arguments.length === 1) {
      if (Array.isArray(arguments[0])) {
        var index = Math.round(random(0, arguments[0].length - 1));
        return arguments[0][index]
      }
      return random(0, arguments[0])
    } else if (arguments.length === 2) {
      return Math.random() * (arguments[1] - arguments[0]) + arguments[0]
    }
    return 0
  };
  var screenInfo = function (e) {
    var width = Math.max(0, _w.innerWidth || _d.clientWidth || _b.clientWidth || 0),
      height = Math.max(0, _w.innerHeight || _d.clientHeight || _b.clientHeight || 0),
      scrollx = Math.max(0, _w.pageXOffset || _d.scrollLeft || _b.scrollLeft || 0) - (_d.clientLeft || 0),
      scrolly = Math.max(0, _w.pageYOffset || _d.scrollTop || _b.scrollTop || 0) - (_d.clientTop || 0);
    return {
      width: width,
      height: height,
      ratio: width / height,
      centerx: width / 2,
      centery: height / 2,
      scrollx: scrollx,
      scrolly: scrolly
    }
  };
  var mouseInfo = function (e) {
    var screen = screenInfo(e),
      mousex = e ? Math.max(0, e.pageX || e.clientX || 0) : 0,
      mousey = e ? Math.max(0, e.pageY || e.clientY || 0) : 0;
    return {
      mousex: mousex,
      mousey: mousey,
      centerx: mousex - screen.width / 2,
      centery: mousey - screen.height / 2
    }
  };
  var Point = function (x, y) {
    this.x = 0;
    this.y = 0;
    this.set(x, y)
  };
  Point.prototype = {
    constructor: Point,
    set: function (x, y) {
      this.x = x || 0;
      this.y = y || 0
    },
    copy: function (point) {
      this.x = point.x || 0;
      this.y = point.y || 0;
      return this
    },
    multiply: function (x, y) {
      this.x *= x || 1;
      this.y *= y || 1;
      return this
    },
    divide: function (x, y) {
      this.x /= x || 1;
      this.y /= y || 1;
      return this
    },
    add: function (x, y) {
      this.x += x || 0;
      this.y += y || 0;
      return this
    },
    subtract: function (x, y) {
      this.x -= x || 0;
      this.y -= y || 0;
      return this
    },
    clampX: function (min, max) {
      this.x = Math.max(min, Math.min(this.x, max));
      return this
    },
    clampY: function (min, max) {
      this.y = Math.max(min, Math.min(this.y, max));
      return this
    },
    flipX: function () {
      this.x *= -1;
      return this
    },
    flipY: function () {
      this.y *= -1;
      return this
    }
  };
  var Factory = function (options) {
    this._canvas = null;
    this._context = null;
    this._sto = null;
    this._width = 0;
    this._height = 0;
    this._scroll = 0;
    this._ribbons = [];
    this._options = {
      colorSaturation: "80%",
      colorBrightness: "60%",
      colorAlpha: 0.65,
      colorCycleSpeed: 6,
      verticalPosition: "center",
      horizontalSpeed: 150,
      ribbonCount: 5,
      strokeSize: 5,
      parallaxAmount: -0.5,
      animateSections: true
    };
    this._onDraw = this._onDraw.bind(this);
    this._onResize = this._onResize.bind(this);
    this._onScroll = this._onScroll.bind(this);
    this.setOptions(options);
    this.init()
  };
  Factory.prototype = {
    constructor: Factory,
    setOptions: function (options) {
      if (typeof options === "object") {
        for (var key in options) {
          if (options.hasOwnProperty(key)) {
            this._options[key] = options[key]
          }
        }
      }
    },
    init: function () {
      try {
        this._canvas = document.createElement("canvas");
        this._canvas.style["display"] = "block";
        this._canvas.style["position"] = "fixed";
        this._canvas.style["margin"] = "0";
        this._canvas.style["padding"] = "0";
        this._canvas.style["border"] = "0";
        this._canvas.style["outline"] = "0";
        this._canvas.style["left"] = "0";
        this._canvas.style["top"] = "0";
        this._canvas.style["width"] = "100%";
        this._canvas.style["height"] = "100%";
        this._canvas.style["z-index"] = "-1";
        this._onResize();
        this._context = this._canvas.getContext("2d");
        this._context.clearRect(0, 0, this._width, this._height);
        this._context.globalAlpha = this._options.colorAlpha;
        window.addEventListener("resize", this._onResize);
        window.addEventListener("scroll", this._onScroll);
        document.body.appendChild(this._canvas)
      } catch (e) {
        console.warn("Canvas Context Error: " + e.toString());
        return
      }
      this._onDraw()
    },
    addRibbon: function () {
      var dir = Math.round(random(1, 9)) > 5 ? "right" : "left",
        stop = 1000,
        hide = 200,
        min = 0 - hide,
        max = this._width + hide,
        movex = 0,
        movey = 0,
        startx = dir === "right" ? min : max,
        starty = Math.round(random(0, this._height));
      if (/^(top|min)$/i.test(this._options.verticalPosition)) {
        starty = 0 + hide
      } else if (/^(middle|center)$/i.test(this._options.verticalPosition)) {
        starty = this._height / 2
      } else if (/^(bottom|max)$/i.test(this._options.verticalPosition)) {
        starty = this._height - hide
      }
      var ribbon = [],
        point1 = new Point(startx, starty),
        point2 = new Point(startx, starty),
        point3 = null,
        color = Math.round(random(0, 360)),
        delay = 0;
      while (true) {
        if (stop <= 0) break;
        stop--;
        movex = Math.round((Math.random() * 1 - 0.2) * this._options.horizontalSpeed);
        movey = Math.round((Math.random() * 1 - 0.5) * (this._height * 0.25));
        point3 = new Point();
        point3.copy(point2);
        if (dir === "right") {
          point3.add(movex, movey);
          if (point2.x >= max) break
        } else if (dir === "left") {
          point3.subtract(movex, movey);
          if (point2.x <= min) break
        }
        ribbon.push({
          point1: new Point(point1.x, point1.y),
          point2: new Point(point2.x, point2.y),
          point3: point3,
          color: color,
          delay: delay,
          dir: dir,
          alpha: 0,
          phase: 0
        });
        point1.copy(point2);
        point2.copy(point3);
        delay += 4;
        color += this._options.colorCycleSpeed
      }
      this._ribbons.push(ribbon)
    },
    _drawRibbonSection: function (section) {
      if (section) {
        if (section.phase >= 1 && section.alpha <= 0) {
          return true
        }
        if (section.delay <= 0) {
          section.phase += 0.02;
          section.alpha = Math.sin(section.phase) * 1;
          section.alpha = section.alpha <= 0 ? 0 : section.alpha;
          section.alpha = section.alpha >= 1 ? 1 : section.alpha;
          if (this._options.animateSections) {
            var mod = Math.sin(1 + section.phase * Math.PI / 2) * 0.1;
            if (section.dir === "right") {
              section.point1.add(mod, 0);
              section.point2.add(mod, 0);
              section.point3.add(mod, 0)
            } else {
              section.point1.subtract(mod, 0);
              section.point2.subtract(mod, 0);
              section.point3.subtract(mod, 0)
            }
            section.point1.add(0, mod);
            section.point2.add(0, mod);
            section.point3.add(0, mod)
          }
        } else {
          section.delay -= 0.5
        }
        var s = this._options.colorSaturation,
          l = this._options.colorBrightness,
          c = "hsla(" + section.color + ", " + s + ", " + l + ", " + section.alpha + " )";
        this._context.save();
        if (this._options.parallaxAmount !== 0) {
          this._context.translate(0, this._scroll * this._options.parallaxAmount)
        }
        this._context.beginPath();
        this._context.moveTo(section.point1.x, section.point1.y);
        this._context.lineTo(section.point2.x, section.point2.y);
        this._context.lineTo(section.point3.x, section.point3.y);
        this._context.fillStyle = c;
        this._context.fill();
        if (this._options.strokeSize > 0) {
          this._context.lineWidth = this._options.strokeSize;
          this._context.strokeStyle = c;
          this._context.lineCap = "round";
          this._context.stroke()
        }
        this._context.restore()
      }
      return false
    },
    _onDraw: function () {
      for (var i = 0, t = this._ribbons.length; i < t; ++i) {
        if (!this._ribbons[i]) {
          this._ribbons.splice(i, 1)
        }
      }
      this._context.clearRect(0, 0, this._width, this._height);
      for (var a = 0; a < this._ribbons.length; ++a) {
        var ribbon = this._ribbons[a],
          numSections = ribbon.length,
          numDone = 0;
        for (var b = 0; b < numSections; ++b) {
          if (this._drawRibbonSection(ribbon[b])) {
            numDone++
          }
        }
        if (numDone >= numSections) {
          this._ribbons[a] = null
        }
      }
      if (this._ribbons.length < this._options.ribbonCount) {
        this.addRibbon()
      }
      requestAnimationFrame(this._onDraw)
    },
    _onResize: function (e) {
      var screen = screenInfo(e);
      this._width = screen.width;
      this._height = screen.height;
      if (this._canvas) {
        this._canvas.width = this._width;
        this._canvas.height = this._height;
        if (this._context) {
          this._context.globalAlpha = this._options.colorAlpha
        }
      }
    },
    _onScroll: function (e) {
      var screen = screenInfo(e);
      this._scroll = screen.scrolly
    }
  };
  return Factory
});
new Ribbons({
  colorSaturation: "60%",
  colorBrightness: "50%",
  colorAlpha: 0.5,
  colorCycleSpeed: 5,
  verticalPosition: "random",
  horizontalSpeed: 200,
  ribbonCount: 3,
  strokeSize: 0,
  parallaxAmount: -0.2,
  animateSections: true
});
