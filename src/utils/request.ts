import axios from 'axios';

const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 30000 // request timeout
})

service.interceptors.request.use(config => {
    return config
}, err => {
    return Promise.reject(err)
})

service.interceptors.response.use(// 响应处理
response => {
    const code = response.status;
    // 自定义响应码，233为直接渲染显示自定义信息,默认为警告
    if(code == 233){
        // Message[response.data.dataInfo.type ? response.data.dataInfo.type : 'warning' ](response.data.msg);
        return response.data;
    }
    // 自定义响应码，仅在控制台输出错误信息
    if(code == 250){
        console.warn('[响应提示]',response.data.msg);
        return response;
    }
    if(code == 200){
        if (typeof response.data.dataInfo !== 'object') {
            // Message.success(response.data.msg); // 200且没有数据信息时则需要渲染成功的提示消息
        }
        return response.data;
    }
    // 默认返回为 response，如果修改默认返回可能导致option请求不通
}, err => {
    return Promise.reject(err)
})

export default service

