/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

define([
    'jquery',
    'Magento_Customer/js/customer-data',
    'mage/translate',
    'Mageplaza_SocialLogin/js/popup',
    'mage/loader'
], function ($, customerData, $t) {
    'use strict';
    $.widget('mageplaza.popup', $.mageplaza.socialpopup, {
        processLogin: function () {
            if (!this.loginForm.valid()) {
                return;
            }

            $('#social-login-popup').loader({}).loader('show');

            var self          = this,
                options       = this.options,
                loginData     = {},
                formDataArray = this.loginForm.serializeArray();

            formDataArray.forEach(
                function (entry) {
                    loginData[entry.name] = entry.value;
                    if (entry.name.includes('user_login')) {
                        loginData['captcha_string']  = entry.value;
                        loginData['captcha_form_id'] = 'user_login';
                    }
                }
            );

            this.appendLoading(this.loginFormContent);
            this.removeMsg(this.loginFormContent, options.errorMsgClass);

            return $.ajax(
                {
                    url: options.formLoginUrl,
                    type: 'POST',
                    data: JSON.stringify(loginData)
                }
            ).done(
                function (response) {
                    response.success = !response.errors;
                    self.addMsg(self.loginFormContent, response);
                    if (response.success) {
                        window.dataLayer = window.dataLayer || [];
                        dataLayer.push({
                            'event': 'clickAccountLogin'
                        });

                        customerData.invalidate(['customer']);
                        if (response.redirectUrl) {
                            window.location.href = response.redirectUrl;
                        } else {
                            window.location.reload();
                        }
                    } else {
                        self.reloadCaptcha('login');
                        self.removeLoading(self.loginFormContent);
                    }

                    $('#social-login-popup').loader({}).loader('hide');
                }
            ).fail(
                function () {
                    self.reloadCaptcha('login');
                    self.addMsg(
                        self.loginFormContent, {
                            message: $t('Could not authenticate. Please try again later'),
                            success: false
                        }
                    );
                    self.removeLoading(self.loginFormContent);

                    $('#social-login-popup').loader({}).loader('hide');
                }
            );
        },
        processCreate: function () {
            if (!this.createForm.valid()) {
                return;
            }

            $('#social-login-popup').loader({}).loader('show');

            var self       = this,
                options    = this.options,
                parameters = this.createForm.serialize();

            this.appendLoading(this.createFormContent);
            this.removeMsg(this.createFormContent, options.errorMsgClass);

            return $.ajax(
                {
                    url: options.createFormUrl,
                    type: 'POST',
                    data: parameters
                }
            ).done(
                function (response) {
                    if (response.redirect) {
                        window.location.href = response.redirect;
                    } else if (response.success) {
                        window.dataLayer = window.dataLayer || [];
                        dataLayer.push({
                            'event': 'clickAccountCreation'
                        });
                        customerData.invalidate(['customer']);
                        self.addMsg(self.createFormContent, response);
                        if (response.url === '' || response.url == null) {
                            window.location.reload(true);
                        } else {
                            window.location.href = response.url;
                        }
                    } else {
                        self.reloadCaptcha('create');
                        self.addMsg($(self.createFormContent[0]), response);
                        self.removeLoading(self.createFormContent);
                    }

                    $('#social-login-popup').loader({}).loader('hide');
                }
            ).fail(
                function () {
                    $('#social-login-popup').loader({}).loader('hide');
                }
            );
        },

        addAttribute: function (element) {
            var self = this;
            element.addClass('social-login-btn');
            element.attr('href', self.options.popup);
            element.attr('data-effect', self.options.popupEffect);
            element.removeClass('link-disabled');
        },

        enablePopup: function (parent_selector = null, child_selector = null) {
            parent_selector.magnificPopup(
                {
                    delegate: child_selector,
                    removalDelay: 200,
                    callbacks: {
                        beforeOpen: function () {
                            this.st.mainClass = this.st.el.attr('data-effect');
                        }
                    },
                    midClick: true
                }
            );
        },
    });
    return $.mageplaza.popup;
});
