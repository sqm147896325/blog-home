<template>
  <Nav></Nav>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="$route.name" v-if="$route.meta?.keepAlive"/>
    </keep-alive>
    <component :is="Component" :key="$route.name" v-if="!$route.meta?.keepAlive"/>
  </router-view>
  <Footer></Footer>
  <ToUp></ToUp>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, reactive, onMounted } from "vue";

export default defineComponent({
  name: 'App',
  components: { 
    Nav: defineAsyncComponent(() => import('./components/Nav.vue')),
    Footer: defineAsyncComponent(() => import('./components/Footer.vue')),
    ToUp: defineAsyncComponent(() => import('./components/ToUp.vue'))
  }
})
</script>

<style lang="less" scoped>

</style>
