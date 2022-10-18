
var mqtt = require("../../utils/mqtt.js") //引入mqtt文件
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mqttData:""

  },
  grtmqtt(options) {

  },
  connectMq(){
    // 连接选项
    const options = {
      connectTimeout: 4000, // 超时时间
      // 认证信息 按自己需求填写
      clientId: 'weixinkehuduan',
      username: '',
      password: '',
    }

    let that = this
    var client = mqtt.connect('wxs://www.duruofu.xyz:8084/mqtt', options) //你自己的域名
    client.on('connect', (e) => {
      console.log('成功连接服务器!')
    })
    client.subscribe('esp8266', {
      qos: 0
    }, function (err) {
      if (!err) {
        console.log("订阅成功:esp8266")
      }
    })
    client.on('message', function (topic, message, packet) {
      that.data.mqttData = packet.payload.toString()
      console.log(that.data.mqttData)
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.connectMq()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})