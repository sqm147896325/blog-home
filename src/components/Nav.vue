<template>
    <div :class=" titleTop ? 'title-top' : 'title-down'" class="nav-title">
      <div class="title-logo">LS</div>
      <div class="title-menu">
        <div v-for="(item, index) in [1,2,3]" :key="index" class="menu-item">
          <router-link to="/">item{{item}}</router-link>
        </div>
      </div>
    </div>
    <div class="nav-bg">
      <div class="bg-typewriter">{{typewriterData}}<span class="typewriter-twinkle">|</span></div>
      <div class="bg-button">按钮</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref,  onMounted } from 'vue'
import typewriter from '@/utils/typewriter'
export default defineComponent({
  setup() {
    /** 需要动态渲染的数据 */
    let titleTop = ref(true)  // 标题样式控制标题
    let typewriterData = ref('')  // 打字机显示绑定
    /** 不需要动态渲染德数据 */
    let typewriterText:string = 'Welcome to my world!'  // 需要打字效果的文字数组

    onMounted(() => {
      window.addEventListener("scroll", () => {
        if(window.scrollY < 10){
          titleTop.value = true
        } else {
          titleTop.value = false
        }
      });
      typewriter(typewriterText, 50, 1000, (e) => {
        typewriterData.value = e
      })
    });

    return {
      titleTop,
      typewriterData
    }
  }
})
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
  .bg-typewriter{
    color: #FFF;
    margin: 90px 0;
    text-align: center;
    font-size: @fz-title;
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
    &:hover{
      background: @fc-danger;
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

