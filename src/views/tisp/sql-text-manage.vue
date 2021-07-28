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
      <!-- <el-table-column align="center" label="ID" width="200">
        <template slot-scope="{row}">
          <span>{{ row.ID }}</span>
        </template>
      </el-table-column> -->

      <el-table-column align="center" label="脚本名称">
        <template slot-scope="{row}">
          <span>{{ row.Name }}</span>
        </template>
      </el-table-column>

      <!--<el-table-column align="center" label="上传者">
        <template slot-scope="{row}">
          <span>{{ row.User }}</span>
        </template>
      </el-table-column> -->

      <!-- <el-table-column align="center" label="文件大小">
        <template slot-scope="{row}">
          <span>{{ row.Size }}</span>
        </template>
      </el-table-column> -->

      <el-table-column align="center" label="上传时间">
        <template slot-scope="{row}">
          <span>{{ row.Ct }}</span>
        </template>
      </el-table-column>

      <el-table-column label="管理" width="113px" align="center">
        <template slot-scope="{row}">
          <el-button plain size="small" type="danger" @click="deleteText(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="dialogStatus"
      :visible.sync="addFormVisible"
      :before-close="cancelAdd"
      width="60%"
    >
      <el-form
        ref="addForm"
        :model="addStr"
        :rules="addRules"
        label-position="left"
        label-width="140px"
      >
        <!-- <el-form-item label="上传方式" prop="Type">
          <el-select v-model="uploadType" placeholder="请选择">
            <el-option
              v-for="item in uploadTypeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item> -->

        <el-form-item v-if="uploadType==='file'" label="上传脚本文件" prop="sqlText">
          <aside>
            请将待审核的SQL命令文本上传
          </aside>
          <div class="editor-container">
            <el-upload
              class="upload-demo"
              drag
              multiple
              accept=".sql"
              action="tispector/file/upload"
              :on-success="handleUploadSuccess"
              :before-upload="beforeUpload"
              :file-list="uploadFileList"
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div slot="tip" class="el-upload__tip">仅支持上传SQL文件</div>
            </el-upload>
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
        <!-- <el-button
          type="primary"
          @click="add()"
        >
          确认
        </el-button> -->
      </div>
    </el-dialog>
  </div>

  <!-- <div class="components-container">

  </div> -->
</template>

<script>
import { fetchSQLTextList, deleteSQLText } from '@/api/sql-text'

export default {
  name: 'DropzoneDemo',
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },

      uploadFileList: [],

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
    refresh() {
      this.getList()
    },

    getList() {
      this.listLoading = true
      fetchSQLTextList().then(response => {
        this.list = response.data.items
        // console.log(this.list)
        this.listLoading = false
      })
    },

    displayAdd() {
      this.addFormVisible = true
      this.uploadFileList = []
    },

    cancelAdd() {
      this.addStr = {}
      this.addFormVisible = false
    },

    beforeUpload(file) {
      var fileExt = file.name.replace(/.+\./, '')
      // console.log(fileExt)
      if (['sql'].indexOf(fileExt.toLowerCase()) === -1) {
        this.$message.error('请上传后缀名为sql的附件！')
        return false
      }
    },

    handleUploadSuccess(res, file) {
      if (res.code !== 20000 && res.code !== 200) {
        this.$message.error(res.message)
      } else {
        this.$message.success('操作成功')
      }
      this.refresh()
      this.cancelAdd()
    },

    deleteText(row) {
      deleteSQLText(row.Name).then(response => {
        this.$message.success('操作成功')
        this.refresh()
      })
    }
  }
}
</script>
