/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */
define([
    'Magento_Customer/js/customer-data',
    'domReady!'
], function (customerData) {
    'use strict';

    /**
     * Push data into dataLayer obj
     * @private
     */
    const _push = function (data) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(data);
    };

    return function () {
        customerData.get('cart').subscribe(function (value) {

            if (value.gtm_product_update) {
                value.gtm_product_update.ecommerce.items[0].index = window.productIndex || 1;
                value.gtm_product_update.ecommerce.items[0].item_list_name = window.item_list_name || 'n/a';
                _push(value.gtm_product_update);
            }
        });
    };
});
