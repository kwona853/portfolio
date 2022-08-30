'use strict';

// header left link
$('ul.left-link li.lang').on('click', function() {
  $('ul.left-link li.lang').toggleClass('on');
});
$('ul.left-link li.shipment').on('click', function() {
  $('ul.left-link li.shipment').toggleClass('on');
});

// gnb
$('#gnb > ul > li > a').on('mouseenter', function() {
  $('#gnb > ul > li div.sub-container').removeClass('on');
  $('#gnb > ul > li div.sub-gnb-container').removeClass('on');
  $(this).siblings('div.sub-gnb-container').addClass('on');
  $(this).siblings('div.sub-container').addClass('on');  
});

$('#gnb').on('mouseleave', function() {
  $('div.sub-gnb-container').removeClass('on');
  $('div.sub-container').removeClass('on');
});


$(window).on('scroll', function() {
    let scrollAmt = $(document).scrollTop();
    if (scrollAmt > 200) {
      $('div.header-gnb').addClass('small');
    } else {
      $('div.header-gnb').removeClass('small');
    }
  });

// mobile gnb
$('div.hamburger-menu > i').on('click', function(){
    $('div.m-gnb').addClass('on')
});

$('div.m-gnb > div.close > div.close-text > i').on('click', function(){
    $('div.m-gnb').removeClass('on')
});

$('i.xi-arrow-left').on('click', function() {
  $('div.m-sub-gnb-container').removeClass('on');
  $('div.m-sub-container').removeClass('on');
});

$('div.m-gnb #gnb > ul > li > a').on('click', function() {
  $('#gnb > ul > li div.m-sub-container').removeClass('on');
  $('#gnb > ul > li div.m-sub-gnb-container').removeClass('on');
  $(this).siblings('div.m-sub-gnb-container').addClass('on');
  $(this).siblings('div.m-sub-container').addClass('on');  
});

$('li.grid > h4').on('click', function() {
  // $('li.grid > ul.drop-gnb').toggleClass('on');
  $(this).siblings('ul.drop-gnb').toggleClass('on');
  var classList = $(this).siblings('ul.drop-gnb').attr('class').split(/\s+/);
  if(classList.includes('on')) {
    $(this).find('span.plus span:nth-child(1)').css({transform: 'translate(-50%, -50%) rotate(0)'});
  }
  else{
    $(this).find('span.plus span:nth-child(1)').css({transform: 'translate(-50%, -50%) rotate(90deg)'});
  }
  console.log(classList);
});



 



// footer
$('div.pc-bottom-lang > ul > li > em').on('click', function() {
  let index = $('div.pc-bottom-lang > ul > li').index($(this).parent());
  $(this).siblings('div.pc-bottom-lang ul.drop-menu').toggleClass('on');
});


// product slide

setBannerSlide('section.product-slide > div.product-wrapper');
setBannerSlide('section.product-slide.three > div.product-wrapper');
setBannerSlide('section.discover.one > div.product-wrapper');
setBannerSlide('section.discover.two > div.product-wrapper');


function setBannerSlide(selector) {
  const $selector = document.querySelector(selector);
  const $banner = $selector.querySelector('ul.banner');
  const $prev = $selector.querySelector('div.prev > a.prev');
  const $next = $selector.querySelector('div.next > a.next');
  let numBanner = $selector.querySelectorAll('ul.banner > li').length;
  let bannerNow = 0;
  let bannerPrev = 0;
  let bannerNext = 0;
  let bannerFirst = 1;
  let offsetLeft = 0;
  let minOffsetLeft = 0;

  constructor();

  function constructor() {
    console.log($selector, $banner, $next, $prev);
    setTimeout(function() {setInitial();}, 500);
    setEvent();
  }


  function setInitial() {
    findMin();
    findNumBanner();
    showBanner(bannerFirst);
  }

  function findMin() {
    let widthBox = $selector.querySelector('div.box').clientWidth;
    let widthBar = $banner.querySelector('li:last-child').offsetLeft + $banner.querySelector('li:last-child').offsetWidth;
    minOffsetLeft = widthBox - widthBar;
    // console.log(widthBox + ' / ' + widthBar + ' / ' + minOffsetLeft);
  }

  function findNumBanner() {
    for (let i = 0; i < $banner.querySelectorAll('li').length; i++) {
      let offsetLeft = -$banner.querySelectorAll('li')[i].offsetLeft;
      if (offsetLeft <= minOffsetLeft) {
        numBanner = i + 1;
        break;
      }
    }
    // console.log(numBanner);
  }

  function setEvent() {
    $prev.addEventListener('click', function() {
      showBanner(bannerPrev);
    }, false);

    $next.addEventListener('click', function() {
      showBanner(bannerNext);
    }, false);
  }
  
  function showBanner(n) {
    offsetLeft = -$banner.querySelector('li:nth-child(' + n + ')').offsetLeft;
    const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if ((width > 986 && n + 2 < numBanner) || width <= 986) {
      if (offsetLeft <= minOffsetLeft) offsetLeft = minOffsetLeft;
      $banner.setAttribute('style', 'transition: left 0.3s; left: ' + offsetLeft + 'px;');
      bannerNow = n;
      bannerPrev = (n <= 1) ? numBanner : (n - 1);
      bannerNext = (n >= numBanner) ? 1 : (n + 1);
      // console.log(n, numBanner);
    }
  
  }
}