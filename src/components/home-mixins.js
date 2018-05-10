export default {
  data () {
    return {
      // 菜单是否被收起
      isCollapse: false,
      list: [], // 存储数据
      menuIcons: ['icon-users', 'icon-tijikongjian', 'icon-shangpin', 'icon-danju', 'icon-baobiao'] // 左侧菜单的图标数组
    }
  },
  created () {
    this.getMenu()
  },
  methods: {
    // 退出功能
    logout () {
      sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
    // 获取左侧菜单项
    async getMenu () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error('请求菜单列表失败')
      // console.log(res)
      this.list = res.data
      // console.log(res)
    }
  }
}
