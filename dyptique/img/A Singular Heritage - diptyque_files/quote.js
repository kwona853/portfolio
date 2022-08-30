/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
/**
 * @api
 */
define([
    'ko',
    'underscore',
    'domReady!'
], function (ko, _) {
    'use strict';

    /**
     * Get totals data from the extension attributes.
     * @param {*} data
     * @returns {*}
     */
    var proceedTotalsData = function (data) {
            if (_.isObject(data) && _.isObject(data['extension_attributes'])) {
                _.each(data['extension_attributes'], function (element, index) {
                    data[index] = element;
                });
            }

            return data;
        },
        billingAddress = ko.observable(null),
        shippingAddress = ko.observable(null),
        shippingMethod = ko.observable(null),
        paymentMethod = ko.observable(null),
        quoteData = window.checkoutConfig ? window.checkoutConfig.quoteData : false,
        basePriceFormat = window.checkoutConfig ? window.checkoutConfig.basePriceFormat : false,
        priceFormat = window.checkoutConfig ? window.checkoutConfig.priceFormat : false,
        storeCode = window.checkoutConfig ? window.checkoutConfig.storeCode : false,
        totalsData = window.checkoutConfig ? proceedTotalsData(window.checkoutConfig.totalsData) : false,
        totals = window.checkoutConfig && window.checkoutConfig.quoteData ? ko.observable(totalsData) : false,
        collectedTotals = ko.observable({});

    return {
        // Override
        accountCreate: ko.observable(null),
        //End Override
        totals: totals,
        shippingAddress: shippingAddress,
        shippingMethod: shippingMethod,
        billingAddress: billingAddress,
        paymentMethod: paymentMethod,
        guestEmail: null,

        /**
         * @return {*}
         */
        getQuoteId: function () {
            return quoteData['entity_id'];
        },

        /**
         * @return {Boolean}
         */
        isVirtual: function () {
            return !!Number(quoteData['is_virtual']);
        },

        /**
         * @return {*}
         */
        getPriceFormat: function () {
            return priceFormat;
        },

        /**
         * @return {*}
         */
        getBasePriceFormat: function () {
            return basePriceFormat;
        },

        /**
         * @return {*}
         */
        getItems: function () {
            return window.checkoutConfig.quoteItemData;
        },

        /**
         *
         * @return {*}
         */
        getTotals: function () {
            return totals;
        },

        /**
         * @param {Object} data
         */
        setTotals: function (data) {
            data = proceedTotalsData(data);
            totals(data);
            this.setCollectedTotals('subtotal_with_discount', parseFloat(data['subtotal_with_discount']));
        },

        /**
         * @param {*} paymentMethodCode
         */
        setPaymentMethod: function (paymentMethodCode) {
            paymentMethod(paymentMethodCode);
        },

        /**
         * @return {*}
         */
        getPaymentMethod: function () {
            return paymentMethod;
        },

        /**
         * @return {*}
         */
        getStoreCode: function () {
            return storeCode;
        },

        /**
         * @param {String} code
         * @param {*} value
         */
        setCollectedTotals: function (code, value) {
            var colTotals = collectedTotals();

            colTotals[code] = value;
            collectedTotals(colTotals);
        },

        /**
         * @return {Number}
         */
        getCalculatedTotal: function () {
            var total = 0.; //eslint-disable-line no-floating-decimal

            _.each(collectedTotals(), function (value) {
                total += value;
            });

            return total;
        }
    };
});
