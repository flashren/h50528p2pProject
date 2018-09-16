$(function() {
    //-------------------------------------注册表单的验证和提交--------------------------------------
    //对哪个表单做验证
    $('#regForm')
        .bootstrapValidator({
            message: 'This value is not valid', //全局的出错消息配置
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok', //验证成功的图标
                invalid: 'glyphicon glyphicon-remove', //验证失败的图标
                validating: 'glyphicon glyphicon-refresh' //异步验证ajax
            },
            //对那些字段做验证，注意使用name属性
            fields: {
                //对用户名做验证
                username: {
                    message: '用户名验证失败',
                    //验证的规则
                    validators: {
                        //非空
                        notEmpty: {
                            message: '用户名必须填写'
                        },
                        //长度
                        stringLength: {
                            min: 6, //最小
                            max: 12, //最大
                            message: '用户名长度必须在6~12位之间'
                        }
                    }
                },
                password: {
                    message: '密码验证失败',
                    //验证的规则
                    validators: {
                        //非空
                        notEmpty: {
                            message: '密码必须填写'
                        },
                        //长度
                        stringLength: {
                            min: 6, //最小
                            max: 18, //最大
                            message: '密码长度必须在6~18位之间'
                        }
                    }
                },
                repeatPassword: {
                    message: '确认密码验证失败',
                    //验证的规则
                    validators: {
                        //非空
                        notEmpty: {
                            message: '确认密码必须填写'
                        },
                        //长度
                        stringLength: {
                            min: 6, //最小
                            max: 18, //最大
                            message: '确认密码长度必须在6~18位之间'
                        },
                        //密码相同性的验证
                        identical: {
                            field: 'password', //对哪个字段做比较
                            message: '两次输入的密码不一致'
                        }
                    }
                },
                email: {
                    message: '电子邮件验证失败',
                    //验证的规则
                    validators: {
                        //非空
                        notEmpty: {
                            message: '电子邮件必须填写'
                        },
                        //电子邮件的规则
                        emailAddress: {
                            message: '电子邮件格式不正确'
                        }
                    }
                },
                mobile: {
                    message: '手机号码验证失败',
                    //验证的规则
                    validators: {
                        //非空
                        notEmpty: {
                            message: '手机号码必须填写'
                        },
                        //手机号码正则表达式验证
                        regexp: {
                            regexp: /^((1[358][0-9])|(14[57])|(17[0678])|(19[7]))\d{8}$/,
                            message: '手机号码格式不正确'
                        }
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
            // 阻止表单的默认提交行为
            e.preventDefault();

            // 获取表单实例
            var $form = $(e.target);

            // 获取验证实例
            var bv = $form.data('bootstrapValidator');

            // 使用AJAX提交表单数据
            /* 
              jquery发起ajax语法：$.post(url,data,success(data, textStatus, jqXHR),dataType)
              参数说明
               url   请求的地址
               data  发送的数据，建议对象格式，也可以是字符串的拼接
               success(data, textStatus, jqXHR)  成功的回调函数
               dataType 返回的数据类型json


               表单对象.serialize() 方法： 批量获取表单元素的值，拼接为字符串 a=1&b=2&c=3
             */
            const reqUrl="./api/userAdd.php"; //请求地址
            const data=$form.serialize(); //表单数据
            $.post(reqUrl, data, function(result) {
                console.log("api返回的结果",result);
                //根据后端的结果处理前端的业务逻辑
                if(result.isSuccess){
                    //成功
                    alert(result.msg);
                    location.href="./login.php"; //跳转到登录页面
                }else{
                    //失败
                    alert(result.msg);
                }
            }, 'json');
        });

    //-------------------------------------登录表单的验证和提交--------------------------------------
    //对哪个表单做验证
    $('#loginForm')
    .bootstrapValidator({
        message: 'This value is not valid', //全局的出错消息配置
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok', //验证成功的图标
            invalid: 'glyphicon glyphicon-remove', //验证失败的图标
            validating: 'glyphicon glyphicon-refresh' //异步验证ajax
        },
        //对那些字段做验证，注意使用name属性
        fields: {
            //对用户名做验证
            username: {
                message: '用户名验证失败',
                //验证的规则
                validators: {
                    //非空
                    notEmpty: {
                        message: '用户名必须填写'
                    },
                    //长度
                    stringLength: {
                        min: 6, //最小
                        max: 12, //最大
                        message: '用户名长度必须在6~12位之间'
                    }
                }
            },
            password: {
                message: '密码验证失败',
                //验证的规则
                validators: {
                    //非空
                    notEmpty: {
                        message: '密码必须填写'
                    },
                    //长度
                    stringLength: {
                        min: 6, //最小
                        max: 18, //最大
                        message: '密码长度必须在6~18位之间'
                    }
                }
            }
        }
    })
    .on('success.form.bv', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault();

        // 获取表单实例
        var $form = $(e.target);

        // 获取验证实例
        var bv = $form.data('bootstrapValidator');

        // 使用AJAX提交表单数据
        const reqUrl="./api/userCheck.php"; //请求地址
        const data=$form.serialize(); //表单数据
        $.post(reqUrl, data, function(result) {
            console.log("api返回的结果",result);
            //根据后端的结果处理前端的业务逻辑
            if(result.isSuccess){
                //登录成功后就调用蒙层的显示方法，显示蒙层 $('#myModal').modal('show')
                //alert(result.msg);  效果太low改为模态框（蒙层效果）
                //1. 设置蒙层的标题
                $("#msgShowTitle").text("登录成功")  
                //2. 设置蒙层的内容
                $("#msgShowContent").html(`<span class='glyphicon glyphicon-ok'></span> ${result.msg}，等待<span id
                ='num'>6</span>秒后跳转到个人中心`);
                //定时器修改等待的数字
                let num=6;
                var timesID=setInterval(()=>{
                   num--;
                   $("#num").text(num);
                   if(num==0){
                       clearInterval(timesID);
                       location.href="./personal.php";//跳转到登录页面
                   }
                },1000);
            }else{
                //失败
                //alert(result.msg);
                //1. 设置蒙层的标题
                $("#msgShowTitle").text("登录失败")  
                //2. 设置蒙层的内容
                $("#msgShowContent").html("<span class='glyphicon glyphicon-remove'></span> "+result.msg);
            }
            //3. 显示蒙层
            $('#msgShowModal').modal('show');
        }, 'json');
    });
});