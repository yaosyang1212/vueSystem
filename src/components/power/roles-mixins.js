export default {
  data () {
    return {
      rolesList: [],
      // 分配权限对话框 默认隐藏
      setRoleDialogVisible: false,
      // 分配权限属性结构数据
      treeData: [],
      // 树形结构对应数据
      treeProps: {
        children: 'children',
        label: 'authName'
      },
      // 默认被勾选的树形节点
      defaultCheckedKeys: [],
      // 被选中角色的id
      selectedRoleId: ''
    }
  },
  created () {
    this.getRolesList()
  },
  methods: {
    // 获取角色列表
    async getRolesList () {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) return this.$message.error('获取角色列表失败')
      this.$message.success('获取角色列表成功')
      this.rolesList = res.data
    },
    // 删除角色权限
    async removeTag (scope, righstId) {
      // 删除前判断用户是否删除该权限
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
      const { data: res } = await this.$http.delete(`roles/${scope.row.id}/rights/${righstId}`)
      if (res.meta.status !== 200) return this.$message.error('删除权限失败')
      this.$message.success('删除数据成功')
      // 最新数据渲染到页面
      scope.row.children = res.data
    },
    // 分配角色权限
    async showSetRoleDialog (scope) {
      // 为了以后使用该方法 先保存
      this.selectedRoleId = scope.row.id
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) return this.$message.error('获取权限列表失败')
      this.treeData = res.data
      // console.log(scope.row)
      this.getLeatKeys(scope.row, this.defaultCheckedKeys)
      // console.log(this.defaultCheckedKeys)
      this.setRoleDialogVisible = true
    },
    // 封装分配权限获取所有三级权限的ID
    getLeatKeys (node, keys) {
      if (!node.children) {
        keys.push(node.id)
      } else {
        node.children.forEach(item => this.getLeatKeys(item, keys))
      }
    },
    // 分配权限时对话框要关闭
    setRoleDialogClosed () {
      // 清空 树形结构的数据
      this.treeData = []
      // 清空默认选中项
      this.defaultCheckedKeys = []
    },
    // 点击确定保存数据
    async saveRights () {
      // 获取全选的状态
      const k1 = this.$refs.tree.getCheckedKeys()
      // 获取半选的状态
      const k2 = this.$refs.tree.getHalfCheckedKeys()
      // ES6展开运算符
      const keys = [...k1, ...k2]

      console.log(keys)
      // 拿到数据状态保存数据到服务器 发起请求
      const { data: res } = await this.$http.post(`roles/${this.selectedRoleId}/rights`, {
        rids: keys.join(',')
      })
      if (res.meta.status !== 200) return this.$message.error('分配权限失败')
      this.$message.success('分配权限成功')
      this.setRoleDialogVisible = false
      this.getRolesList()
    }
  }
}
