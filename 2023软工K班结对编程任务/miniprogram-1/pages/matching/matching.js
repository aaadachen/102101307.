Page({
  data: {
    player1: {
      avatarUrl: "", // 第一名玩家头像url
      playerId: "", // 第一名玩家id
      playerName: "" // 第一名玩家昵称
    },
    player2: {
      avatarUrl: "", // 第二名玩家头像url
      playerId: "", // 第二名玩家id
      playerName: "" // 第二名玩家昵称
    }
  },

  onLoad: function() {
    // 获取第一名玩家信息，此处为模拟数据，需要根据实际情况进行修改
    const player1Info = {
      avatarUrl: "https://example.com/avatar1.jpg",
      playerId: "123456",
      playerName: "玩家1"
    };
    // 获取第二名玩家信息，此处为模拟数据，需要根据实际情况进行修改
    const player2Info = {
      avatarUrl: "https://example.com/avatar2.jpg",
      playerId: "654321",
      playerName: "玩家2"
    };
    this.setData({
      'player1.avatarUrl': player1Info.avatarUrl,
      'player1.playerId': player1Info.playerId,
      'player1.playerName': player1Info.playerName,
      'player2.avatarUrl': player2Info.avatarUrl,
      'player2.playerId': player2Info.playerId,
      'player2.playerName': player2Info.playerName
    });
  },

  startMatch: function() {
    // 发起匹配请求，处理匹配逻辑，例如调用后端接口等

    // 匹配成功后跳转到onlineBattle文件夹设计的页面
    wx.navigateTo({
      url: '/pages/onlineBattle/onlineBattle'
    });
  }
})
