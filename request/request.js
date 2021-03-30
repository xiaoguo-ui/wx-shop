export const request = (params) => {
  return new Promise((resolve,reject)=>{
    wx.request({
      // 展开参数
      ...params,
      success:function(result){
        resolve(result)
      },
      fail:function(err){
        reject(err)
      }

    })
  })
}