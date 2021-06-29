<template>
  <div class="app-container">
    <el-row>
      <el-col :span="22">
        <el-form ref="editForm" :model="auditStr" :rules="auditRules">
          <el-tabs v-model="activeTab" type="card">
            <el-tab-pane name="first">
              <span slot="label">规则配置
                <i v-if="paneRuleValid" class="el-icon-check" style="color: #008000;" />
                <i v-else class="el-icon-warning" style="color: red;" />
              </span>

              <el-tree
                ref="tree"
                :check-strictly="checkStrictly"
                :data="groupedRules"
                :props="defaultProps"
                show-checkbox
                node-key="label"
                default-expand-all
              />
            </el-tab-pane>
            <el-tab-pane name="second">
              <span slot="label">实例配置
                <i v-if="paneInstanceValid" class="el-icon-check" style="color: #008000;" />
                <i v-else class="el-icon-warning" style="color: red;" />
              </span>
              <el-form-item label="实例选择">
                <el-select v-model="auditStr.instance" placeholder="请选择">
                  <el-option
                    v-for="item in instanceList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane name="third">
              <span slot="label">脚本配置
                <i v-if="paneSQLTextValid" class="el-icon-check" style="color: #008000;" />
                <i v-else class="el-icon-warning" style="color: red;" />
              </span>
              <el-form-item label="脚本选择">
                <el-select v-model="auditStr.instance" placeholder="请选择">
                  <el-option
                    v-for="item in instanceList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="脚本预览">
                <el-input
                  v-model="sqlTextPreview"
                  type="textarea"
                  autosize
                  :disabled="true"
                />
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane name="finish">
              <span slot="label">核对
                <i v-if="paneFinalValid" class="el-icon-check" style="color: green;" />
                <i v-else class="el-icon-warning" style="color: red;" />
              </span>
              <el-row class="summary_head">
                <el-col :span="24">总览</el-col>
              </el-row>
              <el-row class="summary_item">
                <el-col :span="24">规则配置</el-col>
              </el-row>
              <el-row class="summary_item">
                <el-col :span="8">实例配置</el-col>
              </el-row>
              <el-row class="summary_item">
                <el-col :span="8">脚本预览</el-col>
                <el-col :span="16">{{ script }}</el-col>
              </el-row>

              <el-row>
                <el-col :offset="10" :span="14">
                  <el-button
                    type="warning"
                    :disabled="!paneFinalValid"
                    @click="applyAuditOrder"
                  >申请</el-button>
                </el-col>
              </el-row>

            </el-tab-pane>
          </el-tabs>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { fetchRuleList } from '@/api/rule'

export default {
  name: 'ApplyForAudit',
  components: {

  },
  filters: {},
  data() {
    return {
      ruleList: [],
      instanceList: [],

      sqlTextPreview: 'no content',

      activeTab: 'first',

      paneRuleValid: false,
      paneInstanceValid: false,
      paneSQLTextValid: false,

      script: 'fake.txt',

      auditStr: {
        rules: [],
        instance: '',
        sqlText: ''
      },

      auditRules: {

      },

      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
    paneFinalValid: function() {
      const ruleValid = this.paneRuleValid
      const instanceValid = this.paneInstanceValid
      const sqlTextValid = this.paneSQLTextValid

      return ruleValid && instanceValid && sqlTextValid
    },
    groupedRules: function() {
      const map = {}
      for (let i = 0; i < this.ruleList.length; i++) {
        const temp = this.ruleList[i]
        this.$set(temp, 'label', temp.Name + ' - (' + temp.Summary + ')')
        const key = temp.Item.split('.')[0]
        if (!map[key]) {
          map[key] = [temp]
        } else {
          map[key].push(temp)
        }
      }

      console.log('map', map)

      const res = []
      Object.keys(map).forEach(key => {
        res.push({
          label: key,
          children: map[key]
        })
      })

      console.log('res', res)
      return res
    }
  },
  watch: {},
  created() {
    this.fetchRules()
  },
  methods: {
    fetchRules() {
      fetchRuleList().then(response => {
        this.ruleList = response.data
      })
    },

    applyAuditOrder() {
      // applyAuditOrder
      // redirect to AuditManagment
      this.$router.push({
        path: '/tisp/sql-audit-manage'
      })
    }
  }
}
</script>

<style scoped>
  .summary_head {
    background-color: #409EFF;
    color: whitesmoke;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: medium;
    padding: 5px;
  }

  .summary_item {
    background-color: #EBEEF5;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: smaller;
    padding: 5px 0 5px 10px;
  }
</style>
