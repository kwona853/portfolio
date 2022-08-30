/*jshint browser:true jquery:true*/
define([
    "jquery",
    'Magento_ConfigurableProduct/js/configurable'
], function ($) {
    'use strict';

    $.widget('diptyque.configurable', $.mage.configurable, {
        /**
         * Configure an option, initializing it's state and enabling related options, which
         * populates the related option's selection and resets child option selections.
         * @private
         * @param {*} element - The element associated with a configurable option.
         */
        _configureElement: function (element) {
            // Run the parent function
            this._super(element);

            // Initialize the value
            var isAvailable = true;

            // If a new element is selected, get isAvailable
            if (element.value) {
                isAvailable = element.selectedOptions[0].config.isAvailable;
            }

            // Hide or show the add to cart button depending on whether the option is available or not
            this._addToCartStatus(isAvailable);

            // New event used to add new features easily
            $(document).trigger('configurable:newElementSelected', element.selectedOptions[0].config);
        },

        /**
         * Simple js check to prevent the box-tocart to display if the product is not available
         *
         * @param isAvailable
         * @private
         */
        _addToCartStatus: function (isAvailable) {
            if (isAvailable) {
                $('.box-tocart').show();
            } else {
                $('.box-tocart').hide();
            }
        }
    });

    return $.diptyque.configurable;
});