<template>
  <div class="manage">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <!-- 用户的表单信息 -->
      <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <!-- 只能选择1号则检查日期格式问题 -->
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button @click="handleAdd" type="primary">
        + 新增
      </el-button>
      <!-- form 搜索区域 -->
      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleSearch" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-label">
      <el-table
      stripe
      height="90%"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性別">
          <template slot-scope="scope">
            <!-- <i class="el-icon-time"></i> -->
            <span>{{ scope.row.sex == 1 ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄">
        </el-table-column>
        <el-table-column
          prop="birth"
          label="出生日期">
        </el-table-column>
        <el-table-column
          prop="addr"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="addr"
          label="地址">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getUser, addUser, editUser, deleteUser } from '../api/'
export default{
  data() {
    return {
      selectedDate: null,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      dialogVisible: false,
      form: {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: '',
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      rules: {
        name: [{ required: true, message: '请输入姓名' }],
        age: [{ required: true, message: '请输入年龄' }],
        sex: [{ required: true, message: '请选择性别' }],
        birth: [{ required: true, message: '请选择出生日期' }],
        addr: [{ required: true, message: '请输入地址' }],
      },
      tableData: [],
      modalType: 0, // 0表示新增的弹窗，1表示编辑
      total: 0, // 当前的总条数
      pageData: {
        page: 1,
        limit: 10,
      },
      userForm: {
        name: '',
      },
    }
  },
  methods: {
    // 提交用户表单
    submit() {
      this.$refs.form.validate((valid) => {
        // console.log(valid, 'valid')
        // 符合校验
        if (valid) {
          // 表单验证通过，执行提交逻辑,后续对表单数据的处理
          if (this.modalType === 0) {
            addUser(this.form).then(() => {
              // 重新获取列表的接口
              this.getList()
            })
          } else {
            editUser(this.form).then(() => {
              // 重新获取列表的接口
              this.getList()
            })
          }
          console.log(this.form, 'form')

          // 清空表单数据
          this.$refs.form.resetFields()
          // 关闭弹窗
          this.dialogVisible = false
        }
      })
    },
    // 弹窗关闭的时候，重置表单
    handleClose() {
      // console.log(this.$refs.form)
      // 清空表单数据
      this.$refs.form.resetFields()
      // 关闭弹窗
      this.dialogVisible = false
    },
    // 点击按钮取消，重置表单
    cancel() {
      this.handleClose()
    },
    handleEdit(row) {
      this.modalType = 1
      this.dialogVisible = true
      // 注意需要对当前数据进行深拷贝
      // 深拷贝，避免修改form时，影响tableData的数据
      this.form = JSON.parse(JSON.stringify(row))
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUser({ id: row.id }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            // 重新获取列表的接口
            this.getList()
          }) 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
        });          
      });
    },
    handleAdd() {
      this.modalType = 0
      this.dialogVisible = true
    },
    // 获取列表数据
    getList() {
      // 获取列表的数据,src\api\index.js定义了export const getUser = (params)
      getUser({ params: {...this.userForm, ...this.pageData }}).then(({ data }) => {
        // console.log(data, 'data')
        this.tableData = data.list
        // this.total = data.count ? data.count : 0 判断内容为不确定时使用三元判断
        this.total = data.count || 0 //对数值进行判断处理
      })
    },
    // 选择页码的回调函数
    handlePage(val) {
      // console.log(val, 'val')
      this.pageData.page = val
      this.getList()
    },
    // 列表的查询
    handleSearch() {
      this.getList()
    }
  },
  mounted() {
    // // 获取列表的数据
    // getUser().then(({ data }) => {
    //   // console.log(data, 'data')
    //   this.tableData = data.list
    // })
    this.getList()
  }
}
</script>
<style lang="less" scoped>
.manage {
  height: 90%;
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-label {
    position: relative;
    height: calc(100% - 62px);
    .pager {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>