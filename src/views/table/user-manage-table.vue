<template>
  <div>
    <!--    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <!--    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">系统管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <div class="app-container">
      <div class="handle-box">
        <el-button
          type="primary"
          icon="delete"
          class="handle-del mr10"
          :disabled="this.delData.length===0"
          @click="delAll"
        >批量删除</el-button>
        <el-input v-model="searchInfo" placeholder="筛选关键词" class="handle-input mr10" />
        <el-button type="primary" icon="search" @click="getUsers">搜索</el-button>
        <el-button type="primary" @click="addUserVisible=true">新建用户</el-button>
      </div>
      <el-table
        ref="multipleTable"
        v-loading="isShowloading"
        :data="users"
        border
        class="table"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="65" align="center" />
        <el-table-column prop="orderNum" label="序号" sortable width="150" />
        <el-table-column prop="username" align="center" label="用户名" width="120" />
        <el-table-column prop="rolename" align="center" label="角色名称" />
        <el-table-column prop="isable" align="center" label="状态" :formatter="formatterState" />
        <el-table-column prop="loginTime" align="center" label="登录次数" />
        <el-table-column prop="loginDate" align="center" label="登录时间" />
        <el-table-column prop="creater" align="center" label="创建者" />
        <el-table-column label="操作" width="230" align="center">
          <!--          <template slot-scope="{row}">
            <el-tag :type="row.status | statusFilter">
              {{row.status}}
            </el-tag>
          </template> -->
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          @current-change="currentChange"
        />
      </div>
      <!-- 编辑框 -->
      <el-dialog
        ref="editUserForm"
        v-dialogDrag
        title="修改信息"
        :visible.sync="editUserVisible"
        :before-close="confirmClose"
      >
        <el-form ref="editUserForm" :model="userForm" :rules="editRule">
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
            <el-input v-model="userForm.username" autocomplete="off" />
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-radio v-model="userForm.isable" label="1">正常</el-radio>
            <el-radio v-model="userForm.isable" label="0">禁用</el-radio>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editUserVisible=false">取 消</el-button>
          <el-button type="primary" @click.native="editUser">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 新建用户 -->
      <el-dialog ref="addUserForm" v-dialogDrag title="新建用户" :visible.sync="addUserVisible">
        <el-form :model="addUserForm" :rules="addUserRule">
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
            <el-input v-model="addUserForm.username" autocomplete="off" />
          </el-form-item>
          <el-form-item label="角色名称" :label-width="formLabelWidth" prop="rolename">
            <el-select v-model="addUserForm.rolename">
              <!-- <el-option label="admin" value="admin"></el-option> -->
              <el-option label="普通用户" value="普通用户" />
              <el-option label="管理员" value="管理员" />
              <el-option label="超级管理员" value="超级管理员" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-radio v-model="addUserForm.isable" label="1">正常</el-radio>
            <el-radio v-model="addUserForm.isable" label="0">禁用</el-radio>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addUserVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveUser">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  getUserList,
  getDeleUser,
  getEditUser,
  getAddUser,
  getDeleteOne,
  testApi
} from '../../api/user-manage'
export default {
  data() {
    return {
      url: '',
      searchInfo: '',
      users: [],
      total: 0,
      pageNo: 1,
      pageSize: 20,
      isShowloading: false,
      delData: [], // 删除的数据
      editUserVisible: false, // 是否显示编辑
      addUserVisible: false, // 新建用户框
      userForm: {}, // 编辑数据
      addUserForm: {
        username: '',
        rolename: '',
        isable: '0'
      }, // 添加用户数据
      addUserRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        rolename: [
          {
            required: true,
            message: '请选择角色',
            trigger: 'change'
          }
        ]
      },
      editRule: {
        username: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }
        ]
      },
      formLabelWidth: '120px'
    }
  },
  mounted() {
    // this.getUsers();
    this.testFn()
  },
  methods: {
    formatterState(row, cloumn) {
      return row.isable == '1' ? '正常' : '禁用'
    },
    getUsers() {
      this.isShowloading = true
      const params = {
        searchInfo: this.searchInfo.trim(),
        page: this.pageNo
      }
      getUserList(params).then(res => {
        this.users = res.data.users
        this.total = res.data.total
        this.isShowloading = false
      })
    },
    currentChange(val) {
      this.pageNo = val
      this.getUsers()
    },
    handleSelectionChange(delData) {
      this.delData = delData
    },
    saveUser() {
      const params = Object.assign({}, this.addUserForm)
      params.username = params.username.trim()
      getAddUser(params).then(res => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.addUserVisible = false
        this.addUserForm = {}
        this.getUsers()
      })
    },
    delAll() {
      this.$confirm('确认删除该用户吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.isShowloading = true
        const delIds = this.delData.map(item => item.userid).toString()
        const params = {
          delIds: delIds
        }
        getDeleUser(params).then(res => {
          this.isShowloading = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getUsers()
        })
      })
    },
    handleEdit(index, row) {
      this.editUserVisible = true
      this.userForm = Object.assign({}, row)
    },
    handleDelete(index, row) {
      const params = {
        userid: row.userid
      }
      this.$confirm('确认删除该用户？', '提示', {
        type: 'warning'
      }).then(() => {
        getDeleteOne(params).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getUsers()
        })
      })
    },
    editUser() {
      debugger
      this.$refs['editUserForm'].validate((valid) => {
        debugger
        if (valid) {
          const params = this.userForm
          getEditUser(params)
            .then(res => {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
              this.getUsers()
              this.editUserVisible = false
              this.userForm = {}
            })
            .bind(this)
        }
      })
    },
    confirmClose(done) {
      this.$confirm('确认关闭将丢失已编辑内容？', '提示', {
        type: 'warning'
      }).then(() => {
        this.userForm = {}
        done()
      })
    },
    testFn() {
      this.url = '/ms/table/list'
      this.$axios.get(this.url).then(res => {
        console.log(res)
      })
      testApi().then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
</style>
