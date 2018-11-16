<!--  -->
<template>
  <ul>
    <li class="dynamic-item" :class="{'no-margin-top': index === 0}" :key="item.id" v-for="(item, index) in data">
      <div class="header">
        <div class="img-wrapper">
          <img :src="item.titleImgUrl" />
        </div>
        <div class="descprition">
          <p class="user">{{item.name}}</p>
          <p class="type">{{item.description}}</p>
        </div>
        <div class="time">
          <span class="update-time">{{item.updateTime}}</span>
          <i class="icon-more"></i>
        </div>
      </div>
      <div class="content" v-if="item.type === 'list'">
        <p class="">{{item.contentDesc}}</p>
        <p :key="index" class="top-list" v-for="(val, index) in item.clickList">
          Top{{index + 1}} 《<span class="item-search">{{val}}<i class="icon-search"></i></span>》
        </p>
      </div>
      <div class="content" asdas v-else>
        <p class="pre" v-html="item.contentDesc"></p>
      </div>
      <div class="list-introduction" v-if="isNull(item.content)">
        <div class="introduction">
          <div class="list-wrapper">
            <img :src="item.content.imgUrl" alt="">
          </div>
          <div class="list-text">
            <p class="list-title">{{item.content.title}}</p>
            <p class="list-sub-title">{{item.content.descp}}</p>
          </div>
        </div>
      </div>
      <ul class="commit-list">
        <li class="commit-item" :key="index" v-for="(val, index) in item.commitList">
          <span>{{getUserName(val)}}:</span>
          <span class="commit-content">{{val.content}}</span>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script type='text/ecmascript'>
import {objectIsNull} from 'common/js/utils'

export default {
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  methods: {
    isNull (val) {
      return !objectIsNull(val)
    },
    getUserName (item) {
      return item.type === 'public' ? item.name : '***'
    }
  }
}
</script>

<style lang='stylus' ref='stylesheet/stylus' scoped>
  .dynamic-item
    padding 10px
    background-color #ffffff
    margin-top 10px
    .header
      display flex
      align-items center
      height 40px
      .img-wrapper
        width 40px
        height 40px
        border-radius 50%
        overflow hidden
        img
          width 100%
          height 100%
      .descprition
        flex 1
        margin-left 10px
        .user
          color #555
          font-size 13px
          margin-bottom 6px
        .type
          color #999
          font-size 10px
      .time
        display flex
        width 80px
        height 100%
        align-items flex-end
        justify-content space-between
        .update-time
          color #999
          font-size 10px
        .icon-more
          color #999
  .no-margin-top
    margin-top 0
  .content
    margin-top 10px
    color #333
    padding-right 15px
    line-height 20px
    font-size 0
    .top-list
      font-size 15px
      .item-search
        position relative
        color #3FAB50
        padding-right 12px
        .icon-search
          position absolute
          top -4px
          right 0
          font-size 8px
    .pre
      white-space pre-wrap
      font-size 15px
  .list-introduction
    padding-right 10px
    height 60px
    margin-top 10px
    .introduction
      display flex
      width 100%
      height 100%
      border-radius 5px
      background-color #F8F7F7
      align-items center
      .list-wrapper
        width 46px
        height 46px
        border-radius 3px
        margin-left 10px
        overflow hidden
        // flex-shrink 0 // 同级元素overflow hidden width 0 都不会影响此布局
        img
          width 100%
          height 100%
      .list-text
        flex 1
        height 46px
        padding-top 4px
        margin-left 10px
        margin-right 10px
        overflow hidden // width 0 同样可使子元素超出隐藏生效
        p
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
        .list-title
          font-size 14px
          margin-bottom 8px
        .list-sub-title
          font-size 10px
          color #828282
  .commit-list
      border-left 1px solid #cccccc
      padding-left 10px
      margin-top 16px
      .commit-item
        font-size 0
        span
          font-size 12px
          display inline-block
          height 16px
          line-height 16px
        .commit-content
          color #999
</style>
