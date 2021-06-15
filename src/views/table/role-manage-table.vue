<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.Permission" placeholder="权限等级" clearable style="width: 250px" class="filter-item">
        <el-option v-for="item in PermissionOptions" :key="item" :label="item" :value="item" />
      </el-select>
<!--      <el-select v-model="listQuery.sort" style="margin-left: 20px; width: 200px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select> -->
      <el-button v-waves class="filter-item" style="margin-left: 20px; width: 200px" type="primary" icon="el-icon-search" @click="handleFilter">
        查找
      </el-button>
      <el-button class="filter-item" style="margin-left: 20px; width: 200px" type="primary" icon="el-icon-edit" @click="handleCreate">
        增加
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" style="margin-left: 20px; width: 200px" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 80%;"
    >
      <!-- <el-table-column label="ID" prop="ID" sortable="custom" align="center" width="80" :class-name="getSortClass('id')"> -->
      <el-table-column label="ID" align="center" width="130">
        <template slot-scope="{row}">
          <span>{{ row.ID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Name }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="角色描述" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="创建日期" width="280px" align="center">
        <template slot-scope="{row}">
          <!-- <span>{{ row.Created | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
          <span>{{ row.Created }}</span>
        </template>
      </el-table-column>

      <el-table-column label="权限等级" align="center" width="200px">
        <template slot-scope="{row}">
          <!-- <svg-icon v-for="n in + row.Permission" :key="n" icon-class="star" class="meta-item__icon" /> -->
          <span>{{ row.Permission }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="Readings" align="center" width="95">
        <template slot-scope="{row}">
          <span v-if="row.pageviews" class="link-type" @click="handleFetchPv(row.pageviews)">{{ row.pageviews }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column> -->
      <el-table-column label="状态" class-name="status-col" width="200">
        <template slot-scope="{row}">
          <el-tag :type="row.Status | statusFilter">
            {{ row.Status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import { fetchCharaList } from '@/api/chara'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'Role-Manage-Table',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
    // typeFilter(type) {
    //   return calendarTypeKeyValue[type]
    // }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        // Permission: undefined,
        // Name: undefined
        // sort: '+id'
    },
      PermissionOptions: [1, 2, 3],
      // calendarTypeOptions,
      // sortOptions: [{ label: 'ID 升序排列', key: '+id' }, { label: 'ID 降序排列', key: '-id' }],
      // statusOptions: ['保存', '草稿', '删除'],
      // showReviewer: false,
      // temp: {
      //   // id: undefined,
      //   importance: 1,
      //   // remark: '',
      //   timestamp: new Date(),
      //   title: '',
      //   // type: '',
      //   status: '保存'
      // },
      // dialogFormVisible: false,
      // dialogStatus: '',
      // textMap: {
      //   update: 'Edit',
      //   create: 'Create'
      // },
      // rules: {
      //   title: [{ required: true, message: '描述必须输入', trigger: 'change' }],
      //   timestamp: [{ type: 'date', required: true, message: '日期必须输入', trigger: 'change' }],
      //   // title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      // },
      // downloadLoading: false
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

        // Just to simulate the time of the request
        // setTimeout(() => {
        //   this.listLoading = false
        // }, 1.5 * 1000)
      })
    },
    // handleFilter() {
    //   this.listQuery.page = 1
    //   this.getList()
    // },
    // handleModifyStatus(row, status) {
    //   this.$message({
    //     message: '操作成功',
    //     type: 'success'
    //   })
    //   row.status = status
    // },
    // sortChange(data) {
    //   const { prop, order } = data
    //   if (prop === 'id') {
    //     this.sortByID(order)
    //   }
    // },
    // sortByID(order) {
    //   if (order === 'ascending') {
    //     this.listQuery.sort = '+id'
    //   } else {
    //     this.listQuery.sort = '-id'
    //   }
    //   this.handleFilter()
    // },
    // resetTemp() {
    //   this.temp = {
    //     id: undefined,
    //     importance: 1,
    //     remark: '',
    //     timestamp: new Date(),
    //     title: '',
    //     status: '保存',
    //     type: ''
    //   }
    // },
    // handleCreate() {
    //   this.resetTemp()
    //   this.dialogStatus = 'create'
    //   this.dialogFormVisible = true
    //   this.$nextTick(() => {
    //     this.$refs['dataForm'].clearValidate()
    //   })
    // },
    // createData() {
    //   this.$refs['dataForm'].validate((valid) => {
    //     if (valid) {
    //       this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
    //       this.temp.author = 'vue-element-admin'
    //       createArticle(this.temp).then(() => {
    //         this.list.unshift(this.temp)
    //         this.dialogFormVisible = false
    //         this.$notify({
    //           title: 'Success',
    //           message: '创建成功',
    //           type: 'success',
    //           duration: 2000
    //         })
    //       })
    //     }
    //   })
    // },
    // handleUpdate(row) {
    //   this.temp = Object.assign({}, row) // copy obj
    //   this.temp.timestamp = new Date(this.temp.timestamp)
    //   this.dialogStatus = 'update'
    //   this.dialogFormVisible = true
    //   this.$nextTick(() => {
    //     this.$refs['dataForm'].clearValidate()
    //   })
    // },
    // updateData() {
    //   this.$refs['dataForm'].validate((valid) => {
    //     if (valid) {
    //       const tempData = Object.assign({}, this.temp)
    //       tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
    //       updateArticle(tempData).then(() => {
    //         const index = this.list.findIndex(v => v.id === this.temp.id)
    //         this.list.splice(index, 1, this.temp)
    //         this.dialogFormVisible = false
    //         this.$notify({
    //           title: 'Success',
    //           message: '更新成功',
    //           type: 'success',
    //           duration: 2000
    //         })
    //       })
    //     }
    //   })
    // },
    // handleDelete(row, index) {
    //   this.$notify({
    //     title: 'Success',
    //     message: '删除成功',
    //     type: 'success',
    //     duration: 2000
    //   })
    //   this.list.splice(index, 1)
    // },
    // handleFetchPv(pv) {
    //   fetchPv(pv).then(response => {
    //     this.pvData = response.data.pvData
    //     this.dialogPvVisible = true
    //   })
    // },
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
