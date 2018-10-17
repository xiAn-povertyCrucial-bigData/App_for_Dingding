dd.ready(function(){
    // 百度地图API功能
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point,12);
    var localResult=localStorage.getItem("objects");
    personCode=JSON.parse(localResult);
    var long,lat,place;
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            var point = new BMap.Point(r.point.lng,r.point.lat);//用所定位的经纬度查找所在地省市街道等信息
            long=r.point.lng;
            lat=r.point.lat;
            var gc = new BMap.Geocoder();
            gc.getLocation(point, function(rs){
                var addComp = rs.addressComponents;
                // console.log(rs.address);//地址信息
                place=rs.address;
                $('#place').append(rs.address)
                //alert(rs.address);//弹出所在地址
            });
        }
        else {
            alert('failed'+this.getStatus());
        }
    },{enableHighAccuracy: true})
    /*获取当前时间*/
    var t = null;
    time();
    function time(){
        dt = new Date();
        var y=dt.getFullYear();
        var month=dt.getMonth()+1;
        var day=dt.getDate();
        var h=dt.getHours();
        if(h<10){h="0"+h};
        var m=dt.getMinutes();
        if(m<10){m="0"+m};
        var s=dt.getSeconds();
        if(s<10){s="0"+s};
        var currentTime=document.querySelector('.currentTime');
        currentTime.innerHTML=y+"-"+month+"-"+day+" "+h+":"+m+":"+s;
        t = setTimeout(time,1000);
    }
    window.onload=function(){time()}
    $("#recordCircular").click(function () {
        $('.QZtitle').html('签到成功');/*提醒签到是否成功*/
        // clearInterval(timers);
    });
    var url=config.url;
    /*判断是否签到*/
    $.ajax({
        url : url+'/help/isSign',
        type : 'post',
        dataType:"json",
        data:{"helpNumber":personCode.cadreNum},
        success : function(data) {
             if(data.data>0){
                 $('.QZtitle').html("已签到").parent().css({"background":"#ccc","boxShadow":"none"}).unbind("click");
             }else if(data.data==0){
                 $("#editorContent").attr("disabled",true);
                 $("#recordCircular").click(function(){
                     $.ajax({
                         url : url+'/help/sign',
                         type : 'post',
                         dataType:"json",
                         data:{"helpPosition":place,"longGitUde":long,"latitude":lat,"helpNumber":personCode.cadreNum},
                         success : function(data){
                             if(data.code==2000){
                                 dd.device.notification.alert({
                                     message: "签到成功",
                                     title: "提示",//可传空
                                     buttonName: "确定",
                                     onSuccess : function() {
                                         //onSuccess将在点击button之后回调
                                         /*回调*/
                                         location.href="povCalendar.html";
                                     },
                                     onFail : function(err) {}
                                 });

                             }
                         }
                     })
                 })
             }
        }
    });
    var datas;
    var arr=[];
    var showimg = document.getElementById("imgBox");
    var imginput = document.getElementById("bimg");
    imginput.addEventListener('change', function() {
        var file = this.files[0];
        if (!/image\/\w+/.test(file.type)) {
            alert("请确保文件为图像类型");
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
            $(showimg).append('<img src="' + this.result + '" alt=""/>');
            var data=new FormData();
            arr.push(file);
            for(var i=0;i<arr.length;i++){
                data.append('file',arr[i]);
                // alert(data.get("file"))
            }
            datas=data;
        }
    }, false);
    /*点击上传*/
    $('#btnSubmit').click(function(){
        var txt,personCode,Select;
        var localResult=localStorage.getItem("objects");
        personCode=JSON.parse(localResult);
        Select=$("input[type='radio']:checked").val();
        if(Select=='电话'){Select=0}
        else if(Select=='实地'){Select=1}
        else if(Select='驻村工作队'){Select=2}
        txt=$("#editorContent").val();
        datas.append("log",txt);
        datas.append("helpNumber",personCode.cadreNum);
        datas.append("visitingMode",Select);
        $.ajax({
            url : url+'/picture/img1',
            type : 'post',
            dataType:"json",
            data:datas,
            processData: false,// 告诉jQuery不要去处理发送的数据
            contentType: false,// 告诉jQuery不要去设置Content-Type请求头
            // contentType: "multipart/form-data",
            success : function(data, status, xhr) {
                dd.device.notification.alert({
                    message: "发布成功",
                    title: "提示",//可传空
                    buttonName: "确定",
                    onSuccess : function() {
                        //onSuccess将在点击button之后回调
                        /*回调*/
                        location.href="aPovDyna.html";
                    },
                    onFail : function(err) {}
                });
            },
            error : function(xhr, errorType, error) {

            }
        });
    })

})
