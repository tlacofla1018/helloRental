// -------------------- jQuery --------------------

$(document).ready(function () {
    //---------- [헤더] 검색순위 슬릭 ----------
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

    //---------- [헤더] 검색창 팝업 ----------
    $('.search-btn').on('click', function () {
        $('.search-popup').addClass('show');
    });
    $('.search-bar .close-btn').on('click', function () {
        $('.search-popup').removeClass('show');
    });

    //---------- [헤더] 로그인/로그아웃 메뉴 ----------
    toggleMenu('.login-menu', '.login-menu-btn');
    toggleMenu('.logoff-menu', '.logoff-menu-btn');

    function toggleMenu(menuSelector, buttonSelector) {
        const $menu = $(menuSelector);
        const $button = $(buttonSelector);

        $button.on('click', function (e) {
            e.stopPropagation();
            $menu.toggleClass('show');
        });

        $(document).on('click', function (e) {
            if (!$menu.is(e.target) && $menu.has(e.target).length === 0 && !$button.is(e.target)) {
                $menu.removeClass('show');
            }
        });

        $menu.on('mouseleave', function () {
            $menu.removeClass('show');
        });
    }

    //---------- [퀵버튼] 최근 본 상품 ----------
    // $('.productrecent').slick({
    //     infinite: true,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 2000,
    //     arrows: true,
    //     prevArrow: '<button class="slick-prev"><img src="/img/icon/prevIcon-bg.svg" alt="이전 상품"></button>',
    //     nextArrow: '<button class="slick-next"><img src="/img/icon/nextIcon-bg.svg" alt="다음 상품"></button>',
    //     dots: true,
    //     customPaging: function (slider, i) {
    //         return `<img src="/img/icon/dotOff.svg" alt="${i + 1}번째 상품" class="custom-dot">`;
    //     }
    // });
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















// -------------------- Java Script --------------------

// ---------- [공통] 금액 , 설정 ----------
function formatNumberWithComma(number) {
    return number.toLocaleString('ko-KR');
}

// 클래스가 "price"인 모든 요소에 포맷 적용
document.querySelectorAll('.price').forEach((element) => {
    const rawValue = parseInt(element.textContent, 10); // 텍스트를 숫자로 변환
    if (!isNaN(rawValue)) {
        element.textContent = formatNumberWithComma(rawValue); // 포맷팅된 값으로 변경
    }
});

// ---------- [퀵버튼] 호버 아이콘 변경 ----------
document.querySelectorAll('.qbtn').forEach(qbtn => {
    const basketIcon = qbtn.querySelector('.basketIcon');
    const tellIcon = qbtn.querySelector('.tellIcon');

    qbtn.addEventListener('mouseenter', () => {
        if (basketIcon) basketIcon.src = '/img/icon/basketIcon-hover.svg';
        if (tellIcon) tellIcon.src = '/img/icon/tellIcon-hover.svg';
    });

    qbtn.addEventListener('mouseleave', () => {
        if (basketIcon) basketIcon.src = '/img/icon/basketIcon.svg';
        if (tellIcon) tellIcon.src = '/img/icon/tellIcon.svg';
    });
});



// ---------- [헤더] 검색창 추천상품 ----------

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



// ---------- [헤더] 검색창 현재날짜-년월일 ----------
// 현재 날짜 객체 생성
const today = new Date();

// 날짜를 "0000년 00월 00일" 형식으로 변환
const year = today.getFullYear();       // 연도
const month = String(today.getMonth() + 1).padStart(2, '0'); // 월 (2자리)
const day = String(today.getDate()).padStart(2, '0');        // 일 (2자리)

// 포맷팅
const formattedDate = `${year}년 ${month}월 ${day}일`;

// span 요소에 날짜 넣기
document.querySelector(".current_date").textContent = formattedDate + ' 00:00 기준';



// ---------- [메인] 메인배너 ----------

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
        el: '.swiper-pagination',
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


// ---------- [메인] 브랜드 ----------

let brandSwiper = new Swiper('.brand_swiper', {
    autoplay: {
        delay: 5000, // 자동 재생 시간 설정
        disableOnInteraction: false, // 사용자 상호작용 후에도 자동 재생 유지
    },
    spaceBetween: 30, // 슬라이드 사이 여백
    slidesPerView : 7, // 한 슬라이드에 보여줄 갯수
    // pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true,
    //     renderBullet: function (index, className) {
    //         return `<span class="${className}"></span>`;
    //     },
    // },
    navigation: {
        nextEl: ".brand_swiper .slide_nextBg_btn",
        prevEl: ".brand_swiper .slide_prevBg_btn",
    },
});


// ---------- [메인] 신제품 외부 슬라이드 ----------

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

// ---------- [메인] 신제품 내부 슬라이드 ----------

// li 너비 및 gap 총합 계산 후 swiper-slide에 적용하는 함수
function calculateSlideWidth(slideClass, scrollbarClass) {
    const swiperSlide = document.querySelector(`${slideClass} .swiper-slide`);
    const listItems = swiperSlide.querySelectorAll("li");
    const computedStyle = getComputedStyle(swiperSlide);
    const gap = parseInt(computedStyle.gap) || 0; // gap 값 가져오기

    let totalWidth = 0;

    listItems.forEach((li) => {
        totalWidth += li.offsetWidth; // 각 li의 너비값 합산
    });

    // li의 gap 포함한 총합 계산
    totalWidth += gap * (listItems.length - 1);

    swiperSlide.style.width = `${totalWidth}px`; // swiper-slide에 총합 너비 적용

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
                event.stopPropagation(); // 부모 슬라이드로 이벤트 전파 중지
            },
        },
        nested: true,
    });
}

// 슬라이드 각각 호출
calculateSlideWidth(".new-swiper1", ".new-scrollbar1");
calculateSlideWidth(".new-swiper2", ".new-scrollbar2");
calculateSlideWidth(".new-swiper3", ".new-scrollbar3");
calculateSlideWidth(".new-swiper4", ".new-scrollbar4");
calculateSlideWidth(".new-swiper5", ".new-scrollbar5");




// ---------- [메인] 카테고리 탭 + 스와이퍼 ----------
// 탭 버튼과 콘텐츠 선택
const categoryTabBtn = document.querySelectorAll('.flex-left li');
const categoryTabContents = document.querySelectorAll('.flex-right li');

// 탭 버튼 클릭 이벤트
categoryTabBtn.forEach(button => {
    button.addEventListener('click', () => {
        // 기존 활성화 클래스 제거
        categoryTabBtn.forEach(btn => btn.classList.remove('active'));
        categoryTabContents.forEach(content => content.classList.remove('active'));

        // 클릭된 버튼과 관련 콘텐츠 활성화
        button.classList.add('active');
        const targetTab = button.getAttribute('data-tab');
        document.getElementById(targetTab).classList.add('active');
    });
});

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
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: paginationClass,
            clickable: true,
            renderBullet: function (index, className) {
                return `<span class="${className}"></span>`;
            },
        },
    });
}

// 슬라이드 각각 호출
categorySwiper(".category-swiper01", ".chair .swiper-pagination");
categorySwiper(".category-swiper02", ".bed .swiper-pagination");
categorySwiper(".category-swiper03", ".recliner .swiper-pagination");