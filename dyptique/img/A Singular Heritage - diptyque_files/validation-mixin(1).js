define(['jquery'], function($) {
    'use strict';

    return function() {
        $.validator.addMethod(
            'validate-all-phonenumbers',
            function(value, element) {
                return $.mage.isEmptyNoTrim(value) || /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(value);
            },
            $.mage.__('Please enter a valid phone number. For example (123) 456-7890 or 123-456-7890.')
        )
    }
});
