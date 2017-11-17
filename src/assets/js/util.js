import $ from 'jquery'
export function voteLimit() {
    let data_hash = new Date().getMonth()+ '' + new Date().getDate()
    if(!localStorage.getItem(data_hash)){
        localStorage.setItem(data_hash,1);
        return true;
    }
    let _num = localStorage.getItem(data_hash);
    if(_num >4){
        $(".warn").fadeIn(100).text("您今天的票数已用完，明天再来吧").fadeOut(2000);
        return false;
    }else{
        _num++;
        localStorage.setItem(data_hash,_num);
        return true;
    }
};
// export function lazyLoad() {
//     var lazyloadimg = {
//         imgloading: function() {
//             var _lazyImg = document.getElementsByClassName('lazy'),
//                 _defauleImg = 'http://mstatic.soyoung.com/m/static/img/img-replace2.png',
//                 _imgoffsettop = 0,
//                 _this = this;
//             for (var i = 0; i < _lazyImg.length; i++) {
//                 var _self = _lazyImg[i];
//                 _imgoffsettop = _this.offsettopbody(_self);
//                 if (_imgoffsettop < window.scrollY + window.innerHeight) {
//                     var _src = _self.getAttribute('src');
//                     var _asrc = _self.getAttribute('asrc');
//                     _self.onerror = function() {
//                         _self.setAttribute('src', _defauleImg);
//                         _self.classList.add('lazy-loaded');
//                     };
//                     _self.onload = function () {
//                         _this.imgloading();
//                     }
//                     if ( _src !== _asrc && !_self.classList.contains('lazy-loaded') ) {
//                         _self.setAttribute('src', _asrc);
//                         _self.classList.add('lazy-loaded');
//                     }
//                 }
//             }
//         },
//         offsettopbody: function(obj) { //计算offsetTop
//             var offsettop = 0;
//             do {
//                 if (obj.offsetParent === null) {
//                     return;
//                 } else {
//                     obj = obj.offsetParent;
//                     offsettop += obj.offsetTop;
//                 }
//             } while (obj.tagName !== 'BODY');
//             return offsettop;
//         },
//         init: function() {
//             var _this = this;
//             _this.imgloading(); 
//             // 切换tab时，触发懒加载
//             window.triggerLazyLoad = function(){
//                 _this.imgloading();
//             }
//             window.onscroll = function() {
//                 _this.imgloading();
//             };
//         }
//     };
//     lazyloadimg.init();
// }
  