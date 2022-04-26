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
      <div class="home-paging">
        <svg-icon name="paging-left" class="paging-left"></svg-icon>
        <div class="paging-number">1/2</div>
        <svg-icon name="paging-right" class="paging-right"></svg-icon>
      </div>
    </div>
</template>

<script lang="ts">
// Option API风格
import { defineComponent } from "vue";
import { blogList } from '@/api/index'
interface dataType {
  title: string
  blogList: object[],
  pageNum: 1,
  pageSize: 12,
  totle: 12
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
      ],
      pageNum: 1
    } as dataType
  },
  mounted() {
    this.init()
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
    init() {
      blogList({
        page: this.pageNum,
        pagesize: 12,
        key: '',
        query: ''
      }).then(res => {
        this.blogList = res.dataInfo.rows
      })
    }
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
        transform: scale(1.05);
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
  .home-paging{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .paging-button {
      height: 40px;
      line-height: 40px;
      width: 40px;
      padding: 10px;
      border-radius: 50%;
      text-align: center;
      color: #333;
      box-shadow: 0px 3px 10px rgba(51, 51, 51, 0.8);
      background: rgba(51, 51, 51, 0.2);
      transition: all 0.3s ease;
      &:hover{
        transform: scale(1.1);
      }
    }
    .paging-left{
      .paging-button()
    }
    .paging-right{
      .paging-button()
    }
    .paging-number{
      font-size: @fz-big + 5px;
      line-height: 50px + 10px;
      font-weight: bold;
      height: 50px;
      color: #333;
    }
  }
}
</style>