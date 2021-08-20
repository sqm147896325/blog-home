<template>
    <div :style="titleStyle" class="nav-title">
      <div class="title-logo">LS</div>
      <div class="title-menu">
        <div v-for="(item, index) in [1,2]" :key="index" class="title-item">
          <router-link to="/">item</router-link>
        </div>
      </div>
    </div>
    <div class="nav-bg"></div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'

export default defineComponent({
  setup() {
    const titleStyle:{
      opacity:Number
    } = reactive({
      opacity: 1
    });

    onMounted(() => {
      window.addEventListener("scroll", () => {
        if(window.scrollY < 10){
          titleStyle.opacity = 0;
        } else {
          titleStyle.opacity = 1;
        }
      });
      titleStyle.opacity = 0;
    });

    return {
      titleStyle
    }
  }
})
</script>

<style lang="less" scoped>
a{
  color: #FFF;
}
.nav-title{
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 60px;
  background: @bg-bar;
  opacity: 0;
  height: 40px;
  width: 100%;
  position: fixed;
  top: 0;
  .title-logo{
    font-size: 40px;
    color: #FFF;
  }
  .title-menu{
    display: flex;
    .menu-item{
      padding-left: 10px;
    }
  }
}
.nav-bg{
  height: 100vh;
  background-image: url('https://pic2.zhimg.com/v2-9b50ce19c9eef8fbef15667b9e677542_r.jpg');
  z-index: 1;
}
</style>

