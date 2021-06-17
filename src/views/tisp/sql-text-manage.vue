<!-- <el-upload
  class="upload-demo"
  drag
  action="https://jsonplaceholder.typicode.com/posts/"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
</div>
 -->
<template>
  <div class="app-container">
    <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" round style="margin: 0 0 16px 16px;" @click="displayAdd">增加</el-button>
    <el-button type="primary" icon="el-icon-refresh-right" size="small" round style="margin: 0 0 16px 16px;" @click="refresh()">刷新</el-button>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="200">
        <template slot-scope="{row}">
          <span>{{ row.ID }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="名称">
        <template slot-scope="{row}">
          <span>{{ row.Name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="上传者">
        <template slot-scope="{row}">
          <span>{{ row.User }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="文件大小">
        <template slot-scope="{row}">
          <span>{{ row.Size }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="上传时间">
        <template slot-scope="{row}">
          <span>{{ row.Created }}</span>
        </template>
      </el-table-column>

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
        <el-form-item label="上传方式" prop="Type">
          <el-select v-model="uploadType" placeholder="请选择">
            <el-option
              v-for="item in uploadTypeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item v-if="uploadType==='file'" label="上传脚本文件" prop="sqlText">
          <aside>
            请将待审核的SQL命令文本上传
          </aside>
          <div class="editor-container">
            <dropzone id="myVueDropzone" url="/tisp/sql-text" @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS" />
          </div>
        </el-form-item>

        <el-form-item v-else label="输入SQL文本" prop="sqlText">
          <el-input
            v-model="uploadContent"
            type="textarea"
            :rows="11"
            placeholder="请输入内容"
          />
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

  <!-- <div class="components-container">

  </div> -->
</template>

<script>
import { fetchSQLTextList, addSQLText } from '@/api/sql-text'
import Dropzone from '@/components/Dropzone'

export default {
  name: 'DropzoneDemo',
  components: { Dropzone },
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },

      uploadTypeOption: [
        { label: '输入SQL文本', value: 'text' },
        { label: '上传SQL脚本', value: 'file' }
      ],
      uploadType: 'file',
      uploadContent: '',

      dialogStatus: '',

      addFormVisible: false,
      addStr: {

      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    dropzoneS(file) {
      console.log(file)
      this.$message({ message: 'Upload success', type: 'success' })
    },
    dropzoneR(file) {
      console.log(file)
      this.$message({ message: 'Delete success', type: 'success' })
    },

    refresh() {
      this.getList()
    },

    getList() {
      this.listLoading = true
      fetchSQLTextList().then(response => {
        this.list = response.data
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
      addSQLText().then(response => {
        this.$message.success('操作成功')
        this.cancelAdd()
      })
    }
  }
}
</script>
