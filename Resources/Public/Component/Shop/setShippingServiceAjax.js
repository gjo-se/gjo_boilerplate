(function ($) {
    'use strict';

    var typeNum = 1517828247;
    var $shippingServiceSelect = $('.shipping-service-select');
    var $openOrderHidden = $('.open-order-hidden');





    // var $btnDeliveryAddressesUpdate = $('.btn-delivery-addresses-update');
    // var $btnDeliveryAddressesAdd = $('.btn-delivery-addresses-add');
    // var $deliveryAddressEditContainer = $('.delivery-address-edit');
    // var $deliveryAddressAddContainer = $('.delivery-address-add');
    // var $updateDeliveryAddressForm = $('#update-delivery-address-form');
    // var $updateDeliveryAddressFormUid = $('#update-delivery-address-form-uid');
    // var $updateDeliveryAddressFormName = $('#update-delivery-address-form-name');
    // var $updateDeliveryAddressFormCompany = $('#update-delivery-address-form-company');
    // var $updateDeliveryAddressFormAddress = $('#update-delivery-address-form-address');
    // var $updateDeliveryAddressFormZip = $('#update-delivery-address-form-zip');
    // var $updateDeliveryAddressFormCity = $('#update-delivery-address-form-city');
    // var $updateDeliveryAddressFormCountry = $('#update-delivery-address-form-country');
    // var $updateDeliveryAddressFormTelephone = $('#update-delivery-address-form-telephone');

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
                if(response.length > 2){
                    // _setDeliveryAddressFormdata(responseObj.deliveryAddress);
                }

                _setOrderAmountAjax(openOrderUid);

            },
            error: function (error) {
                console.error(error);
            }
        });
    };

    // var _setDeliveryAddressFormdata = function (deliveryAddress) {
    //
    //     $updateDeliveryAddressFormUid.val(deliveryAddress.uid);
    //     $updateDeliveryAddressFormName.val(deliveryAddress.name);
    //     $updateDeliveryAddressFormCompany.val(deliveryAddress.company);
    //     $updateDeliveryAddressFormAddress.val(deliveryAddress.address);
    //     $updateDeliveryAddressFormZip.val(deliveryAddress.zip);
    //     $updateDeliveryAddressFormCity.val(deliveryAddress.city);
    //     $updateDeliveryAddressFormCountry.val(deliveryAddress.country);
    //     $updateDeliveryAddressFormTelephone.val(deliveryAddress.telephone);
    //
    // };

    $(document).ready(function () {

        $shippingServiceSelect.change(function (event) {
            var shippingServiceSelectValue = parseInt($shippingServiceSelect.val());
            var openOrderUid = $openOrderHidden.val();

            // if(deliveryAddressesSelectValue === 0){
            //     $('.btn-delivery-addresses-update').addClass('d-none');
            //     $('#deliveryAddressAccordionBody').removeClass('show');
            // }else{
            //     $('.btn-delivery-addresses-update').removeClass('d-none');
            // }

            _setShippingServiceAjax(shippingServiceSelectValue, openOrderUid);

        });

        // $btnDeliveryAddressesUpdate.click(function(){
        //
        //     if(!$('#deliveryAddressAccordionBody').hasClass('show')){
        //         $deliveryAddressEditContainer.removeClass('d-none');
        //         $deliveryAddressAddContainer.addClass('d-none');
        //     }
        // });
        //
        // $btnDeliveryAddressesAdd.click(function(){
        //     if(!$('#deliveryAddressAccordionBody').hasClass('show')){
        //         $deliveryAddressAddContainer.removeClass('d-none');
        //         $deliveryAddressEditContainer.addClass('d-none');
        //     }
        // });

    });

})(jQuery);