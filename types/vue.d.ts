/* eslint-disable */
// 用于使.vue文件被识别
declare module '*.vue' {
  import type { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}