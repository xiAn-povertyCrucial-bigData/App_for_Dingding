dd.ready(function(){
    var url=config.url;
    var datas;
    var arr=[];
    var data;
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
        //console.log(reader)
        reader.onload = function(e) {
            $(showimg).append('<img src="' + this.result + '" alt=""/>');
            var data=new FormData();
            arr.push(file);
            for(var i=0;i<arr.length;i++){
                data.append('file',arr[i]);
            }
            datas=data;
        }
    }, false);
    /*点击上传*/
    $('#btnSubmit').click(function(){
        /*截取地址栏参数*/
        var params=(function(){
            var search=location.search;	//获取location的search属性，保存在search中
            var params={};		//创建空对象params
            if(search!=""){		//如果search不是空字符串
                search.slice(1).split("&").forEach(	//?username=zhangdong&pwd=123456;//search去开头?，按&切割为数组，forEach
                    function(val){
                        var arr=val.split("=");		//将当前元素值按=切割，保存在arr中
                        params[arr[0]]=arr[1];		//向params中添加一个元素,属性名为arr[0],值为arr[1]
                    }
                );
            }
            return params;		//返回params
        })();
        var personCode;
        var localResult=localStorage.getItem("object");
        personCode=JSON.parse(localResult);
        datas.append("helpNumber",personCode.cadnumber);
        $.ajax({
            url : url+'/picture/aak110',
            type : 'post',
            dataType:"json",
            data:datas,
            processData: false,// 告诉jQuery不要去处理发送的数据
            contentType: false,// 告诉jQuery不要去设置Content-Type请求头
            // contentType: "multipart/form-data",
            success : function(data, status, xhr) {
                dd.device.notification.alert({
                    message: "上传成功",
                    title: "提示",//可传空
                    buttonName: "确定",
                    onSuccess : function() {
                        //onSuccess将在点击button之后回调
                        /*回调*/
                        location.href="assistInformUpdate.html";
                    },
                    onFail : function(err) {}
                });
                // window.location.replace("allPovDyna.html");
            },
            error : function(xhr, errorType, error) {
                // window.location.replace("allPovDyna.html");
            }
        });
    })
})