(function ($) {
    'use strict';

    var typeNum = 1517848071;
    var $paymentServiceSelect = $('.payment-service-select');
    var $openOrderHidden = $('.open-order-hidden');
    var $paymentServiceErrorMessageContainer = $('.payment-service-error-message');

    var _setPaymentServiceAjax = function (paymentServiceSelectValue, openOrderUid) {

        $.ajax({
            url: '/index.php',
            method: 'POST',
            data: {
                type: typeNum,
                paymentServiceSelectValue: paymentServiceSelectValue,
                openOrderUid: openOrderUid
            },
            success: function (response) {
                _setOrderAmountAjax(openOrderUid);
            },
            error: function (error) {
                console.error(error);
            }
        });
    };

    $(document).ready(function () {

        $paymentServiceSelect.change(function (event) {
            var paymentServiceSelectValue = parseInt($paymentServiceSelect.val());
            var openOrderUid = $openOrderHidden.val();

            if(paymentServiceSelectValue === 4 || paymentServiceSelectValue === 5){
                $paymentServiceErrorMessageContainer.removeClass('d-none')
            }else{
                $paymentServiceErrorMessageContainer.addClass('d-none')
                _setPaymentServiceAjax(paymentServiceSelectValue, openOrderUid);
            }
        });
    });

})(jQuery);