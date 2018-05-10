export default {
  data () {
    return {
      // 是否渲染为密码框
      ispwd: true,
      // 表单登录对象
      loginForm: {
        username: '',
        password: ''
      },
      // 表单验证规则
      loginFormRules: {
        // 用户名校验规则
        username: [{ required: true, message: '请输入登录名', trigger: 'blur' }, { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }],
        // 登陆密码的校验规则
        password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }, { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }]
      }
    }
  },
  components: {},
  methods: {
    // 重置密码和用户名
    reset () {
      this.$refs.loginFormRef.resetFields()
    },
    // 登录
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return this.$message.error('请填写完整表单信息')
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功！')
        // console.log(res)
        // 登录成功后服务器颁发的令牌，存储到 sessionStorage 中
        sessionStorage.setItem('token', res.data.token)
        // console.log(this)
        this.$router.push('/home')
      })
    }
  }
}
