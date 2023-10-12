Page({
  goToRank: function() {
    wx.navigateTo({
      url: '/pages/rank/rank'
    });
  },
  goToGameRule: function() {
    wx.navigateTo({
      url: '/pages/gamerule/gamerule'
    });
  },
  goToMode: function() {
    wx.navigateTo({
      /**url: '/pages/mode/mode'**/
      url: '/pages/setting/setting'/**设置游戏局数和筹码数的页面 */
    });
  }
});