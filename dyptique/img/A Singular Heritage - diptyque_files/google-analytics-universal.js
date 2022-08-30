/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'underscore'
], function ($, _) {
    'use strict';

    /**
     * Google analytics universal class
     *
     * @param {Object} config
     */
    function GoogleAnalyticsUniversal(config) {
        this.blockNames = config.blockNames;
        this.dlCurrencyCode = config.dlCurrencyCode;
        this.dataLayer = config.dataLayer;
        this.staticImpressions = config.staticImpressions;
        this.staticPromotions = config.staticPromotions;
        this.updatedImpressions = config.updatedImpressions;
        this.updatedPromotions = config.updatedPromotions;
    }

    GoogleAnalyticsUniversal.prototype = {

        /**
         * Active on category action
         *
         * @param {String} id
         * @param {String} name
         * @param {String} category
         * @param {Object} list
         * @param {String} position
         */
        activeOnCategory: function (id, name, category, list, position) {
            this.dataLayer.push({
                'event': 'select_item_default',
                'ecommerce': {
                    'click': {
                        'actionField': {
                            'list': list
                        },
                        'products': [{
                            'id': id,
                            'name': name,
                            'category': category,
                            'list': list,
                            'position': position
                        }]
                    }
                }
            });
        },

        /**
         * Active on products action
         *
         * @param {String} id
         * @param {String} name
         * @param {Object} list
         * @param {String} position
         * @param {String} category
         */
        activeOnProducts: function (id, name, list, position, category) {
            this.dataLayer.push({
                'event': 'select_item_default2',
                'ecommerce': {
                    'click': {
                        'actionField': {
                            'list': list
                        },
                        'products': [{
                            'id': id,
                            'name': name,
                            'list': list,
                            'position': position,
                            'category': category
                        }]
                    }
                }
            });
        },

        /**
         * Add to cart action
         *
         * @param {String} id
         * @param {String} name
         * @param {String} price
         * @param {String} quantity
         */
        addToCart: function (id, name, price, quantity) {
            this.dataLayer.push({
                'event': 'addToCart_default',
                'ecommerce': {
                    'currencyCode': this.dlCurrencyCode,
                    'add': {
                        'products': [{
                            'id': id,
                            'name': name,
                            'price': price,
                            'quantity': quantity
                        }]
                    }
                }
            });
        },

        /**
         * Remove from cart action
         *
         * @param {String} id
         * @param {String} name
         * @param {String} price
         * @param {String} quantity
         */
        removeFromCart: function (id, name, price, quantity) {
            this.dataLayer.push({
                'event': 'remove_from_cart',
                'event_category': 'ecommerce',
                'ecommerce': {
                    'items': [{
                        'item_id': id,
                        'item_name': name,
                        'price': price,
                        'quantity': quantity,
                        'item_brand': "Diptyque Paris",
                        'item_category': "",
                        'item_category2': "",
                        'item_category3': "",
                        'item_variant': "",
                        'item_list_name': "",
                        'index': 0
                    }]
                }
            });
        },

        /**
         * Click banner action
         *
         * @param {String} id
         * @param {String} name
         * @param {String} creative
         * @param {String} position
         */
        clickBanner: function (id, name, creative, position) {
            this.dataLayer.push({
                'event': 'promotionClick',
                'ecommerce': {
                    'promoClick': {
                        'promotions': [{
                            'id': id,
                            'name': name,
                            'creative': creative,
                            'position': position
                        }]
                    }
                }
            });
        },

        /**
         * Update promotions
         */
        updatePromotions: function () {
            var dlPromotions = {
                    'event': 'promotionView',
                    'ecommerce': {
                        'promoView': {
                            'promotions': []
                        }
                    }
                },
                pagePromotions = [],
                promotionCounter = 0,
                bannerIds = [],
                i = 0,
                promotion,
                self = this;

            // check if there is a new block generated by FPC placeholder update
            if (this.updatedPromotions.length) {
                pagePromotions = this.updatedPromotions;
            }

            // use the static data otherwise
            if (!pagePromotions.length && this.staticPromotions.length) {
                pagePromotions = this.staticPromotions;
            }

            if ($('[data-banner-id]').length) {
                _.each($('[data-banner-id]'), function (banner) {
                    var $banner = $(banner),
                        ids = ($banner.data('ids') + '').split(',');

                    bannerIds = $.merge(bannerIds, ids);
                });
            }

            bannerIds = $.unique(bannerIds);

            for (i; i < pagePromotions.length; i++) {
                promotion = pagePromotions[i];

                // jscs:disable disallowKeywords
                /* eslint-disable eqeqeq */
                if ($.inArray(promotion.id, bannerIds) == -1 || promotion.activated == '0') {
                    continue;
                }

                // jscs:enable disallowKeywords
                /* eslint-enable eqeqeq */

                dlPromotions.ecommerce.promoView.promotions.push({
                    'id': promotion.id,
                    'name': promotion.name,
                    'creative': promotion.creative,
                    'position': promotion.position
                });
                promotionCounter++;
            }

            if (promotionCounter > 0) {
                this.dataLayer.push(dlPromotions);
            }

            $('[data-banner-id]').on('click', '[data-banner-id]', function () {
                var bannerId = $(this).attr('data-banner-id'),
                    promotions = _.filter(pagePromotions, function (item) {
                        return item.id === bannerId;
                    });

                _.each(promotions, function (promotionItem) {
                    self.clickBanner(
                        promotionItem.id,
                        promotionItem.name,
                        promotionItem.creative,
                        promotionItem.position
                    );
                });
            });
        }
    };

    return GoogleAnalyticsUniversal;
});
