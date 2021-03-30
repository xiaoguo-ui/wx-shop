import {baseUrl} from './constance.js'
// 优化请求的次数
let ajaxTimes = 0 
export const request = (params) => {
  // 请求一次加一次
  ajaxTimes ++
  wx.showLoading({
    title: '加载中',
  })
  return new Promise((resolve,reject)=>{
    wx.request({
      // 展开参数
      ...params,
      url:baseUrl + params.url,
      success:function(result){
        resolve(result)
      },
      fail:function(err){
        reject(err)
      },
      complete:()=>{
        ajaxTimes --
        // 不请求才关闭
        if(ajaxTimes === 0){
            wx.hideLoading()
        }
      }

    })
  })
}