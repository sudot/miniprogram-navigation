App({
  globalData: {
    systemInfo: {
      // 小程序系统信息 https://developers.weixin.qq.com/miniprogram/dev/api/base/system/system-info/wx.getSystemInfoSync.html
    },
    navigationRect: {
      // 小程序右上角胶囊菜单按钮的布局位置信息 https://developers.weixin.qq.com/miniprogram/dev/api/ui/menu/wx.getMenuButtonBoundingClientRect.html
      width: 0, // 宽度，单位：px
      height: 0, // 高度，单位：px
      top: 0, // 上边界坐标，单位：px
      right: 0, // 右边界坐标，单位：px
      bottom: 0, // 下边界坐标，单位：px
      left: 0, // 左边界坐标，单位：px
    },
    navigationHeight: 0 // 小程序整个导航栏的高度(即网页内容开始的 y 坐标)
  },
  onLaunch: function () {
    this.initCapsule()
  },
  // 计算胶囊数据
  initCapsule() {
    let systemInfo = wx.getSystemInfoSync()
    let rect = null
    try {
      rect = wx.getMenuButtonBoundingClientRect()
      if (rect === null) {
        throw 'getMenuButtonBoundingClientRect error'
      }
      //取值为0的情况
      if (!rect.width) {
        throw 'getMenuButtonBoundingClientRect error'
      }
    } catch (error) {
      let gap = '' //胶囊按钮上下间距 使导航内容居中
      let width = 96 //胶囊的宽度，android大部分96，ios为88
      if (systemInfo.platform === 'android') {
        gap = 8
        width = 96
      } else if (systemInfo.platform === 'devtools') {
        if (ios) {
          gap = 5.5 //开发工具中ios手机
        } else {
          gap = 7.5 //开发工具中android和其他手机
        }
      } else {
        gap = 4
        width = 88
      }
      if (!systemInfo.statusBarHeight) {
        // 开启wifi的情况下修复statusBarHeight值获取不到
        systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20
      }
      rect = {
        // 获取不到胶囊信息就自定义重置一个
        bottom: systemInfo.statusBarHeight + gap + 32,
        height: 32,
        left: systemInfo.windowWidth - width - 10,
        right: systemInfo.windowWidth - 10,
        top: systemInfo.statusBarHeight + gap,
        width: width
      }
      console.log(error)
    }
    this.globalData.navigationRect = rect
    this.globalData.navigationHeight = rect.bottom + rect.top - systemInfo.statusBarHeight
    console.log(rect, this.globalData.navigationHeight, systemInfo.statusBarHeight)
  }
})