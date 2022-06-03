<template>
  <div class="default-content">
    <article class="default-article">
      <div ref="blog" class="article-content" v-html="blog"></div>
    </article>
    <aside class="default-aside">
      <div class="aside-card">
        <MdDir :firstDir="true" :dir="dir" />
      </div>
    </aside>
  </div>
</template>

<script lang="ts">
// Option API风格
import { defineComponent, defineAsyncComponent } from "vue";
import * as marked from 'marked';
import { getBlog } from '@/api/index';
import parseDir from '@/utils/parseDir';

interface dataType {
  id: String,
  blog: String,
  dir: Array<treeTitleObject>
}
export default defineComponent({
  components: { MdDir: defineAsyncComponent(() => import('./components/MdDir.vue')) },

  data() {
    return {
      id: this.$route.params.id,
      blog: '',
      dir: []
    } as dataType
  },

  mounted() {
    this.init()
  },

  watch: {
    '$route.query.id': {
      handler (newValue) {
        this.locationEle(newValue)
      }
    }
  },

  methods: {

    init() {
      // 自定义标题id
      let rendererMD = new marked.marked.Renderer();
      let idText = 0
      rendererMD.heading = (text, level) => {
          return `<h${level} id="title-${idText++}">${text}</h${level}>`;
      }

      getBlog({id: this.id}).then(res => {
        this.blog = marked.marked(res.dataInfo.content, { renderer: rendererMD })
        this.$nextTick(() => {
          this.dir = parseDir(this.$refs.blog as HTMLElement)
          if (this.$route.query.id) {
            this.locationEle(this.$route.query.id)
          } else {
            window.scrollTo(0, 0)
          }
        })
      })
    },

    locationEle(newValue: any) {
      const el = document.getElementById(newValue)
      window.scrollTo({ 
        top: (el?.offsetTop || 0) - 50,
        behavior: "smooth" 
      })
    }

  }

})
</script>

<style lang="less" scoped>
.default-content{
  display: flex;
  min-height: 100vh;
  width: 100%;
  padding: 80px 5vw 5vw 5vw;
  background: #efefef;
}
.default-article{
  flex: 2;
  border-radius: 10px;
  background: #fff;
  width: 100%;
  padding: 20px 3vw;
  .article-content{
    width: 100%;
    word-break: break-all;
  }
}
.default-aside{
  flex: 1;
  margin-left: 10px;
  .aside-card{
    position: sticky;
    top: 40px;
    padding: 20px;
    border-radius: 10px;
    background: #fff;
    max-height: 70vh;
    overflow-y: auto;
  }
}
// &:deep([id^="title"]) {
//   padding-top: 60px;
//   margin-top: -60px;
// }
</style>