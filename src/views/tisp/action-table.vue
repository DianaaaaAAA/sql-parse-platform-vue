<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="{row}">
          <span>{{ row.ID }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="用户">
        <template slot-scope="{row}">
          <span>{{ row.User }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="角色">
        <template slot-scope="{row}">
          <span>{{ row.Character }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" align="center" label="结果" width="120">
        <template slot-scope="{row}">
          <el-tag :type="row.Status | statusFilter">
            {{ row.Status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" align="center" label="操作内容">
        <template slot-scope="{row}">
          <!--   <template v-if="row.Content">
            <el-input v-model="row.title" class="edit-input" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              cancel
            </el-button>
          </template>
          <span v-else>{{ row.title }}</span> -->
          <span>{{ row.Content }}</span>
        </template>
      </el-table-column>

      <el-table-column width="280px" align="center" label="操作日期">
        <template slot-scope="{row}">
          <!-- <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
          <span>{{ row.Created }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { fetchActionList } from '@/api/action'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'

export default {
  name: 'ActionTable',
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
  },
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      fetchActionList(this.listQuery).then(response => {
        this.list = response.data
        console.log(this.list)
        this.listLoading = false
      })
      // const { data } = await fetchList(this.listQuery)
      // const items = data.items
      // this.list = items.map(v => {
      //   this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
      //   v.originalTitle = v.title //  will be used when user click the cancel botton
      //   return v
      // })
      // this.listLoading = false
    }
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
