<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, ref, Ref, watch } from 'vue';
import defaultSrc from "./placehold.svg"; // 默认图片
const props = defineProps({
    src: {
        type: String,
        default: ''
    }, // 传入图片
    isLazy: {
        type: Boolean,
        default: true
    }, // 是否懒加载
    height: {
        type: String,
        default: '100%'
    }, // 容器高度
    width: {
        type: String,
        default: '100%'
    }, // 容器宽度
});
const isReady = ref(false) // 图片是否加载完毕
const load = (e: Event) => {
    console.log('e >>>', e)
    isReady.value = true
} // 图片加载完毕

const isEnter = ref(false) // 是否进入可视区域
const imgLoad:Ref<Element|null> = ref(null)
const imgReady:Ref<Element|null> = ref(null)
const observer = new IntersectionObserver(callback);
function callback(entries: IntersectionObserverEntry[]) {
    for (let i of entries) {
        if (i.isIntersecting) {
            observer.disconnect()
            isEnter.value = true
            nextTick(() => {
                imgReady.value?.addEventListener('load', load)
            })
        }
    }
}

watch(() => props.src, () => {
    isReady.value = false
    isEnter.value = false
    imgReady.value?.removeEventListener('load', load)
    observer.disconnect()
    observer.observe(imgLoad.value!)
}) // 传入图片变化重新执行可视监听

onMounted(() => {
    observer.observe(imgLoad.value!);
})
onUnmounted(() => {
    observer.disconnect()
    imgReady.value?.removeEventListener('load', load)
})
</script>

<template>
    <div :style="{ height, width }">
        <img v-if="!isLazy || isEnter" v-show="isReady" v-bind="$attrs" class="img-ready" ref="imgReady" :src="src" alt="图片加载失败" />
        <img v-show="!isReady" v-bind="$attrs" ref="imgLoad" class="img-load" :src="defaultSrc" />
    </div>
</template>

<style lang="less" scoped>
.img-ready{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.img-load{
    width: 100%;
    height: 100%;
}
</style>