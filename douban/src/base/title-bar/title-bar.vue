<!--  -->
<template>
  <div class="move-bar" :class="{'fixed': fixed}">
    <div ref="titleItem" class="title-item" :class="{'title-item-active': index === currentIndex}" v-for="(item, index) in title" :key="item.id" @click="itemClick(index)">
      {{item.name}}
    </div>
    <div class="title-line" ref="titleLine"></div>
  </div>
</template>

<script type='text/ecmascript'>
export default {
  props: {
    title: {
      type: Array,
      default: null
    },
    titleItem: {
      type: String,
      default: ''
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  mounted () {
    this.titleLine = this.$refs.titleLine
    this._initTitleLine()
  },
  methods: {
    // 初始化titleLine位置
    _initTitleLine () {
      const offsetLeft = this.getOffsetLeft(0) // 因为相对父级定位，所以只要拿到相对父级元素的位置
      this.setTitlePosition(offsetLeft)
    },
    // title点击响应
    itemClick (index) {
      const offsetLeft = this.getOffsetLeft(index)
      this.setCurrentIndex(index)
      this.setTitlePosition(offsetLeft, true)
      this.$emit('click', index)
    },
    // 设置titleLine位置
    setTitlePosition (left, transition) {
      if (!this.titleLine) {
        return
      }
      if (!transition) {
        this.titleLine.style.transform = `translate(${left}px, 10px)`
        this.titleLine.style.transition = 'none'
      } else {
        this.titleLine.style.transform = `translate(${left}px, 10px)`
        this.titleLine.style.transition = 'ease 0.2s'
      }
    },
    // 设置active样式
    setCurrentIndex (index) {
      this.currentIndex = index
    },
    // 获取offsetLeft
    getOffsetLeft (index) {
      return this.$refs.titleItem && this.$refs.titleItem[index].offsetLeft
    }
  }
}
</script>

<style lang='stylus' ref='stylesheet/stylus' scoped>
  .move-bar
    position relative
    display flex
    height 40px
    border-bottom 1px solid #bdd5bb
    box-sizing border-box
    justify-content center
    align-items center
    .title-line
      position absolute
      top 50%
      left 0
      transform translate(0, 10px)
      width 30px
      height 2px
      background-color #FFFFFF
  .fixed
    .title-item
      color #666
    .title-item-active
      color #5bbc5b
    .title-line
      background-color #5bbc5b
</style>
