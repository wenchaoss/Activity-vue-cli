<template>
  <div class="item_main_wrap">
    <div class="share_item_main">
      <div class="img">
        <img :src="detail.user_img" alt="">
        <p class="bianhao">编号：{{detail.p_num}}</p>
        <div v-if="detail.term == 1" class="first">
          <img src="../assets/img/first.png" alt="">
        </div>
      </div>
      <p class="name">{{detail.user_name}}</p>
      <p class="title">拉票宣言</p>
      <p class="title_main ">{{detail.declaration}}</p>
      <p @click="gohos(detail.hos_info)" class="title ">推荐医院</p>
      <p @click="gohos(detail.hos_info)" class="title_main ">{{detail.hos_name}}</p>
      <div class="ico">
        <span class="left">
          <img src="../assets/img/nown.png" alt="">
        </span>
        <span class="right">
          <img src="../assets/img/now2n.png" alt="">
        </span>
      </div>
      <div class="ico nomargin">
        <span class="left"> {{detail.poll}}</span>
        <span class="right">{{paiming.indexOf(detail.poll)+1}}</span>
      </div>
      <div class="toupiao" @click="toupiao_share(detail.act_id)">
        <img src="../assets/img/btn2.png" alt="">
      </div>
      <router-link to="/" class="goback">
        <img src="../assets/img/goback.png" alt="">
      </router-link>
      <div class="share" @click="goshare">
        <img src="../assets/img/sharebtn.png" alt="">
      </div>
      <div class="ico_flower">
        <img src="../assets/img/icon_3.png" alt="">
      </div>
      <div class="fake" style="display:none;">{{list[0].act_id}}</div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import Bus from '../assets/js/eventBus'
  import {setShare} from '../assets/js/wx_share'
  import {
    voteLimit
  } from '../assets/js/util';
  export default {
    data() {
      return {
        id: null,
        detail: {}
      }
    },
    props: ['list','isApp'],
    computed: {
      sortList: function(){
        function compare(property){
            return function(a,b){
                var value1 = a[property];
                var value2 = b[property];
                return value2 - value1;
            }
        }
        function compare2(property){
            return function(a,b){
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            }
        }
        return this.list.sort(compare2('p_num')).sort(compare('poll'))
      },
      paiming: function() {
          let _arr = [];
          this.list.forEach(function(v,i) {
            return  _arr.push(v.poll)
          })
          return _arr
      }
    },
    created() {
      var self = this;
      this.id = this.$route.query.id;
      $(window).scrollTop(0);
      if (this.list.length > 0) {
        this.sortList.forEach(function (v, i) {
          if (v.p_num == self.id) {
            self.detail = v;
            self.detail['term'] = i + 1;
            return;
          }
        })
      }
    },
    updated: function () {
      let self = this;
      this.sortList.forEach(function (v, i) {
        if (v.p_num == self.id) {
          self.detail = v;
          self.detail['term'] = i + 1;
          return;
        }
      })
     
    },
    methods: {
      toupiao_share: function (act_id) {
        if (!voteLimit()) {
          return;
        }
        let self = this;
        $.post('/topic/addNqlPoll',{act_id:act_id,ls:localStorage.getItem("ls")},function(res){
            $(".warn").fadeIn(100).text(res.errorMsg).fadeOut(2000);
            if(res.errorCode == 0){
                self.list.forEach(function(v,i){
                    if(v.act_id == act_id){
                        v.poll++;
                        return;
                    }
                })
            }
        },'json')
        // this.sortList.forEach(v => {
        //   if (v.p_num == self.id) {
        //     v.piao++;
        //     return;
        //   }
        // });
        // this.sortList.forEach(function (v, i) {
        //   if (v.p_num == self.id) {
        //     self.detail = v;
        //     self.detail['term'] = i + 1;
        //     return;
        //   }
        // })
      },
      goshare: function () {
        $(".warn").fadeIn(100).text("点击右上角，分享为我投票吧！").fadeOut(2000);
      },
      gohos: function(info) {
          if(info.indexOf('http')>-1){
              window.location.href = info;
              return;
          }
          if(this.isApp == 0){
              window.location.href = 'http://m.soyoung.com/hospital/info?hospital_id=' + info;
              return;
          }else{
              window.location.href = 'app.soyoung://person?uid=1744989&certified_type=2&certified_id=' + info;
              return;
          }
      },
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  .item_main_wrap {
    width: 100%;
    height: auto;
    padding-bottom: 1rem;
    overflow: hidden;
    background: url("../assets/img/bg.jpg") repeat-y;
    background-size: 7.5rem auto;
    text-align: center;
  }

  .share_item_main {
    position: relative;
    box-sizing: border-box;
    margin: .55rem auto;
    width: 6.5rem;
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
      height: 6.36rem;
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
        height: 0.85rem;
        background-color: rgba(255, 255, 255, .8);
        font-size: .6rem;
        line-height: .85rem;
        color: #1370b6;
      }
    }
    .name {
      color: green;
      font-size: .6rem;
      font-weight: bold;
      line-height: 1.3;
      margin: .2rem 0;
      background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#e474e1), to(#8e63c8));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .title {
      margin: 0 auto;
      width: 2.45*2rem;
      height: 0.4*2rem;
      line-height: .4*2rem;
      color: #1370b6;
      font-size: .25*2rem;
      border-bottom: 1px dashed #1370b6;
    }
    .title_main {
      width: 100%;
      height: auto;
      line-height: 1.5;
      font-size: .4rem;
      color: #4e4e4e;
    }
    .ico {
      position: relative;
      width: 100%;
      height: 0.46*2rem;
      margin-top: .1*2rem;
      span {
        position: absolute;
        top: 0;
        width: 1.27*2rem;
        height: 0.46*2rem;
        color: #1370b6;
        font-size: .21*2rem;
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
      width: 2.45*2rem;
      height: 0.78*2rem;
      bottom: -.78rem;
      left: 50%;
      margin-left: -2.45rem;
    }
  }

  .goback {
    position: absolute;
    top: -0.3rem;
    left: -0.3rem;
    width: 2.55*1.1rem;
    height: 0.79*1.1rem;
  }

  .share {
    position: absolute;
    top: 0.28rem;
    right: 0.28rem;
    width: 0.8rem;
    height: 0.8rem;
  }

  .ico_flower {
    position: absolute;
    bottom: -.6rem;
    left: -0.58rem;
    width: 1.14rem;
    height: 1.59rem;
  }

</style>
