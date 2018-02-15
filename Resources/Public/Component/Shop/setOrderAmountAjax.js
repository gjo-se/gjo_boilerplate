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


        },
        error: function (error) {
            console.error(error);
        }
    });
};

$(document).ready(function () {
    _setOrderAmountAjax($('.open-order-hidden').val());
});