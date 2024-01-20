<template>
  <div class="header-container">
    <div class="l-content">
      <el-button style="margin-right: 20px;" @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
      <!-- 面包屑 -->
      <!-- <span class="text">首页</span> -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="logoutClick" trigger="click" size="mini">
        <span class="el-dropdown-link">
          <img class="user" src="../assets/images/v-logo.png" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="cancel">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {
  name: 'CommonHeader',
  data() {
    return {};
  },
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    logoutClick(command) {
      if (command === 'cancel') {
        console.log(command, 'command')
        // 清除cookie中的token信息
        Cookie.remove('token')
        // 清除cookie中的menu信息
        Cookie.remove('menu')
        // 跳转到登录页
        this.$router.push('/login')
      }
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  // mounted() {
  //   console.log(this.tags, 'tags')
  // }
}
</script>
<style lang="less" scoped>
.header-container {
  // position: fixed;
  // top: 0;
  // left: 0;
  // right: 0;
  // z-index: 1000;
  padding: 0 20px;
  background-color: rgb(14, 158, 230);
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  };
  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .l-content {
    display: flex;
    // 上下居中
    align-items: center;
    // deep 强制生效
    /deep/.el-breadcrumb_item {
      margin-left: 15px;
      .el-breadcrumb_inner {
        &.is-link {
          font-weight: normal;
          color: #666;
        }
      }
      &:last-child {
        .el-breadcrumb_inner {
          color: #fff;
        }
      }
    }
  }
}
</style>