/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */
define([
    'ko',
    'uiComponent',
    'Magento_Customer/js/customer-data'
], function (ko, Component, customerData) {
    'use strict';

    return Component.extend({
        /**
         * @override
         */
        initialize: function () {
            this.showDiscountTotal = ko.observable(false);
            this.cart = customerData.get('cart');
            this.initValues();
            this._super();
        },
        /**
         * Init obs
         * @returns {exports}
         */
        initObservable: function () {
            this._super();
            this.cart.subscribe(function () {
                this.initValues();
            }, this);
            return this;
        },
        /**
         * Init all needed for component values
         */
        initValues: function() {
            if (typeof this.cart().discount_amount !== 'undefined' && this.cart().discount_amount !== 0) {
                this.showDiscountTotal(true);
            }
        }
    });
});
