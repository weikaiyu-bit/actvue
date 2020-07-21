<template>
  <el-container class="home-container">
    <!-- 导航栏 -->
    <el-header>
      <div style="width:200px;height:60px;background:#0270c1">
        <span>商场后台系统</span>
      </div>
      <div id="useImg">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <span>您好！{{ this.username }}</span>
        <!-- @command：点击菜单项触发的事件回调 -->
        <el-dropdown @command="__command" trigger="click">
          <span @click="flagcommand = !flagcommand" class="span">
            <a href="#">
              <i v-if="flagcommand == true" class="el-icon-arrow-up" style="color:white"></i>
              <i v-else-if="flagcommand == false" class="el-icon-arrow-down" style="color:white"></i>
            </a>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">个人信息</el-dropdown-item>
            <el-dropdown-item command="b" divided>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <!-- 左侧栏 -->
      <el-aside :width="isCollapse == true ? '64px' : '200px'">
        <div class="div">
          <span @click="isCollapse = !isCollapse" class="span">
            <a href="#">
              <i v-if="isCollapse == true" class="el-icon-s-unfold" style="color:white"></i>
              <i v-else-if="isCollapse == false" class="el-icon-s-fold" style="color:white"></i>
            </a>
          </span>
        </div>
        <el-menu
          text-color="#fff"
          background-color="#001529"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse="isCollapse"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="s.id" v-for="(s, idx) in fatherAside" :key="s.id">
            <template slot="title">
              <!-- 图标 -->
              <i :class="jconObj[idx].id"></i>
              <!-- 导航 -->
              <span>{{ s.name }}</span>
            </template>
            <!--   sonAside: [ { id: "1-1", name: "新增套餐" }]  -->
            <el-menu-item
              :index="'/' + son.path"
              v-for="son in s.sonAside"
              :key="son.id"
              @click="saveNav('/' + son.path)"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-success"></i>
                <!-- 导航 -->
                <span>{{ son.name }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主内容 -->
      <el-container>
        <el-main>
          <router-view />
        </el-main>
        <!-- <el-footer>
          <div id="footer">
            <span>广西广电网络</span>
          </div>
        </el-footer>-->
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import Vue from "vue";
import {
  container,
  Aside,
  Header,
  Main,
  Footer,
  Button,
  Avatar
} from "element-ui";
import indexData from "@/util/indexData";
Vue.use(container)
  .use(Aside)
  .use(Header)
  .use(Main)
  .use(Footer)
  .use(Button)
  .use(Avatar);
export default {
  // generate loader string to be used with extract text plugin
  computed: {
    fatherAside: () => {
      return indexData.fatherAside;
    },
    jconObj: () => {
      return indexData.jconObj;
    }
  },
  data() {
    return {
      //激活高亮
      activePath: "",
      //显示隐藏菜单栏
      isCollapse: false,
      flagcommand: false,
      username: ""
    };
  },
  created() {
    this.activePath = window.sessionStorage.getItem("params");
  },
  mounted() {
    this.username = window.localStorage.getItem("name");
  },
  methods: {
    __command(params) {
      if (params == "b") {
        this.$confirm("确认要退出？")
          .then(() => {
            this.$router.replace({ path: "/login" });
          })
          .catch(() => {});
      }
      // { path: '/login', component: Login, },
    },
    //列表高亮
    saveNav(params) {
      //保存链接的激活状态
      window.sessionStorage.setItem("params", params);
      this.activePath = window.sessionStorage.getItem("params");
    }
  }
};
</script>
<style scoped>
#app .home-container {
  height: 100%;
}
.el-header {
  background-color: #0270c1;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  padding-right: 0;
  align-items: center;
  color: #fff;
  font-size: 15px;
}
.el-header > div {
  display: flex;
  align-items: center;
}
.el-header > div span {
  margin-left: 15px;
}
.el-header div > img {
  width: 64px;
  height: 60px;
}
.el-aside {
  background-color: #001529;
  /* .el-menu {
    border-right: none;
  } */
}
.el-aside > div {
  text-align: center;
  height: 40px;
  /* background-color: #003666;
   */
  background-color: #001529;
}
/* .el-aside .el-menu {
  position: relative;
} */
.el-aside .el-menu .div {
  text-align: right;
}
.el-aside .el-menu #div .span {
  color: white;
}
.el-aside .el-menu {
  border-right: none;
}
.el-main {
  background-color: #f6f9fc;
}
.el-footer {
  /* background-color: #373d41; */
  background-color: #404040;
  text-align: center;
  font-size: 22px;
  color: #f6f9fc;
}
#useImg {
  margin: 0 20px;
}
#useImg div {
  margin: 0 3px;
}
.el-button {
  margin-right: 30px;
}
/* .el-menu {
} */
</style>
