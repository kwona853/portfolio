define([
    "jquery",
    'Magento_ConfigurableProduct/js/configurable',
    'Diptyque_OutOfStockConfigurables/js/type/configurable',
    'notifyMe',
    'domReady!'
], function ($) {
    'use strict';

    var $wkContainer = $('.wk-container');

    $(document).on('configurable:newElementSelected', function (event, selectedOptionConfig) {
        /*
        If the option is not available, or no option is selected, hide the container
        otherwise display it
         */
        if (typeof selectedOptionConfig !== 'undefined' && selectedOptionConfig) {
            if (selectedOptionConfig.isAvailable) {
                $wkContainer.hide();
            } else {
                $wkContainer.show();
            }
        }
    });
});