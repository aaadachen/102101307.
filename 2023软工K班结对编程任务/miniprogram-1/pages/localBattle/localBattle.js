const app = getApp()
Page({
  // TODO: 本地对战逻辑的代码
  data: {
    isRoundOver1: true,//用这个来控制开始投掷按钮
    isRoundOver2: true,
    over1:0,//结束本轮按钮按了之后改变over1的值
    restround:1,//剩余局数
    resttouzi1:5,//剩余的骰子
    resttouzi2:5,
    multiplierRange1: [ '1倍', '2倍', '3倍'], // 倍率选择器1的选项
    multiplierArray1: ['1倍', '2倍', '3倍'], // 用于显示当前选择的倍率
    multiplierIndex1: 0 ,// 当前倍率1的索引
    multiplierRange2: ['1倍', '2倍', '3倍'], // 倍率选择器2的选项
    multiplierArray2: ['1倍', '2倍', '3倍'], // 用于显示当前选择的倍率
    multiplierIndex2: 0 ,// 当前倍率2的索引
    dices1: [], // 存储骰子信息
    dices2: [],
    touziresult1:[],//表示玩家一每轮投掷完骰子的点数结果
    touziresult2:[],
    selectedDices1: [],//表示玩家一每轮选择的骰子
    selectedDices2: [],
    selectdice1:[],//汇总玩家一每局选定的骰子
    selectdice2:[],
    lockdice1: [],//表示玩家一锁定的骰子的点数
    lockdice2: [],
    lock1:[],//汇总玩家一前两轮锁定的骰子点数
    lock2:[],
    lunnum:1,//表示轮数
    chips1:0,//表示筹码数
    chips2:0,
    score1:0,//表示玩家骰子总分
    score2:0,
    allresult1:[],//表示第三轮结束是玩家骰子点数结果（包含选定和投掷）
    allresult2:[],
    finalmagnify1 : 1,//表示总倍率
    finalmagnify2 :1,
    nowmagnify1 : 1,//用来控制玩家一倍率选择器改变时总倍率是否发生变化
    nowmagnify2 : 1,
    isMultiplierEnabled1:false,//用来锁定倍率选择器，只有按下开始投掷按钮的时候才能解锁
    isMultiplierEnabled2:false,
  },
//获取全局变量总局数和初始筹码
onLoad: function () {
  const rounds = app.globalData.gameSettings.rounds;
  const chips = app.globalData.gameSettings.chips;

  this.setData({
    rounds: rounds,
    restround:rounds,
    chips1: chips,
    chips2: chips,
  })
},


  // 当倍率选择器的值改变时触发该方法
  bindMultiplierChange1: function(e) {
    this.setData({
      multiplierIndex1: e.detail.value
    });
      //this.magnify1();//计算玩家一的总倍率//移到结束按钮，358行左右
  },
  bindMultiplierChange2: function(e) {
    this.setData({
      multiplierIndex2: e.detail.value
    });
    //this.magnify2();
  },

  //计算玩家一总倍率
  magnify1: function () {
    let magnify1 = 1;
    const selectedValue = this.data.multiplierRange1[this.data.multiplierIndex1];
    if (selectedValue === '1倍') {
      magnify1 = 1;
    } else if (selectedValue === '2倍') {
      magnify1 = 2;
    } else if (selectedValue === '3倍') {
      magnify1 = 3;
    }
    //const i1 = this.data.nowmagnify1 * magnify1;
    const i1 = this.data.finalmagnify1 * magnify1;
    this.setData({ 
      finalmagnify1: i1 ,
      multiplierIndex1: 0 ,
    });
  },
  //计算玩家二总倍率
  magnify2: function () {
    let magnify2 = 1;
    const selectedValue = this.data.multiplierRange2[this.data.multiplierIndex2];
    if (selectedValue === '1倍') {
      magnify2 = 1;
    } else if (selectedValue === '2倍') {
      magnify2 = 2;
    } else if (selectedValue === '3倍') {
      magnify2 = 3;
    }
    //const i2 = this.data.nowmagnify2 * magnify2;
    const i2 = this.data.finalmagnify2 * magnify2;
    this.setData({ 
      finalmagnify2: i2 ,
      multiplierIndex2: 0 ,
    });
  },


//玩家一投掷区域
  throwDice1: function () {
    if (this.data.isRoundOver1){
      if(!this.data.isMultiplierEnabled1&&this.data.lunnum<3)
      {
        this.setData({
          isMultiplierEnabled1:true,
        });
      }
    let touziresult=[];
    // 清空之前的骰子信息
    this.setData({
      dices1: [],
      touziresult1:[]
    });
    // 随机生成五个骰子结果
    for (let i = 0; i < this.data.resttouzi1; i++) {
      let result = Math.floor(Math.random() * 6)+1 ; // 生成1到6之间的随机数
      touziresult.push(result);
      // 设置骰子的动画效果
      let animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
        delay: i * 200, // 分别延时显示每个骰子的动画
      });
      animation.rotate(720).step();

      // 添加骰子信息到数据列表中
      let dice = {
        image: `dice-${result}.jpg`, // 骰子图像路径
        animation: animation.export(),
        selected: false,
        number: result,
      };
      this.data.dices1.push(dice);
    }
    this.setData({
      touziresult1:touziresult,
    })
    //console.log('选中的骰子点数：', this.data.touziresult1);
    // 更新数据，触发界面更新
    this.setData({
      dices1: this.data.dices1,
      isRoundOver1: false,
      over1:0
    });
  }
  },
  //玩家一对骰子进行选定，并展示在投掷区域
  toggleSelect1(event) {
    if(this.data.lunnum<3){
    const index = event.currentTarget.dataset.index;
    const selected = event.currentTarget.dataset.selected;
    const dices = this.data.dices1;
    dices[index].selected = !selected;//实现骰子的选中和取消选中功能。
    this.setData({
      dices1: dices
    });
      this.updateSelectedDices1();
  }
  },
  
  updateSelectedDices1() {
    const dice = this.data.dices1;
    //const selectedDices = this.data.selectedDices1;
    //const lockdice = this.data.lockdice1;
    const selectedDices = [];
    const lockdice =[];
    for (let i = 0; i < dice.length; i++) {
      if (dice[i].selected) {
          selectedDices.push(dice[i]);
          lockdice.push(dice[i].number); // 将新选定的骰子点数添加到 lockdice 数组中
          //dice[i].selected=false;
      }
    }
    //console.log('选中的骰子点数：', lockdice);
    this.setData({
      selectedDices1: selectedDices,
      lockdice1:lockdice,
      dice1:dice,
    });
  },
//玩家一结束本轮代码实现功能：
   panduan()//在这个函数实现判断两边是否都点击了结束本轮按钮，进行轮数和剩余局数的的变化
  {
  if(this.data.over1==1&&this.data.over2==1)
  {
    this.setData({
      isRoundOver1: true,
      isRoundOver2: true,
      over1:0,
      over2:0,
    });
    this.setData({
      lunnum: this.data.lunnum + 1,
    });
    if(this.data.lunnum==4)
    {
      //这边要有一个函数实现计分，以及划分筹码的功能,并更新对应的数据
      this.compute();
      this.setData({
        lunnum: this.data.lunnum -3,
        restround: this.data.restround -1,
        allresult1:[],//把第三轮骰子数组重置
        allresult2:[],
      });
      if(this.data.restround==0)
    {
      app.globalData.overresult1 = this.data.chips1;
       app.globalData.overresult2 = this.data.chips2;
      wx.navigateTo({
        url: '/pages/result/result'
      });
    }
    }
  }
},

//计算score1和score2
compute(){
  var scores1;
  var scores2;
  scores1 = this.data.allresult1.reduce((sum, current) => sum + current, 0);
  scores2 = this.data.allresult2.reduce((sum, current) => sum + current, 0);
  //接下来调用函数判断allresult数组里奖励分详情
  this.setData({
    score1:this.computecount(this.data.allresult1)+scores1,
    score2:this.computecount(this.data.allresult2)+scores2,
  });
  //实现完计分功能之后要把结果数组进行更新
  this.setData({
    allresult1:[],
    allresult2:[],
  });
  //划分筹码
  var poor=0;
  if(this.data.score1>this.data.score2){
    poor = this.data.score1-this.data.score2;
    poor = poor*this.data.finalmagnify1;
    this.setData({
      chips1:this.data.chips1+poor,
      chips2:this.data.chips2-poor,
      finalmagnify:1,
      finalmagnify2:1,
      multiplierIndex1: 0 ,// 当前倍率1的索引
      multiplierIndex2: 0 ,// 当前倍率2的索引
      score1:0,
      score2:0,
    });
  }
  else{
    poor = this.data.score2-this.data.score1;
    poor = poor*this.data.finalmagnify2;
    //console.log( poor);
    this.setData({
      chips1:this.data.chips1-poor,
      chips2:this.data.chips2+poor,
      finalmagnify1:1,
      finalmagnify2:1,
      multiplierIndex1: 0 ,// 当前倍率1的索引
      multiplierIndex2: 0 ,// 当前倍率2的索引
      score1:0,
      score2:0,
    });
  }
  //console.log('骰子点数1：', this.data.chips1);
  //console.log('骰子点数2：', this.data.chips2);
  //如果有玩家中途筹码数小于等0，直接结束游戏
  if(this.data.chips1<=0)
  {
    this.setData({
      chips1:this.data.chips1+poor,
    });
    this.setData({
      //chips1:this.data.chips1+poor,
      chips2:this.data.chips2-poor+this.data.chips1,
      chips1:0,
    });
    //console.log('选中的骰子点数2：', this.data.chips2);
    app.globalData.overresult1 = this.data.chips1;
    app.globalData.overresult2 = this.data.chips2;
    wx.navigateTo({
      url: '/pages/result/result'
    });
  }
  if(this.data.chips2<=0)
  {
    this.setData({
      chips2:this.data.chips2+poor,
    });
    this.setData({
      chips2:this.data.chips2+poor,
      chips1:this.data.chips1-poor+this.data.chips2,
      chips2:0,
    });
    //console.log('选中的骰子点数1：', this.data.chips1);
    app.globalData.overresult1 = this.data.chips1;
    app.globalData.overresult2 = this.data.chips2;
    wx.navigateTo({
      url: '/pages/result/result'
    });
  }
},

computecount(allresults){
  let score=0;
  //const allresults1=this.data.allresult1;
  allresults.sort((a, b) => a - b);//将allresults从小到大排序，以实现大顺子的判断
  //console.log("当前得分为",allresults);
  const countMap = new Map();
  for (let num of allresults) {
    countMap.set(num, (countMap.get(num) || 0) + 1);
  }
  const counts = Array.from(countMap.values());
   // 双对
   if (counts.filter(count => count === 2).length === 2) {
    score = 10;
  }
  // 三连
  if (counts.some(count => count === 3) && counts.filter(count => count === 1).length === 2) {
    score = 10;
  }
  // 葫芦
  if (counts.includes(2) && counts.includes(3)) {
    score = 20;
  }
  // 四连
  if (counts.includes(4)) {
    score = 40;
  }
  // 五连
  if (counts.includes(5)) {
    score = 100;
  }
  // 小顺子
  if (counts.every(count => count === 1) && Math.max(...allresults) === 6 && Math.min(...allresults) <= 3) {
    score = 30;
  }
  // 大顺子
  
  if (allresults[1]==allresults[0]+1&&allresults[2]==allresults[1]+1&&allresults[3]==allresults[2]+1&&allresults[4]==allresults[3]+1) {
    score = 60;
  }
  return score;
  //console.log("当前得分为",this.data.score1);
},

overround1:function(e)
{
  this.setData({
    over1:1,
    dices1:[]
  });
  //更新前两轮选定的骰子
  if(this.data.lunnum<3){
    this.magnify1();
  this.setData({
    lock1:this.data.lock1.concat(this.data.lockdice1),
    selectdice1:this.data.selectdice1.concat(this.data.selectedDices1),
    resttouzi1:this.data.resttouzi1-this.data.lockdice1.length,
    selectedDices1: [],
    lockdice1:[],
    isMultiplierEnabled1:false,
    });
  }
  //console.log('剩余骰子数：', this.data.resttouzi1);
  //如果lunnum==3对投掷区域和选定区域进行更新，进入下一局
  if(this.data.lunnum==3)
  {
    this.setData({
      allresult1:this.data.touziresult1.concat(this.data.lock1),
      dices1: [],
      selectedDices1: [],//表示玩家一选择的骰子
      lockdice1: [],//表示玩家一锁定的骰子的点数
      selectdice1:[],
      lock1:[],
      resttouzi1:5,
    });
    //console.log('选中的骰子点数：', this.data.allresult1);
  }
  this.panduan();
},


  //玩家二投掷骰子
  throwDice2: function () {
    if (this.data.isRoundOver2){
      if(!this.data.isMultiplierEnabled2&&this.data.lunnum<3)
      {
        this.setData({
          isMultiplierEnabled2:true,
        });
      }
    let touziresult=[];
    // 清空之前的骰子信息
    this.setData({
      dices2: [],
    });
    // 随机生成五个骰子结果
    for (let i = 0; i < this.data.resttouzi2; i++) {
      let result = Math.floor(Math.random() * 6)+1 ; // 生成1到6之间的随机数
      touziresult.push(result);
      // 设置骰子的动画效果
      let animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
        delay: i * 200, // 分别延时显示每个骰子的动画
      });
      animation.rotate(720).step();

      // 添加骰子信息到数据列表中
      let dice = {
        image: `dice-${result}.jpg`, // 骰子图像路径
        animation: animation.export(),
        selected: false,
        number: result,
      };
      this.data.dices2.push(dice);
    }
    this.setData({
      touziresult2:touziresult,
    })
    // 更新数据，触发界面更新
    this.setData({
      dices2: this.data.dices2,
      isRoundOver2: false,
    });
  }
  },
//玩家二对骰子进行选定，并展示在投掷区域
toggleSelect2(event) {
  if(this.data.lunnum<3){
  const index = event.currentTarget.dataset.index;
  const selected = event.currentTarget.dataset.selected;
  const dices = this.data.dices2;
  dices[index].selected = !selected;//实现骰子的选中和取消选中功能。
  this.setData({
    dices2: dices
  });
    this.updateSelectedDices2();
}
},

updateSelectedDices2() {
  const dice = this.data.dices2;
  //const selectedDices = this.data.selectedDices1;
  //const lockdice = this.data.lockdice1;
  const selectedDices = [];
  const lockdice =[];
  for (let i = 0; i < dice.length; i++) {
    if (dice[i].selected) {
        selectedDices.push(dice[i]);
        lockdice.push(dice[i].number); // 将新选定的骰子点数添加到 lockdice 数组中
    }
  }
  //console.log('选中的骰子点数：', ockdice2);
  this.setData({
    selectedDices2: selectedDices,
    lockdice2:lockdice,
    dice2:dice,
  });
},
//玩家二结束本轮代码实现功能：
overround2:function(e)
{
  this.setData({
    over2:1,
    dices2:[]
  });
  
//更新前两轮选定的骰子
  if(this.data.lunnum<3){
    this.magnify2();
    //console.log('选中的骰子点数：',this.data.lockdice2);
    this.setData({
      lock2:this.data.lock2.concat(this.data.lockdice2),
      selectdice2:this.data.selectdice2.concat(this.data.selectedDices2),
      resttouzi2:this.data.resttouzi2-this.data.lockdice2.length,
      selectedDices2: [],
      lockdice2:[],
      isMultiplierEnabled2:false,
    });
    //console.log('剩余骰子数：', this.data.resttouzi2);
  }
//console.log('选中的骰子点数：', this.data.lock1);
//如果lunnum==3对投掷区域和选定区域进行更新，进入下一局
  if(this.data.lunnum==3)
  {
    
    this.setData({
      allresult2:this.data.touziresult2.concat(this.data.lock2),
    dices2: [],
    selectedDices2: [],//表示玩家一选择的骰子
    lockdice2: [],//表示玩家一锁定的骰子的点数
    selectdice2:[],
    lock2:[],
    resttouzi2:5
  });
  //console.log('选中的骰子点数：', this.data.allresult2);
}
this.panduan();
},
});
