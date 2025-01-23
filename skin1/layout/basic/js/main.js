// jQuery
$(document).ready(function () {
    // [헤더] 검색창 팝업 ----------
    $('.search-btn').on('click', function () {
        $('.search-popup').addClass('show');
    });
    $('.search-bar .close-btn').on('click', function () {
        $('.search-popup').removeClass('show');
    });

    // [헤더] 로그인/로그아웃 메뉴 ----------
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
});

// Java Script
// [공통] 금액 , 설정 ----------
function formatNumberWithComma(number) {
    return number.toLocaleString('ko-KR');
}
document.querySelectorAll('.price').forEach((element) => { // 클래스가 "price"인 모든 요소에 포맷 적용
    const rawValue = parseInt(element.textContent, 10); // 텍스트를 숫자로 변환
    if (!isNaN(rawValue)) {
        element.textContent = formatNumberWithComma(rawValue); // 포맷팅된 값으로 변경
    }
});

// [퀵버튼] 호버 아이콘 변경 ----------
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

// [헤더] 검색창 현재날짜-년월일 ----------
const today = new Date(); // 현재 날짜 객체 생성
const year = today.getFullYear();       // 연도
const month = String(today.getMonth() + 1).padStart(2, '0'); // 월 (2자리)
const day = String(today.getDate()).padStart(2, '0');        // 일 (2자리)
const formattedDate = `${year}년 ${month}월 ${day}일`; // 포맷팅 (날짜를 "0000년 00월 00일" 형식으로 변환)
document.querySelector(".current_date").textContent = formattedDate + ' 00:00 기준'; // span 요소에 날짜 넣기