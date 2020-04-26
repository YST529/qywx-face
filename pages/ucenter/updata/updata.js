// pages/ucenter/updata/updata.js
const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const user = require('../../../service/user.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dialogShow: false,
    buttons: [{
      text: '取消'
    }],
    isFace: false,
    userFace: {},
  },
  openConfirm: function () {
    this.setData({
      dialogShow: true
    })
    const that = this
    this.takePhoto().then(reslove => {
      console.log(reslove, '验证')
      if( reslove.baseImg !== null ) {
        that.setData({
          isFace: true
        })
        util.post(api.UserFaceSearch, {
          img: reslove.baseImg,
          username: reslove.name
        }).then(res => {
          if(res.data.face_token !== null) {
            that.setData({
              dialogShow: false,
            })
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
          }
          console.log(res.data, 'eee')
        })
      }
    });
  },
  tapDialogButton(e) {
    this.setData({
      dialogShow: false,
    })
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    let that = this
    return new Promise((reslove, reject) => {
      ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          let img = res.tempImagePath
          let baseImg = wx.getFileSystemManager().readFileSync(img, "base64")
          const name = wx.getStorageSync('username');
          // console.log(baseImg, 'base')
          util.request(api.UserFaceDetect, {
           img: baseImg
          }, 'POST').then(res => {
            console.log(res, 'faceData')
            if(res.data.data.face_num == 1) {
              reslove({baseImg, name})
            }
            reject(res)
          })
        }
      })
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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