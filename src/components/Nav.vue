<template>
    <div class="nav-main">
      <div class="main-logo">LS</div>
      <div class="main-menu">
        <div v-for="(item, index) in [1,2]" :key="index" class="menu-item">
          <router-link to="/">item</router-link>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    
  },
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
  height: 40px;
  .main-logo{
    font-size: 40px;
    color: #FFF;
  }
  .main-menu{
    display: flex;
  }
}
</style>

