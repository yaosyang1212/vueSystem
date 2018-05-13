<template>
 <div class='roles-container'>
   <!-- 面包屑 -->
   <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
        <el-table
            :data="rolesList"
            border
            style="width: 100%">
            <el-table-column
            type='expand'>
              <template slot-scope='scope'>
                <!-- 第一层：循环渲染 scope.row.children -->
                <el-row v-for="(frist,index1) of scope.row.children" :key="frist.id" :style="{'border-top':'1px solid #ccc','border-bottom':index1==scope.row.children.length-1?'1px solid #ccc':''}">
                <el-col :span="4">
                  <el-tag closable @close='removeTag(scope,frist.id)'>{{frist.authName}}</el-tag>
                  <i class='el-icon-caret-right'></i>
                </el-col>
                <!-- 第二层：循环渲染 -->
                <el-col :span="20">
                  <el-row v-for="(second,index2) of frist.children" :key="second.id" :style="{'border-top':index2==0?'':'1px solid #ccc'}">
                    <el-col :span="4">
                      <el-tag closable type="success" @close='removeTag(scope,second.id)'>{{second.authName}}</el-tag>
                      <i class='el-icon-caret-right'></i>
                    </el-col>
                  <!-- 第三层：循环渲染 -->
                    <el-col :span="20">
                      <el-tag closable type="warning" v-for="(third) of second.children" :key="third.id" @close='removeTag(scope,third.id)'>{{third.authName}}</el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              </template>
            </el-table-column>
            <el-table-column
            type='index'
            width="180">
            </el-table-column>
            <el-table-column
            prop="roleName"
            label="角色名称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="roleDesc"
            label="描述">
            </el-table-column>
            <el-table-column
            prop="address"
            label="操作"
            width='300'>
              <template slot-scope='scope'>
                <el-button type="primary" icon="el-icon-edit" size='mini'>编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size='mini'>删除</el-button>
                <el-button type="warning" icon="el-icon-setting" size='mini'>分配权限</el-button>
              </template>
            </el-table-column>
        </el-table>
    </el-card>
 </div>
</template>

<script>
import mix from './roles-mixins.js'
export default {
  mixins: [mix]
}
</script>

<style lang='less' scoped>
  .el-tag{
    margin:10px 5px;
  }
</style>
