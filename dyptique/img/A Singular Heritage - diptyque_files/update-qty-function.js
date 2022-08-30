/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */
define([
    'jquery',
    'Magento_Ui/js/view/messages',
    'Magento_Customer/js/customer-data',
    'Magento_Checkout/js/action/get-totals'
], function ($, messages, customerData, getTotalsAction) {
    'use strict';

    window.testMessages = messages;

    var update = {};
    update.execute = function()
    {

        $('input.qty').data('changed-during-reload', false).change(function(event){
            event.preventDefault();
            var form = $('#form-validate');
            if(!form.data('reloading'))
            {
                $('#form-validate').data('reloading', false).submit(function() {
                    return false;
                });
                form.data('reloading', true);
                $(this).data('changed-during-reload', false);
                var name = $(this).attr('name');
                var self = this;
                var matched = name.match(/^cart\[(\d+)\]\[qty\]$/);

                if(matched.length == 2) {
                    $.ajax({
                        type: "POST",
                        showLoader: false,
                        url: window.qtyUpdateUrl,
                        data: {
                            id: matched[1], qty: $(this).val()
                        },
                        dataType: "json",
                        success : function(data, textStatus, jqXHR)
                        {
                            if(!$(self).data('changed-during-reload'))
                            {
                                if(data.qty)
                                {
                                    $(self).val(data.qty);
                                }
                                if(data.row)
                                {
                                    $('#price-row-'+matched[1]).html(data.row);
                                }
                                if(data.unit)
                                {
                                    $('#price-unit-'+matched[1]).html(data.unit);
                                }
                                if(data.total)
                                {
                                    $('#cart-totals .totals.sub .amount span').html(data.total);
                                    $('#cart-totals .grand.totals.incl .amount strong').html(data.total);
                                }

                                customerData.invalidate(['cart']);
                                customerData.reload(['cart'], true);

                                window.productIndex = $("#shopping-cart-table .item-info").index($(self).closest('.item-info')) + 1;
                                window.item_list_name = 'cart';
                            }
                        },
                        complete : function(jqXHR, textStatus)
                        {
                            var deferred = $.Deferred();
                            getTotalsAction([], deferred);
                            form.data('reloading', false);
                            if($(self).data('changed-during-reload'))
                            {
                                $(self).change();
                            }
                        }
                    });
                }
            }
            else
            {
                $(this).data('changed-during-reload', true);
            }
            return false;
        });
    };
    return update;
});
