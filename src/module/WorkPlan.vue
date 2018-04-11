<template>
   <div>
    <el-button type="text" @click="dialogFormVisible = true">新增任务</el-button>

<el-dialog title="新增任务" :visible.sync="dialogFormVisible" width="600px">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
  <el-form-item label="项目名称" prop="ProjectName">
    <el-input v-model="ruleForm.ProjectName"></el-input>
  </el-form-item>
<el-form-item label="模块名称" prop="ModulName">
    <el-input v-model="ruleForm.ModulName"></el-input>
  </el-form-item>
  <el-form-item label="功能名称" prop="FunName">
    <el-input v-model="ruleForm.FunName"></el-input>
  </el-form-item>
  <el-form-item label="属性" prop="WorkAttribute">
    <el-radio-group v-model="ruleForm.WorkAttribute">
      <el-radio label="新增"></el-radio>
      <el-radio label="修改"></el-radio>
      <el-radio label="修复"></el-radio>
      <el-radio label="维护"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="描述" prop="FunDescribe">
    <el-input  type="textarea"  v-model="ruleForm.FunDescribe"></el-input>
  </el-form-item>
  <el-form-item label="开始时间" prop="StartTime" >
    <el-date-picker
      style="width:100%"
      v-model="ruleForm.StartTime"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </el-form-item>
  <el-form-item label="完成时间"  prop="EndTime" >
    <el-date-picker
      style="width:100%"
      v-model="ruleForm.EndTime"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    
  </el-form-item>
</el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </div>
</el-dialog>

   <el-table
      :data="this.PlanData"
      style="width: 100%">
      <el-table-column
        prop="ProjectName"
        label="项目名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="ModulName"
        label="模块名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="FunName"
        label="功能名称">
      </el-table-column>
      <el-table-column
        prop="WorkAttribute"
        label="属性">
      </el-table-column>
      <el-table-column
        prop="FunDescribe"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="StartTime"
        label="开始时间">
      </el-table-column>
      <el-table-column

        prop="EndTime"
        label="完成时间">
      </el-table-column>
    </el-table>
   </div>
    
</template>

<script>
import testData from "@/assets/data.js";

console.log(testData);
export default {
  data() {
    return {
      PlanData: testData.Data,
      dialogFormVisible: false,
      ruleForm: {
        ProjectName: "",
        ModulName: "",
        FunName: "",
        WorkAttribute: "",
        FunDescribe: "",
        StartTime: "",
        EndTime: "",
      },
      rules: {
        ProjectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        ModulName: [
          { required: true, message: "请输入模块名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        FunName: [
          { required: true, message: "请输入功能名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        WorkAttribute: [
          { required: true, message: "请选择工作属性", trigger: "change" }
        ],
        FunDescribe: [
          { required: true, message: "请输入功能描述", trigger: "blur" },
          {
            min: 10,
            max: 500,
            message: "长度在 10 到 500 个字符",
            trigger: "blur"
          }
        ],
        StartTime: [
          {
            required: true,
            message: "请选择起止时间",
            trigger: "change"
          }
        ],
        EndTime: [
          {
            required: true,
            message: "请选择起止时间",
            trigger: "change"
          }
        ],
       
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let s = new Date(this.ruleForm.StartTime);
          let s2 = new Date(this.ruleForm.StartTime2);
          let e = new Date(this.ruleForm.EndTime);
          let e2 = new Date(this.ruleForm.EndTime2);
          this.ruleForm.StartTime =
            s.getFullYear() + "-" + (s.getMonth() + 1) + "-" + s.getDate();
          this.ruleForm.StartTime2 =
            s2.getHours() + ":" + s2.getMinutes() + ":" + s2.getSeconds();
          this.ruleForm.EndTime =
            e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate();
          this.ruleForm.EndTime2 =
            e2.getHours() + ":" + e2.getMinutes() + ":" + e2.getSeconds();
          let { ...newobj } = this.ruleForm;
          newobj.StartTime
          console.log(newobj);
          this.PlanData.unshift(newobj);
          this.dialogFormVisible = false;
          this.$refs[formName].resetFields();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
.line {
  text-align: center;
}
</style>