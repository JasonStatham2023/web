/** **   request.js   *** */
// 导入axios
import axios from 'axios';
import {NODE_ENV} from '../utils/NODE_ENV';

// 使用element-ui Message做消息提醒
// 1. 创建新的axios实例，
const request = axios.create({
  // 公共接口--这里注意后面会讲
  baseURL: NODE_ENV === 'development' ? 'http://localhost:3000' : '/graphql',
  // 超时时间 单位是ms，这里设置了3s的超时时间
  timeout: 60 * 1000,
});
// 2.请求拦截器
request.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-underscore-dangle
    const _config = config;

    if (_config.url.includes('upload')) {
      _config.headers = {
        'Content-Type': 'multipart/form-data'
      };
    } else {
      // 发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
      _config.data = JSON.stringify(config.data); // 数据转化,也可以使用qs转换
      _config.headers = {
        'Content-Type': 'application/json', // 配置请求头
      };
    }
    // 注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie
    const authorization = window.localStorage.getItem('accessToken') || '';
    if (authorization) {
      _config.headers.Authorization = `Bearer ${authorization}`; // 如果要求携带在请求头中
    }
    return _config;
  },
  (error) => {
    console.log(222222);
    console.log(error);
    Promise.reject(error);
  },
);

// 3.响应拦截器
request.interceptors.response.use(
  (response) => {
    // 接收到响应数据并成功后的一些共有的处理，关闭loading等
    if (response.data.code === 401) {
      window.location.href = '/login';
      return Promise.reject(response.data);
    }

    if (response.data.code === 799) {
      window.localStorage.removeItem('accessToken');
      window.location.replace('/login');
      return Promise.reject(response.data);
    }

    return response.data;
  },
  (error) => {
    console.log(error);
    // eslint-disable-next-line no-underscore-dangle
    const _error = error;
    /** *** 接收到异常响应的处理开始 **** */
    if (_error && _error.response) {
      // 1.公共错误处理
      // 2.根据响应码具体处理
      switch (error.response.status) {

        case 401:
          _error.message = 'Unauthorized, please log in again';
          // window.localStorage.removeItem('authorization');
          // window.location.href = '/signin';
          break;
        default:
          _error.message = 'error';
      }
    } else {
      // 超时处理

      _error.message = '连接服务器失败';
    }
    /** *** 处理结束 **** */
    // 如果不需要错误处理，以上的处理过程都可省略
    return Promise.resolve({code: error.response.status, body: {}, message: error});
  },
);
// 4.导入文件
export default request;
