/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */
define([
    'ko',
    'jquery',
    'uiComponent',
    'Magento_Customer/js/customer-data',
    'mage/translate'
], function (ko, $, Component, customerData, $t) {
    'use strict';

    return Component.extend({
        /**
         * @override
         */
        initialize: function () {
            this.messageText = ko.observable();
            this.freeShippingEnabled = ko.observable(false);
            this.leftPercentage = ko.observable(false);
            this.cart = customerData.get('cart');
            this.japanStore = 'ja_jp';
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
                this.clearObsValues();
                this.initValues();
            }, this);
            return this;
        },
        /**
         * Clear local obs values
         */
        clearObsValues: function () {
            this.messageText('');
            this.freeShippingEnabled(false);
            this.leftPercentage(false);
        },

        /**
         * Init all needed for component values
         */
        initValues: function () {
            if ((typeof this.cart().freeshipping_enabled !== 'undefined' &&
                this.cart().freeshipping_enabled)) {
                this.freeShippingEnabled(true);
                //check if something left to get freeshipping and coupon was without freeshipping
                if (typeof this.cart().freeshipping_left !== 'undefined' &&
                    this.cart().freeshipping_left &&
                    !(typeof this.cart().freeshipping_by_coupon !== 'undefined' && this.cart().freeshipping_by_coupon))
                {
                    if (this.cart().currency_symbol === '€') {
                        this.messageText(
                            $t('You are just %1 away from free shipping!').replace(
                                '%1',
                                (this.cart().store_code !== this.japanStore) ? this.cart().freeshipping_left + this.cart().currency_symbol : this.cart().freeshipping_left
                            )
                        );
                    } else {
                        this.messageText(
                            $t('You are just %1 away from free shipping!').replace(
                                '%1',
                                (this.cart().store_code !== this.japanStore) ? this.cart().currency_symbol + this.cart().freeshipping_left : this.cart().freeshipping_left
                            )
                        );
                    }
                    if (typeof this.cart().freeshipping_amount !== 'undefined' && this.cart().freeshipping_amount) {
                        //calculate percentage left
                        const percentage = Math.round(this.cart().subtotalAmount / (this.cart().freeshipping_amount / 100));
                        this.leftPercentage(percentage);
                    }
                } else {
                    //set obs values in case of hitting the goal for free shipping
                    this.messageText($t('You have qualified for free shipping!'));
                    this.leftPercentage(false);
                }
            }
        }
    });
});
