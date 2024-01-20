<template>
    <el-row>
      <el-col :span="8" >
        <el-card>
          <div class="user">
            <img src="../assets/images/v-logo.png" alt="">
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间：<span>2024-01-01</span></p>
            <p>上次登录地点：<span>上海</span></p>
          </div>
        </el-card>
        <el-card style="margin-top: 10px;" >
          <el-table
            :data="tableData"
            style="width: 100%;">
            <!-- <el-table-column
              prop="name"
              label="课程">
            </el-table-column>
            <el-table-column
              prop="todayBuy"
              label="今日购买">
            </el-table-column>
            <el-table-column
              prop="monthBuy"
              label="本月购买">
            </el-table-column>
            <el-table-column
              prop="totalBuy"
              label="总购买">
            </el-table-column> -->
            <el-table-column v-for="(val, key) in tabelLabel"  :key="key" :prop="key" :label="val" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16">
        <div class="num">
          <el-card v-for="items in countData" :key="items.name" :body-style="{ display: 'flex', padding: 0, }">
            <i class="icon" :class="`el-icon-${items.icon}`" :style="{ background: items.color }"></i>
            <div class="detail">
              <p class="price">¥{{ items.value }}</p>
              <p class="desc">{{ items.name }}</p>
            </div>
          </el-card>
        </div>
        <!-- echarts图表 -->
        <div style="margin-left:20px">
          <!-- 折线图 -->
          <el-card style="height: 200px;">
            <div ref="echarts1" style="height: 200px;"></div>
          </el-card>
          <div class="graph">
            <!-- 柱状图 -->
            <el-card style="height: 180px;">
              <div ref="echarts2" style="height: 180px;"></div>
            </el-card>
            <!-- 饼状图 -->
            <el-card style="height: 180px;">
              <div ref="echarts3" style="height: 160px;"></div>
            </el-card>
          </div>
        </div>
      </el-col>
    </el-row>
</template>
<script>
import { getData } from '../api'
import * as echarts from 'echarts'
export default{
  data() {
    return {
      tableData: [],
      tabelLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买',
      },
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日收藏订单',
          value: 234,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '本月收藏订单',
          value: 234,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        },
      ],
    }
  },
  mounted() {
    // getData().then((data) => {
    getData().then(({ data }) => {
      console.log(data)
      const { tableData } = data.data
      this.tableData = tableData
      // console.log(tableData)

      // 基于准备好的dom，初始化echarts实例
      const echarts1 = echarts.init(this.$refs.echarts1)
      // 指定图表的配置项和数据
      var echarts1Option = {}
      // 处理数据xAxis
      const { orderData, userData, videoData  } = data.data
      const xAxis = Object.keys(orderData.data[0])
      const xAxisData = {
        data: xAxis
      }
      echarts1Option.xAxis = xAxisData
      echarts1Option.legend = xAxisData
      echarts1Option.yAxis = {}
      // console.log(xAxis)
      echarts1Option.series = []
      // 配置series
      xAxis.forEach(key => {
        echarts1Option.series.push({
          name: key,
          // 折线图
          type: 'line',
          // key对应的orderData的所有值
          data: orderData.data.map(item => item[key])
        })
      })
      console.log(echarts1Option)
      // 使用刚指定的配置项和数据显示图表
      echarts1.setOption(echarts1Option);

      // 柱状图
      const echarts2 = echarts.init(this.$refs.echarts2)
      const echarts2Option = {
        legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: userData.map(item => item.date),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name: '新增用户',
              data: userData.map(item => item.new),
              type: 'bar'
            },
            {
              name: '活跃用户',
              data: userData.map(item => item.active),
              type: 'bar'
            }
          ],
      }
      echarts2.setOption(echarts2Option);

      // 饼状图
      const echarts3 = echarts.init(this.$refs.echarts3)
      const echarts3Option = {
        tooltip: {
          trigger: 'item',
        },
        color: [
        "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
        ],
        series: [
          {
            data: videoData,
            // 类型饼状图
            type: 'pie'
          }
        ],
      }
      echarts3.setOption(echarts3Option)
    })
  }
}
</script>
<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-right: 40px;
  }
  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999999;
    }
  }
}

.login-info {
  p {
      line-height: 20px;
      font-size: 14px;
      color: #999999;
      span {
        color: #666666;
        margin-left: 60px;
      }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: 20px;
  .el-card {
      width: 32%;
      margin-bottom: 20px;
      .icon {
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: #fff;
      }
      .detail {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .price {
          font-size: 30px;
          margin-bottom: 10px;
          line-height: 30px;
          height: 30px;
        }
        .desc {
          font-size: 14px;
          color: #999;
          text-align: center;
        }
      }
  } 
}
.graph {
    display: flex;
    // 两个靠边
    justify-content: space-between;
    margin-top: 20px;
    .el-card {
      width: 48%;
    }
}
</style>