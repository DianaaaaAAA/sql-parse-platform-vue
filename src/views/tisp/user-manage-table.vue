<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.Name" placeholder="用户名" style="margin-right: 20px; width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.Permission" placeholder="权限等级" clearable style="width: 250px" class="filter-item">
        <el-option v-for="item in PermissionOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button v-waves class="filter-item" round style="margin: 0 0 16px 16px;" size="small" type="primary" icon="el-icon-search" @click="handleFilter">
        查找
      </el-button>
      <el-button class="filter-item" round style="margin: 0 0 16px 16px;" size="small" type="warning" icon="el-icon-circle-plus-outline" @click="displayAdd">
        增加
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" size="small" round style="margin: 0 0 16px 16px;" type="success" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 95%;"
    >
      <el-table-column label="ID" align="center" width="50">
        <template slot-scope="{row}">
          <span>{{ row.ID }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户名" width="125px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="角色" min-width="100px" align="center">
        <template slot-scope="{row}">
          <!-- <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span> -->
          <span>{{ row.Character }}</span>
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column label="最新登录时间" min-width="250px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.LastLogin }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录次数" align="center" width="120px">
        <template slot-scope="{row}">
          <span>{{ row.LoginCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="125">
        <template slot-scope="{row}">
          <el-tag :type="row.Status | statusFilter">
            {{ row.Status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="success" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button  size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!--弹出框待修改-新建用户 -->
    <el-dialog
      :title="dialogStatus"
      :visible.sync="addFormVisible"
      :before-close="cancelAdd"
    >
      <el-form
        ref="addForm"
        :model="addUser"
        :rules="addRules"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="用户名" prop="Name">
          <el-input v-model="addUser.Name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="角色" prop="Character">
          <el-select v-model="addUser.Character" class="filter-item">
            <el-option v-for="item in CharacterOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="权限等级" prop="Permission">
          <el-input v-model="addUser.Permission" type="number" :min="1" :max="3" style="margin-top:8px;"/>
        </el-form-item>
        <el-form-item label="用户状态" prop="Status">
          <el-select v-model="addUser.Status" class="filter-item">
            <el-option v-for="item in StatusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancelAdd">
          关闭
        </el-button>
        <el-button
          type="primary"
          @click="add()"
        >
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchUsersList, creatUser, updateUser} from '@/api/users.js'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'UserManageTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        online: 'success',
        offline: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        Name: undefined,
        Permission: undefined
      },
      dialogStatus: '',
      addFormVisible: false,
      addUser: {
      },
      CharacterOptions: ['User', 'Admin', 'DBA'],
      PermissionOptions: ['1', '2', '3'],
      StatusOptions: ['online', 'offline'],
      addRules: {
        title: [{ required: true, message: '用户名必须输入', trigger: 'change' }],
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      // this.listLoading = true
      // fetchUsersList(this.listQuery).then(response => {
      //   this.list = response.data
      //   console.log(this.list)
      //   this.listLoading = false
      // })
      this.listLoading = true
      fetchUsersList(this.listQuery).then(response => {
        this.list = response.data
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    displayAdd() {
      this.addFormVisible = true
      this.$message({
        message: '该功能暂未启用',
        type: 'warning'
      })
    },
    cancelAdd() {
      this.addUser = {}
      this.addFormVisible = false
    },
    add() {
      addUser().then(response => {
        this.$message.success('操作成功')
        this.cancelAdd()
      })
    },
    monitor(row) {

    },

    handleUpdate(row) {
      this.addFormVisible = true
      this.addUser = Object.assign({}, row) // copy obj
      this.dialogStatus = '修改信息'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const userData = Object.assign({}, this.addUser)
          updateUser(userData).then(() => {
            this.list.splice(index, 1, this.addUser)
            this.addFormVisible = false
            this.$notify({
              title: 'Success',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    //待完善，目前无法下载内容
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['用户名', '角色', '登录次数', '状态']
        const filterVal = ['用户名', '角色', '登录次数', '状态']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '用户信息表'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
          return v[j]

      }))
    }
  }
}
</script>
