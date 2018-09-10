(function ($) {
    'use strict';
    var typeNum = 1516967943;

    var quantityInput = $('.quantity');

    var _changeQuantityCartProducts = function (openOrderUid, orderProductUid, quantity) {

        $.ajax({
            url: '/index.php',
            method: 'POST',
            data: {
                type: typeNum,
                openOrderUid: openOrderUid,
                orderProductUid: orderProductUid,
                quantity: quantity
            },
            success: function (response) {
                _countCartProducts();

                if (typeof _setOrderAmountAjax === 'function') {
                    _setOrderAmountAjax(openOrderUid);
                }

            },
            error: function (error) {
                console.error(error);
            }
        });
    };

    $(document).ready(function () {

        $(quantityInput).change(function (event) {

            var openOrderUid = $(this).attr('data-order-uid');
            var orderProductUid = $(this).attr('data-orderproduct-uid');
            var quantity = $(this).val();

            _changeQuantityCartProducts(openOrderUid, orderProductUid, quantity);
        });
    });

})(jQuery);