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
        <el-tabs value="1"   type="border-card" closable @tab-remove="removeTab">
            <el-tab-pane 
              v-for="(item) in editableTabs2"
              :key="item.name"
              :label="item.title"
              :name="item.name"
              >
            </el-tab-pane>
        </el-tabs>
              <router-view ></router-view>
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
        editableTabs2: [{
          title: '首页',
          name: '1',
          content: 'Tab 1 content',
          isclosable:false
        },],
        tabIndex: 1
    };
  },

  computed: {
    onRoutes() {
      return this.$route.path;
    }
  },
  methods: {
    selectMenu(index,indexPath){
        console.log(index)
        console.log(indexPath)
        return false
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
    addTab(targetName) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs2.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        this.editableTabsValue2 = newTabName;
    },
    removeTab(targetName) {
          let tabs = this.editableTabs2;
          let activeName = this.editableTabsValue2;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          
          this.editableTabsValue2 = activeName;
          this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
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
.el-tabs{
  height: 39px;
  overflow: hidden;
}
.el-main .el-tabs__nav{
  border-radius:0;
}
.el-tabs__content{
  height: 100px;
}
.el-tabs--border-card>.el-tabs__header{
    border-bottom: 1px solid red !important

}
.el-tabs .el-tabs__item .el-icon-close::before{
  display: none;
}
</style>
