// components/navigation/navigation.js
const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    // 背景样式(若要设置背景图片,在此样式中通过 background-image 设置即可)
    background: {
      type: String,
      value: ''
    },
    // 是否显示返回按钮
    back: {
      type: Boolean,
      value: true
    },
    // 主页按钮显示模式 null:默认样式,false:不显示,true:自定义样式
    home: {
      type: Boolean,
      value: null
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    bar: app.globalData.navigationRect,
    barHeight: app.globalData.navigationHeight,
    showBack: false,
    showHome: false,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onBack() {
      wx.navigateBack({
        delta: 1
      });
    },
    onHome() {
      wx.reLaunch({
        url: '/pages/index/index',
      })
    },
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      const multiPages = getCurrentPages().length > 1
      this.setData({
        showBack: this.data.back && multiPages,
        showHome: this.data.home !== false
      })
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})