(function ($) {
    'use strict';
    var typeNum = 903;

    var addToCartButton = $('.add-to-cart-button');

    var addToCart = function (productSetVariantUid, quantity) {

        $.ajax({
            url: '/index.php',
            method: 'POST',
            data: {
                type: typeNum,
                productSetVariantUid: productSetVariantUid,
                quantity: quantity
            },
            success: function (response) {

                var responseObj = jQuery.parseJSON(response);
                var openOrderCountProducts = responseObj.openOrderCountProducts;

                _setOpenOrderCountProducts(openOrderCountProducts);
                _showAlertSuccessAddToCart();

            },
            error: function (error) {
                console.error(error);
            }
        });
    };

    var _setOpenOrderCountProducts = function (openOrderCountProducts) {
        $('.openOrderCountProducts').html('(' + openOrderCountProducts + ')')
    };

    var _showAlertSuccessAddToCart = function () {
        $('.alert-success-add-to-cart').removeClass('d-none');
        $('.alert-success-add-to-cart').fadeIn(1000);
        $('.alert-success-add-to-cart').fadeOut(3000);
    };


    $(document).ready(function () {

        $(addToCartButton).click(function (event) {
            event.preventDefault();

            var inputGroup = $(this).parent().parent();
            var productSetVariantUid = inputGroup.find('.productSetVariantUid').val();
            var quantity = inputGroup.find('.quantity').val();

            addToCart(productSetVariantUid, quantity);
        });
    });

})(jQuery);