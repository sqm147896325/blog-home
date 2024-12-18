<template>
  <div ref="title" :class="titleTop && $route.path === '/' ? 'title-top' : 'title-down'" class="nav-title">
    <div class="title-logo">LS</div>
    <div class="title-menu">
      <div v-for="(item, index) in [1,2,3]" :key="index" class="menu-item">
        <router-link to="/">item{{item}}</router-link>
      </div>
    </div>
  </div>
  <div v-if="$route.path === '/'" class="nav-bg">
    <div class="bg-typewriter">{{typewriterData}}<span class="typewriter-twinkle">|</span></div>
    <div class="bg-button" @click="ready">开始阅读</div>
  </div>
</template>

<script lang="ts" setup>
import { ref,  onMounted, Ref, onUnmounted } from 'vue'
import { emitter, EmitterKey } from '@/utils/bus';
import typewriter from '@/utils/typewriter'

/** 需要动态渲染的数据 */
let titleTop:Ref<boolean> = ref(true)  // 标题样式控制标题
let typewriterData:Ref<string> = ref('')  // 打字机显示绑定

/** 不需要动态渲染德数据 */
let typewriterText:string = 'Welcome to my world!'  // 需要打字效果的文字数组

/* 页面滑动 */
const title:Ref<Element|null> = ref(null) // 
const ready = () => {
  if (!title.value) {
    return false
  }
  window.scrollTo({
    top: window.innerHeight - title.value.clientHeight,
    behavior: 'smooth'
  });
  console.log('ready', title)
}

/* 是否显示标题 */
const showTitle = () => {
  if(window.scrollY < 10){
    titleTop.value = true
  } else {
    titleTop.value = false
  }
}

/** 生命周期 */
onMounted(() => {
  window.addEventListener("scroll", showTitle);
  // 打字机效果
  typewriter(typewriterText, 50, 1000, (e) => {
    typewriterData.value = e
  })
  emitter.on(EmitterKey.HomePageTurn, ready)
});
onUnmounted(() => {
  window.removeEventListener("scroll", showTitle);
  emitter.off(EmitterKey.HomePageTurn, ready)
})

defineExpose({ ready })
</script>

<style lang="less" scoped>
a{
  color: #FFF;
}
.title-top{
  background: rgba(51, 51, 51, 0);
  box-shadow: 0;
  .title-logo::before{
    display: block;
    content: '';
    position: absolute;
    left: -10px;
    right: -10px;
    height: 100%;
    padding: 0 10px;
    transition: all 0.3s ease;
  }
  .title-logo:hover::before{
    background: rgba(51, 51, 51, 0.2);
    box-shadow: 0 1px 3px rgba(51, 51, 51);
    border-radius: 30px;
  }
  .menu-item:hover{
    background: rgba(51, 51, 51, 0.2);
    box-shadow: 0 1px 3px rgba(51, 51, 51);
    border-radius: 2px;
  }
}
.title-down{
  background: rgba(51, 51, 51, 1);
  box-shadow: 0 1px 3px rgba(51, 51, 51);
  .title-logo::before{
    display: block;
    content: '';
    position: absolute;
    left: -10px;
    right: -10px;
    height: 100%;
    transition: all 0.3s ease;
  }
  .title-logo:hover::before{
    background: rgba(151, 151, 151, 0.3);
  }
  .menu-item:hover{
    background: rgba(151, 151, 151, 0.3);
  }
}
.nav-title{
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 60px;
  height: 40px;
  width: 100%;
  position: fixed;
  top: 0;
  .title-logo{
    position: relative;
    font-size: 32px;
    color: #FFF;
  }
  .title-menu{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    .menu-item{
      padding: 10px;
      transition: all 0.3s ease;
    }
  }
}
.nav-bg{
  height: 100vh;
  background-image: url('https://pic2.zhimg.com/v2-9b50ce19c9eef8fbef15667b9e677542_r.jpg');
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  // 视差
  /* 不重复填充 */
  background-repeat: no-repeat;
  /* 全部覆盖 */
  background-size: cover;
  /* 背景位置 */
  background-position: center;
  /* 背景图片相对滚动时的位置 */
  background-attachment: fixed;
  .bg-typewriter{
    width: 70%;
    color: #FFF;
    margin: 45px 0;
    padding: 35px 0;
    text-align: center;
    font-size: @fz-title;
    background: rgba(51, 51, 51, 0.7);
    border-radius: 100px 0 100px 0;
    box-shadow: 0 1px 2px rgba(0, 0, 0);
    .typewriter-twinkle{
      animation: blink 1s infinite normal;
    }
  }
  .bg-button{
    margin: 90px 0 120px 0;
    padding: 10px 30px;
    border: 1px #FFF solid;
    border-radius: 20px;
    color: #FFF;
    transition: all 0.3s ease;
    background: rgba(33, 33, 33, 0.45);
    &:hover{
      background: rgba(0, 0, 0, 0.8);
      border: 1px rgba(255, 255, 255, 0) solid;
    }
  }
}
@keyframes blink {
    from {
      color: #FFF;
    }
    to {
      color: rgba(255, 255, 255, 0);
    }
}
</style>

