<template>
  <Nav ref="nav"></Nav>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="$route.name" v-if="$route.meta?.keepAlive"/>
    </keep-alive>
    <component :is="Component" :key="$route.name" v-if="!$route.meta?.keepAlive"/>
  </router-view>
  <Footer></Footer>
  <ToUp></ToUp>
</template>

<script lang="ts" setup>
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'
import ToUp from './components/ToUp.vue'
</script>

<style lang="less" scoped>

</style>
