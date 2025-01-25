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

$(function(){

    var methods = {
        aCategory    : [],
        aSubCategory : {},

        get: function()
        {
            $.ajax({
                url : '/exec/front/Product/SubCategory',
                dataType: 'json',
                success: function(aData) {

                    if (aData == null || aData == 'undefined') return;
                    for (var i=0; i<aData.length; i++)
                    {
                        var sParentCateNo = aData[i].parent_cate_no;

                        if (!methods.aSubCategory[sParentCateNo]) {
                            methods.aSubCategory[sParentCateNo] = [];
                        }

                        methods.aSubCategory[sParentCateNo].push( aData[i] );
                    }

                    // 서브 카테고리 처음부터 노출
                    methods.showAll();
                }
            });
        },

        getParam: function(sUrl, sKey) {

            var aUrl         = sUrl.split('?');
            var sQueryString = aUrl[1];
            var aParam       = {};

            if (sQueryString) {
                var aFields = sQueryString.split("&");
                var aField  = [];
                for (var i=0; i<aFields.length; i++) {
                    aField = aFields[i].split('=');
                    aParam[aField[0]] = aField[1];
                }
            }
            return sKey ? aParam[sKey] : aParam;
        },

        getParamSeo: function(sUrl) {
            var aUrl = sUrl.split('/');
            var len  = aUrl.length-2;

            return aUrl[len] ? aUrl[len] : null;
        },

        showAll: function() {
            var aHtml = [];
            var firstCategory = true;  

            // 'main-category-list' 출력
            for (var iCateNo in methods.aSubCategory) {
                if (methods.aSubCategory.hasOwnProperty(iCateNo)) {
                    if (firstCategory) {
                        aHtml.push('<ul class="main-category-list">');
                        
                        // 첫 번째 sub-menu의 href 값을 수정
                        $(methods.aSubCategory[iCateNo]).each(function(index) {
                            if (index == 0) { // 첫 번째 항목
                                aHtml.push('<li class="sub-menu"><a href="https://tlacofla1018.cafe24.com/layout/basic/company.html">'+this.name+'</a></li>');
                            // } else if (index == 1) { // 두 번째 항목
                            //     aHtml.push('<li class="sub-menu"><a href="https://tlacofla1018.cafe24.com/layout/basic/rental.html">' + this.name + '</a></li>');
                            } else {
                                aHtml.push('<li class="sub-menu"><a href="/'+this.design_page_url+this.param+'">'+this.name+'</a></li>');
                            }
                        });
                        aHtml.push('</ul>');
                        firstCategory = false;
                    }
                }
            }

            // 'sub-category-list'들을 모두 하나의 div.sub-list-box 안에 담기
            var subCategoryHtml = [];
            subCategoryHtml.push('<div class="sub-list-box">');

            var currentCategoryIndex = 0; // 현재 sub-category의 순서를 추적하는 변수

            for (var iCateNo in methods.aSubCategory) {
                if (methods.aSubCategory.hasOwnProperty(iCateNo)) {
                    currentCategoryIndex++; // 각 카테고리 리스트마다 증가

                    // ul 태그 열기
                    subCategoryHtml.push('<ul class="sub-category-list"');

                    // 3번째와 4번째 sub-category-list만 보이도록 처리
                    if (currentCategoryIndex !== 3 && currentCategoryIndex !== 4) {
                        subCategoryHtml.push(' style="display:none;"');
                    }

                    subCategoryHtml.push('>');

                    // 각 카테고리의 항목 추가
                    $(methods.aSubCategory[iCateNo]).each(function(index) {
                        subCategoryHtml.push('<li class="sub-menu"><a href="/' + this.design_page_url + this.param + '">' + this.name + '</a></li>');
                        
                        // 세 번째 sub-category-list에서 첫 번째, 두 번째 항목의 href를 변경
                        // if (iCateNo == 25 && index == 0) {
                        //     subCategoryHtml.push('<li class="sub-menu"><a href="https://tlacofla1018.cafe24.com/layout/basic/brand.html">'+this.name+'</a></li>');
                        // } else {
                        //     subCategoryHtml.push('<li class="sub-menu"><a href="/'+this.design_page_url+this.param+'">'+this.name+'</a></li>');
                        // }
                    });

                    // ul 태그 닫기
                    subCategoryHtml.push('</ul>');
                }
            }
            
            subCategoryHtml.push('</div>'); // div.sub-list-box 닫기

            // 페이지에 바로 출력
            $('.category_depth').html(aHtml.join('') + subCategoryHtml.join(''));
        }
    };

    methods.get();

});