/** **   request.js   *** */
// 导入axios
import axios from 'axios';
// 使用element-ui Message做消息提醒
// 1. 创建新的axios实例，

const request = axios.create({
  // 公共接口--这里注意后面会讲
  baseURL: 'http://127.0.0.1:3333',
  // 超时时间 单位是ms，这里设置了3s的超时时间
  timeout: 60 * 1000,
});
// 2.请求拦截器
request.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-underscore-dangle
    const _config = config;
    _config.headers = {
      'Content-Type': 'multipart/form-data'
    };
    // 注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie
    return _config;
  },
  (error) => {
    Promise.reject(error);
  },
);

// 3.响应拦截器
request.interceptors.response.use(
  (response) => {
    // 接收到响应数据并成功后的一些共有的处理，关闭loading等
    if (response.data.code === 799) {
      window.location.href = '/authentication/login';
    }

    return response.data;
  },
  (error) => {
    // eslint-disable-next-line no-underscore-dangle
    const _error = error;
    /** *** 接收到异常响应的处理开始 **** */
    if (_error && _error.response) {
      // 1.公共错误处理
      // 2.根据响应码具体处理
      switch (error.response.status) {
        case 400:
          _error.message = '错误请求';
          break;
        case 401:
          _error.message = '未授权，请重新登录';
          break;
        case 403:
          _error.message = '拒绝访问';
          break;
        case 404:
          _error.message = '请求错误,未找到该资源';
          // window.location.href = '/NotFound';
          break;
        case 405:
          _error.message = '请求方法未允许';
          break;
        case 408:
          _error.message = '请求超时';
          break;
        case 500:
          _error.message = '服务器端出错';
          break;
        case 501:
          _error.message = '网络未实现';
          break;
        case 502:
          _error.message = '网络错误';
          break;
        case 503:
          _error.message = '服务不可用';
          break;
        case 504:
          _error.message = '网络超时';
          break;
        case 505:
          _error.message = 'http版本不支持该请求';
          break;
        default:
          _error.message = `连接错误${error.response.status}`;
      }
    } else {
      // 超时处理

      _error.message = '连接服务器失败';
    }
    /** *** 处理结束 **** */
    // 如果不需要错误处理，以上的处理过程都可省略
    return Promise.resolve(error.response);
  },
);
// 4.导入文件
export default request;
