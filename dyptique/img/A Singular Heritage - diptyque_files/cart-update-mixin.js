/*
 *  Copyright (c) Vaimo Group. All rights reserved.
 *  See LICENSE_VAIMO.txt for license details.
 *
 */
define([
    'jquery',
    'underscore',
    'mage/utils/wrapper',
    'Diptyque_Sample/js/more-samples-function',
    'Diptyque_Sample/js/load-samples-function',
    'mage/collapsible',
    'domReady!'
], function ($, _, wrapper, moreSamplesFunction) {
    "use strict";

    return function (cartUpdateObject)
    {
        cartUpdateObject._diptyqueSample_default_preUpdate = cartUpdateObject.preUpdate;
        cartUpdateObject._diptyqueSample_default_postUpdate = cartUpdateObject.postUpdate;

        cartUpdateObject.preUpdate = function(params)
        {
            if($('.samples').data('extended'))
            {
                params.more = '1';
            }

            return this._diptyqueSample_default_preUpdate(params);
        };

        cartUpdateObject.postUpdate = function(data)
        {
            moreSamplesFunction();

            var sampleLoadCart = $('.samples').data('sampleLoadcart');

            if (!sampleLoadCart) {
                return;
            }

            // reinit sample load cart
            sampleLoadCart._create();

            // reinit update cart
            if(window.updateCart.options)
            {
                var checkboxes = $('.sample-checkbox').get();
                for(var i = 0; i < checkboxes.length; i++)
                {
                    new jQuery.sample.updatecart(window.updateCart.options, checkboxes[i]);
                }
            }

            this._diptyqueSample_default_postUpdate();

            $("#samples").collapsible("destroy");
            $("#samples").collapsible({
                "openedState": "active",
                "collapsible": true,
                "active": false,
                _destroy: function () {
                    this.collapsible.remove();
                }
            });
        };
        return cartUpdateObject;
    };
});
