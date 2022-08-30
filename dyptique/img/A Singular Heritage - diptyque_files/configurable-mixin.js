define([
    'jquery',
    'underscore',
    'uiRegistry',
    'mage/template',
    'mage/translate',
    'priceUtils',
    'Diptyque_SimpleConfigurables/js/model/configurable-attributes-registry',
    'Diptyque_SimpleConfigurables/js/model/configurable-attributes'
], function ($, _, uiRegistry, mageTemplate, $t, priceUtils, configurableAttributesRegistry) {
    'use strict';

    return function(target)
    {
        target.prototype._original_configureElement = target.prototype._configureElement;
        target.prototype._configureElement = function(element) {
            this._original_configureElement(element);
            this.inputSimpleProduct.change();
        };

        target.prototype._displayTierPriceBlock = function (optionId) {
            var options, tierPriceHtml;

            if (typeof optionId != 'undefined' &&
                typeof this.options.spConfig.optionPrices[optionId] != 'undefined' &&
                this.options.spConfig.optionPrices[optionId].tierPrices != [] // eslint-disable-line eqeqeq
            ) {
                options = this.options.spConfig.optionPrices[optionId];

                if (this.options.tierPriceTemplate) {
                    tierPriceHtml = mageTemplate(this.options.tierPriceTemplate, {
                        'tierPrices': options.tierPrices,
                        '$t': $t,
                        'currencyFormat': this.options.spConfig.currencyFormat,
                        'priceUtils': priceUtils
                    });
                    $(this.options.tierPriceBlockSelector).html(tierPriceHtml).show();
                }
            } else {
                $(this.options.tierPriceBlockSelector).hide();
            }
        };

        target.prototype._displayRegularPriceBlock = function(optionId) {
            if (typeof optionId != 'undefined' &&
                typeof this.options.spConfig.optionPrices[optionId] != 'undefined' &&
                this.options.spConfig.optionPrices[optionId].oldPrice.amount != //eslint-disable-line eqeqeq
                this.options.spConfig.optionPrices[optionId].finalPrice.amount
            ) {
                $(this.options.slyOldPriceSelector).show();
            } else {
                $(this.options.slyOldPriceSelector).hide();
            }
        };

        target.prototype._original_getSimpleProductId = target.prototype._getSimpleProductId;
        target.prototype._getSimpleProductId = function(element) {
            var id = this._original_getSimpleProductId(element);
            var gid = uiRegistry.get('gallery_product_id');
            if(!id)
            {
                id = gid;
            }
            return id;
        };

        return target;
    }
});
