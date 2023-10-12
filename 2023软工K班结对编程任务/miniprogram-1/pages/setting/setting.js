// setting.js

const app = getApp()

Page({
  data: {
    rounds: 1,
    chips: 0
  },

  // 监听局数选择器变化事件
  onRoundsChange: function(e) {
    const rounds = Number(e.detail.value) + 1;
    this.setData({
      rounds: rounds
    })
  },

  // 监听筹码输入框变化事件
  onChipsInput: function(e) {
    const chips = Number(e.detail.value);
    this.setData({
      chips: chips
    })
  },

  // setting.js

onLoad: function () {
  const roundsArray = [];
  for (let i = 1; i<=10; i++) {
    roundsArray.push(i + '局');
  }
  this.setData({
    roundsArray: roundsArray
  })
},

  // 监听开始游戏按钮点击事件
  startGame: function() {
    const rounds = this.data.rounds;
    const chips = this.data.chips;

    // 更新全局变量中的游戏设置
    app.globalData.gameSettings.rounds = rounds;
    app.globalData.gameSettings.chips = chips;

    // 跳转到游戏页面
    wx.navigateTo({
      /**url: '/pages/game/game'**/
      url: '/pages/mode/mode'
    })
  }
})
