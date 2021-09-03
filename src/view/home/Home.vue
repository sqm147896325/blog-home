<template>
    <div class="home-main">
      <div class="home-title">{{title}}</div>
      <div class="home-list">
        <div :ref="'item' + index" v-for="(item,index) in blogList" :key="index" class="list-item">
          {{item.name}}
        </div>
      </div>
    </div>
</template>

<script lang="ts">
// Option API风格
import { defineComponent } from "vue";
interface dataType {
  title: string
  blogList: object[]
}
export default defineComponent({
  data() {
     return {
      title: '模块标题',
      blogList: [
        {name:1, value:1},
        {name:1, value:1},
        {name:1, value:1},
        {name:1, value:1},
        {name:1, value:1},
        {name:1, value:1}
      ]
    } as dataType
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.blogList.map((e,i) => {
        // console.log(this.$refs['item'+i].clientHeight)
        if(window.scrollY){
        } else {
        }
      })
    });
  },
  methods: {

  }
})
</script>

<style lang="less" scoped>
.home-main{
  padding: 0 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  .home-title{
    margin: 80px;
  }
  .home-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    text-align: center;
    width: 100%;
    .list-item{
      width: 20vw;
      height: 300px;
    }
  }
}
</style>