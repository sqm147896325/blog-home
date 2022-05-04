/* 
    处理Marked解析出的dom元素得到标题数组
*/

export default (dom: HTMLElement) => {
    const node = dom.children
    const arr:treeTitleObject[] = []

    for (let index = 0; index < node.length; index++) {
        const e = node[index];
        if (['H1','H2','H3','H4','H5','H6',].includes(e.nodeName)){
            arr.push({ id: e.id, level: Number(e.nodeName.replace('H', '')), title: e.textContent, children: new Array})
        }   
    }
    return toTree(arr)
}

interface treeTitleObject {
    id: String,
    level: Number,
    title: String | null,
    children: treeTitleObject[],
}

function toTree(arr: treeTitleObject[]) {
    let parentArr:treeTitleObject[] = []
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (index === 0) {
            parentArr.push(element)
        } else {
            if (parentArr[0].level === element.level) {
                parentArr.push(element)
            } else if ( parentArr[0].level > element.level ) {
                parentArr = [ element ]
            } else {
                parentArr[parentArr.length - 1].children.push(element)
            }
        }
    }
    parentArr = parentArr.map(e => {
        e.children = toTree(e.children)
        return e
    })
    return parentArr
}