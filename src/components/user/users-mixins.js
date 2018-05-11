export default {
  data () {
    return {
      // 获取关键字
      keywords: '',
      // 当前页码值
      nowPage: 1,
      // 每页显示条数
      pageSize: 2,
      // 用户列表查询数据
      userlist: [],
      // 总记录条数
      total: 0,
      // 添加用户弹框默认显示false
      addUserDialogVisible: false,
      // 编辑用户弹框默认显示false
      editUserDialogVisible: false,
      // 角色分配权限默认显示false
      setRoleDialogVisible: false,
      // 添加用戶表單對象
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 编辑用户表单对象
      editUserForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      // 分配角色表单对象
      setRoleForm: {},
      // 添加用戶表單規則
      addUserFormRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
      },
      // 编辑用户表单规则
      editUserFormRules: {
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 获取用户列表
    async getUserList () {
      const { data: res } = await this.$http.get('users', { params: { query: this.keywords, pagenum: this.nowPage, pagesize: this.pageSize } })
      // 获取数据失败
      if (res.meta.status !== 200) return this.$message.error('获取用户列表失败！')
      this.userlist = res.data.users
      this.total = res.data.total
      // console.log(this.userlist)
    },
    // 每当用户的状态被修改以后，触发这个回调
    async stageChanged (row) {
      // console.log(row.id + ' ---' + row.mg_state)
      const { data: res } = await this.$http.put(`users/${row.id}/state/${row.mg_state}`)
      if (res.meta.status !== 200) return this.$message.error('修改状态失败！')
      this.$message.success('修改状态成功！')
    },
    // 当pageSize改变时出发此事件
    handleSizeChange (newsize) {
      // console.log(newsize)
      this.pageSize = newsize
      this.getUserList()
    },
    // 当前pagesize页码值改变出发此事件
    handleCurrentChange (newpage) {
      // console.log(newpage)
      this.nowPage = newpage
      this.getUserList()
    },
    // 监听添加对话框的关闭事件，并且重置表单
    resetAddForm () {
      this.$refs.addUserFormRefs.resetFields()
    },
    // 监听添加对话框的关闭事件，并且重置表单
    resetEditForm () {
      this.$refs.editUserFormRefs.resetFields()
    },
    // 添加用户点击确定提交数据，并且刷新页面
    addUser () {
      this.$refs.addUserFormRefs.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('users', this.addUserForm)
        // console.log(res)
        if (res.meta.status !== 201) return this.$message.error('添加用户失败')

        this.$message.success('添加用户成功')
        // 重新刷新数据
        this.getUserList()
        // 隐藏对话框
        this.addUserDialogVisible = false
      })
    },
    // 点击删除按钮，根据ID删除对应的数据
    async removeUser (scope) {
      const confirmResult = await this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 用户取消了删除
      if (confirmResult !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
      // 发起请求删除数据
      const { data: res } = await this.$http.delete('users/' + scope.row.id)
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error('删除失败')
      this.$message.success('删除成功')
      // 数据重新渲染
      this.getUserList()
    },
    // 点击编辑按钮，显示对应的数据
    async showEditDialog (scope) {
      // 显示当前的弹出框，默认false
      this.editUserDialogVisible = true
      // 为保证每次获取的数据是最新的，需要查询ID得到最新数据、
      const { data: res } = await this.$http.get('users/' + scope.row.id)
      // console.log(res)
      this.editUserForm.username = res.data.username
      this.editUserForm.email = res.data.email
      this.editUserForm.mobile = res.data.mobile
      this.editUserForm.id = res.data.id
    },
    // 点击确定 保存用户信息
    editUser () {
      // 判断表单信息是否完整
      this.$refs.editUserFormRefs.validate(async valid => {
        if (!valid) return
        // 发起请求
        const { data: res } = await this.$http.put('users/' + this.editUserForm.id, {
          email: this.editUserForm.email,
          mobile: this.editUserForm.mobile
        })
        if (res.meta.status !== 200) return this.$message.error('编辑用户失败')
        this.$message.success('编辑用户成功')
        // 重新展示数据
        this.getUserList()
        // 隐藏弹窗
        this.editUserDialogVisible = false
      })
    },
    // 点击编辑按钮，显示对应的数据
    async showSetRoleDialog (scope) {
      const { data: res } = await this.$http.get('users/' + scope.row.id)
      if (res.meta.status !== 200) return this.$message.error('获取用户信息失败')
      // 获取成功后，显示对话框
      this.setRoleDialogVisible = true
      this
    },
    // 点击确定，分配权限成功
    setNewRole () {}
  }
}
