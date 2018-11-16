<!--  -->
<template>
  <div class="horizontal" ref="horizontal">
    <div class="horizontalGroup" ref="horizontalGroup">
      <slot></slot>
    </div>
  </div>
</template>

<script type='text/ecmascript'>
import BScroll from 'better-scroll'

export default {
  props: {
    click: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    this.timer = setTimeout(() => {
      this._setHorizontalWidth()
      this._initHorizontal()
      clearTimeout(this.timer)
    }, 20)
  },
  methods: {
    _setHorizontalWidth () {
      if (!this.$refs.horizontalGroup) {
        return
      }
      this.children = this.$refs.horizontalGroup.children
      let width = 0
      const itemWidth = this.$refs.horizontal.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        // addclass(child, 'horizontal-item')
        child.style.width = `${itemWidth}px`
        width += itemWidth
      }
      this.$refs.horizontalGroup.style.width = `${width}px`
    },
    _initHorizontal () {
      this.slider = new BScroll(this.$refs.horizontal, {
        probeType: 3,
        click: this.click,
        scrollX: true,
        bounce: {
          top: true,
          bottom: true,
          left: false,
          right: false
        },
        snap: {
          loop: false
        }
      })
      // 滚动完成，派发当前页码
      this.slider.on('scrollEnd', this._scrollEnd)

      // 滚动之前，派发事件
      this.slider.on('beforeScrollStart', this.beforeScrollStart)

      // 派发滚动事件
      this.slider.on('scroll', (pos) => {
        this.$emit('scroll', pos)
      })
    },
    _scrollEnd () {
      const pageIndex = this.getCurrentPage()
      this.$emit('scrollEnd', pageIndex)
    },
    beforeScrollStart () {
      this.$emit('beforeScrollStart')
    },
    goToNext (index) {
      this.slider && this.slider.goToPage(index)
    },
    getCurrentPage () {
      return this.slider.getCurrentPage() && this.slider.getCurrentPage().pageX
    }
  }
}
</script>

<style lang='stylus' ref='stylesheet/stylus' scoped>
  .horizontalGroup
    display flex
    height 100%
</style>
