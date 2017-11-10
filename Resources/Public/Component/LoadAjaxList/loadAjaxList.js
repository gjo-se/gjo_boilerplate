(function ($) {
    'use strict';
    var pageType = 902;
    var ajaxListsProductsContainer = $('.ajax-lists-products');
    var ajaxListsProductsHeadline = $('h2');
    var ajaxListProductsCountInit = 0;
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
                ajaxListsProductsHeadline.html(_getHeadlineContent())
                ignoreScroll = false;
            },
            error: function(error) {
                console.error(error);
            }
        });
    };

    var sessionStorageFilterInputValues = function() {

        var productFinderFilter = {};
        productFinderFilter['event'] = $(this).attr('name');

        var radioFields = $('input[type="radio"]', '#productFinder');
        $.each(radioFields, function (i, field) {
            var checkedInputField = $(field).parent().find(':checked');
            var name = checkedInputField.attr('name');
            productFinderFilter[name] = checkedInputField.val();
        });

        $("#productFinder .input-text").each(function() {
            productFinderFilter[$(this).attr('name')] = $(this).val();
        });

        sessionStorage.setItem('productFinderFilter', JSON.stringify(productFinderFilter));
    };

    var clearAjaxListsProductsContainer = function() {
        var offset = ajaxListProductsOffset;
        sessionStorage.setItem('ajaxListProductsOffset', offset);
        ajaxListsProductsContainer.empty();
    };

    var _getAjaxListProductsCount = function(){
        if(sessionStorage.getItem('ajaxListProductsCount')){
            return sessionStorage.getItem('ajaxListProductsCount');
        }else{
            return ajaxListProductsCountInit;
        }
    };

    var _getHeadlineContent = function(){
        if(_getAjaxListProductsCount()){
            return _getAjaxListProductsCount() + ' Produkte gefunden';
        }else{
            return 'Keine Produkte gefunden';
        }
    };

    $(document).ready(function () {

        sessionStorage.clear();
        sessionStorage.setItem('ajaxListProductsOffset', ajaxListProductsOffset);

        // sessionStorageFilterInputValues();
        // loadAjaxListProducts(parseInt(sessionStorage.getItem('ajaxListProductsOffset')), JSON.parse(sessionStorage.getItem('productFinderFilter')));


        $('#productFinder input[type=radio]').change(function () {

            var buttonGroup = $(this).parent().parent();
            var button = $(this).parent();

            $(buttonGroup).find(':input').attr('checked', false);
            $(buttonGroup).find('img').removeClass('border-tiger-orange rounded');

            $(button).find(':input').attr('checked', true);
            $(button).find('img').addClass('border-tiger-orange rounded');

            sessionStorageFilterInputValues();
            clearAjaxListsProductsContainer();
            loadAjaxListProducts(parseInt(sessionStorage.getItem('ajaxListProductsOffset')), JSON.parse(sessionStorage.getItem('productFinderFilter')));

        });

        // #### wingCountSlider ####
        var wingCountSlider = $('#wingCountSlider').get(0);
        noUiSlider.create(wingCountSlider, {
            start: [1],
            step: 1,
            range: {
                'min': [1],
                'max': [3]
            }
        });
        wingCountSlider.noUiSlider.set(1);

        wingCountSlider.noUiSlider.on('update', function( values, handle ) {
            $('#wingCountSpan').html(parseInt(values[handle]));
            $('#wingCountInput').val(parseInt(values[handle]));
        });
        wingCountSlider.noUiSlider.on('change', function( values, handle ) {
            sessionStorageFilterInputValues();
            clearAjaxListsProductsContainer();
            loadAjaxListProducts(parseInt(sessionStorage.getItem('ajaxListProductsOffset')), JSON.parse(sessionStorage.getItem('productFinderFilter')));
        });

        // #### doorWidthSlider ####
        var doorWidthSlider = $('#doorWidthSlider').get(0);
        noUiSlider.create(doorWidthSlider, {
            start: [1000],
            step: 10,
            range: {
                'min': [500],
                'max': [1500]
            }
        });
        doorWidthSlider.noUiSlider.set(1000);
        doorWidthSlider.noUiSlider.on('update', function( values, handle ) {
            $('#doorWidthSpan').html(parseInt(values[handle]));
            $('#doorWidthInput').val(parseInt(values[handle]));
        });
        doorWidthSlider.noUiSlider.on('change', function( values, handle ) {
            sessionStorageFilterInputValues();
            clearAjaxListsProductsContainer();
            loadAjaxListProducts(parseInt(sessionStorage.getItem('ajaxListProductsOffset')), JSON.parse(sessionStorage.getItem('productFinderFilter')));
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

                if((offset - ajaxListProductsLimit) <= parseInt(_getAjaxListProductsCount()) && productFinderFilter){
                    loadAjaxListProducts(offset, productFinderFilter);
                }

                ignoreScroll = true;
            }
        });

    });

})(jQuery);