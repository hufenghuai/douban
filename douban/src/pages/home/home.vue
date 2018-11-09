<!--  -->
<template>
  <div class="home-header">
      <div class="header" ref="header">
        <search-box :placeholder="placeholder"></search-box>
        <title-bar :title="title"></title-bar>
      </div>
      <div class="scroll" ref="scroll">
        <scroll ref="scrollContent" :probe-type="probeType" @scroll="scroll" class="scroll-content">
          <div>
            <div class="test"></div>
          </div>
        </scroll>
      </div>
  </div>
</template>

<script type='text/ecmascript'>
import Scroll from 'components/scroll/scroll'
import SearchBox from 'components/search-box/search-box'
import TitleBar from 'components/title-bar/title-bar'

const maxTransformY = 40 // input输入框的高度
const headerHeight = 80

export default {
  data () {
    return {
      placeholder: '理发恩怨',
      title: [
        {
          name: '动态',
          id: 'dynamic'
        },
        {
          name: '推荐',
          id: 'recommend'
        }
      ],
      titleItem: 'item',
      probeType: 3,
      transformY: 0,
      rate: 1,
      diff: 0
    }
  },
  methods: {
    scroll (pos) {
      this.transformY = pos.y
    },
    tranformHeader () {
      this.$refs.header.style.transfrom = `translate3d(0, ${this.transformY}px, 0)`
    }
  },
  watch: {
    transformY (newVal) {
      this.diff = newVal
    },
    diff (newVal) {
      const newY = (newVal < 0 && Math.abs(newVal) <= maxTransformY) ? newVal : -maxTransformY
      if (this.controlY === newY) {
        return
      }
      this.controlY = newY
      this.$refs.header.style.top = `${newY}px`
      this.$refs.scroll.style.top = `${headerHeight + newY}px`
      this.$refs.scrollContent.refresh()
    }
  },
  components: {
    SearchBox,
    TitleBar,
    Scroll
  }
}
</script>

<style lang='stylus' ref='stylesheet/stylus' scoped>
  .home-header
    position relative
    .header
      position absolute
      background-color #5bbc5b
      left 0
      top 0
      width 100%
    /deep/ .title-item
      color: #85e291
      margin-left 66px
      font-size 15px
    /deep/ .title-item:first-child
      margin-left 0
    /deep/ .title-item-active
      color #FFFFFF
    .scroll
      position fixed
      width 100%
      top 80px
      bottom 0
      .scroll-content
        height 100%
        overflow hidden
        .test
          height 1000px
          background-color red
</style>
