<template>
    <div class="home-main">
      <div class="home-title">{{title}}</div>
      <div class="home-list">
        <div
          class="list-item"
          :class="item.show ? item.show == 2 ? 'item-show' : 'item-half' : 'item-no'"
          :ref="'item' + index"
          v-for="(item,index) in blogList"
          :key="index"
          @click="toBlog(item.id)"
        >
          <div class="item-img">
            <MadderImage :src="item.imgUrl" />
          </div>
          <div class="item-content">
            <div class="content-title">{{item.title}}</div>
            <!-- <div class="content-row">
              <div class="row-left">{{formatterTime(item.created_at)}}</div>
              <div class="row-right">{{item.keyword}}</div>
            </div> -->
          </div>
        </div>
      </div>
      <div class="home-paging">
        <svg-icon name="paging-left" @click="pageTurn(-1)" class="paging-left"></svg-icon>
        <div class="paging-number">{{pageNum}}/{{totle}}</div>
        <svg-icon name="paging-right" @click="pageTurn(1)" class="paging-right"></svg-icon>
      </div>
    </div>
</template>

<script lang="ts">
type BlogItem = {
  show: number
  id: number
  title: string
  imgUrl: string
  keyword: string
  created_at: string
}
// Option API风格
import { defineComponent } from "vue";
import { emitter, EmitterKey } from '@/utils/bus';
import { blogList } from '@/api/index';
import MadderImage from '@/components/MadderImage/index.vue'
interface dataType {
  title: string
  blogList: BlogItem[],
  pageNum: Number,
  pageSize: Number,
  totle: Number
}
export default defineComponent({
  name: 'Home',
  data() {
     return {
      title: '博客列表',
      blogList: [],
      pageNum: 1,
      pageSize: 12,
      totle: 1
    } as dataType
  },

  components: {
    MadderImage
  },

  mounted() {
    this.init()
    window.addEventListener('scroll', this.scroll);
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.scroll)
  },

  methods: {

    init() {
      this.queryBlog()
    },

    scroll() {
      this.blogList.map((blogItem: BlogItem, i) => {
        let domItem:HTMLElement = this.$refs['item'+i] as HTMLElement
        if (Array.isArray(domItem)){
          domItem = domItem[0]
        }

        if ((document.documentElement.scrollTop + document.documentElement.clientHeight - 200) > domItem.offsetTop) {
          blogItem.show = 0
        } else if((document.documentElement.scrollTop + document.documentElement.clientHeight - 50) > domItem.offsetTop) {
          blogItem.show = 1
        } else {
          blogItem.show = 2
        }
      })
    },

    async queryBlog() {
      await blogList({
        page: this.pageNum,
        pagesize: 12,
        key: 'id',
        query: ''
      }).then(res => {
        this.blogList = res.dataInfo.rows.map((blogItem: BlogItem, i: number) => {
          if (!blogItem.imgUrl) {
            blogItem.imgUrl = `https://img.xjh.me/random_img.php?return=302&random=${this.pageNum}-${i}-${new Date().getTime()}`
          }
          return blogItem
        })
        this.totle = Math.ceil(res.dataInfo.count / 12)
      })
    },

    toBlog(id: Number) {
      this.$router.push(`/blog/${id}`)
    },

    async pageTurn(op: any) {
      if ( op + this.pageNum > this.totle || op + this.pageNum < 1 ) {
        return false
      }
      this.pageNum += op
      await this.queryBlog()
      emitter.emit(EmitterKey.HomePageTurn, true)

    },

    formatterTime(value: String) {
      return value.split('T')[0]
    }
  
  }

})
</script>

<style lang="less" scoped>
img[src=""],img:not([src]){
    background: #000;
    background-size:100% 100% ;
}

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
      margin: 0 10px 30px 10px;
      transition: opacity 0.8s ease, transform 0.5s ease;
      border-radius: 10px;
      box-shadow: 1px 1px 10px rgba(51, 51, 51, 0.6);
      .item-img{
        height: 70%;
        background: rgba(51, 51, 51, 0.6);
        border-radius: 10px 10px 0 0;
      }
      .item-content{
        cursor: pointer;
        height: 30%;
        display: flex;
        flex-direction: column;
        // justify-content: space-between;
        justify-content: center;
        padding: 10px;
        background-image: linear-gradient(#eee, #fff);
        .content-title{
          font-size: 16px;
          line-height: 16px;
        }
        .content-row{
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
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