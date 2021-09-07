<template>
    <div class="footer-main">
      <div class="main-copyright row">Copyright © 2019-{{(new Date).getFullYear()}} 孙启萌 版权所有</div>
      <div class="main-record row" @click="go">鄂ICP备19018246号-1</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Footer',
  mounted() {},
  methods: {
    go() {
      window.open('https://beian.miit.gov.cn');
    }
  }
})
</script>

<style lang="less" scoped>
.footer-main{
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.row{
  color: #333;
  margin: 3px 0;
}
</style>