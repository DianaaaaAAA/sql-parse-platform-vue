<template>
  <div class="app-container">
    <div class="filter-container">
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
      style="width: 100%;"
    >
      <el-table-column label="ID" align="center" width="50">
        <template slot-scope="{row}">
          <span>{{ row.ID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="125px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" min-width="250px" align="center">
        <template slot-scope="{row}">
          <!-- <span>{{ row.Created | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
          <span>{{ row.Created }}</span>
        </template>
      </el-table-column>

      <el-table-column label="权限等级" align="center" width="120px">
        <template slot-scope="{row}">
          <span>{{ row.Permission }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="120">
        <template slot-scope="{row}">
          <el-tag :type="row.Status | statusFilter">
            {{ row.Status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="success" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.Status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog
      :title="dialogStatus"
      :visible.sync="addFormVisible"
      :before-close="cancelAdd"
    >
      <el-form
        ref="addForm"
        :model="addChara"
        :rules="addrules"
        label-position="left"
        label-width="70px"
      >
        <el-form-item label="角色" prop="Name" placeholder="请选择用户角色">
          <el-select v-model="addChara.Name" class="filter-item">
            <el-option v-for="item in CharacterOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="权限等级" prop="Permission" placeholder="请选择权限等级">
          <el-select v-model="addChara.Permission" class="filter-item">
            <el-option v-for="item in PermissionOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="Status" placeholder="请选择角色状态">
          <el-select v-model="addChara.Status" class="filter-item">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
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
import { fetchCharaList, updateChara } from '@/api/chara'
import waves from '@/directive/waves' // waves directive
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'RoleManageTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        enabled: 'success',
        disabled: 'danger'
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
        limit: 20
      },
      CharacterOptions: ['User', 'Admin', 'DBA'],
      PermissionOptions: [1, 2, 3],
      statusOptions: ['enabled', 'disabled'],
      dialogStatus: '',
      addFormVisible: false,
      addChara: {
      },
      addrules: {
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchCharaList(this.listQuery).then(response => {
        this.list = response.data
        console.log(this.list)
        this.listLoading = false
      })
    },
    displayAdd() {
      this.addFormVisible = true
    },
    cancelAdd() {
      this.addChara = {}
      this.addFormVisible = false
    },
    add() {
      this.addUser().then(response => {
        this.$message.success('操作成功')
        this.cancelAdd()
      })
    },
    monitor(row) {

    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleUpdate(row) {
      this.addChara = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.addFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const charaData = Object.assign({}, this.addChara)
          updateChara(charaData).then(() => {
            // FIXME: index not defined here
            const index = 1
            this.list.splice(index, 1, this.addChara)
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
    }
    // handleDownload() {
    //   this.downloadLoading = true
    //   import('@/vendor/Export2Excel').then(excel => {
    //     const tHeader = ['创建日期', '，描述', '角色', '权限等级', '状态']
    //     const filterVal =  ['创建日期', '，描述', '角色', '权限等级', '状态']
    //     const data = this.formatJson(filterVal)
    //     excel.export_json_to_excel({
    //       header: tHeader,
    //       data,
    //       filename: 'table-list'
    //     })
    //     this.downloadLoading = false
    //   })
    // },
    // formatJson(filterVal) {
    //   return this.list.map(v => filterVal.map(j => {
    //     if (j === 'timestamp') {
    //       return parseTime(v[j])
    //     } else {
    //       return v[j]
    //     }
    //   }))
    // },
    // getSortClass: function(key) {
    //   const sort = this.listQuery.sort
    //   return sort === `+${key}` ? 'ascending' : 'descending'
    // }
  }
}
</script>
