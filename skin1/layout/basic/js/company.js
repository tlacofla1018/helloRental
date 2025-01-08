// ---------- [메인] 유튜브 슬라이드 ----------
var newTitleSwiper = new Swiper('.youtube-swiper', {
    spaceBetween: -80, // 슬라이드 사이 여백
    slidesPerView : 1, // 한 슬라이드에 보여줄 갯수
    centeredSlides: true, //센터모드
    loop: true,
    loopAdditionalSlides: 1,
    initialSlide: 0, // 첫 번째 슬라이드부터 시작
});