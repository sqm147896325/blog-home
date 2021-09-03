/**
 * @author sqm
 * @description 打字机特效
 * @param {string} data     需要处理的数据
 * @param {number} timer    计时器间隔，删字*1，打字*5，毫秒
 * @param {number} wait     完成一轮（打字+删字）的等待时间，毫秒
 * @param {function} next   每次完成的回调，需要在此进行赋值
 * @backDes 
 */
const typewriter = (data:string, timer:number=50, wait:number=1000, next: (e:string)=> void ):void => {
    let dataArr:string[] = data.split('')
    let waitFlag:boolean = false    // 等待标志
    let pointer:number = 0          // 打字指针
    let returnData:string = ''      // 打字机数据
    setInterval(() => {
        if(pointer < dataArr.length){
            if(pointer % 1 === 0 && pointer < dataArr.length){
                returnData += dataArr[Math.floor(pointer)]
                next(returnData)
            }
            pointer = parseFloat((pointer + 0.2).toFixed(1))
        } else {
            if(returnData){
                let temArr = returnData.split('')
                temArr.pop()
                returnData = temArr.toString().replaceAll(',', '')
                next(returnData)
            }else if(!waitFlag) {
                waitFlag = true
                setTimeout(() => {
                    pointer = 0
                    waitFlag = false
                }, wait)
            }else{
            }
        }
    }, timer)
}

export default typewriter