(function ($) {
    'use strict';
    var pageType = 902;
    var ajaxListsProductsContainer = $('.ajax-lists-products');
    var ajaxListsProductsHeadline = $('h2');
    var ignoreScroll = false;

    var loadAjaxListProducts = function (offset, productFinderFilter) {



        $.ajax({
            //TODO: die URL sollte generisch im template gesetzt weden
            url: '/index.php/',
            method: 'POST',
            data: {
                type: pageType,
                offset: offset,
                productFinderFilter: productFinderFilter
            },
            success: function(response) {
                ajaxListsProductsContainer.append(response);
                ajaxListsProductsHeadline.html(ajaxListProductsCount + ' Produkte gefunden')
                ignoreScroll = false;
            },
            error: function(error) {
                console.error(error);
            }
        });
    };

    $(document).ready(function () {

        sessionStorage.clear();
        sessionStorage.setItem('ajaxListProductsOffset', ajaxListProductsOffset);

        loadAjaxListProducts(parseInt(sessionStorage.getItem('ajaxListProductsOffset')), null);


        $('#productFinder input[type=radio]').change(function () {

            var buttonGroup = $(this).parent().parent();
            var button = $(this).parent();

            $(buttonGroup).find(':input').attr('checked', false);
            $(buttonGroup).find('img').removeClass('border-tiger-orange rounded');

            $(button).find(':input').attr('checked', true);
            $(button).find('img').addClass('border-tiger-orange rounded');

            var productFinderFilter = {};
            productFinderFilter['event'] = $(this).attr('name');

            var inputFields = $('input', '#productFinder');

            $.each(inputFields, function (i, field) {
                var checkedInputField = $(field).parent().find(':checked');

                var name = checkedInputField.attr('name');
                productFinderFilter[name] = checkedInputField.val();
            });

            sessionStorage.setItem('productFinderFilter', JSON.stringify(productFinderFilter));

            var offset = ajaxListProductsOffset;
            sessionStorage.setItem('ajaxListProductsOffset', offset);
            ajaxListsProductsContainer.empty();

            loadAjaxListProducts(offset, productFinderFilter);

        });

        $(window).scroll(function () {
            var windowHeight = parseInt($(window).height());
            var documentHeight = parseInt($(document).height());
            var footerHight = 520;
            var windowScrollTop = parseInt($(window).scrollTop());

            if (windowScrollTop >= (documentHeight - windowHeight - footerHight) && !ignoreScroll) {

                var offset = parseInt(sessionStorage.getItem('ajaxListProductsOffset'));
                offset = offset + ajaxListProductsLimit;
                sessionStorage.setItem('ajaxListProductsOffset', offset);

                var productFinderFilter = JSON.parse(sessionStorage.getItem('productFinderFilter'));

                if((offset - ajaxListProductsLimit) <= parseInt(ajaxListProductsCount)){
                    loadAjaxListProducts(offset, productFinderFilter);
                }

                ignoreScroll = true;
            }
        });

    });

})(jQuery);