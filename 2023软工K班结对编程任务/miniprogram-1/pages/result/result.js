Page({
  data: {
    gameResult: '',
    overresults1:0,
    overresults2:0,
  },
  onLoad: function () {
    const app = getApp();
    const s1 = app.globalData.overresult1;
    const s2 = app.globalData.overresult2;
    this.setData({
      overresults1: s1,
      overresults2: s2
    })
    if (s1 > s2) {
      this.setData({ gameResult: '玩家1赢了！' })
    } else if (s1 < s2) {
      this.setData({ gameResult: '玩家2赢了！' })
    } else {
      this.setData({ gameResult: '平局！' })
    }
  },
  /*backToWelcome: function () {
    wx.navigateBack({
      delta: wx.getStorageSync('delta') || 1
    })
  },*/
  backToWelcome: function() {
    wx.navigateTo({
      url: '/pages/welcome/welcome'
    });
  },
  playAgain: function () {
    wx.reLaunch({
      url: '/pages/setting/setting'
    })
  }
})
