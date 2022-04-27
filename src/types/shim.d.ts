/* eslint-disable */
// 用于使.vue文件被识别
declare module '*.vue' {
  import type { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}

// 使axios包不报错
import * as axios from 'axios'
declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
  // 上下两种方法均可实现dataInfo不报错，上面的覆盖面更广些
  // interface AxiosResponse {
  //   dataInfo: Record<any>
  // }
}
