<!--  -->
<template>
  <div class="home-header">
    <search-box :placeholder="placeholder"></search-box>
  </div>
</template>

<script type='text/ecmascript'>
import SearchBox from 'components/search-box/search-box'

export default {
  data () {
    return {
      placeholder: '理发恩怨'
    }
  },
  components: {
    SearchBox
  }
}
</script>

<style lang='stylus' ref='stylesheet/stylus' scoped>
  .home-header
    background-color #5bbc5b
</style>
