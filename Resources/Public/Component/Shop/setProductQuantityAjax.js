(function ($) {
    'use strict';
    const TYPE_NUM = 1516958422;
    const ZERO_PRODUCTS = 0;

    var $quantitySelect = $('.quantity');
    var $orderNowButton = $('#btn-order-now');
    var $orderNoProductsContainer = $('#order-no-products');

    var _setProductQuantity = function (openOrderUid, orderProductUid, productQuantity) {

        $.ajax({
            url: '/index.php',
            method: 'POST',
            data: {
                type: TYPE_NUM,
                openOrderUid: openOrderUid,
                orderProductUid: orderProductUid,
                quantity: productQuantity
            },
            success: function (response) {

                var $responseObj = jQuery.parseJSON(response);
                
                if(parseInt($responseObj.openOrderCountProducts) === ZERO_PRODUCTS){
                    _showNoProductsContainer();
                }

                if(parseInt(productQuantity) === ZERO_PRODUCTS){
                    _removeProductContainer(orderProductUid);
                }

                _setSummaryAmounts(openOrderUid);

            },
            error: function (error) {
                console.error(error);
            }
        });
    };

    var _removeProductContainer = function (orderProductUid) {
        var $productItemToRemove = $('#productItem_' + orderProductUid);
        $productItemToRemove.fadeOut(1000, function(){ $productItemToRemove.remove(); });
    }

    var _setSummaryAmounts = function (openOrderUid) {
        _countCartProducts();
        _setOrderAmountAjax(openOrderUid);
    }

    var _showNoProductsContainer = function (){
        $orderNowButton.addClass('disabled');
        $orderNoProductsContainer.removeClass('d-none');
    };

    $(document).ready(function () {

        $($quantitySelect).change(function (event) {

            var openOrderUid = $(this).attr('data-order-uid');
            var orderProductUid = $(this).attr('data-orderproduct-uid');
            var productQuantity = $(this).val();

            $orderNowButton.removeClass('disabled');
            $orderNoProductsContainer.addClass('d-none');

            _setProductQuantity(openOrderUid, orderProductUid, productQuantity);

        });
    });

})(jQuery);