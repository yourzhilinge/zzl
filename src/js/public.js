//传入元素id,返回指定id元素
function $id(id){
    return document.getElementById(id)
}

function nowTime () {
    return new Date()
}


/*
作用:获取窗口可视区域的宽高
参数:无
返回值:json对象
*/
function getClient(){
	if(window.innerWidth!=undefined){
		return {
			width: window.innerWidth,
			height:window.innerHeight
		};
	}else if(document.compatMode=="CSS1Compat"){
		return {
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		};
	}else{
		return {
			width:document.body.clientWidth,
			height:document.body.clientHeight
		};
	}
}


//获取滚动距离
function scroll(){
	// return {
	// 	left:document.documentElement.scrollLeft+document.body.scrollLeft,
	// 	top:document.documentElement.scrollTop+document.body.scrollTop
	// }
	return {
		left:document.documentElement.scrollLeft||document.body.scrollLeft,
		top:document.documentElement.scrollTop||document.body.scrollTop
	}
}



// 范围随机数
function random(min,max){
    if(min > max){
        var ls = min;
        min = max;
        max = ls;
    }
    return Math.floor(Math.random() * (max-min+1) ) + min
}



// 补零(补字符的零)
function createZero(n){
    if(typeof n === "string"){
        if(n.length < 2){
            return "0" + n
        }
        return n;
    }else{
        if(n<10){
            return "0"+n;
        }
        return n;
    }
}

//生成一个n到m之间的随机整数
function rand(n,m){
    return n+parseInt(Math.random()*(m-n+1));
}

//生成一个16进制的随机颜色
function color(){
    var result= "#";
    for(var i=0;i<6;i++){
        result += rand(0,15).toString(16)
        // 把十进制的数字变成十六进制的字符串:0 1 ...9 a b c d f
    }
    return result;
}

// 随机十六进制的颜色值
function randomColor(){
    var r = random(0,255).toString(16);
    var g = random(0,255).toString(16);
    var b = random(0,255).toString(16);
    return "#" + createZero(r) + createZero(g) + createZero(b);
}


//传入一个数组和一个元素,判断数组中是否存在该元素,存在返回true,不存在返回false
function has(arr,data){
    for(var i=0;i<arr.length;i++){
        if(data===arr[i]){
            //continue和break;
            //在此处,循环在函数中,return终止了函数执行,就是终止了循环
            return true;
        }
    }
    //如果函数能运行到此处,说明没有终止函数
    return false;
}


// 数组去重
//传入一个数组,返回数组去重以后的结果,不改变原数组
function ArrNoRepeat(arr){
    var result = [];
    for(var i=0;i<arr.length;i++){
        if(!has(result,arr[i])){
            //如果进入此处,说明arr[i]在result里面不存在,可以放进去
            result.push(arr[i])
        }
    }
    return result;
}


// 日期的格式化
function createDate(){
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var myDate = d.getDate();
    var day = d.getDay();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    switch(day){
        case 0:day = "日";break;
        case 1:day = "一";break;
        case 2:day = "二";break;
        case 3:day = "三";break;
        case 4:day = "四";break;
        case 5:day = "五";break;
        case 6:day = "六";break;
    }
    return {
        year:year,
        month:createZero(month),
        date:createZero(myDate),
        day:day,
        hours:createZero(hours),
        minutes:createZero(minutes),
        seconds:createZero(seconds),
    };
}

// 数字转为汉字
function toChinese(num){
    //把所有的汉字放在一个数组里面
    var charArr = ["零","一","二","三","四","五","六","七","八","九"]
    var weiArr = ["","拾","佰","仟","万"];
    //以汉字形式表示的倒计时
    var result = "";
    //先拼接天
    arr = num.toString().split("").reverse();
    //arr里面就是[个位,十位,白位,千位]
    for(var i=0;i<arr.length;i++){
        result=charArr[arr[i]]+weiArr[i]+result;
    }
    return result;
}


// 计算两个日期之间的差值
function dateDiff1(time1,time2){
    //要求传入的time1和time2都是时间对象
    var diff = parseInt(Math.abs(time1-time2)/1000);//两个时间相差的秒数
    //计算diff是多少天多少小时多少分钟多少秒
    var date = Math.floor(diff/(24*60*60));
    var afterDate = diff - date*24*60*60;
    var hour = Math.floor(afterDate/(60*60));
    var afterHour = afterDate - hour*3600;
    var minute = parseInt(afterHour/60);
    var second = afterHour - minute*60;
    return date+"天"+hour+"小时"+minute+"分钟"+second+"秒"
}
// 计算两个日期之间的差值
function dateDiff2(d1,d2){
    var date1 = new Date(d1);

    var date2 = d2 ? new Date(d2) : new Date();

    var t = Math.abs(date1.getTime() - date2.getTime());

    var day = parseInt(t/1000/60/60/24);
    var h = parseInt((t - day*24*60*60*1000)/1000/60/60);
    var m = parseInt((t - day*24*60*60*1000 - h*60*60*1000)/1000/60);
    var s = parseInt((t - day*24*60*60*1000 - h*60*60*1000 - m*60*1000)/1000)
    var ms = t - day*24*60*60*1000 - h*60*60*1000 - m*60*1000 - s*1000;
    
    return {
        day:day,
        h:h,
        m:m,
        s:s,
        ms:ms
    }
}



// 取消事件冒泡，注意别忘记传参
function stopBubble(e){
    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
}

// 阻止默认事件，注意别忘记传参
function stopDefault(e){
    if(e.preventDefault){
        e.preventDefault()
    }else{
        e.returnValue = false;
    }
}

// 监听式事件绑定的封装
function addEvent(ele,type,cb){
    if(ele.addEventListener){
        ele.addEventListener(type,cb)
    }else if(ele.attachEvent){
        ele.attachEvent("on"+type,cb)
    }else{
        ele["on"+type] = cb;
    }
}


//获取指定dom的指定样式值
function getStyle(dom,attr){
    if(window.getComputedStyle){
        //如果window.getComputedStyle不是undefined,说明是非IE浏览器
        return window.getComputedStyle(dom,null)[attr];
    }else{
        //如果window.getComputedStyle是undefined,说明是IE浏览器
        return dom.currentStyle[attr]
    }
    
}

// 封装一个没有兼容问题的全局的trim方法
function trim(str){
    return str.replace(/(^\s+)|(\s+$)/g,"")
}



/* move函数可以实现指定元素的单属性缓动到目标位置
    ==>参数1:dom  要缓动的元素节点
    ==>参数2:attr 要缓动的属性
    ==>参数3:target 缓动到的目标值
        ==>如果是透明度,目标值要乘100传入,同时css样式要书写opacity:初始值;
    ==>参数4:fn    是一个可选参数,必须是一个函数,在动画完成以后执行这个函数里面的代码*/                
function move1(dom,attr,target,fn){
    clearInterval(dom.timer)
    //每隔一段时间运动一段距离
    dom.timer = setInterval(function(){
        //1 获取当前位置
        if(attr=="opacity"){
            var current = parseInt(getStyle(dom,attr)*100)
        }else{
            var current = parseInt(getStyle(dom,attr))
        }
        //2 计算速度
        var speed = target>current?Math.ceil((target-current)/10):Math.floor((target-current)/10)

        //3 计算下一个位置
        var next = current + speed;

        //4 定位元素
        if(next==target){
            if(attr == "opacity"){
                dom.style.opacity = target/100;
                dom.style.filter = "alpha(opacity="+target+")";
            }else{
                dom.style[attr] = target+"px"
            }
            clearInterval(dom.timer);
            if(fn){
                //fn会在动画完成以后执行
                fn();
            }

        }else{
            if(attr == "opacity"){
                dom.style.opacity = next/100;
                dom.style.filter = "alpha(opacity="+next+")";
            }else{
                dom.style[attr] = next+"px"
            }
        }
    },50)
}


    
/* animate:让指定元素的多属性同时缓动到指定目标
        ==>参数1:dom  要缓动的元素节点
        ==>参数2:json 
            {
                width:400,
                height:500,
                left:300,
                top:200,
                opacity:90,
                zIndex:9 
            }
        ==>参数3:fn  动画完成以后执行的函数*/
function animate(dom,json,fn){
    clearInterval(dom.timer)
    //每隔一段时间,json里面的每个属性都变化一点
    dom.timer = setInterval(function(){
        //每次运动开始
        var flag = true;//如果后面有哪个属性没有到达目标位置,就把flag变成false
        //json里面有几个键值对,就要运动几次
        for(var attr in json){
            //1 获取当前位置
            if(attr=="opacity"){
                var current = parseInt(getStyle(dom,attr)*100)
            }else{
                var current = parseInt(getStyle(dom,attr))
            }
            //2 计算速度
            var target = parseInt(json[attr]);
            var speed = target>current?Math.ceil((target-current)/10):Math.floor((target-current)/10)
            //3 计算下一次位置
            if(attr=="zIndex"){
                var next = target;//如果缓动的属性是zIndex,直接一步到位,不用缓动
            }else{
                var next = current + speed;
            }
            //4 定位元素
            if(attr=='opacity'){
                dom.style.opacity=next/100;
                dom.style.filter = "alpha(opacity="+next+")"
            }else if(attr=='zIndex'){
                dom.style.zIndex = next;
            }else{
                dom.style[attr] = next+"px";
            }
            if(next!=target){
                flag = false;
            }
        }
        //本次运动结束,检查flag的值
        if(flag){
            clearInterval(dom.timer);
            if(fn){
                fn()
            }
        }
    },50)
}

function move2(ele, data, cb){
    clearInterval(ele.t);
    ele.t = setInterval(() => {
        var onoff = true;
        for(var i in data){
            // 获取当前值
            var iNow = i==="opacity" ? getStyle(ele,i) * 100 : parseInt(getStyle(ele,i));
            // 计算步长
            var speed = (data[i] - iNow)/8;
            speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
            // 设置属性
            ele.style[i] = i==="opacity" ? (iNow + speed)/100 : iNow + speed + "px";
            // 判断是否有属性没到目标
            if(iNow!=data[i]) onoff = false;
        }
        // 没有属性没到目标
        if(onoff){
            clearInterval(ele.t);
            cb && cb();
        }
    }, 30);
}