$(function () {
    var url=confit.url;
    $("#btnSubmit").click(function () {
        /************************循环所有已存在的图片对象，准备上传************************************/
        var myArray=new Array();
        var aPhoto=$(".z_addImg img");
        for (var i = 0; i < aPhoto.length; i++) {
            if(aPhoto[i].valueOf().style.display==="none"){
                continue;
            }
            var image = new Image();
            image.src = aPhoto[i].src;
            imgBase = getBase64Image(image);
            myArray[i]=imgBase.split(",")[1];
        }
        /************************判断是否输入************************************/
        if (!$("#editorContent").val()) {
            alert("还未输入内容!");
        }else{
            $.ajax({
                //几个参数需要注意一下
                type: "POST",//方法类型
                dataType: "json",//预期服务器返回的数据类型
                url: "http://123.139.56.182:9090/poverty-web-1.0-SNAPSHOT/upload/img" ,//url
                data: {"titles":myArray},
                traditional: true,
                success: function (result) {
                    console.log(result);//打印服务端返回的数据(调试用)
                    if (result.resultCode === 200) {
                        alert("SUCCESS");
                    }
                    // window.location.href="你所要跳转的页面";
                },
                error: function (XMLHttpRequest, textStatus, errorThrown)
                {
                    alert('访问网络失败！' + errorThrown);
                }
            });
            alert("发表成功！");
            let textareaVal=$("#editorContent").val();
            localStorage.setItem('textareaVal',textareaVal);
            location.href="../html/allPovDynaV.html";
        }
    })
});
/*获得图片*/
function imgChange(obj1) {
    //获取点击的文本框
    var file = document.getElementById("file");
    //存放图片的父级元素
    var imgContainer = document.getElementsByClassName(obj1)[0];
    //获取的图片文件
    var fileList = file.files;
    var imgArr = [];
    //遍历获取到得图片文件
    for (var i = 0; i < fileList.length; i++) {
        var imgUrl = window.URL.createObjectURL(file.files[i]);
        imgArr.push(imgUrl);
        var img = document.createElement("img");
        img.setAttribute("src", imgArr[i]);
        var imgAdd = document.createElement("div");
        imgAdd.setAttribute("class", "z_addImg");
        imgAdd.appendChild(img);
        imgContainer.appendChild(imgAdd);
    };
    imgRemove();
};
/*移除图片*/
function imgRemove() {
    var imgList = document.getElementsByClassName("z_addImg");
    var mask = document.getElementsByClassName("z_mask")[0];
    var cancel = document.getElementsByClassName("z_cancel")[0];
    var sure = document.getElementsByClassName("z_sure")[0];
    for (var j = 0; j < imgList.length; j++) {
        imgList[j].index = j;
        imgList[j].onclick = function() {
            var t = this;
            mask.style.display = "block";
            cancel.onclick = function() {
                mask.style.display = "none";
            };
            sure.onclick = function() {
                mask.style.display = "none";
                t.style.display = "none";
            };
        }
    }
}
/*base64编码图片*/
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
    var dataURL = canvas.toDataURL(ext);
    console.log(dataURL);
    return dataURL;
}
