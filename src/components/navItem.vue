// navItem.vue
<template>
    <el-submenu v-if="item.child && item.child.length" :index="navIndex" > 
        <!-- 创建父级菜单 -->
        <!-- <template slot="title">{{ item.name }}</template> -->
        <template slot="title">
            <i :class="[item.icon]"></i>
            <span slot="title">{{ item.name }}</span>
        </template>
        <!-- 创建子菜单 -->
        <nav-item 
            v-for="(subItem,i) in item.child" 
            :icon="item.icon"
            :key="navIndex+'-'+i" 
            :navIndex="navIndex+'-'+i"
            :item="subItem" >
        </nav-item>
    </el-submenu>
    <el-menu-item v-else :index="item.path">{{ item.name }}</el-menu-item>
</template>
<script>
    export default {
        // 递归组件必须有name
        name: 'navItem',
        props: ['item','navIndex',]
    }
</script>