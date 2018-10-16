(function ($) {
    'use strict';

    const TYPE_NUM = 1517551443;
    const BILLING_ADDRESS = 'billingAddress';
    const NEW_DELIVERY_ADDRESS = 'newDeliveryAddress';

    var $deliveryAddressUidFormField = $("#deliveryAddress-uid");

    var $deliveryAddressSalutationFormField = $("#deliveryAddress-salutation");
    var $deliveryAddressSalutationTextField = $("#deliveryAddress-salutation-text-field");

    var $deliveryAddressNameFormField = $("#deliveryAddress-name");
    var $deliveryAddressNameTextField = $("#deliveryAddress-name-text-field");

    var $deliveryAddressCompanyFormField = $("#deliveryAddress-company");
    var $deliveryAddressCompanyTextField = $("#deliveryAddress-company-text-field");

    var $deliveryAddressAddressFormField = $("#deliveryAddress-address");
    var $deliveryAddressAddressTextField = $("#deliveryAddress-address-text-field");

    var $deliveryAddressZipFormField = $("#deliveryAddress-zip");
    var $deliveryAddressZipTextField = $("#deliveryAddress-zip-text-field");

    var $deliveryAddressCityFormField = $("#deliveryAddress-city");
    var $deliveryAddressCityTextField = $("#deliveryAddress-city-text-field");

    var $deliveryAddressCountryFormField = $("#deliveryAddress-country");
    var $deliveryAddressCountryTextField = $("#deliveryAddress-country-text-field");

    var $deliveryAddressTelephoneFormField = $("#deliveryAddress-telephone");
    var $deliveryAddressTelephoneTextField = $("#deliveryAddress-telephone-text-field");

    var $deliveryAddressEditIcon = $('.deliveryAddress.fa-edit');
    var $deliveryAddressCloseIcon = $('.deliveryAddress.fa-window-close-o');


    var $deliveryAddressesSelect = $('#delivery-addresses-select');

    var $openOrderHidden = $('#open-order-hidden');

    var $deliveryAddressEditContainer = $('#delivery-address-edit');
    var $deliveryAddressIsLikeBillingAddressTextContainer = $('#delivery-address-is-like-billing-address-text-container');
    var $deliveryAddressIsNotLikeBillingAddressTextContainer = $('#delivery-address-is-not-like-billing-address-text-container');
    var $deliveryAddressFields = $('#delivery-addresses-fields');

    var $btnDeliveryAddressEdit = $('#btn-delivery-address-edit');
    var $btnDeliveryAddressesDelete = $('#btn-delivery-addresses-delete');
    var $btnDeliveryAddressesAddCancel = $('#btn-delivery-addresses-add-cancel');

    var _setDeliveryAddressText = function (openOrderUid) {

        $deliveryAddressEditIcon.on('click', function () {
            $(this).addClass('d-none');
            $deliveryAddressCloseIcon.removeClass('d-none');
        })

        $deliveryAddressCloseIcon.on('click', function () {
            $(this).addClass('d-none');
            $deliveryAddressEditIcon.removeClass('d-none');
        })


        $deliveryAddressSalutationFormField.on('change', function () {
            _setDeliveryAddressSalutationTextField($(this).val());
        });

        $deliveryAddressNameFormField.on('change', function () {
            _setDeliveryAddressNameTextField($(this).val());
        });

        $deliveryAddressCompanyFormField.on('change', function () {
            _setDeliveryAddressCompanyTextField($(this).val());
        });

        $deliveryAddressAddressFormField.on('change', function () {
            _setDeliveryAddressAddresseTextField($(this).val());
        });

        $deliveryAddressZipFormField.on('change', function () {
            _setDeliveryAddressZipTextField($(this).val());
        });

        $deliveryAddressCityFormField.on('change', function () {
            _setDeliveryAddressCityTextField($(this).val());
        });

        $deliveryAddressCountryFormField.on('change', function () {
            _setDeliveryAddressCountryTextField($(this).val());
        });


    };

    var _setDeliveryAddressSalutationTextField = function (value) {

        switch (parseInt(value)) {
            case 1:
                $deliveryAddressSalutationTextField.html('Herr' + '&nbsp');
                break;
            case 2:
                $deliveryAddressSalutationTextField.html('Frau' + '&nbsp');
                break;
            default:
                $deliveryAddressSalutationTextField.html('');
        }
    };

    var _setDeliveryAddressNameTextField = function (value) {

        if (value) {
            $deliveryAddressNameTextField.text(value);
        } else {
            $deliveryAddressNameTextField.html('<span class="text-danger"> - bitte Namen eintragen - </span>');
        }
    };

    var _setDeliveryAddressCompanyTextField = function (value) {
        $deliveryAddressCompanyTextField.text(value);
    };

    var _setDeliveryAddressAddresseTextField = function (value) {

        if (value) {
            $deliveryAddressAddressTextField.text(value);
        } else {
            $deliveryAddressAddressTextField.html('<span class="text-danger"> - bitte Adresse eintragen - </span>');
        }
    };

    var _setDeliveryAddressZipTextField = function (value) {

        if (value) {
            $deliveryAddressZipTextField.html(value + '&nbsp');
        } else {
            $deliveryAddressZipTextField.html('<span class="text-danger"> - bitte PLZ eintragen - </span>');
        }

    };

    var _setDeliveryAddressCityTextField = function (value) {

        if (value) {
            $deliveryAddressCityTextField.text(value);
        } else {
            $deliveryAddressCityTextField.html('<span class="text-danger"> - bitte Ort eintragen - </span>');
        }

    };

    var _setDeliveryAddressCountryTextField = function (value) {

        switch (value) {
            case 'DE':
                $deliveryAddressCountryTextField.html('Deutschland');
                break;
            case 'AT':
                $deliveryAddressCountryTextField.html('Österreich');
                break;
            case 'CH':
                $deliveryAddressCountryTextField.html('Schweiz');
                break;
            case 'PL':
                $deliveryAddressCountryTextField.html('Polen');
                break;
            case 'FR':
                $deliveryAddressCountryTextField.html('Frankreich');
                break;
            case 'ES':
                $deliveryAddressCountryTextField.html('Spanien');
                break;
            case 'IT':
                $deliveryAddressCountryTextField.html('Italien');
                break;
            default:
                $deliveryAddressCountryTextField.html('');
        }

    };

    var _handleDeliveryAddressSelect = function () {
        $deliveryAddressesSelect.change(function (event) {

            var deliveryAddressesSelectValue = $deliveryAddressesSelect.val();

            switch (deliveryAddressesSelectValue) {
                case BILLING_ADDRESS:
                    _handleDeliveryAddressIsLikeBillingAddress();
                    break;
                case NEW_DELIVERY_ADDRESS:
                    _handleDeliveryAddressIsNew();
                    break;
                default:
                    _handleDeliveryAddressIsOneFromSelect(deliveryAddressesSelectValue);
            }
            ;

        });
    };

    var _handleDeliveryAddressIsLikeBillingAddress = function () {

        $deliveryAddressIsLikeBillingAddressTextContainer.removeClass('d-none');
        $deliveryAddressIsNotLikeBillingAddressTextContainer.addClass('d-none');

        $deliveryAddressFields.addClass('d-none');

        // for Validation set Default billingAddressData
        var deliveryAddress = {
            "salutation":$billingAddressSalutationFormField.val(),
            "name":$billingAddressNameFormField.val(),
            "company":$billingAddressCompanyFormField.val(),
            "address":$billingAddressAddressFormField.val(),
            "zip":$billingAddressZipFormField.val(),
            "city":$billingAddressCityFormField.val(),
            "country":$billingAddressCountryFormField.val()
        };

        _setDeliveryAddressFormdata(deliveryAddress);

        $btnDeliveryAddressesDelete.addClass('d-none');

    };

    var _handleDeliveryAddressIsNew = function () {

        $deliveryAddressIsLikeBillingAddressTextContainer.addClass('d-none');
        $deliveryAddressIsNotLikeBillingAddressTextContainer.removeClass('d-none');

        $deliveryAddressFields.removeClass('d-none');
        _setDeliveryAddressFormdata(null);
        $btnDeliveryAddressesDelete.addClass('d-none');
        $btnDeliveryAddressesAddCancel.removeClass('d-none');

    };

    var _handleDeliveryAddressIsOneFromSelect = function (deliveryAddressesSelectValue) {

        $deliveryAddressIsLikeBillingAddressTextContainer.addClass('d-none');
        $deliveryAddressIsNotLikeBillingAddressTextContainer.removeClass('d-none');

        $deliveryAddressFields.removeClass('d-none');
        _getSelectedDeliverAddressAjax(deliveryAddressesSelectValue);
        $btnDeliveryAddressesDelete.removeClass('d-none');
        $btnDeliveryAddressesAddCancel.addClass('d-none');

    };

    var _handleButtons = function (deliveryAddressesSelectValue) {

        $btnDeliveryAddressEdit.click(function () {
            if ($('#delivery-addresses-select option[value="newDeliveryAddress"]').length === 0) {
                var $optionNewDeliveryAddress = $('<option value="newDeliveryAddress">Neue Lieferanschrift</option>');
                var $optionBillingAddress = $('option[value="billingAddress"]');

                $optionNewDeliveryAddress.insertAfter($optionBillingAddress);
            }
        });


        $btnDeliveryAddressesAddCancel.click(function () {

            $deliveryAddressesSelect.val(BILLING_ADDRESS);
            $deliveryAddressesSelect.material_select('destroy');
            $deliveryAddressesSelect.material_select();

            $deliveryAddressIsLikeBillingAddressTextContainer.removeClass('d-none');
            $deliveryAddressIsNotLikeBillingAddressTextContainer.addClass('d-none');

            $deliveryAddressFields.addClass('d-none');

        });
    };

    var _getSelectedDeliverAddressAjax = function (deliveryAddressesSelectValue) {

        $.ajax({
            url: '/index.php',
            method: 'POST',
            data: {
                type: TYPE_NUM,
                deliveryAddressesSelectValue: deliveryAddressesSelectValue
            },
            success: function (response) {

                var responseObj = jQuery.parseJSON(response);
                if (response.length > 2) {
                    _setDeliveryAddressFormdata(responseObj.deliveryAddress);
                }

            },
            error: function (error) {
                console.error(error);
            }
        });
    };


    var _setDeliveryAddressFormdata = function (deliveryAddress) {

        if (deliveryAddress) {
            $deliveryAddressUidFormField.val(deliveryAddress.uid);
            $deliveryAddressSalutationFormField.val(deliveryAddress.salutation);
            _setDeliveryAddressSalutationTextField(deliveryAddress.salutation);
            $deliveryAddressNameFormField.val(deliveryAddress.name);
            _setDeliveryAddressNameTextField(deliveryAddress.name);
            $deliveryAddressCompanyFormField.val(deliveryAddress.company);
            _setDeliveryAddressCompanyTextField(deliveryAddress.company);
            $deliveryAddressAddressFormField.val(deliveryAddress.address);
            _setDeliveryAddressAddresseTextField(deliveryAddress.address)
            $deliveryAddressZipFormField.val(deliveryAddress.zip);
            _setDeliveryAddressZipTextField(deliveryAddress.zip);
            $deliveryAddressCityFormField.val(deliveryAddress.city);
            _setDeliveryAddressCityTextField(deliveryAddress.city);
            $deliveryAddressCountryFormField.val(deliveryAddress.country);
            _setDeliveryAddressCountryTextField(deliveryAddress.country);
            $deliveryAddressTelephoneFormField.val(deliveryAddress.telephone);
        } else {
            $deliveryAddressUidFormField.val(0);
            $deliveryAddressSalutationFormField.val('1');
            _setDeliveryAddressSalutationTextField('');
            $deliveryAddressNameFormField.val('');
            _setDeliveryAddressNameTextField();
            $deliveryAddressCompanyFormField.val('');
            _setDeliveryAddressCompanyTextField('');
            $deliveryAddressAddressFormField.val('');
            _setDeliveryAddressAddresseTextField('');
            $deliveryAddressZipFormField.val('');
            _setDeliveryAddressZipTextField('');
            $deliveryAddressCityFormField.val('');
            _setDeliveryAddressCityTextField('');
            $deliveryAddressCountryFormField.val('DE');
            _setDeliveryAddressCountryTextField('');
            $deliveryAddressTelephoneFormField.val('');

        }

        $deliveryAddressSalutationFormField.material_select('destroy');
        $deliveryAddressSalutationFormField.material_select();

        $deliveryAddressCountryFormField.material_select('destroy');
        $deliveryAddressCountryFormField.material_select();


    };

    $(document).ready(function () {

        _setDeliveryAddressText();
        _handleDeliveryAddressSelect();
        _handleButtons();

    });

})(jQuery);