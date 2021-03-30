// pages/category/category.js
import { request } from "../../request/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左边的数据
    leftMenuList : [],
    // 右边的数据
    rightMenuList : [],
    // 切换索引
    currentIndex : 0,
    // 重置右边的轮动条到零的位置
    scrollTop: 0 
  },
  // 暂时存储返回的数值
  cate : [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMenuList()
  },
  // 缓存
  setCache(){
    // 获取本地存储
    const cache = wx.getStorageSync('cates')
    // 无本地存储
    if(!cache){
      this.getMenuList()
    }else {
      // 过期时间
      if(Date.now() - cache.time > 1000 * 10) {
        this.getMenuList()
        // 获取本地存储数据
      }else {
        // 获取数据
        this.cate = cache.data;

        // 整理出左侧的菜单数据
        let leftContent = this.cate.map(item => item.cat_name)
        // 整理出右侧的菜单数据
        let rightContent = this.cate[0].children
        // 更新
        this.setData({
          leftMenuList : leftContent,
          rightMenuList: rightContent
        })
      }
    }

  },

  // 获取菜单的数据
  getMenuList(){
    request({url : "/categories"}).then((result)=>{
      this.cate = result.data.message;
      // 设置本地存储
      wx.setStorageSync('cates',{time:Date.now(), data:this.cate})
      // 整理出左侧的菜单数据
      let leftContent = this.cate.map(item => item.cat_name)
      // 整理出右侧的菜单数据
      let rightContent = this.cate[0].children
      // 更新
      this.setData({
        leftMenuList : leftContent,
        rightMenuList: rightContent
      })
    })

    

  },

  /**-----------------------视图------------------- */
  // 切换图标
  handleToggle(e){
    // 获取点击事件的索引
    let { index } = e.currentTarget.dataset;

    let rightContent = this.cate[index].children

    this.setData({
      currentIndex : index,
      rightMenuList : rightContent,
      scrollTop : 0

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