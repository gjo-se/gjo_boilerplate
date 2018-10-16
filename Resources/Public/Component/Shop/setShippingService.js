(function ($) {
    'use strict';

    var typeNum = 1517828247;
    var $shippingServiceSelect = $('.shipping-service-select');
    var $openOrderHidden = $('.open-order-hidden');

    var _setShippingServiceAjax = function (shippingServiceSelectValue, openOrderUid) {

        $.ajax({
            url: '/index.php',
            method: 'POST',
            data: {
                type: typeNum,
                shippingServiceSelectValue: shippingServiceSelectValue,
                openOrderUid: openOrderUid
            },
            success: function (response) {

                var responseObj = jQuery.parseJSON(response);

                //TODO: der hier muss sein!!!
                _setOrderAmountAjax(openOrderUid);

            },
            error: function (error) {
                console.error(error);
            }
        });
    };

    $(document).ready(function () {

        $shippingServiceSelect.change(function (event) {
            var shippingServiceSelectValue = parseInt($shippingServiceSelect.val());
            var openOrderUid = $openOrderHidden.val();

            _setShippingServiceAjax(shippingServiceSelectValue, openOrderUid);

        });

    });

})(jQuery);