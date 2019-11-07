(function ($) {
    'use strict';

    const PAGE_TYPE = 902;
    const DENSITY = 25;
    const MASK_ORANGE = 'rgba-orange-light';
    const MASK_GREY = 'rgba-stylish-slight';

    var url = '/index.php';
    var ignoreScroll = false;

    var ajaxListsProductsContainer = $('.ajax-lists-products');
    var ajaxListsProductsHeadline = $('.ajax-list-products-headline');
    var $buttonResetFilter = $('#button-reset-filter');
    var $buttonCollapseProductFinder = $('#button-collapse-product-finder');
    var $containerProductFinderAccordion = $('#productFinderAccordion');
    var preloader = $('.preloader-wrapper');
    var ajaxListProductsCountInit = 0;
    var sysLanguageUid = $('#locallang-helper-sysLanguageUid').text();
    var sysLanguage = $('#locallang-helper-sysLanguage').text();
    var $locallangHelperAny = $('#locallang-helper-any');
    var $locallangHelperResults = $('#locallang-helper-results');
    var $locallangHelperNoResults = $('#locallang-helper-no-results');
    var $isShop = $('.is_shop');


    var $buttonWood = $('#button-wood');
    var $buttonGlass = $('#button-glass');
    var $buttonDesignCustomer = $('#button-design-customer');
    var $buttonDesignAlu = $('#button-design-alu');
    var $buttonDesignDesign = $('#button-design-design');
    var $buttonSoftClose = $('#button-soft-close');
    var $buttonEt3 = $('#button-et3');
    var $buttonTFold = $('#button-t-fold');
    var $buttonSynchron = $('#button-synchron');
    var $buttonTelescop2 = $('#button-telescop2');
    var $buttonTelescop3 = $('#button-telescop3');
    var $buttonTClose = $('#button-t-close');
    var $buttonTMaster = $('#button-t-master');
    var $buttonMontageWall = $('#button-montage-wall');
    var $buttonMontageCeiling = $('#button-montage-ceiling');
    var $buttonMontageInWall = $('#button-montage-in-wall');

    var $wingCountSliderContainer = $('#wingCountSlider');
    var $wingCountSlider = $wingCountSliderContainer.get(0);
    var $wingCountText = $('#wingCountText');
    var $wingCountInput = $('#wingCountInput');

    var $doorWidthSliderContainer = $('#doorWidthSlider');
    var $doorWidthSlider = $doorWidthSliderContainer.get(0);
    var $doorWidthText = $('#doorWidthText');
    var $doorWidthInput = $('#doorWidthInput');

    var $doorHeightSliderContainer = $('#doorHeightSlider');
    var $doorHeightSlider = $doorHeightSliderContainer.get(0);
    var $doorHeightText = $('#doorHeightText');
    var $doorHeightInput = $('#doorHeightInput');

    var $doorThicknessSliderContainer = $('#doorThicknessSlider');
    var $doorThicknessSlider = $doorThicknessSliderContainer.get(0);
    var $doorThicknessText = $('#doorThicknessText');
    var $doorThicknessInput = $('#doorThicknessInput');

    var $doorWeightSliderContainer = $('#doorWeightSlider');
    var $doorWeightSlider = $doorWeightSliderContainer.get(0);
    var $doorWeightText = $('#doorWeightText');
    var $doorWeightInput = $('#doorWeightInput');


    var disabledButtonsForButtons = [
        {
            buttonWood: [$buttonGlass],
        },
        {
            buttonGlass: [$buttonWood, $buttonDesignDesign],
        },
        {
            buttonDesignCustomer: [$buttonDesignAlu, $buttonDesignDesign, $buttonEt3],
        },
        {
            buttonDesignAlu: [$buttonDesignCustomer, $buttonDesignDesign, $buttonTFold],
        },
        {
            buttonDesignDesign: [$buttonDesignCustomer, $buttonDesignAlu, $buttonEt3, $buttonTFold, $buttonSynchron, $buttonTelescop2, $buttonTelescop3, $buttonTClose, $buttonTMaster, $buttonMontageCeiling, $buttonMontageInWall],
        },
        {
            buttonSoftClose: [$buttonEt3, $buttonTFold],
        },
        {
            buttonEt3: [$buttonSoftClose, $buttonTFold, $buttonTClose, $buttonTMaster],
        },
        {
            buttonTFold: [$buttonSoftClose, $buttonEt3, $buttonSynchron, $buttonTelescop2, $buttonTelescop3, $buttonTClose, $buttonMontageWall, $buttonMontageInWall],
        },
        {
            buttonSynchron: [$buttonTFold, $buttonTClose],
        },
        {
            buttonTelescop2: [$buttonTFold, $buttonTelescop3, $buttonTClose, $buttonTMaster],
        },
        {
            buttonTelescop3: [$buttonTFold, $buttonTelescop2, $buttonTClose, $buttonTMaster],
        },
        {
            buttonTClose: [$buttonEt3, $buttonTFold, $buttonSynchron, $buttonTelescop2, $buttonTelescop3, $buttonTMaster],
        },
        {
            buttonTMaster: [$buttonEt3, $buttonTelescop2, $buttonTelescop3, $buttonTClose],
        },
        {
            buttonMontageWall: [$buttonTFold],
        },
        {
            buttonMontageCeiling: [$buttonDesignDesign],
        },
        {
            buttonMontageInWall: [$buttonDesignDesign, $buttonTFold],
        }
    ];

    var _handleCheckboxes = function () {

        $('#productFinder input[type=checkbox]').change(function (event) {

            var label = $(this).parent();
            var buttonInput = $(label).find(':input');
            var buttonInputName = $(buttonInput).attr('name');
            var $viewContainer = $(label).find('div.view');
            var buttonImage = $(label).find('img');

            _ableButtons();

            if (buttonInput.attr('checked')) {
                buttonInput.attr('checked', false);
                $viewContainer.addClass('overlay');
            } else {
                buttonInput.attr('checked', true);
                $viewContainer.removeClass('overlay');

                switch (buttonInputName) {
                    case $buttonWood.attr('name'):
                        _createSlider($doorThicknessSlider, 0, 1, 25, 40, 75, 25);
                        _handleThicknessSlider();
                        break;
                    case $buttonGlass.attr('name'):
                        _createSlider($doorThicknessSlider, 0, 2, 8, 10, 12, 40);
                        _handleThicknessSlider();
                        break;
                    default:
                    //
                }

            }

            _disableButtons();

            sessionStorageFilterInputValues();
            clearAjaxListsProductsContainer();
            loadAjaxListProducts(parseInt(sessionStorage.getItem('ajaxListProductsOffset')), JSON.parse(sessionStorage.getItem('productFinderFilter')));

        });
    };

    var _disableButtons = function () {

        var buttons = $('#productFinder input[type=checkbox]');

        $.each(buttons, function (key, $button) {
            var checkedButtonId = jQuery.camelCase($($button).attr('id'));

            if ($($button).attr('checked')) {

                var checkedLabel = $($button).parent();
                var checkedButtonInput = $(checkedLabel).find(':input');
                var $viewContainer = $(checkedLabel).find('div.view');
                var $maskContainer = $(checkedLabel).find('div.mask');

                $viewContainer.removeClass('overlay');
                $maskContainer.addClass(MASK_ORANGE);
                $maskContainer.removeClass(MASK_GREY);

                $.each(disabledButtonsForButtons, function (key, disabledButton) {
                    $.each(disabledButton[checkedButtonId], function (key, singleDisabledButton) {

                        var label = $(singleDisabledButton).parent();
                        var buttonInput = $(label).find(':input');
                        var $viewContainer = $(label).find('div.view');
                        var $maskContainer = $(label).find('div.mask');

                        $(singleDisabledButton).attr('disabled', true);
                        $(singleDisabledButton).parent().find('a').addClass('disabled');


                        $viewContainer.removeClass('overlay');
                        $maskContainer.removeClass(MASK_ORANGE);
                        $maskContainer.addClass(MASK_GREY);
                    });
                });
            }
        });

        switch (parseInt($wingCountSlider.noUiSlider.get())) {
            case 1:
                var disabledButtonsForSlider = [$buttonSynchron, $buttonTelescop2, $buttonTelescop3];
                _disableButtonsForSlider(disabledButtonsForSlider);
                break;
            case 2:
                var disabledButtonsForSlider = [$buttonTFold, $buttonTelescop3];
                _disableButtonsForSlider(disabledButtonsForSlider);
                break;
            case 3:
                var disabledButtonsForSlider = [$buttonDesignDesign, $buttonSoftClose, $buttonEt3, $buttonTFold, $buttonSynchron, $buttonTelescop2, $buttonSoftClose, $buttonTMaster];
                _disableButtonsForSlider(disabledButtonsForSlider);
                break;
            default:
            //
        }

        if ($doorWidthSlider.noUiSlider) {
            var doorWidthSliderValue = parseInt($doorWidthSlider.noUiSlider.get());
            if (doorWidthSliderValue) {
                switch (true) {
                    case (doorWidthSliderValue < 600):
                        var disabledButtonsForSlider = [$buttonDesignDesign, $buttonEt3, $buttonSynchron, $buttonTelescop2, $buttonTelescop3, $buttonTClose];
                        _disableButtonsForSlider(disabledButtonsForSlider);
                        break;
                    case (doorWidthSliderValue < 620):
                        var disabledButtonsForSlider = [$buttonDesignDesign, $buttonEt3];
                        _disableButtonsForSlider(disabledButtonsForSlider);
                        break;
                    case (doorWidthSliderValue > 1250):
                        var disabledButtonsForSlider = [$buttonTFold, $buttonSynchron, $buttonTelescop2, $buttonTelescop3];
                        _disableButtonsForSlider(disabledButtonsForSlider);
                        break;
                    case (doorWidthSliderValue > 1200):
                        var disabledButtonsForSlider = [$buttonTFold, $buttonTelescop2, $buttonTelescop3];
                        _disableButtonsForSlider(disabledButtonsForSlider);
                        break;
                    case (doorWidthSliderValue > 1100):
                        var disabledButtonsForSlider = [$buttonTFold];
                        _disableButtonsForSlider(disabledButtonsForSlider);
                        break;
                    default:
                    //
                }
            }
        }

        if ($doorWeightSlider.noUiSlider) {
            var doorWeightSliderValue = parseInt($doorWeightSlider.noUiSlider.get());
            if (doorWeightSliderValue) {
                switch (true) {
                    case (doorWeightSliderValue > 100):
                        var disabledButtonsForSlider = [$buttonTFold, $buttonTelescop3, $buttonDesignCustomer, $buttonEt3, $buttonDesignDesign];
                        _disableButtonsForSlider(disabledButtonsForSlider);
                        break;
                    case (doorWeightSliderValue > 80):
                        var disabledButtonsForSlider = [$buttonTFold, $buttonTelescop3, $buttonDesignCustomer, $buttonEt3];
                        _disableButtonsForSlider(disabledButtonsForSlider);
                        break;
                    case (doorWeightSliderValue > 65):
                        var disabledButtonsForSlider = [$buttonTFold, $buttonTelescop3];
                        _disableButtonsForSlider(disabledButtonsForSlider);
                        break;
                    case (doorWeightSliderValue > 50):
                        var disabledButtonsForSlider = [$buttonTFold];
                        _disableButtonsForSlider(disabledButtonsForSlider);
                        break;
                    default:
                    //
                }
            }
        }
    };


    var _disableButtonsForSlider = function (disabledButtonsForSlider) {

        $.each(disabledButtonsForSlider, function (key, disabledButtonForSlider) {

            var label = $(disabledButtonForSlider).parent();
            var buttonInput = $(label).find(':input');
            var $viewContainer = $(label).find('div.view');
            var $maskContainer = $(label).find('div.mask');

            $(disabledButtonForSlider).attr('disabled', true);

            $viewContainer.removeClass('overlay');
            $maskContainer.removeClass(MASK_ORANGE);
            $maskContainer.addClass(MASK_GREY);
        });

    }


    var _ableButtons = function (uncheck) {

        var buttons = $('#productFinder input[type=checkbox]');

        if (buttons.length > 0) {
            $.each(buttons, function (key, $button) {

                if(uncheck){
                    $($button).attr('checked', false);
                }

                $($button).attr('disabled', false);

                var label = $($button).parent();
                var buttonInput = $(label).find(':input');
                var $viewContainer = $(label).find('div.view');
                var $maskContainer = $(label).find('div.mask');

                $viewContainer.addClass('overlay');
                $maskContainer.removeClass(MASK_GREY);
                $maskContainer.addClass(MASK_ORANGE);

            });
        }
    };


    var _createSlider = function ($slider, start, step, min, half, max, density) {

        if ($slider.noUiSlider) {
            $slider.noUiSlider.destroy();
        }

        noUiSlider.create($slider, {
            start: [start],
            step: step,
            range: {
                'min': [0, min],
                '10%': [min, step],
                '50%': [half, step],
                'max': [max]
            },
            pips: {
                mode: 'range',
                density: density
            }

        });
    }

    var _handleWingCountSlider = function () {

        $wingCountSlider.noUiSlider.on('update', function (values, handle) {
            var value = parseInt(values[handle]);
            $wingCountInput.val(value);

            _ableButtons();

            if (value) {
                $wingCountText.html(value);
                $wingCountSliderContainer.addClass('active');
            } else {
                $wingCountText.html($locallangHelperAny.text());
                $wingCountSliderContainer.removeClass('active');
            }

            _disableButtons();

        });

        $wingCountSlider.noUiSlider.on('change', function () {

            sessionStorageFilterInputValues();
            clearAjaxListsProductsContainer();
            loadAjaxListProducts(parseInt(sessionStorage.getItem('ajaxListProductsOffset')), JSON.parse(sessionStorage.getItem('productFinderFilter')));

        });
    };

    var _handleDoorWidthSlider = function () {

        $doorWidthSlider.noUiSlider.on('update', function (values, handle) {

            var value = parseInt(values[handle]);
            $doorWidthInput.val(parseInt(value));

            _ableButtons();

            if (value) {
                $doorWidthText.html(value + ' mm');
                $doorWidthSliderContainer.addClass('active');
            } else {
                $doorWidthText.html($locallangHelperAny.text());
                $doorWidthSliderContainer.removeClass('active');
            }

            _disableButtons();

        });

        $doorWidthSlider.noUiSlider.on('change', function () {

            sessionStorageFilterInputValues();
            clearAjaxListsProductsContainer();
            loadAjaxListProducts(parseInt(sessionStorage.getItem('ajaxListProductsOffset')), JSON.parse(sessionStorage.getItem('productFinderFilter')));

        });


    };

    var _handleThicknessSlider = function () {

        $doorThicknessSlider.noUiSlider.on('update', function (values, handle) {
            var value = parseInt(values[handle]);
            $doorThicknessInput.val(value);

            if (value) {
                $doorThicknessText.html(value + ' mm');
                $doorThicknessSliderContainer.addClass('active');
            } else {
                $doorThicknessText.html($locallangHelperAny.text());
                $doorThicknessSliderContainer.removeClass('active');
            }

        });

        $doorThicknessSlider.noUiSlider.on('change', function () {

            sessionStorageFilterInputValues();
            clearAjaxListsProductsContainer();
            loadAjaxListProducts(parseInt(sessionStorage.getItem('ajaxListProductsOffset')), JSON.parse(sessionStorage.getItem('productFinderFilter')));

        });

    };

    var _handleDoorWeightSlider = function () {

        $doorWeightSlider.noUiSlider.on('update', function (values, handle) {
            var value = parseInt(values[handle]);
            $doorWeightInput.val(value);

            _ableButtons();

            if (value) {
                $doorWeightText.html(value + ' kg');
                $doorWeightSliderContainer.addClass('active');
            } else {
                $doorWeightText.html($locallangHelperAny.text());
                $doorWeightSliderContainer.removeClass('active');
            }

            _disableButtons();

        });

        $doorWeightSlider.noUiSlider.on('change', function () {

            sessionStorageFilterInputValues();
            clearAjaxListsProductsContainer();
            loadAjaxListProducts(parseInt(sessionStorage.getItem('ajaxListProductsOffset')), JSON.parse(sessionStorage.getItem('productFinderFilter')));

        });


    }


    var loadAjaxListProducts = function (offset, productFinderFilter) {

        ajaxListsProductsHeadline.hide();
        preloader.addClass('active');

        if(sysLanguageUid){
            url = url + '?L=' + sysLanguageUid;
        }

        $.ajax({
            url: url,
            method: 'POST',
            data: {
                type: PAGE_TYPE,
                offset: offset,
                productFinderFilter: productFinderFilter,
                sysLanguageUid: sysLanguageUid,
                sysLanguage: sysLanguage,
                isShop: isShop
            },
            success: function (response) {
                ajaxListsProductsContainer.append(response);
                ajaxListsProductsHeadline.html(_getHeadlineContent());
                preloader.removeClass('active');
                ajaxListsProductsHeadline.show();

                _setIsShop();
                ignoreScroll = false;
            },
            error: function (error) {
                console.error(error);
            }
        });
    };

    var sessionStorageFilterInputValues = function () {

        var productFinderFilter = {};
        var checkboxes = $('#productFinder input[type=checkbox]');

        if (checkboxes.length > 0) {
            $.each(checkboxes, function (key, $checkbox) {
                if ($($checkbox).attr('checked')) {
                    productFinderFilter[$($checkbox).attr('name')] = $($checkbox).val();
                }
            });
        }

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
            return $locallangHelperResults.text() + ' (' + _getAjaxListProductsCount() + ')';
        } else {
            return $locallangHelperNoResults.text();
        }
    };


    var _handleResetFilter = function () {

        $buttonResetFilter.on('click', function (event) {

            event.preventDefault();

            _ableButtons(true);
            $wingCountSlider.noUiSlider.set(0);
            $doorWidthSlider.noUiSlider.set(0);
            $doorThicknessSlider.noUiSlider.set(0);
            $doorWeightSlider.noUiSlider.set(0);

            sessionStorageFilterInputValues();
            clearAjaxListsProductsContainer();
            loadAjaxListProducts(parseInt(sessionStorage.getItem('ajaxListProductsOffset')), JSON.parse(sessionStorage.getItem('productFinderFilter')));

        });

        $buttonCollapseProductFinder.on('click', function () {
            $buttonResetFilter.trigger('click');
        });

        if(window.matchMedia("(min-width: 992px)")){
            $containerProductFinderAccordion.addClass('show');
        }

    };

    var _setIsShop = function () {

        if(isShop){
            $isShop.removeClass('d-none');
        }else{
            $isShop.addClass('d-none');
        }

        // $buttonResetFilter.on('click', function (event) {
        //
        //     event.preventDefault();
        //
        //     _ableButtons(true);
        //     $wingCountSlider.noUiSlider.set(0);
        //     $doorWidthSlider.noUiSlider.set(0);
        //     $doorThicknessSlider.noUiSlider.set(0);
        //     $doorWeightSlider.noUiSlider.set(0);
        //
        //     sessionStorageFilterInputValues();
        //     clearAjaxListsProductsContainer();
        //     loadAjaxListProducts(parseInt(sessionStorage.getItem('ajaxListProductsOffset')), JSON.parse(sessionStorage.getItem('productFinderFilter')));
        //
        // });
        //
        // $buttonCollapseProductFinder.on('click', function () {
        //     $buttonResetFilter.trigger('click');
        // });
        //
        // if(window.matchMedia("(min-width: 992px)")){
        //     $containerProductFinderAccordion.addClass('show');
        // }

    };




    $(document).ready(function () {

        sessionStorage.clear();

        if (typeof ajaxListProductsOffset !== 'undefined') {
            sessionStorage.setItem('ajaxListProductsOffset', ajaxListProductsOffset);
        }

        _handleCheckboxes();

        _createSlider($wingCountSlider, 0, 1, 1, 2, 3, 40);
        _handleWingCountSlider();

        _createSlider($doorWidthSlider, 0, 5, 500, 1000, 1500, 25);
        _handleDoorWidthSlider();

        _createSlider($doorThicknessSlider, 0, 1, 25, 40, 75, 25);
        _handleThicknessSlider();

        _createSlider($doorWeightSlider, 0, 1, 20, 100, 250, 25);
        _handleDoorWeightSlider();


        sessionStorageFilterInputValues();
        loadAjaxListProducts(parseInt(sessionStorage.getItem('ajaxListProductsOffset')), JSON.parse(sessionStorage.getItem('productFinderFilter')));

        _handleResetFilter();

        $(window).scroll(function () {
            var windowHeight = parseInt($(window).height());
            var documentHeight = parseInt($(document).height());
            var footerHight = 800; //520;
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
    });

})(jQuery);