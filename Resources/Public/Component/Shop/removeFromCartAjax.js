(function ($) {
    'use strict';
    var typeNum = 1516958422;

    var quantitySelect = $('.quantity');
    var deleteProduct = 0;

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
                _removeProductFromCart(orderProductUid);
                _setOrderAmountAjax(openOrderUid);

            },
            error: function (error) {
                console.error(error);
            }
        });
    };

    var _removeProductFromCart = function (orderProductUid) {
        var $orderToRemove = $('#productItem_' + orderProductUid);
        $orderToRemove.fadeOut(1000, function(){ $orderToRemove.remove(); });
    }

    $(document).ready(function () {

        $(quantitySelect).change(function (event) {

            var openOrderUid = $(this).attr('data-order-uid');
            var orderProductUid = $(this).attr('data-orderproduct-uid');
            var quantity = $(this).val();

            if(parseInt(quantity) === deleteProduct){
                removeFromCart(openOrderUid, orderProductUid);
            }
        });
    });

})(jQuery);