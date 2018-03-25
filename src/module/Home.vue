<template>
  <div >
    <el-container>
  <el-header height="50px">Header</el-header>
  <el-container>
    <el-aside width="auto">
<el-button type="primary" icon="el-icon-menu" @click="handisCollapse" style="width:100%">{{isCollapse?"":"菜单"}}</el-button>

    <!-- <el-menu 
        router 
        unique-opened 
        ref="navbar"
        :default-active="onRoutes"
        @select="selectMenu"
        >
        <nav-item 
            :class="{'is-active':isCollapse}"
            v-for="(item, n) in navList" 
            :item="item" 
            :navIndex="String(n)" 
            :key="n">
        </nav-item>

    </el-menu> -->
            <el-menu @select="selectMenu" router unique-opened :default-active="onRoutes" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                    <nav-item 
                        v-for="(item, n) in navList" 
                        :item="item" 
                        :icon="item.icon"
                        :navIndex="String(n)" 
                        :key="n">
                    </nav-item>
            </el-menu>
    </el-aside>
    <el-main>
        <el-tabs v-model="tbsValue" @tab-click="clickTab"   type="card" @tab-remove="removeTab">
            <el-tab-pane 
              v-for="(item) in tbsArr"
              
              :key="item.name"
              :label="item.title"
              :name="item.name"
              :closable="item.closable"
              >
            </el-tab-pane>
        </el-tabs>
        <div>asd</div>
              <router-view >
                asd
              </router-view>
    </el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
import tools from '../assets/tools.js'
export default {
  name: "Home",
  data() {
    return {
      msg: "首页",
      isCollapse: false,
      navList: tools.getCache("UserInfo").MenuList,
      tbsArr:[{
          title: '首页',
          name: 'HomeContent',
          closable:false,
        }],
      tabIndex: 1,
      MenuArr:this.getMenuArr(tools.getCache("UserInfo").MenuList),
      tbsValue:"HomeContent"
    };
  },

  computed: {
    onRoutes() {
      return this.$route.path;
    },
  },
  methods: {
    selectMenu(index,indexPath){
        console.log(index)
        console.log( this.MenuArr)
       
        for (let i = 0; i < this.MenuArr.length; i++) {
          if (this.MenuArr[i].name==index) {
            this.MenuArr[i].isShow=true;
          }
        }
         this.addTab(index)
    },
    getMenuArr(obj,arr){
       var arr=arr ||{};
        for (let i = 0; i < obj.length; i++) {
          if (obj[i].path && obj[i].path!="") {
            arr[obj[i].path]={
              title:obj[i].name,
              name:obj[i].path,
              closable:true
            };
          }
          if (obj[i].child) {
               this.getMenuArr(obj[i].child,arr)
          }
        }
        console.log(arr)
        return arr;
    },
    handleOpen(key, keyPath) {
      console.log(keyPath);
      console.log(key);
    },
    handleClose(key, keyPath) {
      console.log(key);
      console.log(keyPath);
    },
    handisCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    clickTab(tab,a,c){
       if (tab.name!="HomeContent") {
       this.$router.push(tab.name) 
       }
    },
    addTab(targetName) {
        if (this.tbsArr.indexOf(this.MenuArr[targetName])==-1) {
        this.tbsArr.push(this.MenuArr[targetName])          
        }
        this.tbsValue = targetName;
    },
    removeTab(targetName) {
          let tabs = this.tbsArr;
           let activeName = this.tbsValue;
          if (activeName  === targetName) {
             tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          //shou
          if ( targetName!=="HomeContent") {
             this.tbsArr = tabs.filter(tab => {
             return tab.name != targetName});
          }
          
           this.tbsValue = activeName;
        }
  
  }
};
</script>

<style scoped>
.el-header {
  height: 40px;
  line-height: 40px;
  background: blueviolet;
}
.el-container {
  height: 100%;
}
.el-container > .el-aside {
  background: cornflowerblue;
}
.el-container > .el-main {
   padding: 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

</style>
