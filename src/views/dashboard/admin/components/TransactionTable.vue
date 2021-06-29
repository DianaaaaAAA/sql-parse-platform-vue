<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="实例告警" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.Name | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="结果 " width="150" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.Status | statusFilter">
          {{ row.Status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { fetchInstanceList } from '@/api/instance'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        RUN: 'success',
        STOP: 'info',
        FAIL: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchInstanceList().then(response => {
        this.list = response.data
      })
    }
  }
}
</script>
