<template>
  <el-form ref="ruleForm" label-width="70px" :inline="true" class="login-container" :model="ruleForm" :rules="rules">
    <h3 class="login_title">用户登录</h3>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" show-password v-model="ruleForm.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item >
      <el-button @click="submit" style="margin-left: 105px;margin-top: 10px;" type="primary">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import { getMenu } from '../api/'
export default {
  data() {
    return {
      // 登陆数据
      ruleForm: {
        username: '',
        password: '',
      },
      // 校验规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
      },
    }
  },
  methods: {
    // 登录
    submit() {
      // // token信息
      // const token = Mock.Random.guid()
      // // token信息存入cookie用于不同页面间的通信
      // Cookie.set('token', token)

      // 校验通过
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          getMenu(this.ruleForm).then(({ data }) => {
            // console.log(data)
            if (data.code === 20000) {
              // token信息存入cookie用于不同页面间的通信
              Cookie.set('token', data.data.token)

              // 获取菜单的数据，存入store中
              this.$store.commit('setMenu', data.data.menu)
              this.$store.commit('addMenu', this.$router)

              // 跳转到首页
              this.$router.push('/home')
            } else {
              this.$message.error(data.data.message);
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  width: 350px;
  border: 6px solid #eaeaea;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
  .login_title {
    color: #505458;
    // 左右居中
    text-align: center;
    margin-bottom: 40px;
  }
  // .login_submit {
  //   margin: 10px auto 0 auto;
  // }
  .el-input {
    width: 198px;
    // margin-bottom: 20px;
  }
}
</style>