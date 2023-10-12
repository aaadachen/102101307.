// pages/rank/rank.js
// pages/ranklist/ranklist.js

Page({
  data: {
    currentTab: 0, // 当前选中的榜单类型，默认为总榜
    rankListData: [
      { name: '用户1', score: 100 },
      { name: '用户2', score: 90 },
      { name: '用户3', score: 80 },
      // 榜单数据，可根据实际需求进行替换或动态获取
    ],
  },

  // 切换榜单类型
  switchTab(e) {
    const { id } = e.currentTarget.dataset;
    this.setData({
      currentTab: id,
    });
  },

  // 返回上一页
  navigateBack() {
    wx.navigateBack();
  },
})
