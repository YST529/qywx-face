const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
// pages/ucenter/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
  },
  init() {
    let that = this;
    try {
      const name = wx.getStorageSync('username');
      if (name !== null) {
        util.request(api.UserFaceRegister, {
          username: name
        }, 'POST').then(res => {
          console.log(res, 'faceRes')
          let obj = that.handleLoad(res.data.data)
          that.setData({
            userData: obj
          })
        })

      }
    } catch (err) {
      console.log(err)
    }
  },
  /**
   * 处理后端回馈页面加载数据
   */
  handleLoad(data) {
    let fDate = util.formatDate(data['register_date'])
    let eDate = util.formatDate(data['update_date'])
    let token = data.token,
      faceNum = 0;
    if (token !== null) {
      let list = token.split(';')
      faceNum = list.length - 1
    }
    let obj = {
      '用户名称':data.nickname,
      '用户组': data.group,
      '用户id': data.uid,
      '注册时间': fDate,
      '更改时间': eDate,
      '注册总数': faceNum
    }
    return obj
  },
  // 注册
  takePhoto() {
    const ctx = wx.createCameraContext()
    let that = this
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        let img = res.tempImagePath
        let baseImg = wx.getFileSystemManager().readFileSync(img, "base64")
        const name = wx.getStorageSync('username');
        // console.log(baseImg)
        util.request(api.UserFaceDetect, {
         img:baseImg
        }, 'POST').then(res => {
          if(res.data.data.face_num == 1) {
            util.post(api.UserSetFace, {
              img: baseImg,
              username: name
            }).then(resData => {
              if(resData.face_token !== null) {
                that.init();
              }
              console.log(resData.data, 'register')
            })
          }
          console.log(res, 'takePhoto')
        })
      }
    })

  },
  error(e) {
    console.log(e.detail)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})