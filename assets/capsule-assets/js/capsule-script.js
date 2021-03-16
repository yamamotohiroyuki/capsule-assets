
/* ========================================================
  Basic Script
======================================================== */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Current Setting
  ※ クラス名や付加する場所を変えた時はscssも編集してください
  ※ いらないものはコメントアウトで動作が軽くなるかも
++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/*
'use srtict';
$(function () {
  var currentClass = 'is-current';
  var parentsClass = 'is-parent';
  var scrollSpeed = 500;
  // ブラウザ判定
  $.capsule.browserClass({
    put: 'body', // どこにclassをつけるか
    prefix:'is-browser-' // classにprefixする文字
  });
  // ロード判定
  $.capsule.loaded({
    put: 'body', // どこにclassをつけるか
    addClass: 'is-loaded', // どんなclassをつけるか
    timeout: 250, // ロード処理を強制的に中止する時間
    delay: 3000 // ロードが終わってからどれくらい待つか
  });
  // ブレイクポイント判定
  $.capsule.brakepoint({
    put: 'body', // どこにclassをつけるか
    brakepoint: 768, // ブレイクポイント
    brakepointCriteria: 'min', // 'min' か 'max' かブレイクポイント基準
    addClass: 'is-mobile', // 'brakepoint' 以下になると'put'にaddClass
  });
  // カレントリンク
  $.capsule.selflink({
    area: 'body', // どの範囲で有効にするか
    addClass: currentClass, // どんなclassをつけるか
    parentsClass: parentsClass, // 親リンクの時はどんなclassをつけるか
    hashIgnore: true // URLのハッシュタグを無視する trueの時 urlが/xxx.html#xxx でも /xxx.html には'addClass'がつく
  });
  // 同カテゴリ判定
  // 'selector' の ついたタグに<body>と同じ class あれば 'addClass' がつく
  $.capsule.category({
    selector: '.js-same-category', // ターゲットのクラス
    addClass: 'is-same-category' // どんなclassをつけるか
  });
  // ハンバーガーメニュー
  $.capsule.hamburgerTrigger({
    selector: '.js-navigation-trigger', // トリガーとなるクラス
    addClass: 'is-navigation-open', // 'put' にどんなclassをつけるか
    put: 'body', // どこに 'addClass' をつけるか
    wrapperSelector: '.global-main, .global-footer', // wrapper は何を包むか
    wrapperClass: 'fix-wrapper' // wrapper にどんなclassをつけるか
  });
  // スクロールオブジェクト
  $.capsule.scrollObject({
    generationClass: '.js-scroll-object', // オブジェクトを包むclass名
    textSet: {
      '.js-scroll-table': {
        ja: 'この表は左右にスクロールできます',
        en: 'This table can scroll to the left or right.'
      },
      '.js-scroll-graph': {
        ja: 'このグラフは左右にスクロールできます',
        en: 'This graph can scroll to the left or right.'
      },
      '.js-scroll-area': {
        ja: 'このエリアは左右にスクロールできます',
        en: 'This area can scroll to the left or right.'
      }
    }
  });
  // ロードスクローラー
  // ハッシュが着いたリンクで飛んできた時にスクロールアニメーション
  $.capsule.loadScroller({
    speed: scrollSpeed, // スクロールスピード
    timeout: 100, // ロード時の処理を待ちの時間差
  });
  // クリックスクローラー
  // ページ内リンクのスクロールアニメーション
  $.capsule.pageScroller({
    selector: '.js-scroller', // トリガーとなるクラス
    speed: scrollSpeed // スクロールスピード
  });
  // ボトムスクロール判定
  // 下へスクロールするときにaddClass
  $.capsule.bottomScroll({
    put: 'body', // どこに 'addClass' をつけるか
    addClass: 'is-bottom-scroll', // どこに 'addClass' をつけるか
    firstDelay: 200 // 0 ~ 'firstDelay'(px) までは処理を行わない
  });
  $.capsule.pageToTop({
    id: 'pagetop',
    selector: 'js-scroller',
    text: 'Page Top'
  });
  // スクロール出現判定
  // スクロールして 'selector' が出現するときにaddClass
  $.capsule.scrollShow({
    selector: '.js-scroll-show', // ターゲットのクラス
    addClass: 'is-show', // どんなclassをつけるか
    again: true, // 上の方へスクロールして再び隠れたら 'addClass' を外すかどうか
    bottomRatio: 5 // window ÷ 'bottomRatio' で発火する
  });

  $.capsule.scrollChangeArea({
    position: 200, //ウインドウ上部からどれぐらいの位置で変化させるか
    areaSelector: '.js-scroll-change',
    navSelector: '.js-scroll-change-nav',
    addClass: currentClass
  });

  

  //popup($.capsule.getlang());

});

*/

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  capsule function
++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
(function($) {
  $.capsule = {
    //言語取得
    getlang: function () {
      return $('html').attr('lang') || 'ja';
    },
    //スマホ判定
    isSP: function () {
      var ua = navigator.userAgent;
      return ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0;
    },
    //ブラウザ判定
    isBrowser: function(){
      var userAgent = window.navigator.userAgent.toLowerCase();
      if(userAgent.indexOf('msie') != -1 || userAgent.indexOf('trident') != -1) {
        return 'ie';
      } else if (userAgent.indexOf('edge') != -1) {
        return 'edge';
      } else if(userAgent.indexOf('chrome') != -1) {
        return 'chrome';
      } else if(userAgent.indexOf('safari') != -1) {
        return 'safari';
      } else if(userAgent.indexOf('firefox') != -1) {
        return 'firefox';
      } else if(userAgent.indexOf('opera') != -1) {
        return 'opera';
      } else {
        return 'other';
      }
    },
    // URIを解析したオブジェクトを返すfunction
    uri: function(path){
      var self = this;
      this.originalPath = path;
      //絶対パスを取得
      this.absolutePath = (function(){
        var e = document.createElement('a');
        e.href = path;
        return e.href;
      })();
      //絶対パスを分解
      var fields = {'schema' : 2, 'username' : 5, 'password' : 6, 'host' : 7, 'path' : 9, 'query' : 10, 'fragment' : 11};
      var r = /^((\w+):)?(\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/.exec(this.absolutePath);
      for (var field in fields) {
        this[field] = r[fields[field]];
      }
      this.querys = {};
      if(this.query){
        $.each(self.query.split('&'), function(){
          var a = this.split('=');
          if (a.length == 2) self.querys[a[0]] = a[1];
        });
      }
    },
    //ブラウザ判定class付与
    browserClass: function(options) {
      var c = $.extend({
        put: 'body',
        prefix:'is-browser-'
      }, options);
      var browser = $.capsule.isBrowser();
      $(c.put).addClass(c.prefix + browser);
    },
    isBrakepoint: function (size, number) {
      if(window.matchMedia('(' + size + '-width:' + number + 'px)').matches){
        return true;
      }
    },
    brakepoint: function (options) {
      var c = $.extend({
        put: 'body',
        brakepoint: 768,
        brakepointCriteria: 'min',
        addClass: 'is-mobile'
      }, options);

      brakepointDecision();
      $(window).on('resize', function () {
        brakepointDecision();
      });
      function brakepointDecision() {
        if($.capsule.isBrakepoint(c.brakepointCriteria, c.brakepoint)){
          $(c.put).removeClass(c.addClass);
        } else {
          $(c.put).addClass(c.addClass);
        }
      }
    },
    //ユニークな配列を取得
    uniqueArray: function(array) {
      var storage = new Object;
      var uniqueArray = new Array();
      var i, value;
      for (var i=0;i<array.length;i++) {
        value = array[i];
        if (!(value in storage)) {
          storage[value] = true;
          uniqueArray.push(value);
        }
      }
      return uniqueArray;
    },
    //ロード終了
    loaded: function(options) {
      var c = $.extend({
        put: 'body',
        loadingClass:'is-loading',
        addClass:'is-loaded',
        timeout: 250,
        delay: 1000
      }, options);
      
      var progress = 0;
      var imgCount = $('img').length;
      $("img").each(function(){
        var src = $(this).attr('src');
        $("<img>").attr('src',src).on('load',function(){
          progress++;
        });
      });
      setInterval(function(){
        $("#progress-bar").css({
          'width': (progress / imgCount) * 100 + '%'
        });
      }, 1);
      $(c.put).addClass(c.loadingClass);
      $(window).on('load', function () {
        setTimeout(function(){
          $(c.put).delay(c.delay).queue(function () {
            $(this).removeClass(c.loadingClass).addClass(c.addClass);
          });
        },c.timeout);
      });
    },
    //現在のページと親ディレクトリへのリンク
    selflink: function (options) {
      var c = $.extend({
        area: 'body',
        addClass:'is-current',
        parentsClass: 'is-parent',
        hashIgnore: true
      }, options);
      var urlHash = location.hash;
      $(c.area+((c.area)?' ':'')+'a[href]').each(function(){
        var href = new $.capsule.uri(this.getAttribute('href'));
        var path = location.href;
        
        if (c.hashIgnore) {
          path = path.replace(urlHash, '');
        }
        if ((href.absolutePath == path) && !href.fragment) {
          //同じ文書にリンク
          $(this).addClass(c.addClass);
        } else if (0 <= path.search(href.absolutePath)) {
          //親ディレクトリリンク
          $(this).addClass(c.parentsClass);
        }

      });
    },
    //カテゴリー内表示
    category: function(options) {
      var c = $.extend({
        selector: '.js-same-category',
        addClass: 'is-same-category'
      }, options);
      var bodyClasses = new Array();
      if ($('body').attr('class')) {
        bodyClasses = $('body').attr('class').split(' ');
      }
      for (var i=0;i<bodyClasses.length;i++) {
        $(c.selector).each(function(){
          if ($(this).hasClass(bodyClasses[i])) {
            //初期表示
            $(this).addClass(c.addClass);
          }
        });
      }
    },
    // ハンバーガーメニュー 
    hamburgerTrigger: function(options) {
      var c = $.extend({
        selector: '.js-navigation-trigger',
        addClass: 'is-navigation-open',
        put: 'body',
        wrapperSelector: '.global-main, .global-footer',
        wrapperClass: 'fix-wrapper'
      }, options);

      var current_scrollY;
      $(c.wrapperSelector).wrapAll('<div>').parent().addClass(c.wrapperClass);

      $(document).on({
        'click': function() {
          if ($(c.put).hasClass(c.addClass)) {
            //スクロール固定解除
            $('.'+c.wrapperClass).attr({ style: '' });
            // class remove
            $(c.put).removeClass(c.addClass);
            $(window).scrollTop(current_scrollY);
          } else {
            current_scrollY = $(window).scrollTop();
            //スクロール固定
            $('.'+c.wrapperClass).css({ top: -1 * current_scrollY });
            // class add
            $(c.put).addClass(c.addClass);
          }
        }
      }, c.selector)
    },
    // Scroll Object
    scrollObject: function(options) {
      var c = $.extend({
        generationClass: '.js-scroll-object',
        textSet: {
          '.js-scroll-table': {
            ja: 'この表は左右にスクロールできます',
            en: 'This table can scroll to the left or right.'
          },
          '.js-scroll-graph': {
            ja: 'このグラフは左右にスクロールできます',
            en: 'This graph can scroll to the left or right.'
          },
          '.js-scroll-area': {
            ja: 'このエリアは左右にスクロールできます',
            en: 'This area can scroll to the left or right.'
          }
        },
        hasScroll: 'has-scroll'
      }, options);
      lang = $.capsule.getlang() || 'ja';
      var className = c.generationClass.slice(1);
      //スクロールエリアの設置
      scrollObject();
      $(window).on('resize', function () {
        scrollObject();
      });
      function scrollObject() {
        $.each(c.textSet, function(target, txt) {
          $(target).each(function() {
            var $this = $(this);
            if ($this.closest(c.generationClass).length == 0) {
              $this.addClass(c.generationClass + '__contents');
              //スクロール対象エリアの外側にdiv作成
              $this.wrap('<div class="' + className + '"></div>').wrap('<div class="' + className + '__target"></div>');
              var $scrollWrap = $this.closest(c.generationClass + '__target');
              //スクロール説明文の設置
              $scrollWrap.before('<p class="' + className + '__caution">' + txt[lang] + '</p>');
            }
            var flame = $this.closest(c.generationClass).outerWidth();
            var contents = $this.outerWidth();
            if(flame < contents){
              $this.closest(c.generationClass).addClass(c.hasScroll);
            } else {
              $this.closest(c.generationClass).removeClass(c.hasScroll);
            }
          });
        });
      }
    },
    // アンカーへのスクロールアニメーション
    ankerScroller: function(hash, speed) {
      var target = $(hash);
      var position;
      if (target) {
        position = target.offset().top;
        $('body,html').stop().animate({ scrollTop: position }, speed);
      } else {
        return false;
      }
    },
    // load時のスクロールアニメーション
    loadScroller: function(options) {
      var c = $.extend({
        speed: 500,
        timeout: 100
      }, options);
      //URLのハッシュ値を取得
      var urlHash = location.hash;
      //ハッシュ値があればページ内スクロール
      if (urlHash) {
        //スクロールを0に戻す
        $('body,html').stop().scrollTop(0);
        setTimeout(function () {
          //ロード時の処理を待ち、時間差でスクロール実行
          $.capsule.ankerScroller(urlHash, c.speed);
        }, c.timeout);
      }
    },
    // ページ内のスクロールアニメーション
    pageScroller: function(options) {
      var c = $.extend({
        selector: '.js-scroller', // a[href^="#"]
        speed: 500,
        return: false
      }, options);

      //通常のクリック時
      $(document).on({
        'click': function() {
          //ページ内リンク先を取得
          var href = $(this).attr('href');
          //リンク先が#か空だったらhtmlに
          var hash = href == '#' || href == '' ? 'html' : href;
          //スクロール実行
          $.capsule.ankerScroller(hash, c.speed);
          //リンク無効化
          if (!c.return) {
            return false; 
          }
        }
      }, c.selector)
    },
    bottomScroll: function (options) {
      var c = $.extend({
        put: 'body',
        addClass: 'is-bottom-scroll',
        firstDelay: 200
      }, options);
      var startPos = 0,winScrollTop = 0;
      $(window).on('scroll',function(){
          winScrollTop = $(this).scrollTop();
          if (winScrollTop >= startPos) {
              if(winScrollTop >= c.firstDelay){
                $(c.put).addClass(c.addClass);
              }
          } else {
              $(c.put).removeClass(c.addClass);
          }
          startPos = winScrollTop;
      });
    },
    pageToTop: function (options) {
      var c = $.extend({
        id: 'pagetop',
        className: 'pagetop-button',
        text: 'Page Top',
        speed: 500,
      }, options);
      $('body').prepend('<a id="' + c.id + '" name="' + c.id + '"></a>');
      $('body').append('<a href="#' + c.id + '" class="' + c.className + '">' + c.text + '</a>');
      $.capsule.pageScroller({
        selector: '.' + c.className, // a[href^="#"]
        speed: c.speed,
        return: false
      });
      
    },
    scrollShow: function(options) {
      var c = $.extend({
        selector: '.js-scroll-show',
        addClass: 'is-show',
        again: true,
        bottomRatio: 5
      }, options);
      appearance();
      $(window).scroll(function () {
        appearance();
      });
      function appearance() {
        if ($(c.selector).length != 0) {
          $(c.selector).each(function(){
            var position = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            var appearancePoint = windowHeight / c.bottomRatio;
            if (scroll > position - windowHeight + appearancePoint){
              $(this).addClass(c.addClass);
            } else {
              if (c.again) {
                $(this).removeClass(c.addClass);
              }
            }
          });
        }
      }
    },
    scrollChangeArea: function (options) {
      var c = $.extend({
        position: 200, //ウインドウ上部からどれぐらいの位置で変化させるか
        areaSelector: '.js-scroll-change',
        navSelector: '.js-scroll-change-nav',
        addClass: 'is-current'
      }, options);
      var current = -1;
      var boxPosition = new Array;
      var boxID = new Array;
      
      //各要素の位置
      //position-nowは場所を取得したい対象の要素に付ける
      $(c.areaSelector).each(function (i) {
        boxPosition[i] = $(this).offset().top;
        boxID[i] = $(this).attr('id');
      });
      //最初の要素にclass="positiion-now"をつける
      changeAreaLink(c.navSelector, c.addClass, 0, boxID[0]);
      //スクロールした時の処理
      $(window).scroll(function () {
        scrollPosition = $(window).scrollTop();
        for (var i = boxPosition.length - 1; i >= 0; i--) {
          if ($(window).scrollTop() > boxPosition[i] - c.position) {
            changeAreaLink(c.navSelector, c.addClass, i, boxID[i]);
            break;
          }
        };
      });
      function changeAreaLink(selector, addClass, sectionNumber, sectionID) {
        if (sectionNumber != current) {
          current = sectionNumber;
          sectionNumberSecond = sectionNumber + 1;//以下にクラス付与したい要素名と付与したいクラス名
          $(selector).find('a').removeClass(addClass);
          $(selector).find('a[href="#' + sectionID + '"]').addClass(addClass);
        }
      }
      
    },

  };
})(jQuery);


