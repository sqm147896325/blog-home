
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
