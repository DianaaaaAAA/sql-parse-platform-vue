<template>
  <div class="app-container">
    <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" round style="margin: 0 0 16px 16px;" @click="displayAdd">增加</el-button>
    <el-button type="primary" icon="el-icon-refresh-right" size="small" round style="margin: 0 0 16px 16px;" @click="refresh()">刷新</el-button>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="100">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="名称">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" align="center" label="主机地址" width="400">
        <template slot-scope="{row}">
          <span>{{ row.addr }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column class-name="status-col" align="center" label="状态" width="200">
        <template slot-scope="{row}">
          <el-tag :type="row.Status | statusFilter">
            {{ row.Status }}
          </el-tag>
        </template>
      </el-table-column> -->

      <el-table-column label="管理" width="113px" align="center">
        <template slot-scope="{row}">
          <el-dropdown trigger="click" :hide-on-click="false" @command="monitor(row)">
            <el-button plain size="small" icon="el-icon-arrow-down" />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                command="monitor"
              ><i class="el-icon-monitor" />监控展示
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="dialogStatus"
      :visible.sync="addFormVisible"
      :before-close="cancelAdd"
    >
      <el-form
        ref="addForm"
        :model="addStr"
        :rules="addRules"
        label-position="left"
        label-width="140px"
      >
        <el-form-item label="主机地址" prop="Host">
          <el-input v-model="addStr.Host" />
        </el-form-item>
        <el-form-item label="主机端口" prop="Port">
          <el-input v-model="addStr.Port" type="number" />
        </el-form-item>

        <el-form-item label="主机账户" prop="User">
          <el-input v-model="addStr.User" />
        </el-form-item>

        <el-form-item label="主机密码" prop="Password">
          <el-input v-model="addStr.Password" />
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
import { fetchInstanceList, addInstance } from '@/api/instance'

export default {
  name: 'InlineEditTable',
  filters: {
    statusFilter(status) {
      const statusMap = {
        RUN: 'success',
        STOP: 'info',
        FAIL: 'danger'
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
      },

      dialogStatus: '',

      addFormVisible: false,
      addStr: {

      },

      addRules: {

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
      fetchInstanceList().then(response => {
        this.list = response.data.items
        console.log(this.list)
        this.listLoading = false
      })
    },

    displayAdd() {
      this.addFormVisible = true
    },

    cancelAdd() {
      this.addStr = {}
      this.addFormVisible = false
    },

    add() {
      addInstance().then(response => {
        this.$message.success('操作成功')
        this.cancelAdd()
      })
    },

    monitor(row) {

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
