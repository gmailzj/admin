<template>
  <div class="head-nav">
    <div class="logo"></div>
    <div class="user-info">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <img class="user-logo" src="../../../static/img/img.jpg"> {{username}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item command="change_password">修改密码</el-dropdown-item> -->
          <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog title="修改密码" :visible.sync="password.visible" :modal-append-to-body="true" :close-on-click-modal="false" class="dialog-my">
      <el-form ref="password" :model="password.form" :rules="password.rules" label-width="80">
        <el-form-item label="旧密码" prop="old_password">
          <el-input type="password" v-model="password.form.old_password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass_word">
          <el-input type="password" v-model="password.form.pass_word"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pass_words">
          <el-input type="password" v-model="password.form.pass_words" @keyup.enter.native="changePassword"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="password.visible = false">取 消</el-button>
        <el-button :disabled="password.loading" type="primary" @click="changePassword">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import bus from "../common/bus";
// import s from "@/components/model/login";

export default {
  data() {
    var e = this;
    return {
      collapse: false,
      name: "admin",
      password: {
        visible: !1,
        loading: !1,
        form: {
          old_password: "",
          pass_word: "",
          pass_words: ""
        },
        rules: {
          old_password: [
            {
              required: !0,
              message: "旧密码不能为空！",
              trigger: "change"
            }
          ],
          pass_word: [
            {
              required: !0,
              message: "新密码不能为空！",
              trigger: "change"
            },
            {
              validator: function (t, a, s) {
                var o = e.password.form;
                /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,15}$/i.test(a)
                  ? o.old_password === o.pass_word
                    ? s(new Error("新密码不能与旧密码相同！"))
                    : (o.pass_words &&
                      e.$refs.password.validateField("pass_words"),
                      s())
                  : s(new Error("6至15个英文和数字组成的字符"));
              },
              trigger: "change"
            }
          ],
          pass_words: [
            {
              required: !0,
              message: "确认密码不能为空！",
              trigger: "change"
            },
            {
              validator: function (t, a, s) {
                var o = e.password.form;
                /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,15}$/i.test(a)
                  ? o.pass_word !== o.pass_words
                    ? s(new Error("新密码与确认密码不相同！"))
                    : s()
                  : s(new Error("6至15个英文和数字组成的字符"));
              },
              trigger: "change"
            }
          ]
        }
      }
    };
  },
  computed: {
    username() {
      let username = localStorage.getItem("username");
      return username || this.name;
    }
  },
  methods: {
    handleCommand(command) {
      if (command == "loginout") {
        localStorage.removeItem("ms_username");
        this.$router.push("/login");
      } else if (command == "change_password") {
        this.password.visible = !0;
        this.$refs.password && this.$refs.password.resetFields();
      }
    },
    collapseChage() {
      this.collapse = !this.collapse;
      bus.$emit("collapse", this.collapse);
    },
    changePassword: function () {
      this.$refs.password.validate(function (t) { });
    }
  }
};
</script>

<style>
.dialog-my .el-dialog {
  max-width: 768px;
}
</style>

<style scoped>
.head-nav {
  color: #333;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
}

.collapse-btn:hover {
  background: rgb(40, 52, 70);
}

.header .logo {
  float: left;
  width: 250px;
  /* text-align: center; */
}

.user-info {
  float: right;
  padding-right: 50px;
  font-size: 16px;
}

.user-info .el-dropdown-link {
  position: relative;
  display: inline-block;
  padding-left: 50px;
  cursor: pointer;
  vertical-align: middle;
}

.user-info .user-logo {
  position: absolute;
  left: 0;
  top: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.el-dropdown-menu__item {
  text-align: center;
}

.add-btn {
  align-items: center;
  justify-content: center;
  display: flex;
}
.add-btn .el-icon-plus {
  line-height: 1;
  font-size: 40px;
  color: #999;
}
.add-btn:hover .el-icon-plus {
  color: #409eff;
}
</style>


