var _setOrderAmountAjax = function (openOrderUid) {

    var typeNum = 1517897847;
    var $openOrderHidden = $('.open-order-hidden');
    var $productsPriceTotalNetto = $('.productsPriceTotalNetto');
    var $feUserPercentageDiscountRow = $('.feUserPercentageDiscountRow');
    var $feUserPercentageDiscount = $('.feUserPercentageDiscount');
    var $feUserTotalDiscount = $('.feUserTotalDiscount');
    var $shippingCosts = $('.shippingCosts');
    var $totalAmount = $('.totalAmount');
    var $totalAmountTax = $('.totalAmountTax');
    var $totalAmountBrutto = $('.totalAmountBrutto');
    var $cashDiscountRow = $('.cashDiscountRow');
    var $cashDiscountPercentage = $('.cashDiscountPercentage');
    var $cashDiscount = $('.cashDiscount');

    $.ajax({
        url: '/index.php',
        method: 'POST',
        data: {
            type: typeNum,
            openOrderUid: openOrderUid
        },
        success: function (response) {

            var responseObj = jQuery.parseJSON(response);
            $productsPriceTotalNetto.text(responseObj.productsPriceTotalNetto + ' €');

            if(responseObj.feUserPercentageDiscount){
                $feUserPercentageDiscountRow.removeClass('d-none');
                $feUserPercentageDiscountRow.addClass('d-flex');
                $feUserPercentageDiscount.text(responseObj.feUserPercentageDiscount + ' %');
                $feUserTotalDiscount.text('- ' + responseObj.feUserTotalDiscount + ' €');
            }

            $shippingCosts.text(responseObj.shippingCosts + ' €');
            $totalAmount.text(responseObj.totalAmount + ' €');
            $totalAmountTax.text(responseObj.totalAmountTax + ' €');
            $totalAmountBrutto.text(responseObj.totalAmountBrutto + ' €');

            if(parseInt(responseObj.cashDiscountPercentage) > 0){
                $cashDiscountRow.removeClass('d-none');
                $cashDiscountPercentage.text(responseObj.cashDiscountPercentage + ' %');
                $cashDiscount.text(responseObj.cashDiscount + ' €');
            }else{
                $cashDiscountRow.addClass('d-none');
                $cashDiscountPercentage.text('');
                $cashDiscount.text('');
            }

            if(responseObj.productLengthUnder1650){
                $(".shipping-service-select option[value='1']").attr('disabled',true);
                $(".shipping-service-select option[value='2']").attr('disabled',true);
                $(".shipping-service-select option[value='8']").attr('disabled',false);
                if(parseInt($(".shipping-service-select"). children("option:selected"). val()) !== 0){
                    $(".shipping-service-select").val(8);
                }
            }

            if(responseObj.productLengthOver1650){
                $(".shipping-service-select option[value='1']").attr('disabled',false);
                $(".shipping-service-select option[value='2']").attr('disabled',true);
                $(".shipping-service-select option[value='8']").attr('disabled',true);
                if(parseInt($(".shipping-service-select"). children("option:selected"). val()) !== 0){
                    $(".shipping-service-select").val(1);
                }
            }

            if(responseObj.productLengthOver2500){
                $(".shipping-service-select option[value='1']").attr('disabled',true);
                $(".shipping-service-select option[value='2']").attr('disabled',false);
                $(".shipping-service-select option[value='8']").attr('disabled',true);
                if(parseInt($(".shipping-service-select"). children("option:selected"). val()) !== 0){
                    $(".shipping-service-select").val(2);
                }
            }

        },
        error: function (error) {
            console.error(error);
        }
    });
};

$(document).ready(function () {
    _setOrderAmountAjax($('.open-order-hidden').val());
});