(function ($) {
    'use strict';

    const PAYMENT_PROVIDER_PICKUP = 1;
    const PAYMENT_PROVIDER_PAYPAL = 3;
    const PAYMENT_PROVIDER_CREDITCARD = 4;
    const PAYMENT_PROVIDER_DEBIT_AUTH = 5;

    var typeNum = 1517848071;
    var $paymentServiceSelect = $('.payment-service-select');
    var $shippingServiceSelect = $('.shipping-service-select');
    var $openOrderHidden = $('.open-order-hidden');
    var $paymentServiceErrorMessageContainer = $('.payment-service-error-message');
    var $btnOrderNow = $('#btn-order-now');

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

            // TODO: der muss auch ausserhalb der cahnge stehen
            console.log('paymentServiceSelectValue === PAYMENT_PROVIDER_PICKUP');
            if(paymentServiceSelectValue === PAYMENT_PROVIDER_PICKUP){

                console.log('before: ' + parseInt($(".shipping-service-select"). children("option:selected"). val()));
                $(".shipping-service-select").val('0');
                // $(".shipping-service-select option[value='0']").attr('disabled',true);
                console.log('after: ' + parseInt($(".shipping-service-select"). children("option:selected"). val()));

            }

            if(paymentServiceSelectValue === PAYMENT_PROVIDER_CREDITCARD || paymentServiceSelectValue === PAYMENT_PROVIDER_DEBIT_AUTH){
                $paymentServiceErrorMessageContainer.removeClass('d-none');
                $btnOrderNow.addClass('disabled');
            }else{
                $paymentServiceErrorMessageContainer.addClass('d-none')
                $btnOrderNow.removeClass('disabled');
                _setPaymentServiceAjax(paymentServiceSelectValue, openOrderUid);
            }
        });
    });

})(jQuery);