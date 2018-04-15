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
      <el-radio label="1">新增</el-radio>
      <el-radio label="2">修改</el-radio>
      <el-radio label="3">修复</el-radio>
      <el-radio label="4">维护</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="描述" prop="FunDescribe">
    <el-input  type="textarea"  v-model="ruleForm.FunDescribe"></el-input>
  </el-form-item>
  <el-form-item label="起止时间" prop="StartAndEndTime" >
    <el-date-picker
      style="width:100%"
      v-model="ruleForm.StartAndEndTime"
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
      <el-table-column type="expand" fixed="right">
      <template slot-scope="props">
        <el-form label-position="right" inline class="demo-table-expand">
          <el-form-item label="功能描述：">
            <span>{{ props.row.FunDescribe }}</span>
          </el-form-item>
        </el-form>
      </template>
      
    </el-table-column>

      <el-table-column
        prop="ProjectName"
        label="项目名称">
      </el-table-column>
      <el-table-column
        prop="ModulName"
        label="模块名称">
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
        width="180"
        prop="StartTime"
        label="开始时间">
      </el-table-column>
      <el-table-column
        width="180"
        prop="EndTime"
        label="完成时间">
      </el-table-column>
        <el-table-column
        fixed="right"
        prop="WorkStatus"
        label="状态"
        width="100"
          :filters="[{ text: '未完成', value: '0' }, { text: '已完成', value: '1' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.WorkStatus == '0' ? 'primary' : 'success'"
              close-transition>{{scope.row.WorkStatus=='0'?'未完成':'已完成'}}</el-tag>
          </template>
        >
        
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="updateRow(scope.$index, PlanData)"
          type="text"
          size="small">
          完成
        </el-button>
        <el-button
          @click.native.prevent="deleteRow(scope.$index, PlanData)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
    </el-table>
   </div>
    
</template>

<script>
import testData from "@/assets/data.js";
import tools from "@/assets/tools.js";

console.log(testData);
export default {
  data() {
    return {
      PlanData: testData.Data,
      dialogFormVisible: false,
      ruleForm: {
        ProjectName: "asd",
        ModulName: "asd",
        FunName: "asd",
        WorkAttribute: "1",
        FunDescribe: "啊啊啊啊啊啊啊啊啊啊啊啊",
        StartAndEndTime: ["2018-04-15 00:00:00", "2018-04-15 00:00:00"],
        StartTime: "",
        EndTime: ""
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
        StartAndEndTime: [
          {
            required: true,
            message: "请选择起止时间",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // let s = new Date(this.ruleForm.StartTime);
          // let s2 = new Date(this.ruleForm.StartTime2);
          // let e = new Date(this.ruleForm.EndTime);
          // let e2 = new Date(this.ruleForm.EndTime2);
          // this.ruleForm.StartTime =
          //   s.getFullYear() + "-" + (s.getMonth() + 1) + "-" + s.getDate();
          // this.ruleForm.StartTime2 =
          //   s2.getHours() + ":" + s2.getMinutes() + ":" + s2.getSeconds();
          // this.ruleForm.EndTime =
          //   e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate();
          // this.ruleForm.EndTime2 =
          //   e2.getHours() + ":" + e2.getMinutes() + ":" + e2.getSeconds();
          console.log(this.ruleForm);

          let { ...newobj } = this.ruleForm;
          let s =
            newobj.StartAndEndTime[0] instanceof Date
              ? newobj.StartAndEndTime[0].format()
              : newobj.StartAndEndTime[0];
          let e =
            newobj.StartAndEndTime[1] instanceof Date
              ? newobj.StartAndEndTime[1].format()
              : newobj.StartAndEndTime[1];
          newobj.StartTime = s;
          newobj.EndTime = e;
          newobj.WorkStatus = 0;

          console.log(newobj);
          this.PlanData.unshift(newobj);
          this.dialogFormVisible = false;
          //this.$refs[formName].resetFields();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    updateRow(index, rows) {
      rows[index].WorkStatus=1;
    },
    filterTag(value, row) {
      return row.WorkStatus == value;
    }
  }
};
</script>

<style>
.line {
  text-align: center;
}
</style>