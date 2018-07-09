<template>
  <div class="login-wrap">
    <div class="ms-title">CMS管理系统</div>
    <!-- <div> -->
    <!-- `vm.$refs.p` will be the DOM node -->
    <!-- <p ref="p">hello</p> -->
    <!-- `vm.$refs.child` will be the child component instance -->
    <!-- <child-component ref="child"></child-component> -->
    <!-- </div> -->
    <div class="ms-login">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <!-- <p style="font-size:12px;line-height:30px;color:#999;"> {{sentence}} </p> -->
        <p v-if="seen" style="font-size:10px;line-height:30px;color:#999;" v-bind:title="message">{{ message }}</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  t as cookieToken
} from "@/components/common/CookieToken";

export default {
  data: function () {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error());
      }
      callback();
    };
    return {
      seen: 1,
      message: "" + new Date().toLocaleString(),
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{
          // required: true,
          message: "请输入用户名",
          trigger: "blur",
          validator: validateUsername
        }],
        password: [{
          required: true,
          message: "请输入密码",
          trigger: "blur"
        }]
      },
      sentence: []
    };
  },
  methods: {

    submitForm(formName) {
      // 表单validate成功
      var self = this;
      console.log(self); // 不一样 VueComponent，Vue
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 开始请求服务端API
          var axios = self.$axios;
          var data = {
            account: self.ruleForm.username,
            password: self.ruleForm.password
          };
          axios({
            method: "POST",
            url: "login",
            data: data
            // params 请求里面的url参数
          })
            .then(function (response) {
              console.log(response);
              if (response.data.code === 200) {
                localStorage.setItem("ms_username", self.ruleForm.username);
                let accessToken = response.data.data.t;
                // 得到access_token
                // debugger;
                cookieToken.setCookieToken(accessToken, 24 * 30);
                self.$router.push("/home");
              } else {
                // 密码不正确
                self.$message.error("账号或密码错误");
              }
            })
            .catch(function (error) {
              console.log(error);
              self.$message.error("服务器错误");
            });
          return false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created: function () {
    // this.$message.success("账号或密码错误");
  },
};

</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: #324157;
}

.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 168px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
}
</style>
