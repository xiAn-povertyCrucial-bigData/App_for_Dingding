dd.ready(function(){
    var url=config.url;
    var datas;
    var arr=[];
    var showimg = document.getElementById("imgBox");
    var imginput = document.getElementById("bimg");
    /*imginput.addEventListener('change', function() {
        for(var i=0;i<this.files.length;i++){
            // arr=[];
            let file = this.files[i];
            if (!/image\/\w+/.test(this.files[i].type)) {
                alert("请确保文件为图像类型");
                return false;
            }
            var reader = new FileReader();
            reader.readAsDataURL(this.files[i]);
            reader.onload = function(e) {
                $(showimg).append('<img src="' + this.result + '" alt=""/>');
                var data=new FormData();
                arr.push(file);
                for(var i=0;i<arr.length;i++){
                    data.append('file',arr[i]);
                }
                datas=data;
                for (var value of data.values()) {
                    console.log(value);
                }
            }
        }
    }, false);*/
   /* var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    imginput.addEventListener('change', function () {
        var _this = this;

        var _loop = function _loop() {
            // arr = [];
            var file = _this.files[i];
            if (!/image\/\w+/.test(_this.files[i].type)) {
                alert("请确保文件为图像类型");
                return {
                    v: false
                };
            }
            reader = new FileReader();

            reader.readAsDataURL(_this.files[i]);
            reader.onload = function (e) {
                $(showimg).append('<img src="' + this.result + '" alt=""/>');
                var data = new FormData();
                arr.push(file);
                for (var i = 0; i < arr.length; i++) {
                    data.append('file', arr[i]);
                }
                datas = data;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = data.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var value = _step.value;

                        console.log(value);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            };
        };

        for (var i = 0; i < this.files.length; i++) {
            var reader;

            var _ret = _loop();

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }
    }, false);*/
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    imginput.addEventListener('change', function () {
        var _this = this;

        var _loop = function _loop() {
            // arr=[];
            var file = _this.files[i];
            if (!/image\/\w+/.test(_this.files[i].type)) {
                alert("请确保文件为图像类型");
                return {
                    v: false
                };
            }
            reader = new FileReader();

            reader.readAsDataURL(_this.files[i]);
            reader.onload = function (e) {
                $(showimg).append('<img src="' + this.result + '" alt=""/>');
                var data = new FormData();
                arr.push(file);
                for (var i = 0; i < arr.length; i++) {
                    data.append('file', arr[i]);
                }
                datas = data;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = data.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var value = _step.value;

                        console.log(value);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            };
        };

        for (var i = 0; i < this.files.length; i++) {
            var reader;

            var _ret = _loop();

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
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
        var type=params.type;
        var personCode;
        var localResult=localStorage.getItem("object");
        personCode=JSON.parse(localResult);
        datas.append("helpNumber",personCode.cadnumber);
        datas.append("povertyNumber",personCode.objnumber);
        datas.append("type",type);
        $.ajax({
            url : url+'/evidence/img',
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
                        location.href="../index.html";
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