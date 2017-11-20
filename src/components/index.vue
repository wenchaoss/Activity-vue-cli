<template>
  <div class="container">
        <div class="fixtab wrap">
            <img class="imgfix1" src="../assets/img/t1n.png"/>
            <img class="imgfix2" src="../assets/img/t2n.png"/>
            <img class="imgfix3" src="../assets/img/t3n.png"/>
            <a href="javaScript:void(0)" @click="gohash" class="c1"></a>
            <a href="javaScript:void(0)" @click="gohash" class="c2"></a>
            <a href="javaScript:void(0)" @click="gohash" class="c3"></a>
        </div>
        <div class="wrap"><img src="../assets/img/bg1_01n.jpg" alt=""></div>
        <div class="wrap"><img src="../assets/img/bg1_02n.jpg" alt=""></div>
        <div class="wrap"><img src="../assets/img/bg1_03.jpg" alt="">
            <a href="javaScript:void(0)" @click="gohash" class="c1"></a>
            <a href="javaScript:void(0)" @click="gohash" class="c2"></a>
            <a href="javaScript:void(0)" @click="gohash" class="c3"></a>
        </div>
        <div class="list" style="display:none;">
            <ul>
              <li v-for="(v,k) in sortList" :key="v.id" class="item">
                    <div @click="godetail(v,$event)" >
                    <div class="img">
                        <img :src="v.user_img" alt="">
                        <p class="bianhao">编号：{{v.p_num}}</p>
                        <div v-if="k == 0" class="first"><img src="../assets/img/first.png" alt=""></div>
                    </div>
                    <p class="name">{{v.user_name}}</p>
                    <p class="title">拉票宣言</p>
                    <p class="title_main text_over">{{v.declaration}}</p>
                    <p @click="gohos(v.hos_info)" class="title gohos_tar">推荐医院</p>
                    <p @click="gohos(v.hos_info)" class="title_main text_over gohos_tar">{{v.hos_name}}</p>
                    <div class="ico">
                        <span class="left"><img src="../assets/img/nown.png" alt=""></span>
                        <span class="right"><img src="../assets/img/now2n.png" alt=""></span>
                    </div>
                    <div class="ico nomargin">
                        <span class="left"> {{v.poll}}</span>
                        <span class="right">{{paiming.indexOf(v.poll)+1}}</span>
                    </div>
                    </div>
                    <div v-if="k%4==0" class="left_ico"><img src="../assets/img/icon_3.png" alt=""></div>
                    <div v-if="k%4==3" class="right_ico"><img src="../assets/img/icon_2.png" alt=""></div>
                    <div class="toupiao" @click="toupiao(v)"><img src="../assets/img/btn2.png" alt=""></div>
                </li>  
            </ul>
        </div>
        <div class="wrap"><img src="../assets/img/bg_05.jpg" alt=""></div>
    </div>
</template>

<script>
import $ from 'jquery'
import Bus from '../assets/js/eventBus'
import {voteLimit} from '../assets/js/util';
// import {lazyLoad} from './assets/js/util'
import {setShare} from '../assets/js/wx_share'
export default {
  data () {
    return {
        height:0
    }
  },
  props:['list','isApp'],
  created() { 

  },
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
  methods: {
      gohash: function(e){
          let id =  $(e.target).attr("class").slice(1);
          if(id == 1){  
              $(window).scrollTop($(".item").eq(0).offset().top-60)
          }else if(id ==2){
              $(window).scrollTop($(".item").eq(10).offset().top-48)
          }else if(id ==3){
              $(window).scrollTop($(".item").eq(20).offset().top-48)
          }
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
      toupiao: function(item) {
        if(!voteLimit()){
          return;
        }
        let self = this;
        $.post('/topic/addNqlPoll',{act_id:item.act_id,ls:localStorage.getItem("ls")},function(res){
            $(".warn").fadeIn(100).text(res.errorMsg).fadeOut(2000);
            if(res.errorCode == 0){
                self.list.forEach(function(v,i){
                    if(v.act_id == item.act_id){
                        v.poll++;
                        return;
                    }
                })
            }
        },'json')
        //   $(".warn").fadeIn(100).text("投票成功~").fadeOut(2000);
        //   item.piao++;
      },
      godetail: function(item,$event) {
          if($($event.target).hasClass("gohos_tar")){
              return;
          }
          let h = $(window).scrollTop()
          window.sheight = h;
          this.$router.push({path:'/share',query:{"id":item.p_num}})
      }
  },
  mounted: function() {
    $(window).scrollTop(window.sheight);
    // lazyLoad()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  .fixtab.wrap{
    display: none;
    img{
      position: absolute;
      top: 0;
      left: 0;
      display: none;
    }
    .imgfix1{
      display: block;
    }
    .c1,.c2,.c3{
        position: absolute;
        top: 0;
        left: 0;
        width: 33.333333%;
        height: 80%;
    }
    .c2{
        left: 33.333333%;
    }
    .c3{
        left: 66.666666%;
    }
  }
  .wrap{
      .c1,.c2,.c3{
          position: absolute;
          top: 0;
          left: 0;
          width: 33.333333%;
          height: 100%;
      }
      .c2{
          left: 33.333333%;
      }
      .c3{
         left: 66.666666%;
      }
  }
  .left_ico{
    position: absolute;
    bottom: -0.3rem;
    left: -0.3rem;
    width: .57rem;
    height: .87rem;
  }
  .right_ico{
    position: absolute;
    bottom: -0.3rem;
    right: -0.3rem;
    width: .63rem;
    height: .87rem;
  }
</style>
