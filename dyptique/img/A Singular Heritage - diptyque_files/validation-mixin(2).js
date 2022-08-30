define([
    'jquery',
    'Magento_Payment/js/model/credit-card-validation/credit-card-number-validator',
    'Magento_Ui/js/lib/validation/utils'
], function ($, creditCardNumberValidator, utils) {
    "use strict";

    return function () {
        $.validator.addMethod(
            'validate-selected-card-type',
            function (number, item, selectedType) {
                var cardInfo,
                    i,
                    l;

                if (!creditCardNumberValidator(number).isValid) {
                    return false;
                }

                cardInfo = creditCardNumberValidator(number).card;

                if (cardInfo.type == $(selectedType).val()) { //eslint-disable-line eqeqeq
                    return true;
                }

                return false;
            },
            $.mage.__('Please enter a valid credit card type number.')
        );
        $.validator.addMethod(
            'required-email',
            function (value) {
                return !utils.isEmpty(value);
            },
            $.mage.__('Email is required.')
        );
        $.validator.addMethod(
            'required-password',
            function (value) {
                return !utils.isEmpty(value);
            },
            $.mage.__('Password is required.')
        );
    }
});