define([
    'jquery'
], function ($) {
    "use strict";

    return function () {
        $.validator.addMethod(
            'validate-emoji',
            function (value) {
                var regex = /\u00a9|\u00ae|[\u2000-\u25ff]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/;
                return !regex.test(value);
            },
            $.mage.__('Please enter a valid value.')
        );
    }
});
