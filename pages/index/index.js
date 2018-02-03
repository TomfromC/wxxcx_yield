//index.js
//获取应用实例
const Promise = global.Promise = require('../../utils/es6-promise/dist/es6-promise.js');
const regeneratorRuntime = global.regeneratorRuntime = require('../../utils/regenerator-runtime/runtime.js');
const co = require('../../utils/co/index.js');

var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    yieldData:{}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    //===================== yield start======================
      co(function *(){
        try{
          //调用应用实例的方法获取全局数据
          app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
              userInfo: userInfo
            })
          });
          wx.showLoading({
            title: '加载中...',
          })
          var result = yield myAsyncFunc();
          console.log(result.data);
          var result2 = yield myAsyncFunc2();
          console.log(result2.data);
          var yieldData = {firstData: result.data, secondData: result2.data};
          that.setData({
            yieldData: yieldData
          })
          wx.hideLoading();
        }catch(e){
          console.log(e);
        }
      });
    //===================== yield end  ======================
  }
})

/**
 * 使用promise构建方法,co依赖promise
 */
function myAsyncFunc() {
  return new Promise(function (resolve, reject) {
    //模拟接口调用所使用的时长
    setTimeout(function () {
      console.log("myAsyncFunction done!");
      resolve({
        data: "Hello,World-1"
      })
    }, 500);
  });
}

/**
 * 使用promise构建方法,co依赖promise
 */
function myAsyncFunc2() {
  return new Promise(function (resolve, reject) {
    //模拟接口调用所使用的时长
    setTimeout(function () {
      console.log("myAsyncFunction2 done!");
      resolve({
        data: "Hello,World-2"
      })
    }, 500);
  });
}