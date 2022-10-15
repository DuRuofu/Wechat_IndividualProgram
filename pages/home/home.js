
var mqtt = require("../../utils/mqtt.js") //引入mqtt文件
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

    const client = mqtt.connect('wx://mqtt.flespi.io:80', options)
 
    client.on('reconnect', (error) => {
      console.log('正在重连:', error)
    })
 
    client.on('error', (error) => {
      console.log('连接失败:', error)
    })
 
    client.on('connect', (e) => {
      console.log('成功连接服务器')
        //订阅一个主题
      client.subscribe('Taichi-Maker-Sub-30:83:98:A3:1E:15', { qos: 0 }, function (err) {
        if (!err) {
          client.publish('123', 'Hello mqtt')
          console.log("订阅成功")
        }
 
      })
    })
    //监听mq的返回
    client.on('message', function (topic, message, packet) {
      // message is Buffer
      console.log("packet", packet.payload.toString())
      client.end()
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