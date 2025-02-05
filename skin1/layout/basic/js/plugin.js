// Slick
$(document).ready(function () {
    // [헤더] 검색순위 슬릭 ----------
    $('.search-rank-slider').slick({
        infinite: true,       // 무한 스크롤
        slidesToShow: 1,      // 한 번에 보여줄 슬라이드 개수
        slidesToScroll: 1,    // 한 번에 스크롤할 슬라이드 개수
        autoplay: true,       // 자동 재생
        autoplaySpeed: 2000,  // 2초마다 슬라이드 전환
        arrows: false,        // 화살표 비활성화
        dots: false,          // 점 네비게이션 비활성화
        vertical: true,       // 세로 방향 슬라이드
    });

    // [퀵버튼] 최근 본 상품 ----------
    $('.productrecent > li:gt(5)').hide(); // 5개 초과 방지
    $('.productrecent').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        prevArrow: '<button class="slide_btn slide_prevBg_btn"></button>',
        nextArrow: '<button class="slide_btn slide_nextBg_btn"></button>',
        dots: true,
        customPaging: function (slider, i) {
            return `<img src="/img/icon/dotOff.svg" alt="${i + 1}번째 상품" class="custom-dot">`;
        }
    });
});

// Swiper
function autoSlideSwiperBG(selector, options = {}) {
    let swiper = new Swiper(selector, {
        autoplay: {
            delay: 5000, // 자동 재생 시간 설정
            disableOnInteraction: false, // 사용자 상호작용 후에도 자동 재생 유지
        },
        navigation: {
            nextEl: '.slide_box .slide_nextBg_btn', // 네비게이션 버튼
            prevEl: '.slide_box .slide_prevBg_btn',
        },
        pagination: {
            el: '.slide_box .swiper_pagination', // 페이지네이션
            clickable: true,
        },
        loop: true, // 무한 반복
        ...options, // 추가 옵션 병합
        on: {
            init: function () {
                if (!['.rental_brand_swiper', '.youtube_swiper'].includes(selector)) {
                    adjustSlideHeight(selector);
                }

                // 유튜브 슬라이드라면 영상 재생 감지 이벤트 추가
                if (selector === '.youtube_swiper') {
                    loadYouTubeAPI(() => detectYouTubePlayback(swiper));
                }
            },
            resize: function () {
                if (!['.rental_brand_swiper', '.youtube_swiper'].includes(selector)) {
                    adjustSlideHeight(selector);
                }
            }
        }
    });

    return swiper;
}

// 슬라이드 높이를 자동으로 width에 맞추는 함수
function adjustSlideHeight(selector) {
    let swiperEl = document.querySelector(selector);
    if (!swiperEl) return;

    let slides = swiperEl.querySelectorAll('.swiper-slide');

    slides.forEach(slide => {
        let width = slide.offsetWidth; // 슬라이드의 width 가져오기
        slide.style.height = width + "px"; // height를 width와 동일하게 설정
    });
}

// 유튜브 API 로드 함수
function loadYouTubeAPI(callback) {
    if (window.YT && window.YT.Player) {
        callback();
    } else {
        let script = document.createElement('script');
        script.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(script);

        window.onYouTubeIframeAPIReady = callback;
    }
}

// 유튜브 영상이 재생 중일 때 자동 슬라이드를 멈추는 기능 추가
function detectYouTubePlayback(swiper) {
    const iframes = document.querySelectorAll(".youtube_swiper .swiper-slide iframe");
    let players = [];

    iframes.forEach((iframe, index) => {
        players[index] = new YT.Player(iframe, {
            events: {
                "onStateChange": (event) => {
                    if (event.data === YT.PlayerState.PLAYING) {
                        swiper.autoplay.stop(); // 영상 재생 중이면 슬라이드 멈춤
                    } else if (event.data === YT.PlayerState.ENDED || event.data === YT.PlayerState.PAUSED) {
                        swiper.autoplay.start(); // 영상이 끝나거나 멈추면 다시 자동 재생
                    }
                },
            },
        });
    });
}

autoSlideSwiperBG('#mainBrandCategory .brand_swiper', {
    slidesPerView: 7, 
    spaceBetween: 30,
});

autoSlideSwiperBG('.list_main .brand_swiper', {
    slidesPerView: 10,
    spaceBetween: 0,
    autoplay: {
        delay: 3000, // 자동 재생 시간 설정
        disableOnInteraction: false, // 사용자 상호작용 후에도 자동 재생 유지
    },
});

autoSlideSwiperBG('.youtube_swiper', {
    spaceBetween: -30, // 슬라이드 사이 여백
    slidesPerView: 1.5, // 한 슬라이드에 보여줄 갯수
    centeredSlides: true, // 센터 모드
    loopAdditionalSlides: 1,
    initialSlide: 0, // 첫 번째 슬라이드부터 시작
    navigation: {
        nextEl: '.D_youtube .slide_btn.slide_next_btn',
        prevEl: '.D_youtube .slide_btn.slide_prev_btn',
    },
});

// [헤더] 검색창 추천상품 ----------
let recommendedHeaderSwiper = new Swiper('.recommended_swiper', {
    autoplay: {
        delay: 5000, // 자동 재생 시간 설정
        disableOnInteraction: false, // 사용자 상호작용 후에도 자동 재생 유지
    },
    spaceBetween: 20, // 슬라이드 사이 여백
    slidesPerView : 'auto', // 한 슬라이드에 보여줄 갯수
    loop: true,
    loopAdditionalSlides: 1,
    navigation: {
        nextEl: ".recommended_swiper .slide_next_btn",
        prevEl: ".recommended_swiper .slide_prev_btn",
    },
});

// [메인] 메인배너 ----------
let mainSwiper = new Swiper('.mainB-swiper', {
    effect: "fade", // 페이드 효과
    speed: 1000, // 페이드 속도 (1초)
    fadeEffect: {
        crossFade: true // 슬라이드 교차 시 부드럽게 페이드
    },
    autoplay: {
        delay: 5000, // 자동 재생 시간 설정
        disableOnInteraction: false, // 사용자 상호작용 후에도 자동 재생 유지
    },
    slidesPerGroup: 1, // 한 번에 이동할 슬라이드 개수
    loop: true,
    loopAdditionalSlides: 1,
    initialSlide: 0, // 첫 번째 슬라이드부터 시작
    pagination: {
        el: '.slide_pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return `<span class="${className}"></span>`;
        },
    },
});

let fakeSwiper = new Swiper('.fake_swiper', {
    effect: "fade", // 페이드 효과
    speed: 1000,
    fadeEffect: {
        crossFade: true
    },
    slidesPerGroup: 1, // 한 번에 이동할 슬라이드 개수
    loop: true,
    loopAdditionalSlides: 1,
    initialSlide: 0, // 첫 번째 슬라이드부터 시작
});

mainSwiper.controller.control = fakeSwiper;
fakeSwiper.controller.control = mainSwiper;


// [메인] 신제품 외부 슬라이드 ----------
// 외부 슬라이드
var newTitleSwiper = new Swiper('.newProduct-title .swiper-container', {
    autoplay: {
        delay: 5000, // 자동 재생 시간 설정
        disableOnInteraction: false, // 사용자 상호작용 후에도 자동 재생 유지
    },
    speed: 1000, // 페이드 속도 (1초)
    spaceBetween: 80, // 슬라이드 사이 여백
    slidesPerView : 1, // 한 슬라이드에 보여줄 갯수
    centeredSlides: true, //센터모드
    loop: true,
    loopAdditionalSlides: 1,
    initialSlide: 0, // 첫 번째 슬라이드부터 시작
    navigation: {
        nextEl: '.swiper-nextBtn',
        prevEl: '.swiper-prevBtn',
    },
});

var newContentSwiper = new Swiper('.newProduct-content .swiper-container', {
    speed: 800, // 페이드 속도 (.8초)
    spaceBetween: 40, // 슬라이드 사이 여백
    slidesPerView : 1, // 한 슬라이드에 보여줄 갯수
    centeredSlides: true, //센터모드
    loop: true,
    loopAdditionalSlides: 1,
    initialSlide: 0, // 첫 번째 슬라이드부터 시작
});

newTitleSwiper.controller.control = newContentSwiper;
newContentSwiper.controller.control = newTitleSwiper;

// 내부 슬라이드
// li 너비 및 gap 총합 계산 후 swiper-slide에 적용하는 함수
function calculateSlideWidth(slideClass, scrollbarClass) {
    try {
        const swiperSlide = document.querySelector(`${slideClass} .swiper-slide`);
        
        if (!swiperSlide) {
            // 해당 슬라이드가 없는 경우 실행 중단
            console.warn(`Element not found: ${slideClass} .swiper-slide`);
            return;
        }

        const listItems = swiperSlide.querySelectorAll("li");
        const computedStyle = getComputedStyle(swiperSlide);
        const gap = parseInt(computedStyle.gap) || 0;

        let totalWidth = 0;
        listItems.forEach((li) => {
            totalWidth += li.offsetWidth;
        });

        totalWidth += gap * (listItems.length - 1);
        swiperSlide.style.width = `${totalWidth}px`;

        // Swiper 초기화
        new Swiper(slideClass, {
            slidesPerView: "auto",
            freeMode: true,
            scrollbar: {
                el: scrollbarClass,
                draggable: true,
            },
            mousewheel: true,
            on: {
                touchStart: function (event) {
                    event.stopPropagation();
                },
            },
            nested: true,
        });
    } catch (error) {
        console.error(`Error in calculateSlideWidth for ${slideClass}:`, error);
    }
}

// 슬라이드 각각 호출
calculateSlideWidth(".new-swiper1", ".new-scrollbar1");
calculateSlideWidth(".new-swiper2", ".new-scrollbar2");
calculateSlideWidth(".new-swiper3", ".new-scrollbar3");
calculateSlideWidth(".new-swiper4", ".new-scrollbar4");
calculateSlideWidth(".new-swiper5", ".new-scrollbar5");

// [메인] 카테고리 스와이퍼 ----------
function categorySwiper(slideClass, paginationClass) {
    // Swiper 초기화
    new Swiper(slideClass, {
        autoplay: {
            delay: 5000, // 자동 재생 시간 설정
            disableOnInteraction: false, // 사용자 상호작용 후에도 자동 재생 유지
        },
        spaceBetween: 20, // 슬라이드 사이 여백
        slidesPerView : 'auto', // 한 슬라이드에 보여줄 갯수
        loop: true,
        loopAdditionalSlides: 1,
        initialSlide: 0, // 첫 번째 슬라이드부터 시작
        navigation: {
            nextEl: `${slideClass} .slide_btn.slide_nextBg_btn`,
            prevEl: `${slideClass} .slide_btn.slide_prevBg_btn`,
        },
        pagination: {
            el: `${paginationClass} .swiper-pagination`,
            clickable: true,
            renderBullet: function (index, className) {
                return `<span class="${className}"></span>`;
            },
        },
    });
}

// 슬라이드 각각 호출
categorySwiper(".category-swiper01", ".chair");
categorySwiper(".category-swiper02", ".bed");
categorySwiper(".category-swiper03", ".recliner");

var companyHistorySwiper = new Swiper(".company_history_swiper", {
    direction: "vertical",
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
    },
    mousewheel: true,
});

const label = document.querySelector(".label");
const options = document.querySelectorAll(".optionItem");
const optionBoxes = document.querySelectorAll(".map_optionItemBox");

// 드롭다운 메뉴 열고 닫기
label.addEventListener("click", function () {
    const parent = label.closest('.map_selectBox');
    parent.classList.toggle('active'); // active 클래스 토글
});

options.forEach(option => {
    option.addEventListener("click", function () {
        // 선택한 옵션의 클래스를 가져옴
        const selectedClass = this.classList[1].replace("optionItem_", "map_optionItemBox_");

        // 버튼 텍스트 변경
        label.textContent = this.textContent;

        // 모든 옵션 박스 숨김
        optionBoxes.forEach(box => box.style.display = "none");

        // 선택한 옵션과 매칭되는 박스만 표시
        const selectedBox = document.querySelector("." + selectedClass);
        if (selectedBox) {
            selectedBox.style.display = "block";
        }

        // 드롭다운 메뉴 닫기
        const parent = this.closest('.map_selectBox');
        parent.classList.remove('active');
    });
});

// 지도를 생성하는 함수
function createMapAndMarker(containerId, lat, lng, level) {
    var mapContainer = document.getElementById(containerId),
        mapOption = {
            center: new kakao.maps.LatLng(lat, lng),
            level: level
        };
    var map = new kakao.maps.Map(mapContainer, mapOption);
    var markerPosition = new kakao.maps.LatLng(lat, lng);
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });
    marker.setMap(map);
    return map;
}

// 지도 생성
createMapAndMarker('map_s1', 33.450701, 126.570667, 3);
createMapAndMarker('map_s2', 33.450701, 126.570667, 3);
createMapAndMarker('map_s3', 33.450701, 126.570667, 3);
createMapAndMarker('map_i1', 33.450701, 126.570667, 3);
createMapAndMarker('map_i2', 33.450701, 126.570667, 3);
createMapAndMarker('map_i3', 33.450701, 126.570667, 3);
createMapAndMarker('map_i4', 33.450701, 126.570667, 3);
createMapAndMarker('map_g1', 33.450701, 126.570667, 3);
createMapAndMarker('map_g2', 33.450701, 126.570667, 3);
createMapAndMarker('map_g3', 33.450701, 126.570667, 3);
createMapAndMarker('map_c1', 33.450701, 126.570667, 3);
createMapAndMarker('map_j1', 33.450701, 126.570667, 3);
createMapAndMarker('map_j2', 33.450701, 126.570667, 3);
createMapAndMarker('map_j3', 33.450701, 126.570667, 3);
createMapAndMarker('map_d1', 33.450701, 126.570667, 3);
createMapAndMarker('map_d2', 33.450701, 126.570667, 3);
createMapAndMarker('map_d3', 33.450701, 126.570667, 3);
createMapAndMarker('map_b1', 33.450701, 126.570667, 3);
createMapAndMarker('map_b2', 33.450701, 126.570667, 3);
createMapAndMarker('map_b3', 33.450701, 126.570667, 3);
createMapAndMarker('map_b4', 33.450701, 126.570667, 3);
createMapAndMarker('map_b5', 33.450701, 126.570667, 3);
createMapAndMarker('map_b6', 33.450701, 126.570667, 3);
createMapAndMarker('map_b7', 33.450701, 126.570667, 3);