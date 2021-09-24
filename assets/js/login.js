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
    var layer = layui.layer;
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
        e.preventDefault();


        // 发起请求，注册
        $.post('/api/reguser', { uname: $('#username').val().trim(), password: $('#password').val().trim() }, function (res) {
            if (res.status !== 0) {
                $('#link_reg').click();
                return layer.msg("注册失败");
            }
            layer.msg("注册成功");

            // 自动跳转页面
            $('#link_reg').click();
        })


    })

    // 监听登录表单
    $('#form_login').on('click', function (e) {
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: '/api/login',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败');
                }
                layer.msg("登录成功");
                console.log(res.token);

                localStorage.setItem('token', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOiLms6Xlt7Tlt7QiLCJlbWFpbCI6Im5pYmFiYUBpdGNhc3QuY24iLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTU3ODAzNjY4MiwiZXhwIjoxNTc4MDcyNjgyfQ.Mwq7GqCxJPK-EA8LNrtMG04llKdZ33S9KBL3XeuBxuI")
                // 跳转后台主页
                location.href = '/index.html'
            }
        })

    })
})