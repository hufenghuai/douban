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
    data: {
      type: Array,
      default: null
    },
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
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
      this.scroller = new BScroll(this.$refs.scroll, {
        probeType: this.probeType,
        click: this.click,
        eventPassthrough: this.direction === DIRECTION_V ? DIRECTION_V : DIRECTION_H
      })
      // 滚动结束刷新滚动区域
      // this.scroll.on('scrollEnd', this.scrollEnd)
      // 滚动结束刷新滚动区域
      // const _this = this
      this.scroller.on('scroll', (pos) => {
        this.$emit('scroll', pos)
      })
    },
    scrollToTop () {
      if (this.scroller && this.scroller.y > 0) {
        this.scroller && this.scroller.scrollTo(0, 0)
      }
    },
    scrollEnd () {
      console.log(this)
    },
    // scrollEnd () {
    //   this.refresh()
    // },
    refresh () {
      this.scroller && this.scroller.refresh()
    },
    scroll (pos) {
      this.$emit('scroll')
    }
  },
  watch: {
    data () {
      this.scroller && this.scroller.refresh()
    }
  }
}
</script>

<style scoped>

</style>
