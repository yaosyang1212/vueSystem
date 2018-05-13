export default {
  data () {
    return {
      rolesList: []
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
    }
  }
}
