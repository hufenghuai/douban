<!--  -->
<template>
  <div class="search-box">
    <div class="input-wrapper">
      <input class="input" type="text" :placeholder="placeholder">
      <div class="font-icon">
        <i class="icon-search icon-styl"></i>
      </div>
      <div class="right-icon">
        <i class="icon-scan icon-styl"></i>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript'>
export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang='stylus' ref='stylesheet/stylus' scoped>
  .search-box
    display flex
    justify-content center
    align-items center
    width 100%
    height 40px
    .input-wrapper
      position relative
      width 90%
      height 34px
      .input
        width 100%
        height 34px
        border 1px solid #bed4bd
        box-sizing border-box
        background-color #FFFFFF
        border-radius 17px
        padding-left 34px
        padding-right 34px
        outline none
        box-shadow 1px #67a76b
      .input::-webkit-input-placeholder
        color #a9a9a9
        font-size 14px
      .input::-moz-placeholder
        color #a9a9a9
        font-size 14px
      .input:-ms-input-placeholder
        color #a9a9a9
        font-size 14px
      .font-icon
        position absolute
        display flex
        justify-content center
        align-items center
        left 0
        top 0
        width 34px
        height 34px
        font-size 10px
      .right-icon
        position absolute
        display flex
        justify-content center
        align-items center
        right 0
        top 0
        width 34px
        height 34px
      .icon-styl
        color #a8a8a8
        font-size 22px
</style>
