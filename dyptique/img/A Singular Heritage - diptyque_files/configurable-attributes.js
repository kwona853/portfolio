define([
    'jquery',
    'underscore',
    'uiRegistry',
    'Diptyque_SimpleConfigurables/js/model/configurable-attributes-registry'
], function ($, _, uiRegistry, configurableAttributesRegistry) {
    'use strict';

    var configurableAttributesModel = function(
        pConfigurableProductId,
        pCheapestProductId,
        pAttributesData,
        miscOptions
    ){
        this.configurableProductId = pConfigurableProductId;
        this.cheapestProductId = pCheapestProductId;
        this.attributesData = pAttributesData.data;
        this.attributesMetadata = pAttributesData.metadata;
        this.miscOptions = miscOptions;
        this.isCanonicalLinkUsed = false;
        var link = document.querySelector("link[rel='canonical']");
        if(link)
        {
            this.isCanonicalLinkUsed = (link.href == window.location.href && window.location.hash == '');
        }
        if(this.isCanonicalLinkUsed)
        {
            uiRegistry.set('gallery_product_id', pCheapestProductId);
        }
        else
        {
            uiRegistry.set('gallery_product_id', pConfigurableProductId);
        }


        this.initOlfactoryFamily();
        this.initName();

        $('*[data-configurable-attribute-code]').each(function(i, e){
            var eObject = $(e);
            var code = eObject.attr('data-configurable-attribute-code');
            eObject.removeAttr('data-configurable-attribute-code');
            this.attributeElements[code] = eObject;

        }.bind(this));

        var self = this;

        $("input[name='selected_configurable_option']").change(function(e){
            var selectValue = $("select.super-attribute-select").val();
            if(selectValue)
            {
                self.updateShownAttributes($(this).val());
                self.updateNVRegistry($(this).val());
            }
            else
            {
                if(self.isCanonicalLinkUsed)
                {
                    self.updateShownAttributes(self.cheapestProductId);
                    self.updateNVRegistry(self.cheapestProductId);
                }
                else
                {
                    self.updateShownAttributes(self.configurableProductId);
                    self.updateNVRegistry(self.configurableProductId);
                }
            }
            self.productDetailsVisibility();
        });

        this.updateNVRegistry(pConfigurableProductId);
        configurableAttributesRegistry.productId.valueHasMutated();
        configurableAttributesRegistry.nightVisionEnabled.valueHasMutated();
    };
    configurableAttributesModel.prototype = {
        configurableProductId: 0,
        attributesData:{},
        attributesMetadata:{},
        attributeElements:{},
        updateNVRegistry: function(productId) {
            configurableAttributesRegistry.productId(productId);

            configurableAttributesRegistry.action('night');

            if(typeof this.attributesData[productId] != 'undefined' &&
                typeof this.attributesData[productId].has_night_vision != 'undefined')
            {
                if(configurableAttributesRegistry.nightVisionEnabled() == this.attributesData[productId].has_night_vision)
                {
                    configurableAttributesRegistry.nightVisionEnabled.valueHasMutated();
                }
                else
                {
                    configurableAttributesRegistry.nightVisionEnabled(this.attributesData[productId].has_night_vision);
                }
            }
            else
            {
                configurableAttributesRegistry.nightVisionEnabled(false);
            }

        },
        updateShownAttributes: function(productId) {
            var el;
            for(var attributeCode in this.attributesMetadata)
            {
                switch(attributeCode)
                {
                    case 'olfactory_collection_label_web':
                        this.emptyOlfactoryFamily();
                        break;
                    case 'name':
                        this.emptyName();
                        break;
                    default:
                        if(this.attributeElements.hasOwnProperty(attributeCode))
                        {
                            this.attributeElements[attributeCode].html('');
                            el = this.attributeElements[attributeCode].parent('div.attribute-no-display,div.attribute');

                            var visibleClasses = "product attribute";

                            var attr = el.attr('data-visible-class');
                            if(attr)
                            {
                                visibleClasses = attr;
                            }
                            else
                            {
                                visibleClasses = el.attr('class');
                            }
                            var visibleClassesArray = visibleClasses.split(' ');
                            for(var i=0; i<visibleClassesArray.length; i++)
                            {
                                el.removeClass(visibleClassesArray[i]);
                            }
                            el.addClass('attribute-no-display');
                            el.attr('data-visible-class', visibleClasses);
                        }
                        break;
                }
            }
            if(this.attributesData.hasOwnProperty(productId))
            {
                for(var attributeCode in this.attributesData[productId])
                {
                    switch(attributeCode)
                    {
                        case 'olfactory_collection_label_web':
                            this.setOlfactoryFamily(this.attributesData[productId][attributeCode]);
                            break;
                        case 'name':
                            this.setName(this.attributesData[productId][attributeCode]);
                            break;
                        default:
                            if(this.attributeElements.hasOwnProperty(attributeCode))
                            {
                                if(this.attributesData[productId][attributeCode] &&
                                    this.attributesData[productId][attributeCode].length)
                                {
                                    el = this.attributeElements[attributeCode];
                                    if(this.attributesMetadata[attributeCode]['html'])
                                    {
                                        el.html(this.attributesData[productId][attributeCode]);
                                    }
                                    else
                                    {
                                        el.text(this.attributesData[productId][attributeCode]);
                                    }
                                    var pel = el.parent('div.attribute-no-display');
                                    var visibleClass = pel.attr('data-visible-class');
                                    pel.removeAttr('data-visible-class');
                                    pel.addClass(visibleClass);
                                    pel.removeClass('attribute-no-display');
                                }
                            }
                            break;
                    }
                }
            }
        },
        initOlfactoryFamily: function() {
            this.olfactoryFamilyElement = $(this.miscOptions.olfactoryFamilyElement);
            this.olfactoryFamilyTitle = this.miscOptions.olfactoryFamilyTitle;
        },
        emptyOlfactoryFamily: function() {
            this.olfactoryFamilyElement.html("");
        },
        setOlfactoryFamily: function(value) {
            if(value)
            {
                this.olfactoryFamilyElement.html(this.olfactoryFamilyTitle+value);
            }
        },
        initName: function() {
            this.nameElement = $(this.miscOptions.nameElement);
        },
        emptyName: function() {
            this.nameElement.html("");
        },
        setName: function(value) {
            if(value)
            {
                this.nameElement.html(value);
            }
        },
        productDetailsVisibility: function () {
            var hasAttributes = false;
            $('div.product-details > div').each(function () {
                if (!$(this).hasClass('attribute-no-display')) {
                    hasAttributes = true;
                }
            });

            if (hasAttributes) {
                $('div.empty-product-detailed-info')
                    .removeClass('empty-product-detailed-info')
                    .addClass('product-detailed-info');
            } else {
                $('div.product-detailed-info')
                    .removeClass('product-detailed-info')
                    .addClass('empty-product-detailed-info');
            }
        }
    };
    return configurableAttributesModel;
});
