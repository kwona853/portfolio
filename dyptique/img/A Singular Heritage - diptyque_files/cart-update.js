define([
    'jquery',
    'Diptyque_Cart/js/more-less-qty-function',
    'Diptyque_Cart/js/update-qty-function'
], function ($, moreLessQty, updateQty) {
    "use strict";

    return {
        preUpdate: function(params)
        {
            return params;
        },
        postUpdate: function(data) {},
        executeUpdate: function(successCallback) {
            this.params = {};
            this.params = this.preUpdate(this.params);
            var self = this;
            $.ajax({
                showLoader: false,
                url: document.location,
                data: this.params,
                dataType: "html",
                success : function(data, textStatus, jqXHR)
                {
                    if($(data).find('.cart-ajax-update').get().length > 0)
                    {
                        if ($(data).find('.mp-preorder-checkout').get().length == 0 && $('.mp-preorder-checkout').length) {
                            $('.mp-preorder-checkout').hide();
                        }

                        $('.cart-ajax-update').each(function(i, e){
                            var id = $(e).prop('id');
                            if(id)
                            {
                                var newElement = $(data).find('#'+id);
                                if(newElement.first())
                                {
                                    $('#'+id).html(newElement.html());
                                }
                            }
                        });
                        $.ajax({
                            showLoader: false,
                            url: window.getTotalUrl,
                            dataType: "json",
                            success : function(data, textStatus, jqXHR)
                            {
                                if(data.total)
                                {
                                    $('#cart-totals .grand.totals.incl .amount strong').html(data.total);
                                }
                            }
                        });
                        moreLessQty.execute();
                        updateQty.execute();
                        successCallback();
                        self.postUpdate(data);
                    }
                    else
                    {
                        // if the cart is empty : reload
                        location.reload();
                    }
                }
            })
        }
    };
});
