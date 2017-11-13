(function ($) {
    'use strict';
    var pageType = 902;
    var ajaxListsProductsContainer = $('.ajax-lists-products');
    var ajaxListsProductsHeadline = $('h2');
    var ajaxListProductsCountInit = 0;
    var ignoreScroll = false;

    var loadAjaxListProducts = function (offset, productFinderFilter) {

        $("#loadingImage").show();

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
                ajaxListsProductsHeadline.html(_getHeadlineContent());
                $("#loadingImage").hide();
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

        // #### doorHeightSlider ####
        var doorHeightSlider = $('#doorHeightSlider').get(0);
        noUiSlider.create(doorHeightSlider, {
            start: [2000],
            step: 10,
            range: {
                'min': [1800],
                'max': [2500]
            }
        });
        doorHeightSlider.noUiSlider.set(2000);
        doorHeightSlider.noUiSlider.on('update', function( values, handle ) {
            $('#doorHeightSpan').html(parseInt(values[handle]));
            $('#doorHeightInput').val(parseInt(values[handle]));
        });
        doorWidthSlider.noUiSlider.on('change', function( values, handle ) {
            sessionStorageFilterInputValues();
        });

        // #### doorThicknessSlider ####
        var doorThicknessSlider = $('#doorThicknessSlider').get(0);
        noUiSlider.create(doorThicknessSlider, {
            start: [40],
            step: 1,
            range: {
                'min': [8],
                'max': [70]
            }
        });
        doorThicknessSlider.noUiSlider.set(40);
        doorThicknessSlider.noUiSlider.on('update', function( values, handle ) {
            $('#doorThicknessSpan').html(parseInt(values[handle]));
            $('#doorThicknessInput').val(parseInt(values[handle]));
        });
        doorThicknessSlider.noUiSlider.on('change', function( values, handle ) {
            sessionStorageFilterInputValues();
            clearAjaxListsProductsContainer();
            loadAjaxListProducts(parseInt(sessionStorage.getItem('ajaxListProductsOffset')), JSON.parse(sessionStorage.getItem('productFinderFilter')));
        });

        // #### doorWeightSlider ####
        var doorWeightSlider = $('#doorWeightSlider').get(0);
        noUiSlider.create(doorWeightSlider, {
            start: [80],
            step: 1,
            range: {
                'min': [20],
                'max': [300]
            }
        });
        doorWeightSlider.noUiSlider.set(80);
        doorWeightSlider.noUiSlider.on('update', function( values, handle ) {
            $('#doorWeightSpan').html(parseInt(values[handle]));
            $('#doorWeightInput').val(parseInt(values[handle]));
        });
        doorWeightSlider.noUiSlider.on('change', function( values, handle ) {
            sessionStorageFilterInputValues();
            clearAjaxListsProductsContainer();
            loadAjaxListProducts(parseInt(sessionStorage.getItem('ajaxListProductsOffset')), JSON.parse(sessionStorage.getItem('productFinderFilter')));
        });


        sessionStorageFilterInputValues();
        loadAjaxListProducts(parseInt(sessionStorage.getItem('ajaxListProductsOffset')), JSON.parse(sessionStorage.getItem('productFinderFilter')));


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