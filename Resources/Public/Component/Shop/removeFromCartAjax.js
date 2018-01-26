(function ($) {
    'use strict';
    var typeNum = 1516958422;

    var removeFromCartAjaxButton = $('.remove-from-cart-ajax-button');
    var orderProductUid;

    var removeFromCart = function (openOrderUid, orderProductUid) {

        $.ajax({
            url: '/index.php',
            method: 'POST',
            data: {
                type: typeNum,
                openOrderUid: openOrderUid,
                orderProductUid: orderProductUid
            },
            success: function (response) {

                var responseObj = jQuery.parseJSON(response);
                var openOrderCountProducts = responseObj.openOrderCountProducts;

                _countCartProducts();
                _removeProductFromCart();
                // _showAlertSuccessAddToCart();

            },
            error: function (error) {
                console.error(error);
            }
        });
    };

    var _removeProductFromCart = function () {
        var $orderToRemove = $('#productItem_' + orderProductUid);

        $orderToRemove.fadeOut(1000, function(){ $orderToRemove.remove(); });
    }

    $(document).ready(function () {
        $(removeFromCartAjaxButton).click(function (event) {
            event.preventDefault();

            var openOrderUid = $(this).attr('data-order-uid');
            orderProductUid = $(this).attr('data-orderproduct-uid');

            removeFromCart(openOrderUid, orderProductUid);
        });
    });

})(jQuery);