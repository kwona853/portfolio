/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */
define([
    'jquery',
    'domReady!'
], function ($) {
    'use strict';

    return function (params) {
        function _push(data) {
            window.gtmData = window.gtmData || {};
            window.dataLayer = window.dataLayer || [];

            window.dataLayer.push(data);
            window.gtmData = data;
        }

        let restUrl = params.baseUrl + 'rest/V1/dptq_gtm/page_data';
        let dlPage = params.page_data;

        $.ajax({
            url: restUrl,
            type: 'GET',
            dataType: 'json'
        }).done(function (response) {
            response = JSON.parse(response);

            dlPage.id = response.id;
            dlPage['login_status'] = response['login_status'];
            dlPage['newsletter_subscription_status'] = response['newsletter_subscription_status'];

            _push(dlPage);
        }).fail(function (response) {
            console.log(response);
            _push(dlPage);
        });

        $('body').on('click', '#onetrust-accept-btn-handler, #onetrust-consent-sdk .save-preference-btn-handler', function (e) {
            _push(dlPage);
        });
    };
});
