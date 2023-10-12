const app = getApp()
Page({
  // TODO: 本地对战逻辑的代码
  /*gotogameover: function() {//结束游戏按钮的功能
    wx.navigateTo({
      url: '/pages/result/result'
    });
  },*/
  data: {
    multiplierRange1: ['0倍', '1倍', '2倍', '3倍'], // 倍率选择器的选项
    multiplierArray1: ['0倍', '1倍', '2倍', '3倍'], // 用于显示当前选择的倍率
    multiplierIndex1: 0 ,// 当前倍率的索引
    multiplierRange2: ['0倍', '1倍', '2倍', '3倍'], // 倍率选择器的选项
    multiplierArray2: ['0倍', '1倍', '2倍', '3倍'], // 用于显示当前选择的倍率
    multiplierIndex2: 0 // 当前倍率的索引
  },

  // 当倍率选择器的值改变时触发该方法
  bindMultiplierChange1: function(e) {
    this.setData({
      multiplierIndex1: e.detail.value
    });
  },
  bindMultiplierChange2: function(e) {
    this.setData({
      multiplierIndex2: e.detail.value
    });
  },
  //局数和筹码数
  onLoad: function () {
    const rounds = app.globalData.gameSettings.rounds;
    const chips = app.globalData.gameSettings.chips;

    this.setData({
      rounds: rounds,
      chips: chips
    })
  }
});
