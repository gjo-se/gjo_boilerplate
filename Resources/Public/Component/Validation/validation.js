var gjoSe = gjoSe || {};
gjoSe.validation = {};

(function ($) {
    'use strict';

    gjoSe.validation = {
        _config: {
            _enabled: true,
            formClass: 'gjoSe-form',
            $form: null,
            noValidateHtml5Class: 'no-validate-html5',
            validateJsClass: 'validate-js',

            fieldContainerClass: 'md-form',
            fieldInputClass: 'form-control',
            errorMessageListClass: 'error-message',

            inputErrorClass: 'invalid',
            inputSuccessClass: 'valid',
            labelErrorClass: 'text-danger',
            dataAttribute: 'validation',
            fieldValidatorSplit: ',',
            fieldValidatorAttributeSplit: ':',
            whitespace: 'Ws',
            regex: {
                alphabetic: /^[\p{L} ]*$/u,
                alphanumeric: /^[\p{L}\d ]*$/u,
                numeric: /^-?\d+([,.])?\d*$/,
                email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                uri: /^(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/
            },
            formErrors: {}


        },

        _init: function () {

            $(gjoSe.validation._getForms()).on('submit', function (e) {
                var $form = $(this).closest('form');

                if ($form.hasClass(gjoSe.validation._config.validateJsClass) && gjoSe.validation._config._enabled) {
                    e.preventDefault();
                    gjoSe.validation._setForm($form);

                    if ($form.hasClass(gjoSe.validation._config.noValidateHtml5Class)) {
                        $form.attr('novalidate', 'novalidate');
                    }
                    gjoSe.validation._handleSubmit($form);
                }
            });

        },

        _getForms: function () {
            return '.' + gjoSe.validation._config.formClass;
        },

        _setForm: function ($form) {
            gjoSe.validation.$form = $form;
        },

        _getForm: function () {
            return gjoSe.validation.$form;
        },

        _getFieldsToValidate: function ($form) {
            return $form.find('[data-' + gjoSe.validation._config.dataAttribute + ']');
        },

        _getFieldContainer: function ($form, $field) {
            if ($form) {
                return $($form).find('.' + gjoSe.validation._config.fieldContainerClass)
            } else {
                return $field.closest('.' + gjoSe.validation._config.fieldContainerClass);
            }
        },

        _getFieldValidators: function ($field) {
            var fieldValidators = $field.data(gjoSe.validation._config.dataAttribute);
            return fieldValidators === '' ? [] : fieldValidators.split(gjoSe.validation._config.fieldValidatorSplit);
        },

        _getFieldValue: function ($field) {
            return $.trim($field.val());
        },

        _getFieldName: function ($field) {
            return $field.attr('name');
        },

        _getFieldByName: function ($form, fieldName) {
            return $form.find('[name*=' + fieldName + ']');
        },

        _getFieldErrorMessageContainer: function ($form, $field) {

            if ($form) {
                return $form.find('ul.' + gjoSe.validation._config.errorMessageListClass);
            } else {
                var $fieldContainer = gjoSe.validation._getFieldContainer(null, $field);
                return $fieldContainer.find('ul.' + gjoSe.validation._config.errorMessageListClass);
            }
        },

        _setErrorMessage: function (fieldValidator, $fieldErrorMessageContainer) {
            var errorMessageVariableName = 'errorMessage_' + fieldValidator;
            $fieldErrorMessageContainer.append('<li>' + window[errorMessageVariableName] + '</li>');
        },


        _handleSubmit: function ($form) {
            gjoSe.validation._cleanValidationResults($form);
            gjoSe.validation._validateForm($form);

            if (gjoSe.validation._config.formErrors.length === 0) {
                gjoSe.validation._config._enabled = false;
                $form.submit();
            }
        },

        _cleanValidationResults: function ($form) {
            var $fieldContainer = gjoSe.validation._getFieldContainer($form);

            var $allInputs = $fieldContainer.find('input');
            $allInputs
                .removeClass(gjoSe.validation._config.inputErrorClass)
                .removeClass(gjoSe.validation._config.inputSuccessClass);

            var $allLabels = $fieldContainer.find('label');
            $allLabels
                .removeClass(gjoSe.validation._config.labelErrorClass);

            var $allErrorMessages = gjoSe.validation._getFieldErrorMessageContainer($form);
            $allErrorMessages
                .empty();

            gjoSe.validation._config.formErrors = [];

        },

        _validateForm: function ($form) {
            var $fieldsToValidate = gjoSe.validation._getFieldsToValidate($form);

            if ($fieldsToValidate.length > 0) {
                $fieldsToValidate.each(function () {
                    gjoSe.validation._validateField($(this))
                });
            }
        },

        _validateField: function ($field) {
            var fieldValidators = gjoSe.validation._getFieldValidators($field);

            if (fieldValidators.length > 0) {
                $.each(fieldValidators, function (key, fieldValidatorValue) {

                    var fieldValidatorArr = fieldValidatorValue.split(gjoSe.validation._config.fieldValidatorAttributeSplit);
                    var fieldValidator = $.trim(fieldValidatorArr[0]);


                    // TODO: das kann bestimmt sauberer - und in _getFieldValidatorAttributes
                    // splits in config schieben
                    var fieldValidatorAttributeArr = [];
                    if (fieldValidatorArr.length > 1) {
                        var fieldValidatorAttributes = fieldValidatorArr[1].split('|');
                        if(fieldValidatorAttributes.length > 0){
                            $.each(fieldValidatorAttributes, function (key, fieldValidatorAttribute) {
                                var fieldValidatorAttributes_helper = fieldValidatorAttribute.split('=');
                                fieldValidatorAttributeArr[fieldValidatorAttributes_helper[0]] = fieldValidatorAttributes_helper[1];
                            })
                        }
                    }

                    if (typeof(gjoSe.validation._runValidator[fieldValidator]) !== 'undefined') {
                        gjoSe.validation._runValidator[fieldValidator]($field, fieldValidatorAttributeArr);
                    }
                });
            }
        },

        _runValidator: {
            alphabetic: function ($field) {
                var fieldName = gjoSe.validation._getFieldName($field);
                var fieldValue = gjoSe.validation._getFieldValue($field);
                var regex = gjoSe.validation._config.regex.alphabetic;
                if(fieldValue !== '' && !regex.test(fieldValue)){
                    gjoSe.validation._setErrorMessage('alphabetic', gjoSe.validation._getFieldErrorMessageContainer(null, $field));
                    gjoSe.validation._config.formErrors.push(fieldName + '_alphabetic');
                }
            },
            alphanumeric: function ($field) {
                var fieldName = gjoSe.validation._getFieldName($field);
                var fieldValue = gjoSe.validation._getFieldValue($field);
                var regex = gjoSe.validation._config.regex.alphanumeric;
                if(fieldValue !== '' && !regex.test(fieldValue)){
                    gjoSe.validation._setErrorMessage('alphanumeric', gjoSe.validation._getFieldErrorMessageContainer(null, $field));
                    gjoSe.validation._config.formErrors.push(fieldName + '_alphanumeric');
                }
            },
            numeric: function ($field) {
                var fieldName = gjoSe.validation._getFieldName($field);
                var fieldValue = gjoSe.validation._getFieldValue($field);
                var regex = gjoSe.validation._config.regex.numeric;
                if(fieldValue !== '' && !regex.test(fieldValue)){
                    gjoSe.validation._setErrorMessage('numeric', gjoSe.validation._getFieldErrorMessageContainer(null, $field));
                    gjoSe.validation._config.formErrors.push(fieldName + '_numeric');
                }
            },
            email: function ($field) {
                var fieldName = gjoSe.validation._getFieldName($field);
                var fieldValue = gjoSe.validation._getFieldValue($field);
                var regex = gjoSe.validation._config.regex.email;
                if(fieldValue !== '' && !regex.test(fieldValue)){
                    gjoSe.validation._setErrorMessage('email', gjoSe.validation._getFieldErrorMessageContainer(null, $field));
                    gjoSe.validation._config.formErrors.push(fieldName + '_email');
                }
            },
            uri: function ($field) {
                var fieldName = gjoSe.validation._getFieldName($field);
                var fieldValue = gjoSe.validation._getFieldValue($field);
                var regex = gjoSe.validation._config.regex.uri;
                if(fieldValue !== '' && !regex.test(fieldValue)){
                    gjoSe.validation._setErrorMessage('uri', gjoSe.validation._getFieldErrorMessageContainer(null, $field));
                    gjoSe.validation._config.formErrors.push(fieldName + '_uri');
                }
            },
            required: function ($field) {
                var fieldName = gjoSe.validation._getFieldName($field);
                var fieldValue = gjoSe.validation._getFieldValue($field);
                if(fieldValue === ''){
                    gjoSe.validation._setErrorMessage('required', gjoSe.validation._getFieldErrorMessageContainer(null, $field));
                    gjoSe.validation._config.formErrors.push(fieldName + '_required');
                }
            },
            sringLength: function ($field, fieldValidatorAttribute) {
                var fieldName = gjoSe.validation._getFieldName($field);
                var fieldValue = gjoSe.validation._getFieldValue($field);
                var min = fieldValidatorAttribute.min;
                var max = fieldValidatorAttribute.max;

                if(fieldValue !== '') {
                    if (typeof(min) === 'string' && typeof(max) === 'string'){
                        if(fieldValue.length < min || fieldValue.length > max){
                            gjoSe.validation._setErrorMessage('stringLength_between', gjoSe.validation._getFieldErrorMessageContainer(null, $field));
                            gjoSe.validation._config.formErrors.push(fieldName + '_stringLength_between');
                        }

                    }

                    if (typeof(min) === 'string' && typeof(max) !== 'string'){
                        if(fieldValue.length < min){
                            gjoSe.validation._setErrorMessage('stringLength_min', gjoSe.validation._getFieldErrorMessageContainer(null, $field));
                            gjoSe.validation._config.formErrors.push(fieldName + '_stringLength_min');
                        }

                    }

                    if (typeof(min) !== 'string' && typeof(max) === 'string'){
                        if(fieldValue.length > max){
                            gjoSe.validation._setErrorMessage('stringLength_max', gjoSe.validation._getFieldErrorMessageContainer(null, $field));
                            gjoSe.validation._config.formErrors.push(fieldName + '_stringLength_max');
                        }

                    }
                }
            },
            numericRange: function ($field, fieldValidatorAttribute) {
                var fieldName = gjoSe.validation._getFieldName($field);
                var fieldValue = gjoSe.validation._getFieldValue($field);
                var min = fieldValidatorAttribute.min;
                var max = fieldValidatorAttribute.max;

                if(fieldValue !== ''){
                    gjoSe.validation._runValidator['numeric']($field);

                    if (min > max) {
                        var helper = min;
                        min = max;
                        max = helper;
                    }

                    if (fieldValue < min || fieldValue > max) {
                        gjoSe.validation._setErrorMessage('numericRange_range', gjoSe.validation._getFieldErrorMessageContainer(null, $field));
                        gjoSe.validation._config.formErrors.push(fieldName + '_numericRange_range');
                    }
                }
            },
            confirm: function ($field, $fieldToConfirm) {
                var fieldName = gjoSe.validation._getFieldName($field);
                var fieldValue = gjoSe.validation._getFieldValue($field);

                var fieldToConfirm = gjoSe.validation._getFieldByName(gjoSe.validation._getForm(), $fieldToConfirm.field);
                var fieldToConfirmName = gjoSe.validation._getFieldName(fieldToConfirm);
                var fieldToConfirmValue = gjoSe.validation._getFieldValue(fieldToConfirm);

                if (fieldValue !== fieldToConfirmValue) {
                    gjoSe.validation._setErrorMessage('confirm', gjoSe.validation._getFieldErrorMessageContainer(null, $field));
                    gjoSe.validation._config.formErrors.push(fieldName + '_confirm');
                }
            }
        },

    }

    $(document).ready(function () {
        gjoSe.validation._init();
    });

})(jQuery);