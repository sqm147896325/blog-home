import request from '@/utils/request'

export function getBlog(params: any) {
    return request({
        url: '/home/getBlog',
        method: 'get',
        params
    })
}

export function blogList(params: any) {
    return request({
        url: '/home/blogList',
        method: 'get',
        params
    })
}

export function blogKeyword(params: any) {
    return request({
        url: '/home/blogKeyword',
        method: 'get',
        params
    })
}