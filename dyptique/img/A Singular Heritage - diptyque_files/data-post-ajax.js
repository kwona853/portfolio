define([
    'jquery',
    'mage/template',
    'mage/dataPost',
    'Diptyque_Cart/js/cart-update',
    'Magento_Checkout/js/action/get-totals',
    'domReady!'
], function ($, mageTemplate, mageDataPost, cartUpdate, getTotalsAction) {
    'use strict';

    mageDataPost.prototype.submitForm = function ($form) {
        var action = $form.prop('action');

        $.ajax({
            showLoader: true,
            url: action,
            type: 'POST',
            dataType: "html",
            data: $form.serialize(),
            success : function(data, textStatus, jqXHR)
            {
                cartUpdate.executeUpdate(function(){});
                var deferred = $.Deferred();
                getTotalsAction([], deferred);
            }
        });
    };

    mageDataPost.prototype.postData = function (params) {
        var formKey = $(this.options.formKeyInputSelector).val(),
            $form;

        if (formKey) {
            params.data['form_key'] = formKey;
        }

        $form = $(mageTemplate(this.options.formTemplate, {
            data: params
        }));

        var self = this;

        if (params.data.isAjax) {
            if (params.data.confirmation) {
                uiConfirm({
                    content: params.data.confirmationMessage,
                    actions: {
                        /** @inheritdoc */
                        confirm: function () {
                            self.submitForm($form);
                        }
                    }
                });
            } else {
                self.submitForm($form);
            }
        } else {
            if (params.files) {
                $form[0].enctype = 'multipart/form-data';
                $.each(params.files, function (key, files) {
                    if (files instanceof FileList) {
                        input = document.createElement('input');
                        input.type = 'file';
                        input.name = key;
                        input.files = files;
                        $form[0].appendChild(input);
                    }
                });
            }

            if (params.data.confirmation) {
                uiConfirm({
                    content: params.data.confirmationMessage,
                    actions: {
                        /** @inheritdoc */
                        confirm: function () {
                            $form.appendTo('body').hide().submit();
                        }
                    }
                });
            } else {
                $form.appendTo('body').hide().submit();
            }
        }
    };

    return mageDataPost;
});
