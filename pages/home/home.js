
var mqtt = require("../../utils/mqtt.js") //引入mqtt文件
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mqttData:"",
    rgbValues_1: [],
    rgbValues_2: [],
    rgbValues_3: []
  },
  grtmqtt(options) {

  },
  treatmentTemperature(options) {
    let arr =that.data.mqttData.temp
    console.log(arr)
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
      that.data.mqttData =JSON.parse(that.data.mqttData); 
      // console.log(that.data.mqttData)
      //转化数据
      let arr =that.data.mqttData.temp
      // console.log(arr)
      //变换温度矩阵
      let  grayValue
      let transparency  = new Array(64);
      for (let i = 0; i < arr.length; ++i) {
        grayValue=(arr[i]/80)*255
        transparency[i] = Math.floor(arr[i]) / 80
        // console.log(grayValue)
        //温度数值转RGB
      if (grayValue < 30)
      {
        that.data.rgbValues_1[i] = 0;
        that.data.rgbValues_2[i] = (4 * grayValue);
        that.data.rgbValues_3[i] = 255;
      }
      else if (grayValue >= 30 && grayValue < 80)
      {
        that.data.rgbValues_1[i] = 0;
        that.data.rgbValues_2[i]= 255;
        that.data.rgbValues_3[i] = (2 * 255 - 4 * grayValue);
      }
      else if (grayValue >= 80&& grayValue < 200)
      {
        that.data.rgbValues_1[i]= (4 * grayValue-2 * 255 );
        that.data.rgbValues_2[i] = 255;
        that.data. rgbValues_3[i] = 0;
      }
      else
      {
        that.data.rgbValues_1[i] = 255;
        that.data.rgbValues_2[i]  = (4 * 255 - 4 * grayValue);
        that.data.rgbValues_3[i] = 0;
      }
      }
      //刷新数据
      that.setData({
        mqttData:arr,
        transparency:transparency,
        rgbValues_1: that.data.rgbValues_1,
        rgbValues_2: that.data.rgbValues_2,
        rgbValues_3: that.data.rgbValues_3
      })
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
    client.end()
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