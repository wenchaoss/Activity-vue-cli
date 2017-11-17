<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="routerview" :list="list" :isApp="isApp" keep-alive/>
    </transition>
    <div class="warn"></div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import Bus from './assets/js/eventBus'
  import {setShare} from './assets/js/wx_share'
  export default {
    data() {
      return {
        list: [Array],
        transitionName: 'slide-left',
        isApp: 0
      }
    },
    created() {
      var self = this;
      this.ls_hash();
      $.post('/topic/naqili',{flag:1,url:window.location.href.split('#')[0].replace(/http:\/\/|https:\/\//g,'')},function(res){
        self.list = res.dataList;
        self.isApp = res.isApp;
        window.shareDateIndex = res.shareData;
        window.shareDateSce = $.extend({deep:true},res.shareData)
        window.shareDateSce.shareContent = res.shareContent;
        window.shareDateSce.shareTitle = res.shareTitle;
        window.shareDateSce.shareUrl = "http://dev.m.soyoung.com/topic/naqili?#/share?id="+self.$route.query.id;
        if(self.$route.path == '/'){
          setShare(window.shareDateIndex)
        }else{
          setShare(window.shareDateSce)
        }
        $(window).scroll(function () {
          // 吸顶显示和隐藏
          if ($(".list ul").length == 0) {
            return;
          }
          if ($(window).scrollTop() > $(".list").offset().top) {
            $(".fixtab").css({
              "display": "block"
            });
          } else if ($(window).scrollTop() < $(".list").offset().top) {
            $(".fixtab").css({
              "display": "none"
            });
          }
          if ($(window).scrollTop() > $(".item").eq(0).offset().top && $(window).scrollTop() < $(".item").eq(10)
            .offset().top - 50) {
            $(".fixtab img").css({
              "display": "none"
            });
            $(".fixtab .imgfix1").css({
              "display": "block"
            });
          } else if ($(window).scrollTop() > ($(".item").eq(10).offset().top - 50) && $(window).scrollTop() < $(
              ".item").eq(20).offset().top - 50) {
            $(".fixtab img").css({
              "display": "none"
            });
            $(".fixtab .imgfix2").css({
              "display": "block"
            });
          } else if ($(window).scrollTop() > ($(".item").eq(20).offset().top - 50)) {
            $(".fixtab img").css({
              "display": "none"
            });
            $(".fixtab .imgfix3").css({
              "display": "block"
            });
          }
      })
      },'json')
      Bus.$on('changeDetail', function (item) {
        self.detail = item;
      })
    },
    methods:{
      ls_hash: function() {
        if(!localStorage.getItem("ls")){
          // 六位
          var data_str = (+new Date()+'');
          var mindata_str = data_str.substr(data_str.length-7)
          localStorage.setItem("ls",parseInt(Math.random()*100000)+mindata_str)
        }
      }
    },
    watch: {
      '$route' (to, from) {
        if (to.path == '/') {
          this.transitionName = 'slide-right';
          setShare(window.shareDateIndex)
        } else {
          this.transitionName = 'slide-left';
          window.shareDateSce.shareUrl = "http://dev.m.soyoung.com/topic/naqili?#/share?id="+this.$route.query.id;
          setShare(window.shareDateSce)
        }
      }
    }

  }

</script>

<style lang="less" rel="stylesheet/less">
  @import './assets/css/reset.less';
  .container {
    width: 100%;
  }

  .wrap {
    position: relative;
    width: 100%;
    height: auto;
    border: none;
  }

  .wrap img {
    position: relative;
    width: 100%;
    display: block;
  }

  .warn {
    display: none;
    position: fixed;
    left: 25%;
    top: 30%;
    width: 40%;
    padding: 5%;
    z-index: 3001;
    background: rgba(0, 0, 0, .8);
    text-align: center;
    border-radius: 14px;
    font-size: 16px;
    line-height: 22px;
    color: #fff;
    opacity: 1;
  }

  .text_over {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .list {
    width: 100%; // height: 50rem;
    height: auto;
    overflow: hidden;
    background: url("./assets/img/bg.jpg") repeat-y;
    background-size: 7.5rem auto;
    text-align: center;
  }

  .list .item {
    position: relative;
    float: left;
    margin-left: .23rem;
    margin-bottom: .62rem;
    box-sizing: border-box;
    width: 3.4rem;
    height: auto;
    padding-bottom: .4rem;
    border: .07rem solid transparent;
    border-image: -webkit-linear-gradient( #a3d1e8, #6086e4) 7 7;
    border-image: -moz-linear-gradient( #a3d1e8, #6086e4) 7 7;
    border-image: linear-gradient( #a3d1e8, #6086e4) 7 7;
    background: #fff;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .img {
      position: relative;
      width: 100%;
      height: 3.26rem;
      overflow: hidden;
      .first {
        width: 0.54rem;
        height: 0.34rem;
        position: absolute;
        top: 0.2rem;
        left: 0.2rem;
      }
      .bianhao {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0.46rem;
        background-color: rgba(255, 255, 255, .8);
        font-size: .34rem;
        line-height: .46rem;
        color: #1370b6;
      }
    }
    .name {
      color: green;
      font-size: .36rem;
      font-weight: bold;
      margin: .1rem 0;
      background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#e474e1), to(#8e63c8));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .title {
      margin: 0 auto;
      width: 2.45rem;
      height: 0.4rem;
      line-height: .3rem;
      color: #1370b6;
      font-size: .25rem;
      border-bottom: 1px dashed #1370b6;
    }
    .title_main {
      width: 100%;
      height: 0.4rem;
      line-height: .4rem;
      font-size: .21rem;
      color: #4e4e4e;
    }
    .ico {
      position: relative;
      width: 100%;
      height: 0.46rem;
      margin-top: .1rem;
      span {
        position: absolute;
        top: 0;
        width: 1.27rem;
        height: 0.46rem;
        color: #1370b6;
        font-size: .21rem;
      }
      span.left {
        left: 0.25rem;
      }
      span.right {
        right: 0.25rem;
      }
    }
    .toupiao {
      position: absolute;
      width: 2.45rem;
      height: 0.78rem;
      bottom: -.39rem;
      left: 50%;
      margin-left: -1.225rem;
    }
  }

  .nomargin {
    margin: 0!important;
  }

  .fixtab {
    width: 100%;
    height: 1rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .routerview {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
  }

  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  }

</style>
