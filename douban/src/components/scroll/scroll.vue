<template>
    <div ref="scroll">
      <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'

export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: DIRECTION_H
    }
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll () {
      if (!this.$refs.scroll) {
        return
      }
      this.scroll = new BScroll(this.$refs.scroll, {
        probeType: this.probeType,
        click: this.click,
        eventPassthrough: this.direction === DIRECTION_V ? DIRECTION_V : DIRECTION_H,
        bounce: {
          top: true,
          bottom: true,
          left: true,
          right: true
        }
      })
      // 滚动结束刷新滚动区域
      // this.scroll.on('scrollEnd', this.scrollEnd)
      // 滚动结束刷新滚动区域
      // const _this = this
      this.scroll.on('scroll', (pos) => {
        this.$emit('scroll', pos)
      })
    },
    scrollToTop () {
      if (this.scroll && this.scroll.y > 0) {
        this.scroll && this.scroll.scrollTo(0, 0)
      }
    },
    scrollEnd () {
      console.log(this)
    },
    // scrollEnd () {
    //   this.refresh()
    // },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    scroll (pos) {
      this.$emit('scroll')
    }
  }
}
</script>

<style scoped>

</style>
