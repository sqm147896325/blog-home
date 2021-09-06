<template>
    <div class="home-main">
      <div class="home-title">{{title}}</div>
      <div class="home-list">
        <div :class="item.show ? item.show == 2 ? 'item-show' : 'item-half' : 'item-no'" :ref="'item' + index" v-for="(item,index) in blogList" :key="index" class="list-item">
          <div class="item-img"></div>
          <div class="item-content">
            <!-- {{item.name}} -->
          </div>
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
        {name:1, value:1, show: 0},
        {name:1, value:1, show: 0},
        {name:1, value:1, show: 0},
        {name:1, value:1, show: 0},
        {name:1, value:1, show: 0},
        {name:1, value:1, show: 0},
        {name:1, value:1, show: 0},
        {name:1, value:1, show: 0},
        {name:1, value:1, show: 0},
        {name:1, value:1, show: 0},
        {name:1, value:1, show: 0},
        {name:1, value:1, show: 0}
      ]
    } as dataType
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.blogList.map((e,i) => {
        const item:any = this.$refs['item'+i]
        if ((document.documentElement.scrollTop + document.documentElement.clientHeight - 200) > item.offsetTop) {
          (this.blogList[i] as any).show = 0
        } else if((document.documentElement.scrollTop + document.documentElement.clientHeight - 50) > item.offsetTop) {
          (this.blogList[i] as any).show = 1
        } else {
          (this.blogList[i] as any).show = 2
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
      width: 300px;
      height: 200px;
      margin-bottom: 30px;
      transition: opacity 0.8s ease, transform 0.5s ease;
      border-radius: 10px;
      box-shadow: 1px 1px 10px rgba(51, 51, 51, 0.6);
      .item-img{
        height: 70%;
        background: rgba(51, 51, 51, 0.6);
        border-radius: 10px 10px 0 0;
      }
      .item-content{
        height: 30%;
      }
      &:hover{
        transform: scale(1.1);
      }
    }
    .item-show{
      opacity: 0;
    }
    .item-half{
      opacity: 0.7;
    }
    .item-no{
      opacity: 1;
    }
  }
}
</style>