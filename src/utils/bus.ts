import mitt from "mitt";

const emitter = mitt();

const whiteHomeModule: WhiteObj = {
    'homePageTurn' : { name: '首页博客翻页', type: Boolean }
}
const whiteObj: WhiteObj = {
    ...whiteHomeModule
}

const whiteList: string[] = Object.keys(whiteObj)

emitter.on('*', (key, value) => {
    console.log('全局监听', key, value)
    const keyStr = String(key); // 将 key 转换为字符串
    if (!whiteList.includes(keyStr)) {
        console.warn('请注册事件方便后续维护!', keyStr, value)
        return false
    }
    if (typeof whiteObj[keyStr].type() !== typeof value) {
        console.warn('事件类型错误!', keyStr, value)
        return false
    }
})

export enum EmitterKey {
    HomePageTurn = 'homePageTurn'
}

export type WhiteObj = {
    [key: string]: { name: string, type: Function }
}
 
export {
    whiteHomeModule,
    whiteObj,
    whiteList,
    emitter
};