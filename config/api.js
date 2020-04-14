// const ApiRootUrl = 'http://127.0.0.1:8360/';
const ApiRootUrl = 'http://192.168.5.174:8360/';

module.exports = {
  UserLoginByWechat: ApiRootUrl + 'user/login/loginByWechat', //微信登录
  UserFaceRegister: ApiRootUrl + 'aip/faceClient/face', // 获取用户(人脸储存)数据
  UserSetFace: ApiRootUrl + 'aip/faceClient/faceAdd', // 注册用户
  UserFaceSearch: ApiRootUrl + 'aip/faceClient/faceSearch', // 人脸搜索
  UserFaceDetect: ApiRootUrl + 'aip/faceClient/faceDetect'
}