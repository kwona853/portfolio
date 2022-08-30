/**
 * Webkul Software
 *
 * @category    Webkul
 * @package     Webkul_OutOfStockNotification
 * @author      Webkul
 * @copyright   Copyright (c) 2010-2018 Webkul Software Private Limited (https://webkul.com)
 * @license     https://store.webkul.com/license.html
 */

/*jshint jquery:true*/
define(
    [
    'jquery',
    'mage/translate',
    'Magento_Ui/js/modal/alert',
    ],
    function ($,$t,alert) {
        'use strict';
        $.widget(
            'mage.notifyMe',
            {
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
                    function validateEmail($email)
                    {
                        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                        return emailReg.test($email);
                    }

                    if (stockStatus == 0) {
                        $(".wk-container").removeClass("wk-display-none");
                    }
                    $('#product-options-wrapper .super-attribute-selectt').change(function () {
                        $(".wk-container").addClass("wk-display-none");
                        $(".wk-loading-mask-outer").css("display","inline-block");
                        $(".wk-loading-mask-outer").removeClass("wk-display-none");
                        var flag = 1;
                        setTimeout(function () {
                        $("#product_addtocart_form input[type='hidden']").each(function () {
                            $('#product-options-wrapper .super-attribute-select').each(function () {
                                if ($(this).val() == "") {
                                    flag = 0;
                                }
                            });
                            var name = $(this).attr("name");
                            if (name == "selected_configurable_option") {
                                productnewId = $(this).val();
                                $(".wk-loading-mask-outer").css("display","none");
                                $(".wk-loading-mask-outer").addClass("wk-display-none");
                                if (flag ==1) {
                                    if (productnewId) {
                                        $(".wk-loading-mask-outer").css("display","inline-block");
                                        $(".wk-loading-mask-outer").removeClass("wk-display-none");
                                    jQuery.ajax({
                                        url: actionConfig,
                                        data : {
                                            'productId' : productnewId
                                        },
                                        async: false,
                                        type: 'POST',
                                        success:function (status) {
                                            stockStatus = status;
                                            if (stockStatus == 0) {
                                                $(".wk-container").removeClass("wk-display-none");
                                                $('.product-options-bottom').addClass("wk-display-none");
                                            } else {
                                                $('.product-options-bottom').removeClass("wk-display-none");
                                            }
                                            $(".wk-loading-mask-outer").css("display","none");
                                        },
                                        error: function (xhr, status, error) {
                                            $(".wk-loading-mask-outer").css("display","none");
                                        }
                                    });
                                }
                            }
                            }
                        });
                    });
                });

                $(button).click(function () {
                    $(loader).removeClass('wk-display-none');
                    $(warning).empty();
                    $(warning).css("display","none");
                    $(result).empty();
                    var email = $('#email').val();
                    if (validateEmail(email) && email != "") {
                        $(loader).css("display","inline-block");
                        jQuery.ajax({
                            url: action,
                            data : {
                                'email' : email,
                                'productId' : productnewId
                            },
                            type: 'POST',
                            success:function (status) {
                                if ('error' in status) {
                                    $(warning).append("<span class='wk-oosn-error'><b>"+status['error']+"</b></span>");
                                    $(warning).css("display","inline-block");
                                    $(loader).css("display","none");
                                } else {
                                    $(warning).append("<b>"+status['msg']+"</b>");
                                    $(warning).css("display","inline-block");
                                    $(loader).css("display","none");
                                }
                            }
                        });
                    } else {
                        $(result).append(failure);
                        $(loader).addClass("wk-display-none");
                    }
                });
               
                }
            }
        );
        return $.mage.notifyMe;
    }
);
