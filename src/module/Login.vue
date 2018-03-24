<template>
	<div>
		<el-container>
			<!--<el-header>Header</el-header>-->

			<el-main>
				<div>
					<div>
						<el-input placeholder="请输入内容" v-model="UserName">
							<template slot="prepend">UserName</template>
						</el-input>
					</div>
				</div>
				<div>
					<div>
						<el-input placeholder="请输入内容" v-model="PassWord">
							<template slot="prepend">PassWord</template>
						</el-input>
					</div>
				</div>
				<div>
					<el-button type="primary" :loading="Isloading" v-on:click.stop="Login">Login</el-button>

				</div>

			</el-main>

			<!--<el-footer>Footer</el-footer>-->
		</el-container>
	</div>
</template>

<script>
import tools from '../assets/tools.js'
export default {
  name: "Login",
  data() {
    return {
      UserName: "10010",
      PassWord: "0",
      Isloading: false
    };
  },
  methods: {
    Login() {
      if (this.Isloading) {
        return;
      }
      this.Isloading = true;

      if (this.UserName != "10010") {
        this.open("账号不存在");
        this.Isloading = false;
      } else if (this.PassWord != "0") {
        this.open("密码不正确");
        this.Isloading = false;
      } else {
        setTimeout(() => {
          var obj = {
            UserName: "asd",
            MenuList: [
              //  {id:1,MenuName:"根菜单",url:"asd",pid:0},
              //  {id:2,MenuName:"一级菜单1",pid:1,url:"/a"},
              //  {id:3,MenuName:"一级菜单2",pid:1,url:"/b"},
              //  {id:4,MenuName:"二级菜单1-1",pid:2,url:"/a/a"},
              //  {id:5,MenuName:"二级菜单2-1",pid:3,url:"/b/a"},
              //  {id:6,MenuName:"三级菜单1-1-1",pid:4,url:"/a/a/a"},
              //  {id:7,MenuName:"三级菜单2-1-1",pid:5,url:"/b/a/a"},
              
              // {
              //   name: "系统组件",
              //   icon:"el-icon-setting",
              //   child: [
              //     {
              //       name: "功能类",
              //       child: [
              //         {
              //           path: "/components/permission",
              //           name: "详细鉴权"
              //         },
              //         {
              //           path: "/components/pageTable",
              //           name: "表格分页"
              //         }
              //       ]
              //     },
              //     {
              //       name: "布局类",
              //       child: [
              //         {
              //           path: "/components/pageTitle",
              //           name: "页面标题"
              //         },
              //         {
              //           name: "测试类1",
              //           child: [
              //             {
              //               path: "/components/pageSection",
              //               name: "子区域"
              //             }
              //           ]
              //         },
              //         {
              //           path: "/components/pageSearch",
              //           name: "搜索条"
              //         },
              //         {
              //           name: "测试类2",
              //           child: [
              //             {
              //               path: "/components/pageToolbar",
              //               name: "工具条"
              //             }
              //           ]
              //         }
              //       ]
              //     },
              //     {
              //       name: "辅助类",
              //       child: [
              //         {
              //           path: "/components/pageNotes",
              //           name: "引用说明"
              //         }
              //       ]
              //     }
              //   ]
              // },
              {
                name: "个人中心",
                icon:"el-icon-info",
                child: [
                  {
                    path: "/Home/Content",
                    name: "列表页面",
                    permission: ["outport"]
                  },
                  {
                    path: "/Home/WorkPlan",
                    name: "图表页面",
                    permission: ["outport"]
                    
                  },
                  {
                    path: "/example/map",
                    name: "地图页面"
                  }
                ]
              },
            ]
          };
          tools.setCache("UserInfo", obj);

          // 命名的路由
          this.$router.push({
            name: "Home"
          });
        }, 1000);
      }
    },
    open(msg) {
      this.$alert(msg, "提示", {
        confirmButtonText: "确定"
      });
    }
  }
};
</script>

<style scoped>
.el-main {
  position: absolute;
  width: 400px;
  height: 240px;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: #e9eef3;
  color: #333;
}

.el-main > div {
  text-align: center;
  margin: 20px;
}

.el-main > div > button {
  width: 100%;
}

body > .el-container {
  position: relative;
}
</style>