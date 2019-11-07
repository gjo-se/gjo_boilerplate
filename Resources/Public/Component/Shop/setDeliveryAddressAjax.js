(function ($) {
    'use strict';

    var typeNum = 1517551443;
    var deliveryAddressIsLikeBillingAddress = 0;
    //
    var $deliveryAddressesSelect = $('.delivery-addresses-select');
    var $btnDeliveryAddressesUpdate = $('.btn-delivery-addresses-update');
    var $btnDeliveryAddressesAdd = $('.btn-delivery-addresses-add');
    var $btnDeliveryAddressesDelete = $('.btn-delivery-addresses-delete');
    var $btnDeliveryAddressesAddCancel = $('.btn-delivery-addresses-add-cancel');
    var $deliveryAddressEditContainer = $('.delivery-address-edit');
    var $deliveryAddressAddContainer = $('.delivery-address-add');
    var $openOrderHidden = $('.open-order-hidden');
    var $deliveryAddressFields = $('#delivery-addresses-fields');
    var $updateDeliveryAddressForm = $('#update-delivery-address-form');
    var $updateDeliveryAddressFormUid = $('#update-delivery-address-form-uid');
    var $updateDeliveryAddressFormName = $('#update-delivery-address-form-name');
    var $updateDeliveryAddressFormCompany = $('#update-delivery-address-form-company');
    var $updateDeliveryAddressFormAddress = $('#update-delivery-address-form-address');
    var $updateDeliveryAddressFormZip = $('#update-delivery-address-form-zip');
    var $updateDeliveryAddressFormCity = $('#update-delivery-address-form-city');
    var $updateDeliveryAddressFormCountry = $('#update-delivery-address-form-country');
    var $updateDeliveryAddressFormTelephone = $('#update-delivery-address-form-telephone');

    var _setDeliverAddressAjax = function (deliveryAddressesSelectValue, openOrderUid) {

        $.ajax({
            url: '/index.php',
            method: 'POST',
            data: {
                type: typeNum,
                deliveryAddressesSelectValue: deliveryAddressesSelectValue,
                openOrderUid: openOrderUid
            },
            success: function (response) {

                var responseObj = jQuery.parseJSON(response);
                if(response.length > 2){
                    _setDeliveryAddressFormdata(responseObj.deliveryAddress);
                }

            },
            error: function (error) {
                console.error(error);
            }
        });
    };

    var _setDeliveryAddressFormdata = function (deliveryAddress) {

        $updateDeliveryAddressFormUid.val(deliveryAddress.uid);
        $updateDeliveryAddressFormName.val(deliveryAddress.name);
        $updateDeliveryAddressFormCompany.val(deliveryAddress.company);
        $updateDeliveryAddressFormAddress.val(deliveryAddress.address);
        $updateDeliveryAddressFormZip.val(deliveryAddress.zip);
        $updateDeliveryAddressFormCity.val(deliveryAddress.city);
        $updateDeliveryAddressFormCountry.val(deliveryAddress.country);
        $updateDeliveryAddressFormTelephone.val(deliveryAddress.telephone);

    };

    $(document).ready(function () {

        $deliveryAddressesSelect.change(function (event) {
            var deliveryAddressesSelectValue = parseInt($deliveryAddressesSelect.val());
            var openOrderUid = $openOrderHidden.val();

            if(deliveryAddressesSelectValue === deliveryAddressIsLikeBillingAddress){

                $('.btn-delivery-addresses-update').addClass('d-none');
                $('#deliveryAddressAccordionBody').removeClass('show');
                $deliveryAddressFields.addClass('d-none');
                $btnDeliveryAddressesDelete.addClass('d-none');
            }else{
                $('.btn-delivery-addresses-update').removeClass('d-none');
                $deliveryAddressFields.removeClass('d-none');
                $deliveryAddressAddContainer.addClass('d-none');
                $btnDeliveryAddressesDelete.removeClass('d-none');
            }

            _setDeliverAddressAjax(deliveryAddressesSelectValue, openOrderUid);

        });

        $btnDeliveryAddressesUpdate.click(function(){

            if(!$('#deliveryAddressAccordionBody').hasClass('show')){
                $deliveryAddressEditContainer.removeClass('d-none');
                $deliveryAddressAddContainer.addClass('d-none');
            }
        });

        $btnDeliveryAddressesAdd.click(function(){

            $deliveryAddressAddContainer.removeClass('d-none');
            $('.delivery-address-edit').addClass('d-none');

        });

        $btnDeliveryAddressesAddCancel.click(function(){

            $deliveryAddressAddContainer.addClass('d-none');
            $('.delivery-address-edit').removeClass('d-none');

        });

    });

})(jQuery);