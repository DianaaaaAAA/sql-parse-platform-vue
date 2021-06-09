<template>
  <div class="app-container">
    <el-input
      size="mini"
      placeholder="搜索规则"
      style="margin-bottom: 5px; width: 200px;"
    />
    <el-button type="primary" icon="el-icon-refresh-right" size="small" round style="margin: 0 0 16px 16px;">刷新</el-button>
    <el-button type="warning" icon="el-icon-circle-plus-outline" size="small" round style="margin: 0 0 16px 16px;" @click="addDialogVisible = true">添加</el-button>
    <el-dialog
      title="添加规则"
      :visible.sync="addDialogVisible"
      :before-close="handleClose"
    >
      <el-form ref="NFSForm" label-position="left" label-width="100px" style="width: 500px; margin-left:40px;">
        <el-form-item label="规则名称">
          <el-input />
        </el-form-item>
        <el-form-item label="规则类型">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="更新日期">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="类型">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="重要度">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon" />
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="状态" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="规则描述">
        <template slot-scope="{row}">
          <router-link :to="'/components-demo/rule-edit/index/'+row.id" class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="230">
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
import { fetchList } from '@/api/article'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'RuleList',
  components: { Pagination },
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
      impColors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      addDialogVisible: false,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      options: [{
        value: '选项1',
        label: '这是个规则'
      }, {
        value: '选项2',
        label: '诶 这也是个规则'
      }, {
        value: '选项3',
        label: '没想到吧 还是规则'
      }]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
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
