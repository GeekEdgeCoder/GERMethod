/*
滑动解锁组件
作者：GER-Xeon

*/

(function($){
    $.fn.dragCheck = function(options){
        var x, drag = this, isMove = false, defaults = {
            slider:'dragModule',
            successbg:'dragOk',
            duration:200,//速度
            successFun:function(){}//验证成功回调函数
        };
        var options = $.extend(defaults, options);
        var slider = drag.find('.'+options.slider);
        var successbg=drag.find('.'+options.successbg);
        var maxWidth = drag.width() - slider.width();  //能滑动的最大间距
        //var init = function(){}
        //init();
        drag.mousedown(function(e){
            start(e.pageX);
        }).on("touchstart", function (e) {
            start(e.originalEvent.touches[0].pageX);
            e.preventDefault();
        });
        //鼠标指针在上下文移动时，移动距离大于0小于最大间距，滑块x轴位置等于鼠标移动距离
        $(document).mousemove(function(e){
            action(e.pageX);
            e.preventDefault();
        }).mouseup(function(e){
            stop(e.pageX);
        }).on("touchmove", function (e) {
            action(e.originalEvent.touches[0].pageX);
        }).on("touchend", function (e) {
            stop(e.originalEvent.changedTouches[0].pageX);
        });
        var start = function(evevtX){
            isMove = true;
            x = evevtX - parseInt(slider.css('left'), 10);
        };
        var action = function(evevtX){
            var _x = evevtX - x;
            if(isMove){
                if(_x > 0 && _x <= maxWidth){
                    move(_x);
                }else if(_x > maxWidth){  //鼠标指针移动距离达到最大时清空事件
                    success();
                }
            }
        };
        var move = function(x){
            slider.css({'left': x});
            successbg.css({'width': x});
        };
        var stop=function(eventX){
            isMove = false;
            var _x = eventX - x;
            if(_x < maxWidth){ //鼠标松开时，如果没有达到最大距离位置，滑块就返回初始位置
                reset();
            }
        };
        var reset=function(){
            slider. animate({'left':0},options.duration);
            successbg.animate({'width':0},options.duration);
        };
        var success = function(){
            move(maxWidth);
            $(document).unbind('mousemove').unbind('mouseup').unbind('touchmove').unbind('touchend');
            options.successFun();
        }
    }
})(jQuery);
