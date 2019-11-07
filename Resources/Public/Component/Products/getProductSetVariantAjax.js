(function ($) {
    'use strict';
    var typeNum = 1560268508;

    var $productSetVariantFilterContainer = $('.variants-filter');
    var productSetVariantArticleNumber_button_href_orig = '';

    var _getProductSetVariantByFilter = function (productSetVariantGroupUid, productSetVariantFilterTypeValueArr) {

        $.ajax({
            url: '/index.php',
            method: 'POST',
            data: {
                type: typeNum,
                productSetVariantGroupUid: productSetVariantGroupUid,
                productSetVariantFilterTypValueNoFilterTyp: productSetVariantFilterTypeValueArr['noFilterTyp'],
                productSetVariantFilterTypValueLength: productSetVariantFilterTypeValueArr['length'],
                productSetVariantFilterTypValueMaterial: productSetVariantFilterTypeValueArr['material'],
                productSetVariantFilterTypValueVersion: productSetVariantFilterTypeValueArr['version']
            },
            success: function (response) {

                var responseObj = jQuery.parseJSON(response);
                var productSetVariantGroupUid = responseObj.productSetVariantGroupUid;
                var productSetVariantUid = responseObj.productSetVariantUid;
                var productSetVariantArticleNumber = responseObj.productSetVariantArticleNumber;
                var productSetVariantListPrice = responseObj.productSetVariantListPrice;
                var productSetVariantBuyPrice = responseObj.productSetVariantBuyPrice;

                if(parseInt(productSetVariantListPrice) > 0){
                    $('.productSetVariantListPrice_' + productSetVariantGroupUid).text(productSetVariantListPrice + ' €');
                    $('.productSetVariantBuyPrice_' + productSetVariantGroupUid).text(productSetVariantBuyPrice + ' €');
                    $('.only-without-price_' + productSetVariantGroupUid).addClass('d-none');
                    $('.only-with-price_' + productSetVariantGroupUid).removeClass('d-none');
                }else{
                    $('.productSetVariantListPrice_' + productSetVariantGroupUid).text(9999 + ' €');
                    $('.productSetVariantBuyPrice_' + productSetVariantGroupUid).text(9999 + ' €');
                    $('.only-without-price_' + productSetVariantGroupUid).removeClass('d-none');
                    $('.only-with-price_' + productSetVariantGroupUid).addClass('d-none');
                }

                $('.productSetVariantUid_' + productSetVariantGroupUid).val(productSetVariantUid);
                $('.productSetVariantArticleNumber_' + productSetVariantGroupUid).text(productSetVariantArticleNumber);

                if(productSetVariantArticleNumber_button_href_orig === ''){
                    productSetVariantArticleNumber_button_href_orig = $('.productSetVariantArticleNumber_button_' + productSetVariantGroupUid).attr("href");
                }
                var productSetVariantArticleNumber_button_href_new = productSetVariantArticleNumber_button_href_orig + '?productSetVariantArticleNumber=' + productSetVariantArticleNumber;
                $('.productSetVariantArticleNumber_button_' + productSetVariantGroupUid).attr('href', productSetVariantArticleNumber_button_href_new);

            },
            error: function (error) {
                console.error(error);
            }
        });
    };

    var _setVariantFilterTypValue = function (variantsFilterContainer){

        var $radioGroup = $(variantsFilterContainer).find("input:radio");
        var productSetVariantGroupUid = 0;
        var filterType = 0;
        var productSetVariantFilterTypeValueArr = [];

        if($radioGroup){
            $($radioGroup).each(function(){
                var radioGroupName = this.name;
                var radioGroupNameSplit = radioGroupName.split('_');
                filterType = radioGroupNameSplit[1];
                productSetVariantGroupUid = radioGroupNameSplit[2];

                productSetVariantFilterTypeValueArr[filterType] = $('input[name=' + radioGroupName + ']:checked').val();

            });

            _getProductSetVariantByFilter(productSetVariantGroupUid, productSetVariantFilterTypeValueArr);
        }

    };

    $(document).ready(function () {

        $productSetVariantFilterContainer.each(function(){
            _setVariantFilterTypValue(this);
        });

        $("input:radio").on("change", function(){
            var variantsFilterContainer = $(this).parent().parent().parent().parent();
            _setVariantFilterTypValue(variantsFilterContainer);
        });

    });

})(jQuery);