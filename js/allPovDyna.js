/*$(document).ready(function(){
    /!*点赞*!/
    $(document).on("click",".thumbIcon",function(){
        var i=$(this).children("i");
        var span=$(this).parent().next().children("div").children("span");
        var css=$(i).attr("class");
        var l=css.indexOf("fa-heart-o");
        if(l!==-1){
            var count=$(span).text();
            $(span).text(Number(count)+1);
            $(i).removeClass("fa-heart-o");
            $(i).addClass("fa-heart");
        }else{
            var count=$(span).text();
            $(span).text(Number(count)-1);
            $(i).removeClass("fa-heart");
            $(i).addClass("fa-heart-o");
        }
    })
    /!*评论*!/
    $(document).on("click",".commIcon",function(){
        var c=prompt("请输入评论内容");
        var div=$(this).parent().next();
        $(div).append("<p><span>王双全：</span><span>"+c+"</span></p>");
    })
})*/
dd.ready(function(){
    /*点赞*/
    dd.runtime.permission.requestAuthCode({
        // corpId : "dingd4e5d0db6be979cc35c2f4657eb6378f",
        corpId : "ding98d66c2bc4e38c9335c2f4657eb6378f",
        onSuccess : function(info) {
            showlists();
        },
        onFail : function(err) {
            alert("fail: " + JSON.stringify(err));
        }
    });
    function showlists(){
        /*点赞*/
        alert(url);
        setTimeout(function(){
            $(".thumbIcon").click(function(){
                alert(url);
                let id=$(this).attr("value");
                alert(id)
                $.ajax({
                    url: url+"/help/addPraise",
                    data: {"id":id},
                    method: "post",
                    dataType: "json",
                    success: function (data) {
                        if (data.code == 2000) {
                            alert("ok")
                        }
                    }
                })
                var i=$(this).children("i");
                var span=$(this).parent().next().children("div").children("span");
                var css=$(i).attr("class");
                var l=css.indexOf("fa-heart-o");
                if(l!==-1){
                    alert(2)
                    var count=$(span).text();
                    $(span).text(Number(count)+1);
                    $(i).removeClass("fa-heart-o");
                    $(i).addClass("fa-heart");
                }else{
                    alert(3)
                    var count=$(span).text();
                    $(span).text(Number(count)-1);
                    $(i).removeClass("fa-heart");
                    $(i).addClass("fa-heart-o");
                }
            })
        },1000)

        /*评论*/
        setTimeout(function(){
            $(".commIcon").click(function(){
                let object=localStorage.getItem("object");
                let item=JSON.parse(object);
                let helpNumber=item.cadnumber;
                console.log(helpNumber)
                let id=$(this).attr("value");
                var c=prompt("请输入评论内容");
                var div=$(this).parent().next();
                $.ajax({
                    url: url+"/help/insertDiscuss",
                    data: {"logId":id,"helpNumber":helpNumber,"discussValue":c},
                    method: "post",
                    dataType: "json",
                    success: function (data) {
                        if (data.code == 2000) {
                            console.log(data);
                        }
                    }
                })
                $(div).append("<p><span>任晓斌：</span><span>"+c+"</span></p>");
            })
        },1000)
    }
    /*$(document).on("click",".thumbIcon",function(){
        let id=$(this).attr("value");
        $.ajax({
            url: url+"/help/addPraise",
            data: {"id":id},
            method: "post",
            dataType: "json",
            success: function (data) {
                if (data.code == 2000) {
                    console.log(data)
                }
            }
        })
        var i=$(this).children("i");
        var span=$(this).parent().next().children("div").children("span");
        var css=$(i).attr("class");
        var l=css.indexOf("fa-heart-o");
        if(l!==-1){
            var count=$(span).text();
            $(span).text(Number(count)+1);
            $(i).removeClass("fa-heart-o");
            $(i).addClass("fa-heart");
        }else{
            var count=$(span).text();
            $(span).text(Number(count)-1);
            $(i).removeClass("fa-heart");
            $(i).addClass("fa-heart-o");
        }
    })*/
    /*评论*/
    /*$(document).on("click",".commIcon",function(){
        let object=localStorage.getItem("object");
        let item=JSON.parse(object);
        let helpNumber=item.cadnumber;
        console.log(helpNumber)
        let id=$(this).attr("value");
        var c=prompt("请输入评论内容");
        var div=$(this).parent().next();
        $.ajax({
            url: url+"/help/insertDiscuss",
            data: {"logId":id,"helpNumber":helpNumber,"discussValue":c},
            method: "post",
            dataType: "json",
            success: function (data) {
                if (data.code == 2000) {
                    console.log(data);
                }
            }
        })
        $(div).append("<p><span>任晓斌：</span><span>"+c+"</span></p>");
    })*/
})
/*获取当前时间*/
/*
getTime();
function getTime(){
    var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    var hour=date.getHours();
    if(hour<10){hour="0"+hour};
    var minute=date.getMinutes();
    if(minute<10){minute="0"+minute};
    var second=date.getSeconds();
    if(second<10){second="0"+second};
    var time=year+"-"+month+"-"+day+"  "+hour+":"+minute+":"+second;
    // var currentTime=document.querySelector('.thisTime');
    // currentTime.innerText=time;
}*/
