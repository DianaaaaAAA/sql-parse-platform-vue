<template>
  <div class="app-container">
    <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" round style="margin: 0 0 16px 16px;" @click="displayAddAudit()">增加</el-button>
    <el-button type="primary" icon="el-icon-refresh-right" size="small" round style="margin: 0 0 16px 16px;" @click="refresh()">刷新</el-button>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="工单ID" width="100">
        <template slot-scope="{row}">
          <span>{{ row.ID }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="实例">
        <template slot-scope="{row}">
          <span>{{ row.Instance }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="SQL脚本">
        <template slot-scope="{row}">
          <span>{{ row.SQLText }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作者">
        <template slot-scope="{row}">
          <span>{{ row.User }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间">
        <template slot-scope="{row}">
          <span>{{ row.Created }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" align="center" label="状态" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.Status | statusFilter">
            {{ row.Status }}
          </el-tag>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { fetchAuditList } from '@/api/audit'

export default {
  name: 'InlineEditTable',
  filters: {
    statusFilter(status) {
      const statusMap = {
        DONE: 'success',
        RUNNING: 'info',
        TERMINATED: 'danger'
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
        limit: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    refresh() {
      this.getList()
    },
    getList() {
      this.listLoading = true
      fetchAuditList().then(response => {
        this.list = response.data
        console.log(this.list)
        this.listLoading = false
      })
    },
    displayAddAudit() {
      // console.log('pushing')
      this.$router.push({
        path: '/tisp/applyForAudit'
      })
    }
    // cancelEdit(row) {
    //   row.title = row.originalTitle
    //   row.edit = false
    //   this.$message({
    //     message: 'The title has been restored to the original value',
    //     type: 'warning'
    //   })
    // },
    // confirmEdit(row) {
    //   row.edit = false
    //   row.originalTitle = row.title
    //   this.$message({
    //     message: 'The title has been edited',
    //     type: 'success'
    //   })
    // }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
