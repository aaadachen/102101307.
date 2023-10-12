Page({
  localBattle: function() {
    // 跳转到本地对战页面
    wx.navigateTo({
      url: '/pages/localBattle/localBattle'
    });
  },
  aiBattle: function() {
    // 跳转到人机对战页面
    wx.navigateTo({
      url: '/pages/aiBattle/aiBattle'
    });
  },
  onlineBattle: function() {
    // 跳转到在线对战的匹配页面
    wx.navigateTo({
      url: '/pages/matching/matching'
    });
  }
});
