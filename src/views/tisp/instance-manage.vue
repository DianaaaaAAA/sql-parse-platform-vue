<template>
  <div class="app-container">
    <el-button type="primary" icon="el-icon-refresh-right" size="small" round style="margin: 0 0 16px 16px;" @click="refresh">刷新</el-button>
    <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" round style="margin: 0 0 16px 16px;" @click="displayAdd">增加</el-button>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="100">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="集群名称" width="250px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" align="center" label="集群地址">
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

      <el-table-column label="管理" align="center" width="200px">
        <template slot-scope="scope">
          <!-- <router-link :to="'/components-demo/rule-edit/index/'+scope.row.id"> -->
          <el-button
            type="primary"
            size="small"
            @click="displayUpdate"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="small"
            @click="deleteInstance(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="修改集群信息"
      :visible.sync="updateVisible"
      :before-close="cancelUpdate"
      width="50%"
    >
      <el-form
        ref="addForm"
        :model="addStr"
        :rules="addRules"
        label-position="left"
        label-width="100px"
        style="width: 600px; margin-left:60px;"
      >
        <el-form-item label="集群名称" prop="Name">
          <el-input v-model="addStr.name" />
        </el-form-item>

        <el-form-item label="集群地址" prop="Host">
          <el-input v-model="addStr.addr" />
        </el-form-item>

        <el-form-item label="用户名" prop="User">
          <el-input v-model="addStr.user" />
        </el-form-item>

        <el-form-item label="密码" prop="Password">
          <el-input v-model="addStr.pwd" />
        </el-form-item>

        <el-form-item label="描述" prop="Description">
          <el-input v-model="addStr.description" type="textarea" :rows="2" />
        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancelUpdate">
          关闭
        </el-button>
        <el-button
          type="primary"
          @click="addInstance"
        >
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="增加集群"
      :visible.sync="addFormVisible"
      :before-close="cancelAdd"
      width="50%"
    >
      <el-form
        ref="addForm"
        :model="addStr"
        :rules="addRules"
        label-position="left"
        label-width="100px"
        style="width: 600px; margin-left:60px;"
      >
        <el-form-item label="集群名称" prop="Name">
          <el-input v-model="addStr.name" />
        </el-form-item>

        <el-form-item label="集群地址" prop="Host">
          <el-input v-model="addStr.addr" />
        </el-form-item>

        <el-form-item label="用户名" prop="User">
          <el-input v-model="addStr.user" />
        </el-form-item>

        <el-form-item label="密码" prop="Password">
          <el-input v-model="addStr.pwd" />
        </el-form-item>

        <el-form-item label="描述" prop="Description">
          <el-input v-model="addStr.description" type="textarea" :rows="2" />
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
          @click="addInstance"
        >
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchInstanceList, addInstance, deleteInstanceByID } from '@/api/instance'

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
      updateVisible: false,
      deleteVisible: false,
      updateStr: {

      },
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
        this.listLoading = false
      })
    },

    displayAdd() {
      this.addFormVisible = true
    },

    displayUpdate() {
      this.updateVisible = true
    },

    cancelAdd() {
      this.addStr = {}
      this.addFormVisible = false
    },

    cancelUpdate() {
      this.updateStr = {}
      this.updateVisible = false
    },

    addInstance() {
      var r = JSON.stringify(this.addStr)
      addInstance(r).then(response => {
        this.$message.success('添加成功')
        this.cancelAdd()
        this.getList()
      })
    },
    updateInstance() {

    },
    deleteInstance(id) {
      deleteInstanceByID(id).then(response => {
        this.$message.success('删除成功')
        this.getList()
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
