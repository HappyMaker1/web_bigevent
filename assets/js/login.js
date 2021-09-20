$(function () {
    $('#link_login').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    $('#link_reg').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })


    // 获得layui对象
    let form = layui.form;
    form.verify({
        // 定义一个 pwd 的正则校验规则
        psw: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        rep: function (value) {
            let pw = $('.lock').val();
            if (pw != value) {
                return '两次密码匹配不一致';
            }
        }
    })

    // 调用注册接口
    $('#form_reg').on('submit', function (e) {
        console.log($('#username').val().trim());
        console.log($('#password').val().trim());



        // 发起请求，注册
        $.post('http://api-breakingnews-web.itheima.net/api/reguser', { uname: $('#username').val().trim(), password: $('#password').val().trim() }, function (res) {
            if (res.status !== 0) {
                return console.log(res);
            }
            console.log("注册成功");
        })

        e.preventDefault();
    })
})