define([
    'jquery',
    'mage/translate',
    'Magento_Ui/js/modal/alert',
    'Webkul_OutOfStockNotification/js/notify-me'
], function ($, $t, alert, notifyMe) {
    'use strict';

    $.widget('diptyque.notifyMe', $.mage.notifyMe, {

        _create: function () {
            var self = this;
            var button = self.options.button;
            var loader = self.options.loader;
            var action = self.options.action;
            var container = self.options.container;
            var stockStatus = self.options.stockStatus;
            var warning = self.options.warning;
            var productType = self.options.productType;
            var actionConfig = self.options.actionConfig;
            var result = self.options.result;
            var productnewId = self.options.productId;
            var failure = self.options.failureMsg;
            var storeId = self.options.storeId;

            function validateEmail($email) {
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailReg.test($email);
            }

            var $select = $('#product-options-wrapper').find('.super-attribute-select');
            var $wkContainer = $('.wk-container');
            var $loadingMaskOuter = $(".wk-loading-mask-outer");

            if (stockStatus == 0) {
                $wkContainer.removeClass("wk-display-none");
            }
            $select.change(function () {
                $wkContainer.addClass("wk-display-none");
                $loadingMaskOuter.css("display", "inline-block").removeClass("wk-display-none");
                var flag = 1;
                setTimeout(function () {
                    $("#product_addtocart_form").find("input[type='hidden']").each(function () {
                        $select.each(function () {
                            if ($(this).val() == "") {
                                flag = 0;
                            }
                        });
                        var name = $(this).attr("name");
                        if (name == "selected_configurable_option") {
                            productnewId = $(this).val();
                            $loadingMaskOuter.css("display", "none").addClass("wk-display-none");
                            if (flag && productnewId) {
                                $loadingMaskOuter.css("display", "inline-block").removeClass("wk-display-none");
                                jQuery.ajax({
                                    url: actionConfig,
                                    data: {
                                        'productId': productnewId,
                                        'storeId': storeId
                                    },
                                    async: false,
                                    type: 'POST',
                                    success: function (status) {
                                        stockStatus = status;
                                        if (stockStatus == 0) {
                                            $wkContainer.removeClass("wk-display-none");
                                            $('.product-options-bottom').addClass("wk-display-none");
                                        } else {
                                            $('.product-options-bottom').removeClass("wk-display-none");
                                        }
                                        $loadingMaskOuter.css("display", "none");
                                    },
                                    error: function (xhr, status, error) {
                                        $loadingMaskOuter.css("display", "none");
                                    }
                                });
                            }
                        }
                    });
                });
            });

            $(button).click(function () {
                $(loader).removeClass('wk-display-none');
                $(warning).empty();
                $(warning).css("display", "none");
                $(result).empty();
                var email = $('#email').val();
                if (validateEmail(email) && email != "") {
                    $(loader).css("display", "inline-block");
                    jQuery.ajax({
                        url: action,
                        data: {
                            'email': email,
                            'productId': productnewId,
                            'storeId': storeId
                        },
                        type: 'POST',
                        success: function (status) {
                            if ('error' in status) {
                                $(warning).append("<span class='wk-oosn-error'><b>" + status['error'] + "</b></span>");
                                $(warning).css("display", "inline-block");
                                $(loader).css("display", "none");
                            } else {
                                $(warning).append("<b>" + status['msg'] + "</b>");
                                $(warning).css("display", "inline-block");
                                $(loader).css("display", "none");
                            }
                        }
                    });
                } else {
                    $(result).append(failure);
                    $(loader).addClass("wk-display-none");
                }
            });

        }

    });

    return $.diptyque.notifyMe;

});
