// see Magento_GoogleTagManager/js/google-tag-manager-cart

define([
    'jquery',
    'Magento_GoogleTagManager/js/google-tag-manager-cart',
    'Magento_Customer/js/customer-data',
    'Magento_GoogleTagManager/js/google-analytics-universal',
    'Magento_GoogleTagManager/js/google-analytics-universal-cart'
], function ($, mageGtmCartWidget, customerData, GoogleAnalyticsUniversal, GoogleAnalyticsUniversalCart) {
    'use strict';

    $.widget('diptyque.gtmCart', mageGtmCartWidget, {

        _create: function () {
            this.googleAnalyticsUniversalCart = new GoogleAnalyticsUniversalCart({
                dlCurrencyCode: this.options.dlCurrencyCode,
                dataLayer: this.options.dataLayer,
                cookieAddToCart: this.options.cookieAddToCart,
                cookieRemoveFromCart: this.options.cookieRemoveFromCart
            });
            this.googleAnalyticsUniversal = new GoogleAnalyticsUniversal({
                blockNames: this.options.blockNames,
                dlCurrencyCode: this.options.dlCurrencyCode,
                dataLayer: this.options.dataLayer,
                staticImpressions: this.options.staticImpressions,
                staticPromotions: this.options.staticPromotions,
                updatedImpressions: this.options.updatedImpressions,
                updatedPromotions: this.options.updatedPromotions
            });
            this.cartItemsCache = [];
            this._initActions();
            this._setCartDataListener();
            this.googleAnalyticsUniversal.updatePromotions();
            this.googleAnalyticsUniversalCart.parseAddToCartCookies();
            this.googleAnalyticsUniversalCart.parseRemoveFromCartCookies();
            this.googleAnalyticsUniversalCart.subscribeProductsUpdateInCart();
            this.googleAnalyticsUniversalCart.listenMinicartReload();
        },

        _initActions: function () {
            var events = this.options.events;

            this.options.actions[events.AJAX_REMOVE_FROM_CART] = function (product) {
                this.googleAnalyticsUniversal.removeFromCart(
                    product['product_sku'],
                    product['product_name'],
                    product['product_price_gtm_value'],
                    product.qty
                );
                this._updateCart();
            }.bind(this);
        },

        getProductBySku: function (sku) {
            /**
             * Product search criteria.
             *
             * @param {Object} item
             *
             * @return {Boolean}
             */
            var searchCriteria = function (item) {
                    return item['product_sku'] === sku || (sku && item['product_configurable_sku'] === sku);
                },
                productFromCache = _.find(this.cartItemsCache, searchCriteria),
                productFromCart = _.find(customerData.get('cart')().items, searchCriteria);

            if (!productFromCache) {
                return _.extend({}, productFromCart, {
                    qty: 1
                });
            }

            if (productFromCache && productFromCart) {
                return _.extend({}, productFromCache, {
                    qty: productFromCart.qty - productFromCache.qty
                });
            }

            return productFromCache || productFromCart;
        },

        /**
         * Sets listener to the cart.
         *
         * @private
         */
        _executeEvents: function () {
            this.options.temporaryEventStorage.forEach(function (item, index) {
                this.options.actions[item.type](this.getProductBySku(item.sku));
                this.options.temporaryEventStorage.splice(index, 1);
            }.bind(this));
        },

        _updateCart: function () {
            var cartItems;
            var productsData;
            var k;
            var itemData;
            var productData;

            cartItems = customerData.get('cart')().items;
            if (cartItems) {
                productsData = [ ];
                for (k = 0; k < cartItems.length; k++) {

                    itemData = cartItems[k];
                    productData = {
                        'item_id': itemData['product_sku'],
                        'item_name': itemData['product_name'],
                        'price': itemData['product_price_gtm_value'],
                        'quantity': itemData.qty
                    };
                    productsData.push(productData);
                }
                if (Array.isArray(productsData) && productsData.length) {
                    this.options.dataLayer.push({
                        'event': 'add_to_cart_old',
                        'ecommerce': {
                            'items': productsData
                        }
                    });
                }
            }
        }
    });

    return $.diptyque.gtmCart;
});
