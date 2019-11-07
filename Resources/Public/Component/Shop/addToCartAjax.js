(function ($) {
    'use strict';
    var typeNum = 903;

    var addToCartButton = $('.add-to-cart-button');

    var addToCart = function (productSetVariantUid, quantity, addToCartAlert) {

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

                _countCartProducts();
                _showAlertSuccessAddToCart(addToCartAlert);

            },
            error: function (error) {
                console.error(error);
            }
        });
    };

    var _showAlertSuccessAddToCart = function (addToCartAlert) {
        addToCartAlert.removeClass('d-none');
        addToCartAlert.fadeIn(1000);
        addToCartAlert.fadeOut(3000);
    };


    $(document).ready(function () {

        $(addToCartButton).click(function (event) {
            event.preventDefault();

            var $variantGroup = $(this).parent().parent();
            var productSetVariantUid = $variantGroup.find('.productSetVariantUid').val();
            var $quantitySelect = $variantGroup.find('select.quantity');
            var quantity = $quantitySelect.val();
            var addToCartAlert = $(this).parent().parent().find('.alert-success-add-to-cart');

            addToCart(productSetVariantUid, quantity, addToCartAlert);
        });

    });

})(jQuery);