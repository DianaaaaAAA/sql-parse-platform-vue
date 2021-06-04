<template>
  <div>
    <div class="crumbs">
      <!--            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>基本表单</el-breadcrumb-item>
            </el-breadcrumb> -->
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="80px">
          <!--                    <el-form-item label="表单名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item> -->
          <el-form-item label="用户选择">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option key="yh1" label="用户1" value="yh1" />
              <el-option key="yh2" label="用户2" value="yh2" />
              <!-- <el-option key="imoo" label="imoo" value="imoo"></el-option> -->
            </el-select>
          </el-form-item>
          <!--                    <el-form-item label="日期时间">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                        </el-col>
                    </el-form-item> -->
          <el-form-item label="环境类型">
            <el-cascader v-model="form.options" :options="options" />
          </el-form-item>
          <el-form-item label="选择开关">
            <el-switch v-model="form.delivery" />
          </el-form-item>
          <!--                    <el-form-item label="多选">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="用户1" name="type"></el-checkbox>
                            <el-checkbox label="用户2" name="type"></el-checkbox>
                            <!-- <el-checkbox label="imoo" name="type"></el-checkbox> -->
          </el-checkbox-group>
          </el-form-item>
          <el-form-item label="单选框">
            <el-radio-group v-model="form.resource">
              <el-radio label="用户1" />
              <el-radio label="用户2" />
              <!-- <el-radio label="imoo"></el-radio> -->
            </el-radio-group>
          </el-form-item>
          <el-form-item label="输入文本">
            <el-input v-model="form.desc" type="textarea" rows="5" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Baseform',
  data: function() {
    return {
      options: [
        {
          value: 'shengchan',
          label: '生产环境'
        },
        {
          value: 'ceshi',
          label: '测试环境'
          // children: [
          //     {
          //         value: '***',
          //         label: '***',
          //         children: [
          //             {
          //                 value: '***',
          //                 label: '***'
          //             }
          //         ]
          //     }
          // ]
        }
      ],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: true,
        type: ['用户1'],
        resource: '用户2',
        desc: '',
        options: []
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message.success('提交成功！')
    }
  }
}
</script>
