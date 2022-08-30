/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */
define([
    'jquery',
    'ko',
    'uiComponent',
    'Magento_Customer/js/customer-data',
    'mage/url',
    'mage/storage'
], function ($, ko, Component, customerData, urlBuilder, storage) {
    'use strict';

    return Component.extend({
        /**
         * @override
         */
        initialize: function () {
            this.couponValue = ko.observable();
            this.removeValue = ko.observable();
            this.actionUrl = ko.observable();
            this.couponApplied = ko.observable(false);
            this.resultMessage = ko.observable();
            this.cart = customerData.get('cart');
            this.disableEnterButtonPress();
            this.initValues();
            this._super();
        },
        /**
         *
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
        initValues: function () {
            if (typeof this.cart().coupon_code !== 'undefined' && this.cart().coupon_code) {
                this.couponApplied(true);
                this.couponValue(this.cart().coupon_code);
            }
        },
        /**
         * Sending coupon logic
         */
        sendCoupon: function () {
            const self = this;
            var couponCodeField = $('#coupon_minicart_code');
            this.actionUrl(urlBuilder.build('checkout/minicart/couponPost'));
            if (this.cart().coupon_code) {
                this.removeValue(1);
                couponCodeField.val('');
                couponCodeField.css('pointer-events', 'auto');
            } else {
                this.removeValue(0);
                couponCodeField.css('pointer-events', 'none');
            }
            storage.post(
                this.actionUrl(), $('#discount-coupon-minicart-form').serialize(), true, 'application/x-www-form-urlencoded'
            ).done(function (result) {
                if (result.success) {
                    self.couponApplied(true);
                    self.resultMessage(result.success);
                } else if (result.error) {
                    self.couponApplied(false);
                    self.resultMessage(result.error);
                    couponCodeField.css('pointer-events', 'auto');
                }
                setTimeout(function () {
                    self.resultMessage(null);
                }, 4000);
            }).fail(function (result){
                self.resultMessage(result.error);
                self.couponApplied(false);
                setTimeout(function () {
                    self.resultMessage(null);
                }, 4000);
            });
        },

        /**
         * Disable enter press event on coupon input field
         */
        disableEnterButtonPress: function () {
            var self = this;
            $(document).on("submit", function(event){
                if(event.target.id === 'discount-coupon-minicart-form') {
                    event.preventDefault();
                    self.sendCoupon();
                }
            })
        }
    });
});
