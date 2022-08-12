<template>
  <div class="login">
    <el-dialog title="Retrieve password" :visible.sync="data.forgetVisible" width="30%" center>
      <el-form :model="forgetForm" :rules="formRules" ref="forgetform">
        <el-form-item prop="username">
          <el-input type="text" v-model="forgetForm.username" auto-complete="off" placeholder="email"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="forgetForm.password" auto-complete="off" placeholder="New password"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="forgetForm.code" placeholder="Verification Code" style="width:50%;"></el-input>
          <el-button @click="sendforgetEmail('forgetform')" style="float:right">Send Verification Code</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="data.forgetVisible = false">Cancel</el-button>
        <el-button type="primary" @click="forget('forgetform')">Reset</el-button>
      </span>
    </el-dialog>

    <el-form class="demo-ruleForm login-container">
      <el-tabs v-model="data.activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="login" name="first">
          <el-form :model="loginForm" :rules="loginformRules" ref="loginform" label-position="left" label-width="0px">
            <el-form-item prop="username">
              <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="email"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="password"></el-input>
            </el-form-item>
            <el-form-item style="width: 100%">
              <el-button type="primary" style="width: 48%">Reset</el-button>
              <el-button type="primary" style="width: 48%" @click="login('loginform')">login</el-button>
              <span style="float:right;cursor: pointer;" @click="openForget">Forgot password</span>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="register" name="second">
          <el-form :model="registerForm" :rules="registerformRules" ref="registerform" label-position="left" label-width="0px">
            <el-form-item prop="username">
              <el-input v-model="registerForm.username" placeholder="email"></el-input>
            </el-form-item>
            <el-form-item prop="nickName">
              <el-input v-model="registerForm.nickName" placeholder="User nickname"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="registerForm.password" placeholder="password"></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input v-model="registerForm.code" placeholder="Verification Code" style="width:50%;float: left;"></el-input>
              <el-button @click="sendEmail('registerform')">Send verification code</el-button>
            </el-form-item>
            <el-form-item style="width: 100%">
              <el-button type="primary" style="width: 48%">Reset</el-button>
              <el-button type="primary" style="width: 48%" @click="login('registerform')">register</el-button>
            </el-form-item>
          </el-form>

        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
import login from '@/assets/js/login'
export default {
  ...login
}
</script>

<style scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 100px auto;
  width: 450px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #505458;
}

.remember {
  margin: 0px 0px 35px 0px;
}
</style>