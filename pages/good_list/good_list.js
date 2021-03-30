// pages/good_list/good_list.js
import { request } from "../../request/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tab 切换数组
    tabs: [
      {
        id : 0,
        value : "综合",
        isActive : true
      },
      {
        id : 1,
        value : "销量",
        isActive : false
      },
      {
        id : 2,
        value : "价格",
        isActive : false
      },
    ],
    // 商品列表
    goodList : []
  },
  // 查询的参数
  queryinfo:{
    query:"",
    cid:"",
    pagenum:"1",
    pagesize:"10"
  },
  // 总页码数
  totalPages : 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 赋值
    this.queryinfo.cid = options.cid
    this.getGoodList()
  },
  // 获取商品列表
  getGoodList(){
    request( {url:"/goods/search", data:this.queryinfo} ).then( (result) =>{
      // 获取
      let goodList = result.data.message.goods
      // 总条数
      let total = result.data.message.total
      // 获取总页码数
      this.totalPages = Math.ceil(total / this.queryinfo.pagesize)
      // 更新
      this.setData({
        goodList : [...this.data.goodList,...goodList]
      })
    })
    // 关闭下拉刷新的等待时间
    wx.stopPullDownRefresh()
  },
  // -------------视图--------------------
  // 标题点击事件
  handleTabsItemChange(e){
    // 获取点击事件的索引
    const { index } = e.detail;
    // 暂时数组
    let { tabs } = this.data;
    // 便利循环
    tabs.forEach((item,indey)=>{ indey === index ? item.isActive = true : item.isActive = false})

    this.setData({
      tabs
    })
  },
  // 鼠标滚轮事件
  onReachBottom: function(){
    console.log("11111")
    if(this.queryinfo.pagenum >= this.totalPages){
      wx.showToast({
        title: '已经没有数据了',
      })
    }else {
      this.queryinfo.pagenum ++
      this.getGoodList()
    }
  },
  // 下拉刷新
  onPullDownRefresh(){
    this.setData({
      goodList: []
    })
    // 设置页码为1
    this.queryinfo.pagenum = 1
    // 获取商品列表数据
    this.getGoodList()
  }


})