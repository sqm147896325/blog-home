<template>
    <div :style="navStyle" class="nav-main">
      <div class="main-logo">LS</div>
      <div class="main-menu">
        <div v-for="(item, index) in [1,2]" :key="index" class="menu-item">
          <router-link to="/">item</router-link>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'

export default defineComponent({
  setup() {
    const navStyle:{
      opacity:Number
    } = reactive({
      opacity: 1
    });

    onMounted(() => {
      window.addEventListener("scroll", () => {
        if(window.scrollY < 10){
          navStyle.opacity = 0;
        } else {
          navStyle.opacity = 1;
        }
      });
      navStyle.opacity = 0;
    });

    return {
      navStyle
    }
  }
})
</script>

<style lang="less" scoped>
a{
  color: #FFF;
}
.nav-main{
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
  .main-logo{
    font-size: 40px;
    color: #FFF;
  }
  .main-menu{
    display: flex;
    .menu-item{
      padding-left: 10px;
    }
  }
}
</style>

