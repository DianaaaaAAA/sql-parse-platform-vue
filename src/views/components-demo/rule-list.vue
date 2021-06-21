<template>
  <div class="app-container">
    <el-input
      size="mini"
      placeholder="搜索规则"
      style="margin-bottom: 5px; width: 200px;"
    />
    <el-button type="primary" icon="el-icon-refresh-right" size="small" round style="margin: 0 0 16px 16px;" @click="fresh">刷新</el-button>
    <el-button type="warning" icon="el-icon-circle-plus-outline" size="small" round style="margin: 0 0 16px 16px;" @click="addDialogVisible = true">添加</el-button>
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
      <el-table-column class-name="status-col" label="Name" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.Name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="Item" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Item }}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="Close">
        <template slot-scope="{row}">
          <el-tag :type="row.Close | closeFilter">
            {{ row.Close }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="Content">
        <template slot-scope="scope">
          <span>{{ scope.row.Content }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Position" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.Position }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Proiority" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.Proiority }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Summary" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.Summary }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Threshold" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.Threshold }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Case">
        <template slot-scope="scope">
          <span>{{ scope.row.Case }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <router-link :to="'/components-demo/rule-edit/index/'+scope.row.id">
            <el-button
              type="success"
              size="small"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
            >
              删除
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchRuleList } from '@/api/rule'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'RuleList',
  components: { Pagination },
  filters: {
    closeFilter(close) {
      const closeMap = {
        true: 'success',
        false: 'danger'
      }
      return closeMap[close]
    }
  },
  data() {
    return {
      impColors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      addDialogVisible: false,
      list: null,
      total: 0,
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
    getList() {
      this.listLoading = true
      fetchRuleList().then(response => {
        this.list = response.data
        console.log('rule', this.list)
        this.listLoading = false
      })
    },
    fresh() {
      this.getList()
    },
    cancelAdd(done) {
      this.addDialogVisible = false
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
