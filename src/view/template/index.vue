<template>
  <Default></Default>
</template>

<script lang="ts">
// Option API风格
import { defineComponent } from "vue";
import Default from './default.vue'

interface dataType {

}
export default defineComponent({
  components: { Default },
  data() {
     return {
       style: this.$route.params.style || 'default'
    } as dataType
  },

  mounted() {
    window.addEventListener('hashchange', this.hashChange)
  },

  unmounted() {
    window.removeEventListener('hashchange', this.hashChange)
  },

  methods: {

    init() {

    },

    hashChange(event:any) {
      // console.log(123, event)
      // // event.preventDefault()
      // window.requestAnimationFrame(() => {
      //   return;
      // })
      // return false
      window.onhashchange = function(){
        };
    },
  }

})
</script>

<style lang="less" scoped>

</style>