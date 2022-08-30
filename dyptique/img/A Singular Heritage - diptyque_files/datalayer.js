/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */
define([
    'jquery',
    'underscore',
    'Magento_Customer/js/customer-data',
], function ($, _, storage) {
    'use strict';

    const storageName = 'analyzer-data';

    /**
     * Getter for cookie
     *
     * @param {String} name
     */
    function getCookie(name) {
        var cookie = ' ' + document.cookie,
            search = ' ' + name + '=',
            setStr = null,
            offset = 0,
            end = 0;
        if (cookie.length > 0) {
            offset = cookie.indexOf(search);

            if (offset != -1) {
                offset += search.length;
                end = cookie.indexOf(';', offset);

                if (end == -1) {
                    end = cookie.length;
                }
                setStr = decodeURI(cookie.substring(offset, end));
            }
        }
        return setStr;
    }

    /**
     * Delete cookie
     *
     * @param {String} name
     */
    function delCookie(name) {
        var date = new Date(0);

        document.cookie = name + '=' + '; path=/; expires=' + date.toUTCString();
    }

    /**
     * @param {Object} config
     */
    return function (config) {
        window.dataLayer = window.dataLayer || [];

        if (typeof config.currency !== 'undefined' && config.currency) {
            localStorage.setItem("currencyCode", config.currency);
        }

        let analyzerData = storage.get(storageName);

        analyzerData.subscribe((dataObject) => {
            if (!_.isObject(dataObject)) {
                return;
            }

            if (_.isObject(dataObject) && _.has(dataObject, 'removeCart') && dataObject.removeCart.length > 0) {
                let removedProduct = [],
                    productLists = JSON.parse(localStorage.getItem("productLists")),
                    isProductInObject;

                if (getCookie('remove_from_cart')) {
                    let removeProductsList = decodeURIComponent(getCookie('remove_from_cart'));
                    removedProduct = JSON.parse(removeProductsList);
                    delCookie('remove_from_cart');
                }

                if (typeof removedProduct[0] !== 'undefined') {
                    if (productLists && removedProduct.length) {
                        let recentListName = '',
                            recentProductId = '',
                            recentProductCategory = '',
                            recentProductCategory2 = '',
                            recentProductCategory3 = '',
                            itemVariant = '',
                            itemPrice = '';

                        let finalRemovedPrice = Math.round(parseFloat(removedProduct[0].price) * 100) / 100;
                        itemPrice = finalRemovedPrice.toFixed(2).toString();

                        productLists.find((o) => {
                            if (o.productId === removedProduct[0].sku) {
                                isProductInObject = true;
                                recentListName = o.list;
                                recentProductId = o.productId;

                                if (typeof o.itemCategory1 !== 'undefined') {
                                    recentProductCategory = o.itemCategory1;
                                }
                                if (typeof o.itemCategory2 !== 'undefined') {
                                    recentProductCategory2 = o.itemCategory2;
                                }
                                if (typeof o.itemCategory3 !== 'undefined') {
                                    recentProductCategory3 = o.itemCategory3;
                                }
                                if (typeof o.itemVariant !== 'undefined') {
                                    itemVariant = o.itemVariant;
                                }

                                if (typeof o.productPrice !== 'undefined') {
                                    itemPrice = o.productPrice;
                                }
                                return true;
                            }

                        });

                        if (isProductInObject) {
                            removedProduct[0].item_list_name = recentListName;
                            removedProduct[0].item_category = recentProductCategory;
                            removedProduct[0].item_category2 = recentProductCategory2;
                            removedProduct[0].item_category3 = recentProductCategory3;
                            removedProduct[0].item_variant = itemVariant;
                            removedProduct[0].price = itemPrice;
                        }

                        if (typeof window.currentPrice !== 'undefined') {
                            let goodPrice = parseFloat(window.currentPrice) - (parseFloat(itemPrice) * parseInt(removedProduct[0].qty));
                            window.currentPrice = goodPrice.toFixed(2).toString();
                        }
                    }

                    let finalProductPrice = removedProduct[0].price;
                    if (Number.isInteger(finalProductPrice)) {
                         finalProductPrice = finalProductPrice.toFixed(2).toString();
                    } else {
                        let splited = finalProductPrice.split('.');
                        let charactersToRemove = 2;
                        if (splited[1].length > 2) {
                            charactersToRemove = splited[1].length - 2;
                            if (charactersToRemove > 0) {
                                finalProductPrice = finalProductPrice.substring(0, finalProductPrice.length - charactersToRemove);
                            }
                        }
                    }

                    // let removedData = {
                    //     'event': 'remove_from_cart on cartpage',
                    //     'event_category': 'ecommerce',
                    //     'ecommerce': {
                    //         'items': [{
                    //             'item_id': removedProduct[0].sku,
                    //             'item_name': removedProduct[0].name,
                    //             'price': finalProductPrice,
                    //             'quantity': removedProduct[0].qty,
                    //             'item_brand': "Diptyque Paris",
                    //             'item_category': removedProduct[0].item_category,
                    //             'item_category2': removedProduct[0].item_category2,
                    //             'item_category3': removedProduct[0].item_category3,
                    //             'item_variant': removedProduct[0].item_variant,
                    //             'item_list_name': removedProduct[0].item_list_name,
                    //             'index': 0
                    //         }]
                    //     }
                    // }

                    if (typeof window.currentQuoteItems !== 'undefined') {
                        window.currentQuoteItems = window.currentQuoteItems.filter(function (obj) {
                            return obj.item_id !== removedProduct[0].sku;
                        });
                    }

                    //Should be carefully removed
                    //dataLayer.push(removedData);
                }
            }
        });

        // The "clickAccountLogin" event should be pushed to the dataLayer if the customer has just logged in.
        if (getCookie('customer_logged_resently')) {
            dataLayer.push({
                "event": "clickAccountLogin"
            });

            delCookie('customer_logged_resently');
        }

        // The "clickAccountCreation" event should be pushed to the dataLayer if the customer has just created account.
        if (getCookie('customer_created_resently')) {
            dataLayer.push({
                "event": "clickAccountCreation"
            });
            delCookie('customer_created_resently');
        }
    };
});
