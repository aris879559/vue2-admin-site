import Mock from "mockjs"
import homeApi from './mockServeData/home'
import user from './mockServeData/user'
import permission from './mockServeData/permission'
// 定义mock请求拦截
Mock.mock('/api/home/getData', homeApi.getStatisticalData)

// // 定义mock请求拦截
// Mock.mock('/api/home/getData', function() {
//   // 拦截到请求后的处理逻辑
//   console.log('拦截到请求');
//   return []
// })

// 定义用户列表的数据
Mock.mock('/api/user/add', 'post', user.createUser)
Mock.mock('/api/user/edit', 'post', user.updateUser)
Mock.mock('/api/user/delete', 'post', user.deleteUser)
// 采用正则的方式拦截
Mock.mock(/api\/user\/getUser/ , user.getUserList)
Mock.mock(/api\/permission\/getMenu/ , 'post', permission.getMenu)
