/**
 * 카테고리 마우스 오버 이미지
 * 카테고리 서브 메뉴 출력
 */

// $(function(){

//     var methods = {
//         aCategory    : [],
//         aSubCategory : {},

//         get: function()
//         {
//              $.ajax({
//                 url : '/exec/front/Product/SubCategory',
//                 dataType: 'json',
//                 success: function(aData) {

//                     if (aData == null || aData == 'undefined') return;
//                     for (var i=0; i<aData.length; i++)
//                     {
//                         var sParentCateNo = aData[i].parent_cate_no;

//                         if (!methods.aSubCategory[sParentCateNo]) {
//                             methods.aSubCategory[sParentCateNo] = [];
//                         }

//                         methods.aSubCategory[sParentCateNo].push( aData[i] );
//                     }
//                 }
//             });
//         },

//         getParam: function(sUrl, sKey) {

//             var aUrl         = sUrl.split('?');
//             var sQueryString = aUrl[1];
//             var aParam       = {};

//             if (sQueryString) {
//                 var aFields = sQueryString.split("&");
//                 var aField  = [];
//                 for (var i=0; i<aFields.length; i++) {
//                     aField = aFields[i].split('=');
//                     aParam[aField[0]] = aField[1];
//                 }
//             }
//             return sKey ? aParam[sKey] : aParam;
//         },

//         getParamSeo: function(sUrl) {
//             var aUrl = sUrl.split('/');
//             var len  = aUrl.length-2;

//             return aUrl[len] ? aUrl[len] : null;
//         },

//         show: function(overNode, iCateNo) {

//             if (methods.aSubCategory.hasOwnProperty(iCateNo) === false) {
//                 return;
//             }

//             var aHtml = [];
//             aHtml.push('<ul>');
//             $(methods.aSubCategory[iCateNo]).each(function() {
//                 aHtml.push('<li><a href="/'+this.design_page_url+this.param+'">'+this.name+'</a></li>');
//             });
//             aHtml.push('</ul>');


//             var offset = $(overNode).offset();
//             $('<div class="sub-category"></div>')
//                 .appendTo(overNode)
//                 .html(aHtml.join(''))
//                 .find('li').on({
//                     mouseover: function(e) {
//                         $(this).addClass('over');
//                     },
//                     mouseout: function(e) {
//                         $(this).removeClass('over');
//                     }
//                 });
//         },

//         close: function() {
//             $('.sub-category').remove();
//         }
//     };

//     methods.get();


//     $('.xans-layout-category li').on({
//         mouseenter: function () {
//             var $this = $(this).addClass('on'),
//                 iCateNo = Number(methods.getParam($this.find('a').attr('href'), 'cate_no'));

//             if (!iCateNo) {
//                 iCateNo = Number(methods.getParamSeo($this.find('a').attr('href')));
//             }

//             if (!iCateNo) {
//                 return;
//             }
//             methods.show($this, iCateNo);
//         },
//         mouseleave: function () {
//             $(this).removeClass('on');
//             methods.close();
//         }
//     });
// });

// $(function(){

//     var methods = {
//         aCategory    : [],
//         aSubCategory : {},

//         get: function()
//         {
//             $.ajax({
//                 url : '/exec/front/Product/SubCategory',
//                 dataType: 'json',
//                 success: function(aData) {

//                     if (aData == null || aData == 'undefined') return;
//                     for (var i=0; i<aData.length; i++)
//                     {
//                         var sParentCateNo = aData[i].parent_cate_no;

//                         if (!methods.aSubCategory[sParentCateNo]) {
//                             methods.aSubCategory[sParentCateNo] = [];
//                         }

//                         methods.aSubCategory[sParentCateNo].push( aData[i] );
//                     }

//                     // 서브 카테고리 처음부터 노출
//                     methods.showAll();
//                 }
//             });
//         },

//         getParam: function(sUrl, sKey) {

//             var aUrl         = sUrl.split('?');
//             var sQueryString = aUrl[1];
//             var aParam       = {};

//             if (sQueryString) {
//                 var aFields = sQueryString.split("&");
//                 var aField  = [];
//                 for (var i=0; i<aFields.length; i++) {
//                     aField = aFields[i].split('=');
//                     aParam[aField[0]] = aField[1];
//                 }
//             }
//             return sKey ? aParam[sKey] : aParam;
//         },

//         getParamSeo: function(sUrl) {
//             var aUrl = sUrl.split('/');
//             var len  = aUrl.length-2;

//             return aUrl[len] ? aUrl[len] : null;
//         },

//         showAll: function() {
//             var aHtml = [];
//             var firstCategory = true;  

//             // 'main-category-list' 출력
//             for (var iCateNo in methods.aSubCategory) {
//                 if (methods.aSubCategory.hasOwnProperty(iCateNo)) {
//                     if (firstCategory) {
//                         aHtml.push('<ul class="main-category-list">');
                        
//                         // 첫 번째 sub-menu의 href 값을 수정
//                         $(methods.aSubCategory[iCateNo]).each(function(index) {
//                             if (index == 0) { // 첫 번째 항목 (회사소개)
//                                 aHtml.push('<li class="sub-menu"><a href="/layout/basic/company/vision.html">' + this.name + '</a></li>');
//                             } else if (index == 1) { // 두 번째 항목 (렌탈)
//                                 aHtml.push('<li class="sub-menu"><a href="/product/list.html?cate_no=33">' + this.name + '</a></li>');
//                             } else if (index == 2) { // 세 번째 항목 (이벤트/혜택)
//                                 aHtml.push('<li class="sub-menu"><a href="/product/list.html?cate_no=26">' + this.name + '</a></li>');
//                             } else if (index == 3) { // 네 번째 항목 (매장안내)
//                                 aHtml.push('<li class="sub-menu"><a href="/layout/basic/openStudio/open_studio.html">' + this.name + '</a></li>');
//                             } else if (index == 4) { // 다섯 번째 항목 (B2B)
//                                 aHtml.push('<li class="sub-menu"><a href="/layout/basic/b2b.html">' + this.name + '</a></li>');
//                             } else if (index == 5) { // 여섯 번째 항목 (고객센터)
//                                 aHtml.push('<li class="sub-menu"><a href="/layout/basic/consumer.html">' + this.name + '</a></li>');
//                             } else {
//                                 aHtml.push('<li class="sub-menu"><a href="/' + this.design_page_url + this.param + '">' + this.name + '</a></li>');
//                             }
//                         });

//                         aHtml.push('</ul>');
//                         firstCategory = false;
//                     }
//                 }
//             }

//             // 'sub-category-list'들을 모두 하나의 div.sub-list-box 안에 담기
//             var subCategoryHtml = [];
//             subCategoryHtml.push('<div class="sub-list-box">');

//             var currentCategoryIndex = 0; // 현재 sub-category의 순서를 추적하는 변수

//             for (var iCateNo in methods.aSubCategory) {
//                 if (methods.aSubCategory.hasOwnProperty(iCateNo)) {
//                     currentCategoryIndex++; // 각 카테고리 리스트마다 증가

//                     // ul 태그 열기
//                     subCategoryHtml.push('<ul class="sub-category-list"');

//                     // 3번째와 4번째 sub-category-list만 보이도록 처리
//                     if (currentCategoryIndex !== 3) {
//                         subCategoryHtml.push(' style="display:none;"');
//                     }

//                     subCategoryHtml.push('>');

//                     // 각 카테고리의 항목 추가
//                     $(methods.aSubCategory[iCateNo]).each(function(index) {
//                         subCategoryHtml.push('<li class="sub-menu"><a href="/' + this.design_page_url + this.param + '">' + this.name + '</a></li>');
                        
//                         // 세 번째 sub-category-list에서 첫 번째, 두 번째 항목의 href를 변경
//                         // if (iCateNo == 25 && index == 0) {
//                         //     subCategoryHtml.push('<li class="sub-menu"><a href="https://tlacofla1018.cafe24.com/layout/basic/brand.html">'+this.name+'</a></li>');
//                         // } else {
//                         //     subCategoryHtml.push('<li class="sub-menu"><a href="/'+this.design_page_url+this.param+'">'+this.name+'</a></li>');
//                         // }
//                     });

//                     // ul 태그 닫기
//                     subCategoryHtml.push('</ul>');
//                 }
//             }
            
//             subCategoryHtml.push('</div>'); // div.sub-list-box 닫기

//             // 페이지에 바로 출력
//             $('.category_depth').html(aHtml.join('') + subCategoryHtml.join(''));
//         }
//     };

//     methods.get();

// });

$(function () {
    var methods = {
        aSubCategory: {},

        // 서브 카테고리 데이터 가져와서 미리 저장
        get: function () {
            $.ajax({
                url: '/exec/front/Product/SubCategory',
                dataType: 'json',
                success: function (aData) {
                    if (!aData || aData.length === 0) return; // 데이터가 없으면 실행 중지

                    for (var i = 0; i < aData.length; i++) {
                        var sParentCateNo = aData[i].parent_cate_no;

                        if (!methods.aSubCategory[sParentCateNo]) {
                            methods.aSubCategory[sParentCateNo] = [];
                        }
                        methods.aSubCategory[sParentCateNo].push(aData[i]);
                    }

                    methods.renderSubCategories(); // ✅ 데이터 로딩 후 실행
                },
                error: function (xhr, status, error) {
                    console.error("AJAX 오류:", error);
                }
            });
        },

        // 서브 카테고리를 미리 렌더링해서 각 li에 숨겨둠
        renderSubCategories: function () {
            $('.xans-layout-category li').each(function () {
                var $this = $(this);
                var iCateNo = Number(methods.getParam($this.find('a').attr('href'), 'cate_no')) ||
                              Number(methods.getParamSeo($this.find('a').attr('href')));

                if (!iCateNo || !methods.aSubCategory[iCateNo]) return; // ✅ 데이터가 없으면 중단

                var aHtml = ['<ul class="sub-category">'];
                $(methods.aSubCategory[iCateNo]).each(function () {
                    aHtml.push('<li><a href="/' + this.design_page_url + this.param + '">' + this.name + '</a></li>');
                });
                aHtml.push('</ul>');

                if (!$this.find('.sub-category').length) { // ✅ 중복 추가 방지
                    $this.append(aHtml.join(''));
                }
            });
        },

        // URL 파라미터 가져오기
        getParam: function (sUrl, sKey) {
            var aUrl = sUrl.split('?');
            var sQueryString = aUrl[1];
            var aParam = {};

            if (sQueryString) {
                var aFields = sQueryString.split('&');
                for (var i = 0; i < aFields.length; i++) {
                    var aField = aFields[i].split('=');
                    aParam[aField[0]] = aField[1];
                }
            }
            return sKey ? aParam[sKey] : aParam;
        },

        // SEO-friendly URL에서 카테고리 번호 추출
        getParamSeo: function (sUrl) {
            var aUrl = sUrl.split('/');
            var len = aUrl.length - 2;
            return aUrl[len] ? aUrl[len] : null;
        }
    };

    methods.get();

    $(function () {
        // 카테고리 영역에 호버하면 헤더 배경 보이기
        $('.xans-layout-category').hover(
            function () {
                $('.header_bg').addClass('on').css('display', 'flex');
            },
            function () {
                if (!$('.header_bg').is(':hover') && !$('.xans-layout-category li:hover').length) {
                    $('.header_bg').removeClass('on').css('display', 'none');
                }
            }
        );


        // 서브 카테고리가 있는 li에 호버 시 서브 카테고리 보이기
        $('.xans-layout-category li').hover(
            function () {
                var $subCategory = $(this).find('.sub-category');

                // 기존의 on 제거 후 현재 호버된 요소만 on 추가
                $('.xans-layout-category li .sub-category').css('display', 'none');
                $('.xans-layout-category li').removeClass('on');

                if ($subCategory.length) {
                    $(this).addClass('on'); // 현재 호버된 li만 on 추가
                    $subCategory.css('display', 'flex');
                    $('.header_bg').addClass('on').css('display', 'flex'); // header_bg 유지
                }
            },
            function () {
                var $subCategory = $(this).find('.sub-category');

                // 일정 시간 후 마우스가 다른 요소 위에 있는지 확인 후 닫기
                setTimeout(function () {
                    if (!$('.xans-layout-category li:hover').length && 
                        !$('.sub-category:hover').length && 
                        !$('.header_bg:hover').length) {
                        $subCategory.css('display', 'none');
                        $('.header_bg').removeClass('on').css('display', 'none'); // 모든 영역 벗어나면 숨김
                        $('.xans-layout-category li').removeClass('on'); // on 클래스 제거
                    }
                }, 100);
            }
        );

        // 서브 카테고리가 있는 li에 호버 시 서브 카테고리 보이기
        $('.xans-layout-category li').hover(
            function () {
                var $subCategory = $(this).find('.sub-category');

                // 기존의 on 제거 후 현재 호버된 요소만 on 추가
                $('.xans-layout-category li .sub-category').css('display', 'none');
                $('.xans-layout-category li').removeClass('on');

                if ($subCategory.length) {
                    $(this).addClass('on'); // 현재 호버된 li만 on 추가
                    $subCategory.css('display', 'flex');
                    $('.header_bg').addClass('on').css('display', 'flex'); // header_bg 유지
                }
            },
            function () {
                // 마우스가 다른 곳으로 이동하면 닫기
                hideSubCategory();
            }
        );

        // 서브 카테고리에서도 유지되도록 설정
        $('.sub-category, .header_bg').hover(
            function () {
                $('.header_bg').addClass('on').css('display', 'flex');
            },
            function () {
                // 서브 카테고리에서 나갔을 때 닫기
                hideSubCategory();
            }
        );

        // 서브 카테고리를 닫는 함수
        function hideSubCategory() {
            if (!$('.xans-layout-category li:hover').length && 
                !$('.sub-category:hover').length && 
                !$('.header_bg:hover').length) {
                $('.sub-category').css('display', 'none');
                $('.header_bg').removeClass('on').css('display', 'none');
                $('.xans-layout-category li').removeClass('on'); // on 클래스 제거
            }
        }
    
        // header_bg를 벗어나면 숨기기
        $('.header_bg').mouseleave(function () {
            if (!$('.xans-layout-category li:hover').length) {
                $('.header_bg').removeClass('on').css('display', 'none');
            }
        });
    });
});