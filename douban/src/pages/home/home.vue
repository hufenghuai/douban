<!--  -->
<template>
  <div class="home-header">
      <div class="header" :class="{'fixed': fixed}" ref="header">
        <search-box :placeholder="placeholder"></search-box>
        <title-bar ref="titleBar" @click="titlClick" :fixed="fixed" :title="title"></title-bar>
      </div>
      <horizontal-move @scroll="horizontalScroll" ref="container" class="horizontao-move">
        <scroll :data="dynamic" ref="scroll" @scroll="scroll" :probe-type="probeType" class="scroll-content">
          <dynamic :data="dynamic"/>
        </scroll>
        <div class="scroll-content"></div>
      </horizontal-move>
  </div>
</template>

<script type='text/ecmascript'>
import axios from 'axios'
import Scroll from 'base/scroll/scroll'
import SearchBox from 'base/search-box/search-box'
import TitleBar from 'base/title-bar/title-bar'
import Dynamic from 'components/dynamic/dynamic'
import HorizontalMove from 'components/horizontal-transition/horizontal-move'

const maxTransformY = 40 // input输入框的高度
const initScrollHeight = 80
const ERR_OK = 0
const titleX = 66 + 30

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
      delta: 0,
      scrollY: 0,
      fixed: false,
      dynamic: []
    }
  },
  created () {
    this.getDynamic()
    this.screenWidth = window.screen.width
  },
  methods: {
    getDynamic () {
      axios.get('/api/dynamic').then(res => {
        const data = res.data
        if (data.errNo === ERR_OK) {
          this.dynamic = data.data
        }
      })
    },
    scroll (pos) {
      if (pos.y < 0) {
        this.delta = -1
      } else {
        this.delta = 1
      }
    },
    transform (delta) {
      if (delta < 0) {
        this.$refs.header.style.transform = `translate3d(0, -${maxTransformY}px, 0)`
        this.$refs.container.$el.style.top = `${maxTransformY}px`
        this.fixed = true
      } else {
        this.$refs.header.style.transform = `translate3d(0, 0, 0)`
        this.$refs.container.$el.style.top = `${initScrollHeight}px`
        this.fixed = false
      }
      this.$refs.scroll.refresh()
    },
    horizontalScroll (pos) {
      const initBarOffsetLeft = this.$refs.titleBar.getOffsetLeft(0)
      const movex = (Math.abs(pos.x) / this.screenWidth) * titleX
      const currentIndex = this.$refs.container.getCurrentPage()
      this.$refs.titleBar.setTitlePosition(movex + initBarOffsetLeft, true)
      this.$refs.titleBar.setCurrentIndex(currentIndex)
    },
    titlClick (index) {
      this.$refs.container.goToNext(index)
    }
  },
  watch: {
    delta (newVal) {
      let delta = 0
      if (newVal < 0) {
        delta = -1
      } else {
        delta = 1
      }
      this.transform(delta)
    }
  },
  components: {
    SearchBox,
    TitleBar,
    Scroll,
    Dynamic,
    HorizontalMove
  }
}
</script>

<style lang='stylus' ref='stylesheet/stylus' scoped>
  .home-header
    position fixed
    top 0
    bottom 0
    width 100%
    .header
      height 80px
      width 100%
      background-color #5bbc5b
      transition linear 0.2s
    /deep/ .title-item
      color: #85e291
      margin-left 66px
      font-size 15px
    /deep/ .title-item:first-child
      margin-left 0
    /deep/ .title-item-active
      color #FFFFFF
    .horizontao-move
      position absolute
      top 80px
      bottom 0
      width 100%
      .scroll-content
        width 100%
        overflow hidden
        background-color #EEEDED
        .test
          height 1000px
    .fixed
      background-color #FFFFFF
</style>
