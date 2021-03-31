// pages/good_detail/good_detail.js
import { request } from "../../request/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品详情
    goodDetail: [],

  },
  // 暂存全部数据
  goodList : {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  // 由于直接从options中直接取不到参数，
  var arr = []
  for (let i in options) {
    arr.push(options[i])
  }
  // 更新
  let goodsId = arr[0]

  this.getGoodList(goodsId)
  },
  // 获取详情数据
  getGoodList(goodsId){
    request({url : "/goods/detail", data : {goods_id : goodsId} }).then((result)=>{
      // 暂存
      this.goodList = result.data.message
      this.setData({
        // 可以优化
        // goodDetail:result.data.message

        // 优化接口数据
        goodDetail: {
          goods_name: result.data.message.goods_name,
          goods_price: result.data.message.goods_price,
          // 处理wepb格式的
          goods_introduce: result.data.message.goods_introduce.replace(/\.wepb/g,'.jpg'),
          pics: result.data.message.pics,
        }
      })
    })
  },
  // 显示轮播大图
  onPreviewImage(e) {
    console.log(e)
    // 准备数据
    let urls = this.goodList.pics.map( (item) => item.pics_mid)
    let currentImage = e.currentTarget.dataset.url
    console.log(currentImage)
    wx.previewImage({
      current: currentImage, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },

  handleCartAdd(){
    // 获取本地存储中的数据
    let cart = wx.getStorageSync('cart') || []
    // 查询本地存储中是否存在此个商品
   let index = cart.findIndex(item => item.goods_id === this.goodList.goods_id)

  //  没有
   if(index === -1){
    //  为此商品添加一个计数器
    this.goodList.num = 1
    // 商品添加入cart
    cart.push(this.goodList)
   }else {
    //  有商品，利用索引找到此商品，然后计数器加1
     cart[index].num++
   }
  //  设置商品的本地存储
   wx.setStorageSync('cart', this.goodList)
  //显示添加的对话框 
   wx.showToast({
     title: '添加成功',
   })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})