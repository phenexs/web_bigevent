// 密码校验规则
var form = layui.form
form.verify({
    'pwd': [
        /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    repwd: function(value) {
        var pwd = $('.reg-box [name=password]').val()
        if (value !== pwd) {
            return '两次密码不一致'
        }
    }
})

// 注册与登录间切换
// 点击去注册
$('.login_link').on('click', function() {
    $('.reg-box').show()
    $('.login-box').hide()
});
// 点击去登录
$('.reg_link').on('click', function() {
    $('.login-box').show()
    $('.reg-box').hide()
})

// 注册表单
$('#form_reg').on('submit', function(e) {
    e.preventDefault()
    var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
    $.post('/api/reguser', data, function(res) {
        if (res.status !== 0) {
            return layer.msg(res.message)
        }
        console.log('注册成功')
    })
});
// 监听登录表单的提交事件
$('#form_login').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
        url: '/api/login',
        method: 'POST',
        data: $(this).serialize(),
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('登录失败！')
            }
            // 保存token到localStorange
            localStorage.setItem('token', res.token)
            layer.msg('登录成功！')
            location.href = '/index.html'
        }
    })
})