var langHelperSalutationMr = $('#llang-helper-salutation-mr').text();
var langHelperSalutationMrs = $('#llang-helper-salutation-mrs').text();
var langHelperPleaseEnterFullName = $('#lang-helper-pleaseEnterFullName').text();
var langHelperPleaseEnterFullName = $('#lang-helper-pleaseEnterFullName').text();
var langHelperPleaseEnterAddress = $('#lang-helper-pleaseEnterAddress').text();
var langHelperPleaseEnterZip = $('#lang-helper-pleaseEnterZip').text();
var langHelperPleaseEnterCity = $('#lang-helper-pleaseEnterCity').text();
var langHelperPleaseEnterCountry = $('#lang-helper-pleaseEnterCountry').text();

var $billingAddressSalutationFormField = $("#billingAddress-salutation-form-field");
var $billingAddressSalutationTextField = $("#billingAddress-salutation-text-field");

var $billingAddressNameFormField = $("#billingAddress_name");
var $billingAddressNameTextField = $("#billingAddress_name_text_field");

var $billingAddressCompanyFormField = $("#billingAddress_company");
var $billingAddressCompanyTextField = $("#billingAddress_company_text_field");

var $billingAddressAddressFormField = $("#billingAddress_address");
var $billingAddressAddressTextField = $("#billingAddress_address_text_field");

var $billingAddressZipFormField = $("#billingAddress_zip");
var $billingAddressZipTextField = $("#billingAddress_zip_text_field");

var $billingAddressCityFormField = $("#billingAddress_city");
var $billingAddressCityTextField = $("#billingAddress_city_text_field");

var $billingAddressCountryFormField = $("#billingAddress-country");
var $billingAddressCountryTextField = $("#billingAddress-country-text-field");

var _setBillingAddressText = function () {



    var $billingAddressEditIcon = $('.billingAddress.fa-edit');
    var $billingAddressCloseIcon = $('.billingAddress.fa-window-close-o');

    $billingAddressEditIcon.on('click', function () {
        $(this).addClass('d-none');
        $billingAddressCloseIcon.removeClass('d-none');
    })

    $billingAddressCloseIcon.on('click', function () {
        $(this).addClass('d-none');
        $billingAddressEditIcon.removeClass('d-none');
    })

    $billingAddressSalutationFormField.on('change', function () {

        switch (parseInt($billingAddressSalutationFormField.val())) {
            case 1:
                $billingAddressSalutationTextField.html(langHelperSalutationMr + '&nbsp');
                break;
            case 2:
                $billingAddressSalutationTextField.html(langHelperSalutationMrs + '&nbsp');
                break;
            default:
                $billingAddressSalutationTextField.html('');
        }
    });


    $billingAddressNameFormField.on('change', function () {
        var feUserNameTextFieldVal = $billingAddressNameFormField.val();

        if(feUserNameTextFieldVal){
            $billingAddressNameTextField.text(feUserNameTextFieldVal);
        }else{
            $billingAddressNameTextField.html('<span class="text-danger">' + langHelperPleaseEnterFullName + '</span>');
        }
    });

    $billingAddressCompanyFormField.on('change', function () {
        $billingAddressCompanyTextField.text($billingAddressCompanyFormField.val());
    });

    $billingAddressAddressFormField.on('change', function () {
        var billingAddressTextFieldVal = $billingAddressAddressFormField.val();

        if(billingAddressTextFieldVal){
            $billingAddressAddressTextField.text(billingAddressTextFieldVal);
        }else{
            $billingAddressAddressTextField.html('<span class="text-danger">' + langHelperPleaseEnterAddress + '</span>');
        }
    });

    $billingAddressZipFormField.on('change', function () {
        var feUserZipTextFieldVal = $billingAddressZipFormField.val();

        if(feUserZipTextFieldVal){
            $billingAddressZipTextField.html(feUserZipTextFieldVal + '&nbsp;');
        }else{
            $billingAddressZipTextField.html('<span class="text-danger">' + langHelperPleaseEnterZip + '</span>');
        }
    });

    $billingAddressCityFormField.on('change', function () {
        var feUserCityTextFieldVal = $billingAddressCityFormField.val();

        if(feUserCityTextFieldVal){
            $billingAddressCityTextField.text(feUserCityTextFieldVal);
        }else{
            $billingAddressCityTextField.html('<span class="text-danger">' + langHelperPleaseEnterCity + '</span>');
        }
    });

    $billingAddressCountryFormField.on('change', function () {

        var $billingAddressCountryFormFieldVal = $billingAddressCountryFormField.val();

        switch ($billingAddressCountryFormFieldVal) {
            case 'DE':
                $billingAddressCountryTextField.html('Deutschland');
                break;
            case 'AT':
                $billingAddressCountryTextField.html('Österreich');
                break;
            case 'CH':
                $billingAddressCountryTextField.html('Schweiz');
                break;
            case 'PL':
                $billingAddressCountryTextField.html('Polen');
                break;
            case 'FR':
                $billingAddressCountryTextField.html('Frankreich');
                break;
            case 'ES':
                $billingAddressCountryTextField.html('Spanien');
                break;
            case 'IT':
                $billingAddressCountryTextField.html('Italien');
                break;
            default:
                $billingAddressCountryTextField.html('');
        }
    });





};

$(document).ready(function () {
    _setBillingAddressText();
});