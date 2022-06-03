<template>
  <div v-for="(item, index) in dir" :key="index" class="dir-list">
    <div class="dir-title" :class="firstDir ? 'first-title' : ''" @mouseenter="hover(true, index)" @mouseleave="hover(false)" @click="herfHash(item)">{{ item.title }}</div>
    <transition name="dir">
      <div v-if="item.children.length !== 0" v-show="hoverFlag(index)" @mouseenter="hover(true, index)" @mouseleave="hover(false)" class="dir-children">
        <MdDir :dir="item.children"/>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
// Option API风格
import { defineComponent, PropType } from "vue";

interface dataType {
  mouseHover: Boolean,
  chooseIndex: String
}
export default defineComponent({
  name: 'MdDir',
  props: {
    dir: {
      // ts 中 type 定义要规范，Array 不要写成 []
      type: Array as PropType<treeTitleObject[]>,
      default: () => {
        return []
      }
    },
    firstDir: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hoverFlag() {
      return (index: String) => {
        let existFlag = false
        this.dir[Number(index)].children.forEach(e => {
          if ('#' + e.id == window.location.hash) {
            existFlag = true
            return true
          }
        })
        return (this.mouseHover && index === this.chooseIndex) || this.firstDir || existFlag
      }
    },
  },
  data() {
    return {
      mouseHover: false,
      chooseIndex: ''
    } as dataType
  },

  mounted() {
  },

  methods: {
    hover(bool: Boolean, index: String) {
      this.mouseHover = bool
      this.chooseIndex = index
    },

    herfHash(item: treeTitleObject) {
      // 这里不使用hash定位使用query传参定位，query更容易控制
      // window.location.hash = '#' + item.id
      this.$router.replace({query: { id: item.id }})
    }
  }

})
</script>

<style lang="less" scoped>
.dir-list{
  cursor: pointer;
}
.dir-title{
  padding: 10px 0 10px 0;
  font-size: @fz-big;
  color: @c-black;
  &:hover{
    color: @bg-bar;
  }
}
.first-title{
  font-weight: bold;
  font-size: @fz-big + 2;
}
.dir-children{
  padding-left: 20px;
  transform: 1s;
}

.enter-dir{
  height: 0px;
}
.enter-active-dir {
  height: 100%;
}
</style>