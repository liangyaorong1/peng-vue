import Cookies from "js-cookie";
export default {
  name: "login",
  data() {
    return {
      data: {
        activeName: "first",
        index: "0", //默认登录
        forgetVisible: false,
      },
      loginForm: {
        username: "", //用户登录和注册用户的邮箱
        password: "", //密码
      },
      forgetForm: {
        username: "", //用户登录和注册用户的邮箱
        password: "", //密码
        code: "",
      },
      registerForm: {
        username: "", //用户登录和注册用户的邮箱
        nickName: "", //昵称
        email: "", //用户发送邮箱验证码
        code: "", //邮箱验证码
      },
      //表单验证
      loginformRules: {
        username: [
          {
            required: true,
            message: "Please enter email address",
            trigger: "change",
          },
          {
            type: "email",
            message: "Please enter the correct email address",
            trigger: ["change"],
          },
        ],
        password: [
          {
            required: true,
            message: "Please input a password",
            trigger: "change",
          },
        ],
      },
      //表单验证
      registerformRules: {
        username: [
          {
            required: true,
            message: "Please enter email address",
            trigger: "change",
          },
          {
            type: "email",
            message: "Please enter the correct email address",
            trigger: ["change"],
          },
        ],
        password: [
          {
            required: true,
            message: "Please input a password",
            trigger: "change",
          },
        ],
        nickName: [
          {
            required: true,
            message: "Please enter a nickname",
            trigger: "change",
          },
        ],
      },
      formRules: {
        username: [
          {
            required: true,
            message: "Please enter email address",
            trigger: "change",
          },
          {
            type: "email",
            message: "Please enter the correct email address",
            trigger: ["change"],
          },
        ],
        password: [
          {
            required: true,
            message: "Please input a password",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    this.data.activeName = this.$route.query.activeName;
  },
  watch: {
    "data.index": function (val) {
      console.log(val);
    },
  },
  methods: {
    handleClick(tab, event) {
      this.form = this.$options.data().form;
      this.data.index = tab.index;
    },
    //获取用户信息
    getUserInfo() {
      this.$api.user.userInfo().then((res) => {
        if (res.code == 200) {
          console.log(res);
          this.$store.commit("setUserInfo", res.data); //保存用户信息
          localStorage.setItem("loginName", res.data.nickName);
        }
      });
    },
    //发送邮箱验证码
    sendEmail(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        this.$api.auth
          .sendEmail(this.registerForm.username)
          .then((res) => {
            if (res.code === 200) {
              this.$message.success("Sent successfully");
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch(() => {
            this.$message.error("服务出现异常,请联系管理员");
          });
      });
    },
    sendforgetEmail(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        this.$api.auth
          .sendEmail(this.forgetForm.username)
          .then((res) => {
            if (res.code === 200) {
              this.$message.success("Sent successfully");
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch(() => {
            this.$message.error("服务出现异常,请联系管理员");
          });
      });
    },
    //用户注册
    login() {
      const data = {
        username: this.registerForm.username,
        password: this.registerForm.password,
        nickName: this.registerForm.nickName,
        code: this.registerForm.code,
      };
      const loginData = {
        username: this.loginForm.username,
        password: this.loginForm.password,
      };
      if (this.data.index == "0") {
        //没输入验证码则是登录
        this.$refs.loginform.validate((valid) => {
          if (!valid) return;
          this.$api.login.login(this.$qs.stringify(loginData)).then((res) => {
            if (res.code === 200) {
              Cookies.set("token", res.token); // 放置token到Cookie
              this.getUserInfo();
              this.$router.push("/index"); // 登录成功，跳转到主页
              this.$message.success("Login succeeded");
            } else {
              this.$message.error(res.msg);
            }
          });
        });
      } else if (this.data.index == "1") {
        this.$refs.registerform.validate((valid) => {
          if (!valid) return;
          this.$api.auth
            .register(data)
            .then((res) => {
              if (res.code === 200) {
                this.$message.success("login was successful");
                this.registerForm = this.$options.data().form;
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch(() => {
              this.$message.error("服务出现异常,请联系管理员");
            });
        });
      }
    },
    //重置密码
    forget(formName) {
      const data = {
        username: this.forgetForm.username,
        password: this.forgetForm.password,
        code: this.forgetForm.code,
      };
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        this.$api.auth
          .forget(data)
          .then((res) => {
            if (res.code === 200) {
              this.$message.success("Reset succeeded");
              this.data.forgetVisible = false;
              this.form = this.$options.data().form;
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch(() => {
            this.$message.error("服务出现异常,请联系管理员");
          });
      });
    },
    //忘记密码窗口
    openForget() {
      this.form = this.$options.data().form;
      this.data.forgetVisible = true;
    },
  },
};
