var dsq
var sps= document.getElementsByClassName("ms_d")
setInterval(dsq)
setInterval(function(){
    clearInterval(dsq)
    var nowT = new Date()
    var times = new Date("2020-11-11") 
    var djs=dateDiff2(times,nowT)
    sps[0].innerHTML=(djs.day+"天"+djs.h+"时"+djs.m+"分"+djs.s+"秒")
}, 0);



