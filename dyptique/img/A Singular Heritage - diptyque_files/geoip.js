/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

define([
    "jquery",
    'Magento_Checkout/js/model/error-processor',
    "mage/cookies"
], function (
    $,
    errorProcessor
) {
    "use strict";

    $.widget('vaimo.geoip', {
        options: {
            ajaxCheckUrl: '',
            ajaxRedirectRequiredUrl: '',
            pathInfo: ''
        },
        redirectRequired: 0,

        _create: function () {
            let loaderBlock = $(this.element),
                geoIpCookie = $.mage.cookies.get('geoip_store_code'),
                isSocialMedia = this.isSocialMediaReferer();
            //proceed only if param missed
            if (!this.checkRedirectParam() && !this.googleSuggestionFlagExist()) {
                if (isSocialMedia) {
                    this.isRedirectRequired(loaderBlock);
                }

                if (!isSocialMedia && typeof geoIpCookie !== 'string') {
                    this.isRedirectRequired(loaderBlock);
                }
            }
        },

        isSocialMediaReferer: function () {
            let query = window.location.search.substring(1),
                queryParams = query.split('&'),
                queryParamsMap = new Map(),
                keyValue;

            for (let i = 0; i < queryParams.length; i++) {
                keyValue = queryParams[i].split('=');

                queryParamsMap.set(keyValue[0], keyValue[1]);
            }

            return queryParamsMap.has('utm_medium');
        },

        isRedirectRequired: function (loaderBlock) {
            let self = this;

            $.ajax({
                url: this.options.ajaxRedirectRequiredUrl,
                type: "POST",
                data: '',
            }).done(function (response) {
                if (response.isRedirectRequired === 1) {
                    self.toggleLoader(loaderBlock);
                    self.checkRedirectUrl(loaderBlock);
                }
            }).fail(function (response) {
                errorProcessor.process(response);
            });
        },

        checkRedirectUrl: function (loaderBlock) {
            let self = this;

            $.ajax({
                url: this.options.ajaxCheckUrl,
                type: "POST",
                data: {
                    pathInfo: this.options.pathInfo
                },
            }).done(function (response) {
                if (response.redirectUrl) {
                    window.location.replace(response.redirectUrl);
                }
            }).fail(function (response) {
                errorProcessor.process(response);
            }).always(function () {
                setTimeout(function () {
                    self.toggleLoader(loaderBlock);
                }, 1500);
            });
        },

        toggleLoader: function (loaderBlock) {
            loaderBlock.toggle();
        },
        /**
         * Additional check to prevent redirect when was performed call with specific param
         * @returns {boolean}
         */
        checkRedirectParam: function () {
            const urlParams = new URLSearchParams(window.location.search);
            return !!urlParams.get('redirectQuoteId');
        },

        /**
         * Check if google suggestion redirect flag exist
         * @returns {boolean}
         */
        googleSuggestionFlagExist: function () {
            return !!$.mage.cookies.get(
                'google_suggestions_redirect_flag'
            );
        }
    });

    return $.vaimo.geoip;
});
