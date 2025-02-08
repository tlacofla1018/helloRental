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
                // 특정 슬라이드는 높이 조정 제외
                if (!['.rental_brand_swiper', '.youtube_swiper', '#b2b_content .b2b_swiper'].includes(selector)) {
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

autoSlideSwiperBG('#b2b_content .b2b_swiper', {
    slidesPerView: "auto",
    spaceBetween: 20,
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
    slidesPerView: "auto",
    freeMode: true,
    scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
        dragSize: 140,
    },
    mousewheel: true,
});

// 요소가 없으면 함수 실행 중단 -> 전역 범위에서는 return 사용 불가하므로 즉시 실행 함수 사용
(() => {
    const label = document.querySelector(".label");
    const options = document.querySelectorAll(".optionItem");
    const selectBox = document.querySelector(".map_selectBox");

    if (!label || !options.length || !selectBox) {
        return;
    }

    // 드롭다운 메뉴 열고 닫기
    label.addEventListener("click", function (event) {
        event.stopPropagation();
        selectBox.classList.toggle("active");
    });

    // 옵션 클릭 시 선택한 값 적용 + 드롭다운 닫기
    options.forEach((option) => {
        option.addEventListener("click", function (event) {
            event.stopPropagation();

            // 선택한 옵션의 텍스트를 label에 반영
            label.textContent = this.textContent;

            // 드롭다운 닫기
            selectBox.classList.remove("active");

            // 모든 옵션 박스 숨김
            document.querySelectorAll(".map_optionItemBox").forEach((box) => {
                box.style.display = "none";
            });

            // 선택한 옵션과 매칭되는 박스만 표시
            const selectedClass = this.classList[1]?.replace("optionItem_", "map_optionItemBox_");
            const selectedBox = selectedClass ? document.querySelector("." + selectedClass) : null;
            if (selectedBox) {
                selectedBox.style.display = "block";

                // 지도 생성 함수 호출 (각 지도 컨테이너가 존재하는지 확인 후 실행)
                const locations = [
                    ["map_s1", 37.58215549826089, 126.88828066386085, 12256059],
                    ["map_s2", 37.5122197905037, 126.850668115021, 7981432],
                    ["map_s3", 37.625475239417, 126.891239514577, 1709493349],
                    ["map_i1", 37.501738269947, 126.722936953106, 18216252],
                    ["map_i2", 37.501738269947, 126.722936953106, 26981707],
                    ["map_i3", 37.72218868627937, 127.0482828523194, 8224334],
                    ["map_i4", 37.501738269947, 126.722936953106, 1332789312],
                    ["map_g1", 37.771164886328926, 128.9109412192755, 8008692],
                    ["map_g2", 37.3281627041938, 127.97631046052452, 10499085],
                    ["map_g3", 37.89466563833509, 127.74671810291392, 25539183],
                    ["map_c1", 36.88613086488948, 126.61670342136986, 27150954],
                    ["map_j1", 35.58735143148956, 126.85942185920504, 12841710],
                    ["map_j2", 34.80137756370428, 126.41440858915229, 9574064],
                    ["map_j3", 34.953804738096004, 127.52584638063139, 1346876084],
                    ["map_d1", 35.8395429095138, 128.626404489539, 27319412],
                    ["map_d2", 35.85193815298739, 129.20969583415504, 26893446],
                    ["map_d3", 36.58135498810642, 128.73466505884917, 9856721],
                    ["map_b1", 35.169246097308935, 129.17667658559583, 12904290],
                    ["map_b2", 35.15559158638332, 129.06461723979263, 2094229657],
                    ["map_b3", 35.2359386429224, 128.68933401177455, 27367741],
                    ["map_b4", 35.2387308157627, 128.867810301474, 11872428],
                    ["map_b5", 35.1555660671912, 129.0646604856535, 12479829],
                    ["map_b6", 35.15560054737253, 129.0646202094601, 27088673],
                    ["map_b7", 35.235945400087765, 128.68933415191506, 27367741],
                ];

                locations.forEach(([id, lat, lng, placeId]) => {
                    const mapContainer = document.getElementById(id);
                    if (mapContainer) {
                        createMapAndMarker(id, lat, lng, placeId);
                    }
                });
            }
        });
    });

    // 드롭다운 영역 밖을 클릭하면 닫기
    document.addEventListener("click", function () {
        selectBox.classList.remove("active");
    });
})();


// 지도를 생성하는 함수
function createMapAndMarker(containerId, lat, lng, placeId) {
    var mapContainer = document.getElementById(containerId);

    // 요소가 존재하지 않으면 함수 실행 중단
    if (!mapContainer) {
        console.warn(`지도를 생성할 컨테이너(${containerId})가 존재하지 않습니다.`);
        return;
    }

    var mapOption = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 3
    };
    var map = new kakao.maps.Map(mapContainer, mapOption);

    var imageSrc = 'https://tlacofla1018.cafe24.com/img/company/map_marker.png', // 마커 이미지 경로
        imageSize = new kakao.maps.Size(52, 64), // 마커 이미지 크기
        imageOption = { offset: new kakao.maps.Point(27, 64) }; // 마커 이미지 옵션

    // 마커 이미지 객체 생성
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
        markerPosition = new kakao.maps.LatLng(lat, lng);

    // 마커 생성 (markerImage 적용)
    var marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage // 마커 이미지 추가
    });

    // 지도에 마커 표시
    marker.setMap(map);

    // .store_name을 가진 요소 찾기
    var customOverlayElement = document.querySelector(`#${containerId} ~ .map_info .store_name`);

    // 요소가 존재하면 텍스트 추출
    var storeText = customOverlayElement ? customOverlayElement.textContent.trim() : "LG헬로비전";

    // 커스텀 오버레이 내용 생성
    var content = `
        <div class="map_customoverlay">
            <a href="https://map.kakao.com/link/map/${placeId}" target="_blank">
                <span class="map_title">${storeText}</span>
            </a>
        </div>
    `;

    // 💡 오버레이를 마커 위에 위치하도록 `yAnchor` 값을 조정
    var customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        position: markerPosition, // 마커 위치와 동일하게 설정
        content: content,
        yAnchor: 3 // 기본 값(1)보다 높게 설정해 마커 위로 띄우기
    });

    return map;
}

// 지도 생성
createMapAndMarker('map_s1', 37.58215549826089, 126.88828066386085, 12256059);
createMapAndMarker('map_s2', 37.5122197905037, 126.850668115021, 7981432);
createMapAndMarker('map_s3', 37.625475239417, 126.891239514577, 1709493349);
createMapAndMarker('map_i1', 37.501738269947, 126.722936953106, 18216252);
createMapAndMarker('map_i2', 37.501738269947, 126.722936953106, 26981707);
createMapAndMarker('map_i3', 37.72218868627937, 127.0482828523194, 8224334);
createMapAndMarker('map_i4', 37.501738269947, 126.722936953106, 1332789312);
createMapAndMarker('map_g1', 37.771164886328926, 128.9109412192755, 8008692);
createMapAndMarker('map_g2', 37.3281627041938, 127.97631046052452, 10499085);
createMapAndMarker('map_g3', 37.89466563833509, 127.74671810291392, 25539183);
createMapAndMarker('map_c1', 36.88613086488948, 126.61670342136986, 27150954);
createMapAndMarker('map_j1', 35.58735143148956, 126.85942185920504, 12841710);
createMapAndMarker('map_j2', 34.80137756370428, 126.41440858915229, 9574064);
createMapAndMarker('map_j3', 34.953804738096004, 127.52584638063139, 1346876084);
createMapAndMarker('map_d1', 35.8395429095138, 128.626404489539, 27319412);
createMapAndMarker('map_d2', 35.85193815298739, 129.20969583415504, 26893446);
createMapAndMarker('map_d3', 36.58135498810642, 128.73466505884917, 9856721);
createMapAndMarker('map_b1', 35.169246097308935, 129.17667658559583, 12904290);
createMapAndMarker('map_b2', 35.15559158638332, 129.06461723979263, 2094229657);
createMapAndMarker('map_b3', 35.2359386429224, 128.68933401177455, 27367741);
createMapAndMarker('map_b4', 35.2387308157627, 128.867810301474, 11872428);
createMapAndMarker('map_b5', 35.1555660671912, 129.0646604856535, 12479829);
createMapAndMarker('map_b6', 35.15560054737253, 129.0646202094601, 27088673);
createMapAndMarker('map_b7', 35.235945400087765, 128.68933415191506, 27367741);
createMapAndMarker('openStudio_1', 35.2350206837638, 128.866411000408, 1773954104);
createMapAndMarker('openStudio_2', 37.335574340078715, 127.92920604803543, 53956412);
createMapAndMarker('openStudio_3', 34.8131395139559, 126.462089373874, 1655856961);