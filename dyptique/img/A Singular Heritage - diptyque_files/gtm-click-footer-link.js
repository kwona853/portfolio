define([
    'jquery',
    'domReady!'
], function ($) {
    'use strict';

    return function (config) {
        $(document).on('click', '.footer-pages-links a', function() {
            var category = $(this).parents(".column").find(".handle a");

            window.dataLayer = window.dataLayer || [ ]; // init

            var dlClickFooterLink = {
                'event':'clickFooterNav',
                'category': $.trim(category.text()),
                'link':$.trim($(this).text())
            };

            if (window.dataLayer) {
                dataLayer.push(dlClickFooterLink);
            }
        });
    };
});


