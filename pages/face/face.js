// pages/face/face.js
Page({
  takePhoto() {
    const ctx = wx.createCameraContext()
    let that = this
    this.setData({
      disabled: true
    })
    setTimeout(() => {
      ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          let img = res.tempImagePath
          let baseImg = wx.getFileSystemManager().readFileSync(img, "base64")
          console.log(baseImg)
          this.setData({
            src: img,
            baseImg: baseImg
          })
        }
      })
      wx.request({
        url: 'localhost',
        data: {
          img: baseImg
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'POST',
        success (res) {
          console.log(res.data)
        }
      })
      that.takePhoto()
    }, 1100)

    // this.setData({
    //   timer: timeTem
    // })
  },
  error(e) {
    console.log(e.detail)
  },
  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,
    timer: '',
    baseImg: '',
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