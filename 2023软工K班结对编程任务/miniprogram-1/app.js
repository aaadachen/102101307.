// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    //新增代码
    gameSettings: {
      rounds: 1,//游戏局数
      chips: 0//个人筹码数
    },
    overresult1:0,//表示玩家最终筹码数
    overresult2:0,
  }
})
