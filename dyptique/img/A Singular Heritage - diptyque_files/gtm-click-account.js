define([
    'jquery',
    'domReady!'
], function ($) {
    'use strict';

    return function (params) {
        $(document).on('click', 'a.login.social-login-btn', function () {
            window.dataLayer = window.dataLayer || []; // init
            var dlClickAccount = {
                'event':'clickAccount',
                'connected': 'No',
            };
            if (window.dataLayer) {
                dataLayer.push(dlClickAccount);
            }
        });

        $(document).on('click', '.customer-menu .header > li', function () {
            window.dataLayer = window.dataLayer || []; // init
            var dlClickAccount = {
                'event':'clickAccount',
                'connected': 'Yes',
            };
            if (window.dataLayer) {
                dataLayer.push(dlClickAccount);
            }
        });
    };
});


