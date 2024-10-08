$(function () {
  commonUI();
  // mainUI();
});
$(window).on('resize', function () {
  vhChk();
});

vhChk();
function vhChk() {
  const $vh = window.innerHeight * 0.01;
  $('html').css('--vh', $vh + 'px');
}

/* common ui */
function commonUI() {
  let $gnbTxt = $('#gnb li a');
  const $title = $.trim($('#pageTit').text());
  $gnbTxt.each(function () {
    if ($(this).text() === $title) {
      const $parents = $(this).parents('li');
      $parents.addClass('active');
    }
  });

  /* header fixed */
  let prevSclTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  document.addEventListener('scroll', function () {
    const nowSclTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const sclDirection = nowSclTop > prevSclTop ? 'down' : 'up';
    const sclDistance = Math.abs(nowSclTop - prevSclTop);
    const elArray = [];
    const header = document.querySelector('#header');
    if (header) elArray.push(header);

    if (elArray.length) fixedClassChk(elArray, nowSclTop, sclDirection, sclDistance);

    prevSclTop = nowSclTop;
  });

  // GNB 모바일 메뉴
  const gnbBtn = document.querySelector('#gnb .btn-gnb');

  gnbBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    document.body.classList.toggle('gnbOpen');
  });

  //스크롤 탑 버튼
  const $scrollTop = $('.scroll-top');
  const $scrollTopBtn = $scrollTop.children();

  $scrollTopBtn.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
  });
  $scrollTopBtn.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $scrollTopBtn.fadeIn();
    } else {
      $scrollTopBtn.fadeOut();
    }
  });

  // 스크롤 headerr 고정 스크립트
  function fixedClassChk(elArray, nowSclTop, sclDirection, sclDistance) {
    elArray.forEach(function (item) {
      const itemEnd = getOffset(item).top + item.offsetHeight;
      if (nowSclTop > itemEnd) {
        item.classList.add('fixed');
        if (sclDistance > 5) {
          if (sclDirection === 'down') {
            item.classList.add('is-up');
          } else {
            item.classList.remove('is-up');
          }
        }
      } else {
        item.classList.remove('fixed', 'is-up');
      }
    });
  }
  function getOffset(element) {
    let $el = element;
    let $elX = 0;
    let $elY = 0;
    let isSticky = false;
    while ($el && !Number.isNaN($el.offsetLeft) && !Number.isNaN($el.offsetTop)) {
      let $style = window.getComputedStyle($el);
      // const $matrix = new WebKitCSSMatrix($style.transform);
      if ($style.position === 'sticky') {
        isSticky = true;
        $el.style.position = 'static';
      }
      $elX += $el.offsetLeft;
      // $elX += $matrix.m41; //translateX
      $elY += $el.offsetTop;
      // $elY += $matrix.m42;  //translateY
      if (isSticky) {
        isSticky = false;
        $el.style.position = '';
        if ($el.getAttribute('style') === '') $el.removeAttribute('style');
      }
      $el = $el.offsetParent;
      if ($el !== null) {
        $style = window.getComputedStyle($el);
        $elX += parseInt($style.borderLeftWidth);
        $elY += parseInt($style.borderTopWidth);
      }
    }
    return { left: $elX, top: $elY };
  }

  //공통 서브 메뉴 탭
  let $tabSwiper;
  //메인 하단 스와이퍼
  let $mainBottomContents;
  let activeIndex = Array.from(document.querySelectorAll('.swiper-slide')).findIndex(function (slide) {
    return slide.classList.contains('active');
  });
  function initSwiper() {
    if ($('.common-tab .swiper-slide').length) {
      $tabSwiper = new Swiper('.common-tab .swiper', {
        slidesPerView: 'auto',
        initialSlide: activeIndex
      });
    }
    if ($('.main-bottomContents .swiper-slide').length) {
      $mainBottomContents = new Swiper('.main-bottomContents .swiper', {
        slidesPerView: 'auto',
        // autoplay: {
        //   delay: 4500,
        //   disableOnInteraction: false
        // },
        on: {
          click: function () {
            this.slides.forEach((slide) => {
              slide.classList.remove('active');
            });
            // 현재 활성화된 슬라이드에 active 클래스 추가
            const activeSlide = this.slides[this.activeIndex];
            activeSlide.classList.add('active');
          }
        }
      });
    }
  }

  function destroySwiper() {
    if ($tabSwiper) {
      $tabSwiper.destroy(true, true);
      $tabSwiper = undefined;
    }
    if ($mainBottomContents) {
      $mainBottomContents.destroy(true, true);
      $mainBottomContents = undefined;
    }
  }

  function handleWindowResize() {
    destroySwiper();
    $('.bottomContents-btns .swiper-wrapper').attr('style', '');
    if (window.innerWidth < 1024) {
      initSwiper();
    }
  }
  $(window).on('load', function () {
    handleWindowResize();
  });
  $(window).on('resize', function () {
    handleWindowResize();
  });

  /*폼 글자수*/
  const textareas = document.querySelectorAll('textarea');
  const countInput = document.querySelectorAll('input');

  textareas.forEach((textarea) => {
    textarea.addEventListener('input', valueLengthCheck);
  });
  countInput.forEach((inputs) => {
    inputs.addEventListener('input', valueLengthCheck);
  });

  function valueLengthCheck(e) {
    const target = e.target;
    const value = target.value;
    const el = target.parentNode.querySelector('.count-num');
    el.querySelector('.current').innerHTML = value.length;
  }

  // 인풋 value 초기화
  $('.btn-x').hide();
  const $inpFocus = $('.inputbox input');

  $inpFocus.focusin(function () {
    $(this).siblings('.btn-x').show();
  });

  $(document).on('click', '.btn-x', function () {
    const $inp = $(this).siblings('input', 'textarea');
    $inp.val('').change().siblings('.btn-x').hide();
  });

  $inpFocus.focusout(function () {
    const $btnX = $(this).siblings('.btn-x');

    setTimeout(function () {
      if (!$btnX.is(':focus')) {
        $btnX.hide();
      }
    }, 100);
  });

  // 인풋 파일 파일명
  const fileTarget = $('.filebox .inp-file');

  fileTarget.on('change', function () {
    var files = $(this)[0].files;
    var fileArr = [];
    for (var i = 0; i < files.length; i++) {
      fileArr.push(files[i].name);
    }

    var fileList = fileArr.join(', ');
    $(this).siblings('.upload-name').val(fileList);
  });

  // 스크롤 애니메이션
  const aniElements = document.querySelectorAll('[data-animation]');
  aniElements.forEach(function (element) {
    // 디폴트 opacity 주기 위한 클래스
    element.classList.add('ani-ready');
  });

  //개인정보 팝업
  // const privacyOpen = document.querySelector('.popPrivacyOpen');
  // const privacyClose = document.querySelectorAll('.popPrivacyClose');
  // const popPrivacy = document.querySelector('#popPrivacy');

  // privacyOpen.addEventListener('click', function () {
  //   popPrivacy.classList.add('opened');
  // });

  // privacyClose.forEach(function (element) {
  //   element.addEventListener('click', function () {
  //     popPrivacy.classList.remove('opened');
  //   });
  // });
}
// 페이지 로드 시 스크롤 애니메이션 실행
function checkElementsPosition() {
  const elements = document.querySelectorAll('[data-animation]');

  elements.forEach(function (element) {
    let position = element.getBoundingClientRect();
    let screenMiddle = window.innerHeight;
    let animationClass = element.getAttribute('data-animation');

    console.log(position.top + position.height / 2, screenMiddle);

    if (position.top + position.height / 2 < screenMiddle) {
      element.classList.remove('ani-ready');
      element.classList.add('animate__animated');
      element.classList.add(animationClass);
    }
  });
}
document.addEventListener('DOMContentLoaded', checkElementsPosition);

// 스크롤 시 실행
window.addEventListener('scroll', checkElementsPosition);

/* main ui */
let $mainBanner;
let $mainReferences;
let $clientList;
let activeBullet;
function mainUI() {
  /* 메인 배너 스와이퍼(영상 제어 포함) - 시작 */
  let videoPlayStatus = 'PAUSE';
  let timeout = null;
  let waiting = 5000; // swiper autoplay를 쓰지 못하기 때문에 따로 여기서 지정
  const swiperBanner = document.querySelector('.main-banner');
  const player = videojs('bannerVideo');

  let swiperInitialized = false;

  function initializeSwiper() {
    if (swiperInitialized) return; // 초기화되었다면 다시 초기화 안함

    $mainBanner = new Swiper('.main-banner', {
      loop: true,
      preventInteractionOnTransition: false,
      pagination: {
        el: '.swiper-pagination',
        // clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">0' + (index + 1) + '<strong class="progressbar "><i class="progress"></i></strong>' + '</span>';
        }
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      on: {
        init() {
          clearTimeout(timeout);
          player.currentTime(0);
          player.play();
          videoPlayStatus = 'PLAYING';

          const activeBullet = document.querySelector('.swiper-pagination-bullet-active .progress');
          activeBullet.style.width = '0%';
          setTimeout(function () {
            activeBullet.style.width = '100%';
          }, 100);
        },
        slideChangeTransitionStart() {
          let index = $mainBanner.activeIndex;
          let currentSlide = $($mainBanner.slides[index]);
          let currentSlideType = currentSlide.data('slide-type');
          const activeBullet = document.querySelector('.swiper-pagination-bullet-active .progress');
          activeBullet.style.width = '0%';

          if (videoPlayStatus === 'PLAYING') {
            player.pause();
          }

          clearTimeout(timeout);

          switch (currentSlideType) {
            case 'img':
              runNext();
              break;
            case 'vdo':
              player.currentTime(0);
              player.play();
              videoPlayStatus = 'PLAYING';
              break;
            default:
              throw new Error('Invalid slide type');
          }
        },
        slideChangeTransitionEnd() {
          const activeBullet = document.querySelector('.swiper-pagination-bullet-active .progress');
          activeBullet.style.width = '100%';
        }
      }
    });

    swiperInitialized = true; // Swiper 초기화
  }
  function handleVideoEnded() {
    next();
  }
  // 비디오 플레이어 준비가 완료되면 실행될 함수
  player.ready(function () {
    initializeSwiper();
    player.on('ended', handleVideoEnded);
  });

  function prev() {
    $mainBanner.slidePrev();
  }

  function next() {
    // $mainBanner.slideNext();
    if (!swiperBanner.classList.contains('pause')) {
      $mainBanner.slideNext();
    }
  }

  function runNext() {
    timeout = setTimeout(function () {
      next();
    }, waiting);
  }
  runNext();

  const controlSwiper = document.querySelector('.swiper-control');
  controlSwiper.addEventListener('click', function () {
    swiperBanner.classList.toggle('pause');
    if (!swiperBanner.classList.contains('pause')) {
      $mainBanner.slideNext();
    }
  });
  /* 메인 배너 스와이퍼(영상 제어 포함) - 끝 */

  // 메인 레퍼런스 스와이퍼
  $mainReferences = new Swiper('.main-references .swiper', {
    slidesPerView: 'auto',
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    preventInteractionOnTransition: false
  });

  $clientList = new Swiper('.giftCard-list .swiper', {
    slidesPerView: 'auto',
    loop: true,
    spaceBetween: 10,
    autoplay: {
      delay: 500,
      disableOnInteraction: false
    },
    preventInteractionOnTransition: false
  });

  // 메인 하단 SOLUTIONS & SERVICE
  function initializeBottomContentFeature() {
    const mainBottom = document.querySelector('.main-bottomContents');
    if (!mainBottom) return; // .main-bottomContents 요소가 없으면 초기화 중지

    const bottomBtns = mainBottom.querySelectorAll('.bottomContents-btns a');
    let index = 0; // 현재 활성화된 버튼의 인덱스
    let intervalId; // setInterval을 위한 변수

    // 클릭 이벤트 리스너 설정
    bottomBtns.forEach((bottomBtn, i) => {
      bottomBtn.addEventListener('mouseover', function (event) {
        event.preventDefault();

        index = i;
        mainBottom.classList.remove('type-1', 'type-2', 'type-3');

        const dataBg = event.currentTarget.getAttribute('data-bg');
        if (dataBg) {
          mainBottom.classList.add(dataBg);
        }

        bottomBtns.forEach((btn) => {
          const parentLi = btn.parentElement;
          parentLi.classList.remove('active');
        });

        const clickedParentLi = event.currentTarget.parentElement;
        clickedParentLi.classList.add('active');
      });
    });

    // 4.5초마다 클릭 이벤트 자동 발생
    clearInterval(intervalId); // 이전 interval을 클리어
    intervalId = setInterval(() => {
      bottomBtns[index].click();

      index++;
      if (index >= bottomBtns.length) {
        index = 0;
      }
    }, 4500);

    // 페이지를 벗어날 때 interval 정리
    window.addEventListener('beforeunload', () => {
      clearInterval(intervalId);
    });
  }

  function checkWindowSizeAndInitialize() {
    if (window.innerWidth >= 1024) {
      initializeBottomContentFeature();
    }
  }

  // 초기 로드 시 체크
  checkWindowSizeAndInitialize();

  // 윈도우 크기 변경 시 다시 체크
  window.addEventListener('resize', checkWindowSizeAndInitialize);
}

/* about ui */
