<template>
  <div class="app-container">
    <el-row>
      <el-col :span="22">
        <el-form ref="editForm" :model="auditStr">
          <el-tabs v-model="activeTab" type="card" @tab-remove="removeResultTab">
            <!-- <el-tab-pane name="first">
              <span slot="label">规则配置
                <i v-if="paneRuleValid" class="el-icon-check" style="color: #008000;" />
                <i v-else class="el-icon-warning" style="color: red;" />
              </span>
              <el-form-item label="启用规则">
                <el-button @click="applyRules">应用所选规则组</el-button>
              </el-form-item>
              <el-tree
                ref="tree"
                :data="groupedRules"
                :props="defaultProps"
                show-checkbox
                node-key="label"
                :default-expanded-keys="['SQL']"
                :default-checked-keys="['SQL']"
              />
            </el-tab-pane> -->
            <el-tab-pane name="second">
              <span slot="label">集群配置
                <i v-if="paneInstanceValid" class="el-icon-check" style="color: #008000;" />
                <i v-else class="el-icon-warning" style="color: red;" />
              </span>
              <el-form-item label="集群选择">
                <el-select v-model="auditStr.ClusterName" placeholder="请选择">
                  <el-option
                    v-for="item in instanceList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="数据表选择">
                <el-input
                  v-model="auditStr.DbName"
                  placeholder="请输入内容"
                  :disabled="auditStr.ClusterName === ''"
                />
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane name="third">
              <span slot="label">脚本配置
                <i v-if="paneSQLTextValid" class="el-icon-check" style="color: #008000;" />
                <i v-else class="el-icon-warning" style="color: red;" />
              </span>
              <el-form-item label="脚本语句">
                <el-input
                  v-model="auditStr.Content"
                  type="textarea"
                  autosize
                />
              </el-form-item>
              <!-- <el-form-item label="脚本选择">
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
              </el-form-item> -->
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
                <el-col :span="24"><b>规则预览</b></el-col>
                <span
                  v-for="appliedRule in appliedRules"
                  :key="appliedRule.Item"
                >
                  {{ appliedRule.Item }} - {{ appliedRule.Name }}
                  <br>
                </span>
              </el-row>
              <el-row class="summary_item">
                <el-col :span="4"><b>实例预览</b></el-col>
                <el-col :span="10"> 所选集群： {{ auditStr.ClusterName }} </el-col>
                <el-col :span="10"> 所选数据库： {{ auditStr.DbName }} </el-col>
              </el-row>
              <el-row class="summary_item">
                <el-col :span="4"><b>脚本预览</b></el-col>
                <el-col :span="20"> {{ auditStr.Content }} </el-col>
              </el-row>
              <br>
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
            <el-tab-pane
              v-for="auditResultTab in auditResultTabs"
              :key="auditResultTab.title"
              :label="'result-'+ auditResultTab.name"
              :name="auditResultTab.name"
              closable
            >
              <el-row class="summary_head">
                <el-col :span="24">审核结果</el-col>
              </el-row>
              <el-table :data="auditResultTab.result" style="width: 100%">
                <el-table-column prop="Pass" label="是否通过" width="80">
                  <template slot-scope="scope">
                    <i v-if="scope.row.Pass" class="el-icon-check" style="color: #008000;" />
                    <i v-else class="el-icon-warning" style="color: red;" />
                  </template>
                </el-table-column>
                <el-table-column prop="Suggestion" label="审核建议" />
                <el-table-column prop="AffectRow" label="影响行数" width="80" />
                <el-table-column prop="ItemName" label="触发规则" />
              </el-table>

              <el-row class="summary_head">
                <el-col :span="24">审核总览</el-col>
              </el-row>
              <el-row class="summary_item">
                <el-col :span="24"><b>规则预览</b></el-col>
                <span
                  v-for="appliedRule in appliedRules"
                  :key="appliedRule.Item"
                >
                  {{ appliedRule.Item }} - {{ appliedRule.Name }}
                  <br>
                </span>
              </el-row>
              <el-row class="summary_item">
                <el-col :span="4"><b>实例预览</b></el-col>
                <el-col :span="10"> 所选集群： {{ auditStr.ClusterName }} </el-col>
                <el-col :span="10"> 所选数据库： {{ auditStr.DbName }} </el-col>
              </el-row>
              <el-row class="summary_item">
                <el-col :span="4"><b>脚本预览</b></el-col>
                <el-col :span="20"> {{ auditStr.Content }} </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { fetchRuleList, updateRules } from '@/api/rule'
import { fetchInstanceList } from '@/api/instance'
import { auditSql } from '@/api/audit'

export default {
  name: 'ApplyForAudit',
  filters: {},
  data() {
    return {
      activeTab: 'second',
      tabIndex: 0,
      paneRuleValid: false,

      defaultProps: {
        children: 'children',
        label: 'label'
      },

      ruleList: [],
      instanceList: [],
      // appliedRules: [],
      enabledRules: [],

      auditStr: {
        DbName: '',
        ClusterName: '',
        Content: ''
      },

      resultVisible: false,
      auditResultTabs: []
    }
  },
  computed: {
    paneInstanceValid: function() {
      return this.auditStr.ClusterName !== '' && this.auditStr.DbName !== ''
    },
    paneSQLTextValid: function() {
      return this.auditStr.Content
    },
    paneFinalValid: function() {
      return this.paneInstanceValid && this.paneSQLTextValid
    },
    // groupedRules: function() {
    //   const map = {}
    //   for (let i = 0; i < this.ruleList.length; i++) {
    //     const temp = this.ruleList[i]
    //     this.$set(temp, 'label', temp.Name + ' - (' + temp.Summary + ')')
    //     const key = temp.Item.split('.')[0]
    //     if (!map[key]) {
    //       map[key] = [temp]
    //     } else {
    //       map[key].push(temp)
    //     }
    //   }

    //   const res = []
    //   Object.keys(map).forEach(key => {
    //     res.push({
    //       label: key,
    //       children: map[key]
    //     })
    //   })
    //   return [{ label: 'SQL', children: res }]
    // }
    appliedRules: function() {
      const res = []
      for (let i = 0; i < this.ruleList.length; i++) {
        if (this.ruleList[i].Close === 1) {
          res.push(this.ruleList[i])
        }
      }
      return res
    }
  },

  watch: {},
  created() {
    this.fetchInstances()
    this.fetchRules()
  },
  methods: {
    fetchInstances() {
      fetchInstanceList().then(response => {
        this.instanceList = response.data.items
      })
    },
    fetchRules() {
      this.enabledRules = []
      fetchRuleList().then(response => {
        this.ruleList = response.data.items
        for (let i = 0; i < this.ruleList.length; i++) {
          if (this.ruleList[i].Close === 1) {
            this.enabledRules.push(this.ruleList[i])
          }
        }
      })
    },

    applyRules() {
      this.enabledRules.forEach(element => {
        if (!element.children) {
          element.Close = 0
          this.$delete(element, 'label')
          var str = JSON.stringify(element)
          updateRules(str).then().catch(error => {
            this.$message({
              message: error,
              type: 'warning'
            })
          })
        }
      })
      var selectedRules = this.$refs.tree.getCheckedNodes(true, false)
      selectedRules.forEach(element => {
        if (!element.children) {
          element.Close = 1
          this.$delete(element, 'label')
          var str = JSON.stringify(element)
          updateRules(str).then().catch(error => {
            this.$message({
              message: error,
              type: 'warning'
            })
          })
        }
      })
      this.fetchRules()
    },

    applyAuditOrder() {
      // applyAuditOrder
      this.auditStr
      var r = JSON.stringify(this.auditStr)
      auditSql(r).then(response => {
        // this.getList()
        this.$notify({
          title: 'Success',
          message: '提交审核请求成功！',
          type: 'success',
          duration: 2000
        })
        this.addResultTab(this.auditStr, JSON.parse(response.data))
        // this.resultVisible = true
      })
      // redirect to AuditManagment
      // this.$router.push({
      //   path: '/tisp/sql-audit-manage'
      // })
    },

    addResultTab(req, res) {
      const newTabName = ++this.tabIndex + ''
      this.auditResultTabs.push({
        title: req.Content,
        name: newTabName,
        result: res
      })

      // console.log(this.auditResultTabs)
      this.activeTab = newTabName
    },

    removeResultTab(targetName) {
      console.log(targetName)
      if (this.activeTab === targetName) {
        this.activeTab = 'finish'
      }
      for (let i = 0; i < this.auditResultTabs.length; i++) {
        if (this.auditResultTabs[i].name === targetName) {
          this.auditResultTabs.splice(i, 1)
          break
        }
      }
      console.log(this.auditResultTabs)
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
