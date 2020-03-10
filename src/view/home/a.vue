<template>
  <div id="app">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :v-if="true">
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          background-color="#363636"
          text-color="white"
          active-text-color="#ffd04b"
        >
          <el-menu-item style="font-size:26px;">广电单兵系统后台</el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">产品设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">新增套餐</el-menu-item>
              <el-menu-item index="1-2">新增机顶盒</el-menu-item>
              <el-menu-item index="1-3">新增路由</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <span slot="title">新增套餐</span>
              <el-menu-item index="1-4-1">乐家套餐</el-menu-item>
              <el-menu-item index="1-4-2">基本数据包</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span slot="title">个人设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">修改密码</el-menu-item>
              <el-menu-item index="2-2">编辑资料</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-comment"></i>
              <span slot="title">信息通知</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">发文管理</el-menu-item>
              <el-menu-item index="3-2">已发消息</el-menu-item>
              <el-menu-item index="3-3">归档管理</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <span slot="title">消息状态</span>
              <el-menu-item index="3-4-1">已发</el-menu-item>
              <el-menu-item index="3-4-1">未发</el-menu-item>
              <el-menu-item index="3-4-1">草稿</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <!--导航栏  -->
        <el-header>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-row>
              <el-col span="1">
                <el-menu-item index="4">
                  <i class="el-icon-s-operation"></i>
                </el-menu-item>
              </el-col>
              <el-col span="2" offset="18">
                <el-menu-item index="4">
                  <i class="el-icon-message-solid"></i>
                </el-menu-item>
              </el-col>
            </el-row>
          </el-menu>
        </el-header>
        <!-- 内容 -->
        <el-main>Main</el-main>
        <!-- 底部 -->
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import {
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Menu,
  MenuItem,
  Submenu,
  RadioGroup,
  Radio,
  RadioButton,
  Row,
  Col
} from "element-ui";
Vue.prototype.$ELEMENT = { size: "small", zIndex: 3000 };
import Vue from "vue";
Vue.use(Container)
  .use(Header)
  .use(Aside)
  .use(Main)
  .use(Footer)
  .use(Menu)
  .use(Submenu)
  .use(MenuItem)
  .use(RadioGroup)
  .use(Radio)
  .use(RadioButton)
  .use(Row)
  .use(Col);
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "2",
      isCollapse: false,
      send: true
    };
  },
  mounted() {},
  methods: {
    handleSelect(key, keyPath) {
      window.console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      window.console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      window.console.log(key, keyPath);
    }
  }
};
</script>
<style scoped>
#app {
  color: white;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  height: 100%;
}
.el-container {
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
}
.el-header,
.el-footer {
  padding: 0px;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: rgb(238, 241, 246);
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

