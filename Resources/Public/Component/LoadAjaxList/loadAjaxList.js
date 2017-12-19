(function ($) {
    'use strict';
    var pageType = 902;
    var ajaxListsProductsContainer = $('.ajax-lists-products');
    var ajaxListsProductsHeadline = $('h3.ajax-list-products-count');
    var ajaxListProductsCountInit = 0;
    var ignoreScroll = false;

    var imagePlaceholder = 'http://via.placeholder.com/';
    var imagePlaceholderDefaultColor = 'f8f9fa';
    var imagePlaceholderDisabledColor = 'dee2e6';
    var imagePlaceholderDisabledText = '?text=disabled';
    var imagePlaceholderActiveColor = '343a40';

    var imageDefault100 = imagePlaceholder + '100/' + imagePlaceholderDefaultColor;
    var imageDisabled100 = imagePlaceholder + '100/' + imagePlaceholderDisabledColor + imagePlaceholderDisabledText;

    var loadAjaxListProducts = function (offset, productFinderFilter) {

        ajaxListsProductsHeadline.hide();
        $("#loadingImage").show();

        $.ajax({
            //TODO: die URL sollte generisch im template gesetzt weden
            url: '/index.php',
            method: 'POST',
            data: {
                type: pageType,
                offset: offset,
                productFinderFilter: productFinderFilter
            },
            success: function (response) {
                _setAjaxListsProductsContainer(response);
                ajaxListsProductsHeadline.html(_getHeadlineContent());
                $("#loadingImage").hide();
                ajaxListsProductsHeadline.show();
                ignoreScroll = false;
            },
            error: function (error) {
                console.error(error);
            }
        });
    };

    var _setAjaxListsProductsContainer = function(response){
        var modifiedResponseObject = _setAimeosPrice(response);
        ajaxListsProductsContainer.append(modifiedResponseObject);
    }

    var sessionStorageFilterInputValues = function () {

        var productFinderFilter = {};

        //TODO: der kann so nicht funktionieren - this nicht verfügbar
        productFinderFilter['event'] = $(this).attr('name');

        var radioFields = $('input[type="radio"]', '#productFinder');
        $.each(radioFields, function (i, field) {
            if ($(field).attr("checked") === "checked") {
                productFinderFilter[$(field).attr('name')] = $(field).val();
            }
        });

        // TODO: anpassen, wie Radios
        var checkboxFields = $('input[type="checkbox"]', '#productFinder');
        $.each(checkboxFields, function (i, field) {
            var checkedInputField = $(field).parent().find(':checked');
            var name = checkedInputField.attr('name');
            productFinderFilter[name] = checkedInputField.val();
        });

        $("#productFinder .input-text").each(function () {
            productFinderFilter[$(this).attr('name')] = $(this).val();
        });


        sessionStorage.setItem('productFinderFilter', JSON.stringify(productFinderFilter));
    };

    var clearAjaxListsProductsContainer = function () {
        var offset = ajaxListProductsOffset;
        sessionStorage.setItem('ajaxListProductsOffset', offset);
        ajaxListsProductsContainer.empty();
    };

    var _getAjaxListProductsCount = function () {
        if (sessionStorage.getItem('ajaxListProductsCount')) {
            return sessionStorage.getItem('ajaxListProductsCount');
        } else {
            return ajaxListProductsCountInit;
        }
    };

    var _getHeadlineContent = function () {
        if (parseInt(_getAjaxListProductsCount())) {
            return 'Ihre passenden Treffer (' + _getAjaxListProductsCount() + ')';
        } else {
            return 'Keine Produkte gefunden';
        }
    };

    var _setDoorWeight = function (doorWeightDefault) {

        var productFinderFilter = JSON.parse(sessionStorage.getItem('productFinderFilter'));

        if(doorWeightDefault){
            doorWeightSlider.noUiSlider.set(doorWeightDefault);
        }else if(typeof productFinderFilter['automaticCompute'] !== 'undefined'){
            var doorWidth = parseInt(productFinderFilter['doorWidth']);
            var doorHeight = parseInt(productFinderFilter['doorHeight']);
            var doorThickness = parseInt(productFinderFilter['doorThickness']);
            var spezificMaterial = parseInt(productFinderFilter['spezificMaterial']);


            var doorWeight = parseInt((doorWidth / 1000) * (doorHeight / 1000) * (doorThickness / 1000) * spezificMaterial);

            doorWeightSlider.noUiSlider.set(doorWeight);

        }else{
            // doorWeightSlider.noUiSlider.set(0);
        }


        sessionStorageFilterInputValues();
    }

    var _setDoorThicknessSlider = function ($start, $step, $min, $max) {

        var doorThicknessSlider = $('#doorThicknessSlider').get(0);

        if ($('#doorThicknessSlider').has('div').length) {
            doorThicknessSlider.noUiSlider.destroy();
        }

        noUiSlider.create(doorThicknessSlider, {
            start: [$start],
            step: $step,
            range: {
                'min': [$min],
                'max': [$max]
            }
        });
        doorThicknessSlider.noUiSlider.set($start);
        doorThicknessSlider.noUiSlider.on('update', function (values, handle) {
            $('#doorThicknessSpan').html(parseInt(values[handle]));
            $('#doorThicknessInput').val(parseInt(values[handle]));
        });
        doorThicknessSlider.noUiSlider.on('change', function (values, handle) {
            sessionStorageFilterInputValues();
            _setDoorWeight();
            clearAjaxListsProductsContainer();
            loadAjaxListProducts(parseInt(sessionStorage.getItem('ajaxListProductsOffset')), JSON.parse(sessionStorage.getItem('productFinderFilter')));

            $('body,html').animate({
                scrollTop: 270
            }, 800);
        });
    };

    var _setAimeosPrice = function (response){

        var response = response;
        var responseObject = $('<div/>').html(response).contents();
        var aimeosListProductItems = $('#listProductItems').find('span');

        $.each(aimeosListProductItems, function (i, field) {
            var aimeosProductItemId = $(this).attr('id');
            var aimeosProductItemPrice = $(this).find("meta[itemprop='price']").attr('content');
            var ajaxListsProductPrice = responseObject.find('#' + aimeosProductItemId).find('.price');

            ajaxListsProductPrice.append(aimeosProductItemPrice);
        });

        return responseObject;

    };

    $(document).ready(function () {

        sessionStorage.clear();
        sessionStorage.setItem('ajaxListProductsOffset', ajaxListProductsOffset);

        $('#productFinder input[type=radio]').change(function (event) {

            var buttonGroup = $(this).parent().parent();
            var button = $(this).parent();

            $(buttonGroup).find(':input').attr('checked', false);
            $(buttonGroup).find('img').removeClass('border-tiger-orange');
            $(buttonGroup).find('img').addClass('border-gray-300');

            $(button).find(':input').attr('checked', true);
            $(button).find('img').addClass('border-tiger-orange');

            if ($(button).find(':input').val() == 'wood') {
                $('.specific-material').removeClass('d-none');
                $('#specificMaterialItemGlas').attr('checked', false);
                $('.specificMaterialItemWood').attr('checked', false);

                $('.specificMaterialItemWood').parent().find('img').removeClass('border-tiger-orange');
                $('.specificMaterialItemWood').parent().find('img').addClass('border-gray-300');

                _setDoorWeight(0);
                _setDoorThicknessSlider(40, 1, 25, 70);
            }
            if ($(button).find(':input').val() == 'glas') {
                $('.specific-material').addClass('d-none');
                $('.specific-material').find(':input').attr('checked', false);
                $('#specificMaterialItemGlas').attr('checked', true);
                _setDoorThicknessSlider(8, 2, 8, 12);

            }

            sessionStorageFilterInputValues();
            _setDoorWeight();
            clearAjaxListsProductsContainer();
            loadAjaxListProducts(parseInt(sessionStorage.getItem('ajaxListProductsOffset')), JSON.parse(sessionStorage.getItem('productFinderFilter')));

            $('body,html').animate({
                scrollTop: 270
            }, 800);

        });


        $('#productFinder input[type=checkbox]').change(function (event) {

            var button = $(this).parent();
            var buttonInput = $(button).find(':input');
            var buttonImage = $(button).find('img');
            var buttonInputSynchron = $('.telescope-synchron [name=synchron]').find(':input');
            var buttonImageSynchron = $('.telescope-synchron [name=synchron]').find('img');

            if (buttonInput.attr('checked')) {
                buttonInput.attr('checked', false);
                buttonImage.removeClass('border-tiger-orange');
                buttonImage.addClass('border-gray-300');
            } else {
                buttonInput.attr('checked', true);
                buttonImage.addClass('border-tiger-orange');
                buttonImage.removeClass('border-gray-300');
            }

            if($(button).find(':input[name=automaticCompute]')){
                sessionStorageFilterInputValues();
                _setDoorWeight();
            }

            sessionStorageFilterInputValues();
            clearAjaxListsProductsContainer();
            loadAjaxListProducts(parseInt(sessionStorage.getItem('ajaxListProductsOffset')), JSON.parse(sessionStorage.getItem('productFinderFilter')));

            $('body,html').animate({
                scrollTop: 270
            }, 800);

        });


        // #### wingCountSlider ####
        var wingCountSlider = $('#wingCountSlider').get(0);
        var buttonInput = $('.telescope-synchron').find(':input');
        var buttonImage = $('.telescope-synchron').find('img');
        var buttonInputTwoWings = $('.telescope-synchron .two-wings').find(':input');
        var buttonImageTwoWings = $('.telescope-synchron .two-wings').find('img');
        var buttonInputThreeWings = $('.telescope-synchron .three-wings').find(':input');
        var buttonImageThreeWings = $('.telescope-synchron .three-wings').find('img');

        noUiSlider.create(wingCountSlider, {
            start: [1],
            step: 1,
            range: {
                'min': [1],
                'max': [3]
            }
        });
        wingCountSlider.noUiSlider.set(1);

        wingCountSlider.noUiSlider.on('update', function (values, handle) {
            $('#wingCountSpan').html(parseInt(values[handle]));
            $('#wingCountInput').val(parseInt(values[handle]));
        });
        wingCountSlider.noUiSlider.on('change', function (values, handle) {

            buttonImage.removeClass('border-tiger-orange');
            buttonImage.addClass('border-gray-300');

            if (parseInt(this.get()) == 1) {
                buttonInput.attr('disabled', true);
                buttonInput.attr('checked', false);

                buttonImage.attr('src', imageDisabled100);
            }
            if (parseInt(this.get()) == 2) {
                buttonInputTwoWings.attr('disabled', false);
                buttonInputThreeWings.attr('disabled', true);

                buttonImageTwoWings.attr('src', imageDefault100);
                buttonImageThreeWings.attr('src', imageDisabled100);
            }
            if (parseInt(this.get()) == 3) {
                buttonImageTwoWings.attr('src', imageDisabled100);
                buttonImageThreeWings.attr('src', imageDefault100);

                buttonInputTwoWings.attr('disabled', true);
                buttonInputThreeWings.attr('disabled', false);
            }

            sessionStorageFilterInputValues();
            clearAjaxListsProductsContainer();
            loadAjaxListProducts(parseInt(sessionStorage.getItem('ajaxListProductsOffset')), JSON.parse(sessionStorage.getItem('productFinderFilter')));

            $('body,html').animate({
                scrollTop: 270
            }, 800);
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
        doorWidthSlider.noUiSlider.on('update', function (values, handle) {
            $('#doorWidthSpan').html(parseInt(values[handle]));
            $('#doorWidthInput').val(parseInt(values[handle]));

        });
        doorWidthSlider.noUiSlider.on('change', function (values, handle) {
            sessionStorageFilterInputValues();
            _setDoorWeight();
            clearAjaxListsProductsContainer();
            loadAjaxListProducts(parseInt(sessionStorage.getItem('ajaxListProductsOffset')), JSON.parse(sessionStorage.getItem('productFinderFilter')));

            $('body,html').animate({
                scrollTop: 270
            }, 800);
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
        doorHeightSlider.noUiSlider.on('update', function (values, handle) {
            $('#doorHeightSpan').html(parseInt(values[handle]));
            $('#doorHeightInput').val(parseInt(values[handle]));
        });
        doorHeightSlider.noUiSlider.on('change', function (values, handle) {
            sessionStorageFilterInputValues();
            _setDoorWeight();
            clearAjaxListsProductsContainer();
            loadAjaxListProducts(parseInt(sessionStorage.getItem('ajaxListProductsOffset')), JSON.parse(sessionStorage.getItem('productFinderFilter')));

            $('body,html').animate({
                scrollTop: 270
            }, 800);
        });

        _setDoorThicknessSlider(40, 1, 25, 70);

        // #### doorWeightSlider ####
        var doorWeightSlider = $('#doorWeightSlider').get(0);
        noUiSlider.create(doorWeightSlider, {
            start: [80],
            step: 1,
            range: {
                'min': [0],
                'max': [300]
            }
        });
        doorWeightSlider.noUiSlider.on('update', function (values, handle) {
            // $('#automaticCompute').attr('checked', false);
            $('#doorWeightSpan').html(parseInt(values[handle]));
            $('#doorWeightInput').val(parseInt(values[handle]));
        });
        doorWeightSlider.noUiSlider.on('change', function (values, handle) {
            sessionStorageFilterInputValues();
            clearAjaxListsProductsContainer();
            loadAjaxListProducts(parseInt(sessionStorage.getItem('ajaxListProductsOffset')), JSON.parse(sessionStorage.getItem('productFinderFilter')));

            $('body,html').animate({
                scrollTop: 270
            }, 800);
        });


        sessionStorageFilterInputValues();
        _setDoorWeight();
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

                if ((offset - ajaxListProductsLimit) <= parseInt(_getAjaxListProductsCount()) && productFinderFilter) {
                    loadAjaxListProducts(offset, productFinderFilter);
                }

                ignoreScroll = true;
            }
        });

        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });

    });

})(jQuery);