import $ from 'jquery'
export function setShare(shareDate) {
    window.remoteVars = shareDate;
    $("#shareTitle").html(shareDate.shareTitle);
    $("#shareImgurl").html(shareDate.shareImgUrl);
    $("#shareUrl").html(shareDate.shareUrl);
    $("#shareContent").html(shareDate.shareContent);
    $("#shareTimelineContent").html(shareDate.shareTitle);
    //APP分享
    var status = $('#right_btn_status').html() || '',
        shareTimelineContent = $('#shareTimelineContent').html() || '',
        shareContent = $('#shareContent').html() || '',
        shareImgurl = $('#shareImgurl').html() || '',
        shareTitle = $('#shareTitle').html() || '',
        shareUrl = $('#shareUrl').html() || '';
    function share(){
        var shareConfig = {
            "shareContent": shareContent,
            "shareImgurl": shareImgurl,
            "shareTitle": shareTitle,
            "shareUrl": shareUrl,
            "rightBtnStatus":status
        };
        var sharCfg = JSON.stringify(shareConfig);
        try{
            window['SyBridge_For_Android']['share'](sharCfg);
        }catch(e){
            // alert('调用方法错误: ' + e);
        }
    };
    share();
    //微信分享
    // alert(remoteVars.shareUrl)
    wx.config({
        debug: false,  //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: shareDate.appId,  //必填，公众号的唯一标识
        timestamp: shareDate.timestamp,  //必填，生成签名的时间戳
        nonceStr: shareDate.nonceStr,  //必填，生成签名的随机串
        signature: shareDate.signature, //必填，签名，见附录1
        jsApiList: ['checkJsApi','onMenuShareAppMessage','onMenuShareTimeline']  //必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function(){
        wx.onMenuShareAppMessage({
            title: shareDate.shareTitle,  //分享标题
            desc: shareDate.shareContent,  //分享描述
            link: shareDate.shareUrl,  //分享链接
            imgUrl: shareDate.shareImgUrl,  //分享图标
            type: 'link',  //分享类型,music、video或link，不填默认为link
            success: function () {
            },
            cancel: function () {
            }
        });
        wx.onMenuShareTimeline({
            title: shareDate.shareTitle,  //分享标题
            desc: shareDate.shareContent,  //分享描述
            link: shareDate.shareUrl,  //分享链接
            imgUrl: shareDate.shareImgUrl,  //分享图标
            success: function () {
            },
            cancel: function () {
            }
        });
        wx.error(function(res){
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            // alert("errorMSG:"+res);
        });
    });
};
  