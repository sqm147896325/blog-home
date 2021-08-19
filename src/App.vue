<template>
  <Nav></Nav>
  <router-view></router-view>
  <Footer></Footer>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, reactive, onMounted } from "vue";

export default defineComponent({
  name: 'App',
  components: { 
    Nav: defineAsyncComponent(() => import("./components/Nav.vue")),
    Footer: defineAsyncComponent(() => import("./components/Footer.vue"))
  }
})
</script>
