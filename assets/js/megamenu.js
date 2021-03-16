//megamenu

//画面をロードまたはリサイズでwidthCheckを発火
var widthFlag = '';
$(window).on('load resize', function() {
        widthCheck();
    });

// widthCheck
function widthCheck() {
    // 画面幅取得
    var winWidth = $(window).width();

    // sp
    if(winWidth <= 767 && widthFlag != 'sp') {
    widthFlag = 'sp';//spのフラグをセット
    $('.megaMenuList').off();
        $('header').css('height' , '50px');
    $('.menuLink').removeClass('btnActive');//pcで開いていたメニューの＋ボタンを−ボタンに戻す
    $('.dropMenu').hide();//pcで開いていたメニューを一旦閉じる
    $('.megaMenuList').on('click',function(){
    $(this).find('.dropMenu').css('height' , '');
    $('.megaMenuList').not(this).find('.dropMenu').slideUp();
    $('.megaMenuList').not(this).find('.menuLink').removeClass('btnActive');
    $(this).find('.dropMenu').slideToggle();
    $(this).find('.menuLink').toggleClass('btnActive');
    $('header').css('height' , 'auto');
    });
    
    $('.categoryTtlSp').on('click',function(){
      return false;
    });

    // pc
    } else if(winWidth > 767 && widthFlag != 'pc') {
    widthFlag = 'pc';//pcのフラグをセット
    $('.megaMenuList').off();
    $('header').removeClass('on');//スマホで開いていたかもしれないハンバーガーメニューのボタンをoffにする
    $('.dropMenu').hide();//spで開いていたメニューを一旦閉じる
        $('header').css('height' , '');
    $('.megaMenuList').hover(function() {
    $(this).find('.dropMenu').css('height' , '');//stopによってキューに保存された高さをクリア
    $(this).find('.dropMenu').stop().slideDown();
  }, function() {
    $(this).find('.dropMenu').stop().slideUp();
  });
    }
}

//footer
$(window).on('load resize', function(){
  var winW = $(window).width();
  var devW = 768;
  if (winW <= devW) {
  $('.openBtn').off();
    $('.openBtn').on('click',function(){
    $('.openBtn').not(this).next('.footerMiddleCategory').slideUp();
    $('.openBtn').not(this).removeClass('btnActive');
    $(this).next('.footerMiddleCategory').slideToggle()
    $(this).toggleClass('btnActive');
});
  } else {
$('.openBtn').off();
$('.footerMiddleCategory').css('display' , '');
  }
});