// jQuery
$(function () {
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

    // [퀵바] 상품 비교하기 ----------
    const maxChecked = 4; // 최대 체크 가능 갯수
    const $checkBoxes = $('input[type="checkbox"][id^="compare_"]');
    const $countSpan = $('.compare_count'); // 갯수를 표시할 span
    const $targetElement = $('.compare .count'); // 숨길 요소 (갯수가 0일 때 디넌 처리)
    let checkedOrder = []; // 체크된 순서를 추적할 배열

    // localStorage 키 설정
    const storageKey = 'checkedCheckboxes';

    // 페이지 로드 시 저장된 상태 복원
    function loadCheckboxState() {
        const savedState = JSON.parse(localStorage.getItem(storageKey)) || [];
        checkedOrder = savedState; // 복원된 순서를 설정
        savedState.forEach(id => {
            const $checkbox = $(`#${id}`);
            if ($checkbox.length) {
                $checkbox.prop('checked', true); // 체크박스를 체크 상태로 설정
            }
        });
        $countSpan.text(checkedOrder.length); // 갯수 업데이트

        // 갯수가 0이면 숨김 처리
        if (checkedOrder.length === 0) {
            $targetElement.hide();
        } else {
            $targetElement.show();
        }
    }

    // 체크 상태 저장
    function saveCheckboxState() {
        localStorage.setItem(storageKey, JSON.stringify(checkedOrder));
    }

    // 체크박스 상태 변경 이벤트
    $checkBoxes.on('change', function () {
        const checkboxId = $(this).attr('id');

        if ($(this).is(':checked')) {
            // 체크박스를 체크한 경우
            checkedOrder.push(checkboxId);

            if (checkedOrder.length > maxChecked) {
                // 최대 갯수를 초과하면 가장 오래된 체크박스를 해제
                const oldestCheckedId = checkedOrder.shift(); // 배열에서 가장 오래된 ID 제거
                $(`#${oldestCheckedId}`).prop('checked', false); // 해당 체크박스 해제
            }
        } else {
            // 체크박스를 해제한 경우
            const index = checkedOrder.indexOf(checkboxId);
            if (index > -1) {
                checkedOrder.splice(index, 1); // 배열에서 해당 ID 제거
            }
        }

        saveCheckboxState(); // 상태 저장
        $countSpan.text(checkedOrder.length); // 갯수 업데이트

        // 갯수가 0이면 숨김 처리
        if (checkedOrder.length === 0) {
            $targetElement.hide();
        } else {
            $targetElement.show();
        }
    });

    // [그리드] 2/4 ----------
    const $viewLeftLink = $('.view_left a');
    const $viewRightLink = $('.view_right a');
    const $viewLeftImg = $('.view_left img');
    const $viewRightImg = $('.view_right img');
    const $prdList = $('.ec-base-product.normal_product_list .prdList');

    // 요소가 있을 때만 이벤트 리스너 추가
    if ($viewLeftLink.length && $viewRightLink.length) {
        // 초기 상태 설정: 기본은 4개씩 보기로 설정
        $viewLeftImg.attr('src', '/img/icon/sort_left_on.svg');
        $viewRightImg.attr('src', '/img/icon/sort_right_off.svg');
        $prdList.removeClass('grid2').addClass('grid4');

        // "4개씩 보기" 클릭 시
        $viewLeftLink.on('click', function (e) {
            e.preventDefault(); // 기본 동작 막기
            console.log('4개씩 보기 클릭됨');
            $viewLeftImg.attr('src', '/img/icon/sort_left_on.svg');
            $viewRightImg.attr('src', '/img/icon/sort_right_off.svg');
            
            // 그리드 클래스 변경
            $prdList.removeClass('grid2').addClass('grid4');
            console.log('그리드 클래스 변경: grid4');
        });

        // "2개씩 보기" 클릭 시
        $viewRightLink.on('click', function (e) {
            e.preventDefault(); // 기본 동작 막기
            console.log('2개씩 보기 클릭됨');
            $viewLeftImg.attr('src', '/img/icon/sort_left_off.svg');
            $viewRightImg.attr('src', '/img/icon/sort_right_on.svg');
            
            // 그리드 클래스 변경
            $prdList.removeClass('grid4').addClass('grid2');
            console.log('그리드 클래스 변경: grid2');
        });
    } else {
        console.error('View left or right links are missing.');
    }

    // 페이지를 떠날 때 체크 기록 초기화
    function clearCheckboxStateOnLeave() {
        window.addEventListener('beforeunload', function () {
            localStorage.removeItem(storageKey); // localStorage 기록 삭제
        });
    }

    // 초기 상태 복원
    loadCheckboxState();

    // 페이지 떠날 때 체크 상태 초기화
    clearCheckboxStateOnLeave();

    // [브랜드] 더보기 버튼 ----------
    const brandItems = $("#brand_content .prdList > li"); // 모든 li 요소
    const brandItemsPerClick = 6; // 한 번에 표시할 항목 수
    let brandVisibleCount = 6; // 초기 표시 개수

    // li 개수가 6개 이하라면 "더보기" 버튼 숨기기
    if (brandItems.length <= brandVisibleCount) {
        $("#brand_content .more_btn").hide(); // "더보기" 버튼 숨기기
    } else {
        brandItems.hide().slice(0, brandVisibleCount).show(); // 초기 6개 항목만 표시
    }

    // "더보기" 버튼 클릭 이벤트
    $("#brand_content .more_btn").click(function () {
        brandVisibleCount += brandItemsPerClick; // 표시 개수 증가
        brandItems.slice(0, brandVisibleCount).slideDown(); // 추가 항목 표시

        // 모든 항목이 표시되면 버튼 숨기기
        if (brandVisibleCount >= brandItems.length) {
            $(this).hide(); // "더보기" 버튼 숨기기
        }
    });
});

// Java Script
// [공통] 페이지별 컨텐츠 노출 ----------
const currentUrl = window.location.href;

// URL에서 cate_no 값 추출
const cateNoMatch = currentUrl.match(/cate_no=(\d+)/);
const cateNo = cateNoMatch ? cateNoMatch[1] : null;

// 모든 컨텐츠 숨기기
document.querySelectorAll('.list_main').forEach(element => {
    element.style.display = 'none';
});
document.querySelectorAll('.brand_banner').forEach(element => {
    element.style.display = 'none';
});

// cate_no에 해당하는 컨텐츠 노출
if (cateNo) {
    if (cateNo === "25") {
        const rental = document.getElementById('rental_content');
        if (rental) {
            rental.style.display = 'block'; // 렌탈만 보이기
        }
    } else if (cateNo === "32") {
        const brand = document.getElementById('brand_content');
        if (brand) {
            brand.style.display = 'block'; // 브랜드관만 보이기
        }
    } else if (cateNo === "57") {
        const brand_list = document.getElementById('brand_list_content');
        if (brand_list) {
            brand_list.style.display = 'block'; // 브랜드 리스트만 보이기
            
            const brandBanner = document.querySelector('.brams_brand_banner');
            if (brandBanner) {
                brandBanner.style.display = 'block'; // 배너 노출
                setTimeout(() => {
                    document.querySelector('.brand_banner_content').classList.add('animated'); // 애니메이션 트리거
                }, 100);
            }
        }
    } else if (cateNo === "58") {
        const brand_list = document.getElementById('brand_list_content');
        if (brand_list) {
            brand_list.style.display = 'block'; // 브랜드 리스트만 보이기
            
            const brandBanner = document.querySelector('.coway_brand_banner');
            if (brandBanner) {
                brandBanner.style.display = 'block'; // 배너 노출
                setTimeout(() => {
                    document.querySelector('.brand_banner_content').classList.add('animated'); // 애니메이션 트리거
                }, 100);
            }
        }
    } else {
        const list = document.getElementById('list_content');
        if (list) {
            list.style.display = 'block'; // 기본 페이지
        }
    }
}

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

// [공통] 탭
function tabFunction(containerSelector) {
    // 컨테이너 내 탭 버튼과 콘텐츠를 선택
    const container = document.querySelector(containerSelector);
    if (!container) return; // 컨테이너가 없으면 함수 종료

    const tabBtns = container.querySelectorAll('.tab_btn li');
    const tabContents = container.querySelectorAll('.tab_content li');

    // 탭 버튼 클릭 이벤트 설정
    tabBtns.forEach(button => {
        button.addEventListener('click', () => {
            // 기존 활성화 클래스 제거
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // 클릭된 버튼과 관련 콘텐츠 활성화
            button.classList.add('active');
            const targetTab = button.getAttribute('data-tab');
            const targetContent = container.querySelector(`#${targetTab}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// 메인인덱스 카테고리 탭
if (document.querySelector('#category .tab_container')) {
    tabFunction('#category .tab_container');
}

// 렌탈 하위분류 탭
if (document.querySelector('#rental_category .tab_container')) {
    tabFunction('#rental_category .tab_container');
}

// [퀵버튼] 호버 아이콘 변경 ----------
document.querySelectorAll('.qbtn').forEach(qbtn => {
    const compareIcon = qbtn.querySelector('.compareIcon');
    const tellIcon = qbtn.querySelector('.tellIcon');

    qbtn.addEventListener('mouseenter', () => {
        if (compareIcon) compareIcon.src = '/img/icon/compare_icon_hover.svg';
        if (tellIcon) tellIcon.src = '/img/icon/tellIcon-hover.svg';
    });

    qbtn.addEventListener('mouseleave', () => {
        if (compareIcon) compareIcon.src = '/img/icon/compare_icon.svg';
        if (tellIcon) tellIcon.src = '/img/icon/tellIcon.svg';
    });
});

// [상품 정렬] ----------
function toggleOptionList() {
    var optionList = document.getElementsByClassName('option_list')[0];
    if (optionList.className.includes('show')) {
        optionList.className = optionList.className.replace('show', '').trim();
    } else {
        optionList.className += ' show';
    }
}

// 페이지 로드 시, sort 클래스를 가진 요소의 텍스트로 버튼 텍스트 변경
window.onload = function() {
    var selectBtn = document.getElementsByClassName('select_btn')[0];
    var sortElement = document.querySelector('.sort');

    if (sortElement) {
        selectBtn.textContent = sortElement.textContent; // sort 클래스를 가진 요소의 텍스트로 버튼 텍스트 변경
    }
};

document.addEventListener('click', function(event) {
    var optionList = document.getElementsByClassName('option_list')[0];
    var selectBox = document.getElementsByClassName('select_box')[0];

    // 클릭된 곳이 select_box 또는 그 안의 요소가 아닐 경우 show 클래스를 제거
    if (!selectBox.contains(event.target)) {
        if (optionList.className.includes('show')) {
            optionList.className = optionList.className.replace('show', '').trim();
        }
    }
});

// [헤더] 검색창 현재날짜-년월일 ----------
const today = new Date(); // 현재 날짜 객체 생성
const year = today.getFullYear();       // 연도
const month = String(today.getMonth() + 1).padStart(2, '0'); // 월 (2자리)
const day = String(today.getDate()).padStart(2, '0');        // 일 (2자리)
const formattedDate = `${year}년 ${month}월 ${day}일`; // 포맷팅 (날짜를 "0000년 00월 00일" 형식으로 변환)
document.querySelector(".current_date").textContent = formattedDate + ' 00:00 기준'; // span 요소에 날짜 넣기

