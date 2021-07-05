<template>
  <div class="app-container">
    <el-input
      size="mini"
      placeholder="搜索规则"
      style="margin-bottom: 5px; width: 200px;"
    />
    <el-button type="primary" icon="el-icon-refresh-right" size="small" round style="margin: 0 0 16px 16px;" @click="fresh">刷新</el-button>
    <el-button type="warning" icon="el-icon-circle-plus-outline" size="small" round style="margin: 0 0 16px 16px;" @click="add">添加</el-button>
    <el-dialog
      title="添加规则"
      :visible.sync="addDialogVisible"
      :before-close="cancelAdd"
    >
      <el-form ref="NFSForm" label-position="left" label-width="100px" style="width: 500px; margin-left:40px;">
        <el-form-item label="规则名称">
          <el-input />
        </el-form-item>

        <el-form-item label="规则内容" label-width="100px">
          <el-input type="textarea" :rows="2" />
        </el-form-item>
        <el-form-item label="规则重要度" label-width="100px">
          <el-rate
            :colors="impColors"
          />
        </el-form-item>

        <el-form-item label="是否启用">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column class-name="status-col" label="规则名称" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.Name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" label="规则缩写" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Item }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="规则摘要" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.Summary }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="可变阈值" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.Threshold }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="示例">
        <template slot-scope="scope">
          <span>{{ scope.row.Case }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="启用情况">

        <template slot-scope="{row}">
          <el-tag :type="row.Close | closeFilter">
            {{ row.Close | closeStrFilter }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <!-- <router-link :to="'/components-demo/rule-edit/index/'+scope.row.id"> -->
          <el-button
            type="success"
            size="small"
            @click="getByItem(scope.row.Item)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="small"
          >
            停用
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="修改规则"
      :visible.sync="updateDialogVisible"
      :before-close="cancelUpdate"
    >
      <el-form ref="NFSForm" label-position="left" label-width="100px" style="width: 500px; margin-left:40px;">
        <el-form-item label="规则名称">
          <el-input :value="this.ruleName" />
        </el-form-item>

        <el-form-item label="规则缩写">
          <el-input :value="this.ruleItem" />
        </el-form-item>

        <el-form-item label="规则摘要" label-width="100px">
          <el-input type="textarea" :rows="2" :value="this.ruleSummary" />
        </el-form-item>

        <el-form-item label="可变阈值" label-width="100px">
          <el-input-number :min="0" :max="10" :value="this.ruleThreshold" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchRuleList, fetchRuleByItem } from '@/api/rule'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'RuleList',
  components: { Pagination },
  filters: {
    closeFilter(close) {
      const closeMap = {
        1: 'success',
        0: 'danger'
      }
      return closeMap[close]
    },
    closeStrFilter(close) {
      const closeMap = {
        1: 'ON',
        0: 'OFF'
      }
      return closeMap[close]
    }
  },
  data() {
    return {
      impColors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      updateDialogVisible: false,
      addDialogVisible: false,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      ruleName: '',
      ruleItem: '',
      ruleSummary: '',
      ruleThreshold: 0,
      rule: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchRuleList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    getByItem(item) {
      this.updateDialogVisible = true
      fetchRuleByItem(item).then(response => {
        this.rule = response.data
        console.log(response.data)
        this.ruleName = response.data.Name
        this.ruleItem = this.rule.Item
        this.ruleSummary = this.rule.Summary
        this.ruleThreshold = this.rule.Threshold
      })
    },
    add() {
      this.$message({
        message: '该功能暂未启用',
        type: 'warning'
      })
    },
    fresh() {
      this.getList()
    },
    cancelAdd(done) {
      this.addDialogVisible = false
    },
    cancelUpdate(done) {
      this.updateDialogVisible = false
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
