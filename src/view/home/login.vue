<template>
  <div id="app">
    <div class="login-container">
      <el-form
        :model="user"
        :rules="rules2"
        status-icon
        ref="user"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-page"
      >
        <div style="margin-bottom:15px;">
          <h3 class="title" style="color:gray;">系统登录</h3>
        </div>
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="user.username"
            auto-complete="off"
            placeholder="用户名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="user.password"
            auto-complete="off"
            placeholder="密码"
            clearable
            show-password
          ></el-input>
        </el-form-item>
        <el-checkbox
          v-model="user.checked"
          style="float:left"
          class="rememberme"
          >记住密码</el-checkbox
        >
        <el-link type="danger" style="float:right">忘记密码?</el-link>
        <el-form-item style="width:100%;">
          <el-button
            type="primary"
            style="width:100%;"
            @click="handleSubmit('user')"
            :loading="logining"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      logining: false,
      user: {
        username: "",
        password: "",
      },
      rules2: {
        username: [
          {
            required: true,
            message: "请输入您的帐户",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入您的密码", trigger: "blur" },
        ],
      },
      checked: false,
    };
  },
  mounted() {
    this.getCookie();
  },
  methods: {
    handleSubmit() {
      let thiz = this;
      this.$refs.user.validate((valid) => {
        if (valid) {
          this.logining = true;
          let datas = {
            username: thiz.user.username,
            password: thiz.user.password,
          };
          thiz.$axios
            .post("/api/oa/admin/v1/User/login", qs.stringify(datas))
            .then((res) => {
              if (res.data.flag == true) {
               window. console.log("res",res)
              window.localStorage.setItem("name", this.user.username);
              window.localStorage.setItem("id", res.data.data.id);
                this.logining = false;
                if (this.user.checked) {
                  thiz.setCookie(this.user.username, this.user.password, 7);
                }
                thiz.$router.push({
                  name: "home",
                  query: { username: thiz.user.username },
                });
              } else {
                switch (res.data.msg) {
                  case "用户不存在":
                    this.logining = false;
                    this.$message.error(res.data.msg, "提示", {
                      confirmButtonText: "ok",
                    });
                    break;
                  case "账号密码错误":
                    this.logining = false;
                    this.$message.error(res.data.msg, "提示", {
                      confirmButtonText: "ok",
                    });
                    break;
                  default:
                    this.logining = false;
                    this.$message.error("未知错误", "提示", {
                      confirmButtonText: "ok",
                    });
                }
              }
            });
        } else {
          return false;
        }
      });
    },
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date();
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
      window.document.cookie =
        "username" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    getCookie() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; ");
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("=");
          if (arr2[0] == "username") {
            this.user.username = arr2[1];
          } else if (arr2[0] == "password") {
            this.user.password = arr2[1];
          }
        }
        this.checked = true;
      }
    },
    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1);
    },
  },
};
</script>

<style scoped>
body {
}

#app {
  position: relative;
  background-image: url(/gdlogo.jpg);
  background-repeat: no-repeat;
  /* background-size: cover;  */
  background-size: 100% 100%; /*按比例缩放*/
}
#app .login-container {
  position: absolute;
  margin: 180px auto;
  left: 50%;
  margin-left: -205px;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 10px;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #fde6e6;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>
